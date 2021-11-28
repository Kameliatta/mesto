import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._formElement = this._popupElement.querySelector('.popup__container');
    this._inputList = this._popupElement.querySelectorAll('.popup__info');
    this._submitButton = this._formElement.querySelector('.popup__submit');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((element) => {
      this._formValues[element.name] = element.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this.renderLoading(true);
      this._popupSubmit(this._getInputValues());
    })
  }
}