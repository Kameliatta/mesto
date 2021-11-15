import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupMainImage = popupSelector.querySelector('#big-image');
    this._popupSubtitle = popupSelector.querySelector('#image-text');
  }

  open(name, link) {
    this._popupMainImage.src = link;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}