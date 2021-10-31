export default class Card {
  constructor(data, cardSelector, openPopup, textImage, bigImage) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._bigImage = bigImage;
    this._textImage = textImage;
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
    this._image = this._element.querySelector('.element__image');

    this._image.src = this._link;
    this._image.alt = `Изображение ${this._name}`;
    this._element.querySelector('.element__container-text').textContent = this._name;

    return this._element;
  }

  openImagePopup() {
    this._bigImage.src = this._link;
    this._textImage.textContent = this._name;
    this._openPopup();
  }

  _addLike() {
    this._element.querySelector('.element__like-button').classList.toggle('active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
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
