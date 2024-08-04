const radioDives = document.querySelectorAll(".query-type");
const formGroups = document.querySelectorAll(".form-group");
const formElement = document.querySelector("form");
const toast = document.querySelector(".toast");
console.log(formGroups);
console.log(toast);

let formValid = true;

const changeRadioBg = () => {
  radioDives.forEach((radioDiv) => {
    const radio = radioDiv.querySelector("input");
    if (radio.checked) {
      radioDiv.classList.add("radio-selected");
    } else {
      radioDiv.classList.remove("radio-selected");
    }
  });
};

const displayError = (formGroup, error) => {
  const errorMessage = formGroup.querySelector(error);
  console.log(errorMessage);
  errorMessage.classList.remove("hidden");
};

const removeError = (formGroup) => {
  const errorMessage = formGroup.querySelectorAll(".error");
  errorMessage.forEach((error) => {
    error.classList.add("hidden");
  });
};

const validateGroup = (formGroup) => {
  const inputType = formGroup.querySelector("input, textarea").type || "text";

  switch (inputType) {
    case "radio":
      let checked = false;
      const radioInputs = formGroup.querySelectorAll("input");

      radioInputs.forEach((input) => {
        if (input.checked) {
          checked = true;
        }
      });

      if (!checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;
    case "checkbox":
      const checkInput = formGroup.querySelector("input");
      if (!checkInput.checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "text":
      const textInput = formGroup.querySelector("input");
      if (textInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "textarea":
      const textareaInput = formGroup.querySelector("textarea");
      if (textareaInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;

    case "email":
      const emailInput = formGroup.querySelector("input");
      const emailPattern = /^[a-zA-Z0-9.%_+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/g;

      if (emailInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        displayError(formGroup, ".valid");
        formValid = false;
      }
      break;
    default:
      console.error("Invalid input type:", inputType);
      break;
  }
};

const displayToast = () => {
  setTimeout(() => {
    toast.classList.remove("hidden");
  }, 10);
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
};

//! Event listeners handling
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("showToast") === "true") {
    displayToast();

    localStorage.removeItem("showToast");
  }
});

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  formValid = true;

  formGroups.forEach((formGroup) => {
    validateGroup(formGroup);
  });

  if (formValid) {
    localStorage.setItem("showToast", "true");
    formElement.submit();
  }
});

radioDives.forEach((radioDiv) => {
  radioDiv.addEventListener("click", () => {
    const radioInput = radioDiv.querySelector("input");
    radioInput.checked = true;
    changeRadioBg();
    removeError(radioDiv.parentElement.parentElement);
    console.log(radioDiv.parentElement.parentElement);
  });
});

formGroups.forEach((formGroup) => {
  const inputs = formGroup.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      removeError(formGroup);
    });
    input.addEventListener("blur", () => {
      validateGroup(formGroup);
    });
  });
});

toast.addEventListener("click", () => {
  toast.classList.add("hidden");
});
