import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupselector, handleConfirmSubmit){
    super(popupselector);
    this._handleConfirmSubmit = handleConfirmSubmit;
    this._formElement = this._popupElement.querySelector('.popup__container');
  }

  setSubmitClick(confirm) {
    this._handleConfirmSubmit = confirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.querySelector('#yes').addEventListener('click', () => {
      this._handleConfirmSubmit();
    })
  }
}