import Popup from './Popup.js';
import { addContainer } from '../utils/constants.js';
import { inputList } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._popupSubmit = popupSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    inputList.forEach((element) => {
      this._formValues[element.name] = element.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
  }
  
  setEventListeners() {
    super.setEventListeners();
    addContainer.addEventListener('submit', () => {
      this._popupSubmit(this._getInputValues());
    })
  }
}