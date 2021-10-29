const bigImage = document.querySelector('#big-image');
const textImage = document.querySelector('#image-text');
const popupImage = document.querySelector('#open-image')

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = `Изображение ${this._name}`;
    this._element.querySelector('.element__container-text').textContent = this._name;
    this._element.querySelector('.element__like-button');
    this._element.querySelector('.element__delete-button');

    return this._element;
  }

  openImagePopup() {
    bigImage.src = this._link;
    textImage.textContent = this._name;
    popupImage.classList.add('popup_opened');
  }

  _addLike() {
    this._element.querySelector('.element__like-button').classList.toggle('active');
  }

  _removeCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this.openImagePopup();
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._addLike();
    })

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._removeCard();
    })
  }
}
