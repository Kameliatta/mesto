const setEventListeners = (formElement, settings) => {
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  
  Array.from(inputList).forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      const isFormValid = formElement.checkValidity();

      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(submitButton, isFormValid, settings);
    })
  })

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
}

const toggleButtonState = (buttonElement, isActive, settings)  => {
  if (isActive) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

const showInputError = (errorElement, inputElement, settings) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(settings.errorClass);
}

const hideInputError = (errorElement, inputElement, settings) => {
  errorElement.textContent = '';
  inputElement.classList.remove(settings.errorClass);
}

const checkInputValidity = (formElement, inputElement, settings) => {
  const isInputInvalid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
  if (isInputInvalid) {
    showInputError(errorElement, inputElement, settings);
  } else {
    hideInputError(errorElement, inputElement, settings);
  }
}

const enableValidation = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);
  Array.from(forms).forEach(formElement => {
    setEventListeners(formElement, settings);
  })
}

const validationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorClass: 'popup__info-error'
}

enableValidation(validationSettings);