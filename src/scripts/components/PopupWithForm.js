import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
    this._formElement = popupSelector.querySelector('.popup__container');
    this._inputList = popupSelector.querySelectorAll('.popup__info');
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
  
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this._popupSubmit(this._getInputValues());
    })
  }
}