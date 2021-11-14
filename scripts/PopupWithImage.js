import Popup from './Popup.js';
import { bigImage, textImage } from './utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    bigImage.src = link;
    textImage.textContent = name;
    super.open();
  }
}