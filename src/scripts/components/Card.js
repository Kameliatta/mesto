export default class Card {
  constructor({ data }, cardSelector, handleCardClick, handleLikeClick, confirmDelete) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._actualUserId = data.actualUserId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesCount = data.likes.length;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._confirmDelete = confirmDelete;
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
    this._displayLikes();
    this._deleteButton = Array.from(this._element.querySelectorAll('.element__delete-button'));
    this._checkCardsOwner();
    this._image = this._element.querySelector('.element__image');
    this._numberOfLikes = this._element.querySelector('.element__like-button_count');

    this._image.src = this._link;
    this._image.alt = `Изображение ${this._name}`;
    this._element.querySelector('.element__container-text').textContent = this._name;
    this._numberOfLikes.textContent = this._likesCount;

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  likeCard(likesData) {
    this._likes = likesData;
    this._displayLikes();
  }

  isCardLiked() {
    return this._likes.some(user => user._id === this._actualUserId);
  }

  changeNumberOfLikes(likes) {
    this._numberOfLikes.textContent = likes;
  }

  _displayLikes() {
    if(this.isCardLiked()) {
      this._likeButton.classList.add('active');
    } else {
      this._likeButton.classList.remove('active');
    }
  }

  _checkCardsOwner() {
    if(this._ownerId === this._actualUserId) {
      this._deleteButton.forEach(deleteButton => {
        deleteButton.classList.add('active_button');
      })
    }
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like-button');

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    })

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._confirmDelete(this);
    })
  }
}
