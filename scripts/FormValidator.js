export class FormValidator {
  constructor(settings, formSelector){
    this._settings = settings;
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
  }
  _setEventListeners = () => {
    this._inputList.forEach(inputElement => {
      this.clearForm(this._formElement, inputElement)
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement, this._settings);
        this.toggleButtonState(this._submitButton, this._inputList, this._settings);
      })
    })
  
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  }
  
  toggleButtonState = ()  => {
    const isFormValid = this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 

    if (isFormValid) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
  
  _showInputError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.errorClass);
  }
  
  _hideInputError = (errorElement, inputElement) => {
    errorElement.textContent = '';
    inputElement.classList.remove(this._settings.errorClass);
  }
  
  _checkInputValidity = (formElement, inputElement) => {
    const isInputInvalid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    if (isInputInvalid) {
      this._showInputError(errorElement, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }
  
  clearForm = () => {
    this._inputList.forEach(inputElement => {
      const errorText = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._formElement.reset();
      this._hideInputError(errorText, inputElement);
    })
  }

  enableValidation = () => {
    this._setEventListeners(this._formElement, this._settings);
  }
}