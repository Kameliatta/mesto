import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupMainImage = document.querySelector('#big-image');
    this._popupSubtitle = document.querySelector('#image-text');
  }

  open(name, link) {
    this._popupMainImage.src = link;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}