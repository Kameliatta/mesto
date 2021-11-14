export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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

    this._image.src = this.link;
    this._image.alt = `Изображение ${this.name}`;
    this._element.querySelector('.element__container-text').textContent = this.name;

    return this._element;
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
      this.handleCardClick(this.name, this.link);
    });

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._addLike();
    })

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._removeCard();
    })
  }
}
