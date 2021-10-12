const popUpEdit = document.querySelector('#edit');
const popUpAdd = document.querySelector('#add');
const popUpImage = document.querySelector('#open-image');
const popup = document.querySelector('.popup');
const closeEditButton = document.querySelector('#close-edit');
const closeAddButton = document.querySelector('#close-add');
const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');
const save = document.querySelector('#edit-container');
const create = document.querySelector('#add-container');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const cardContainer = document.querySelector('.elements');
const closeImage = document.querySelector('#close-image');
const bigImage = document.querySelector('#big-image');
const textImage = document.querySelector('#image-text');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard(cardValue) {
  const cardsTemplate = document.querySelector('#element-container').content;
  const cardContainer = cardsTemplate.querySelector('.element').cloneNode(true);
  
  
  const defaultPicture = cardContainer.querySelector('.element__image')
  defaultPicture.src = cardValue.link;
  defaultPicture.alt = cardValue.name;

  cardContainer.querySelector('.element__container-text').textContent = cardValue.name;

  const deleteButton = cardContainer.querySelector('.element__delete-button');
  const likeButton = cardContainer.querySelector('.element__like-button');

  function addLike(evt) {
    evt.target.classList.toggle('active');
  };
  
  function removeCard(evt) {
    evt.target.closest('.element').remove();
  };
  
  function openImagePopup() {
    bigImage.src = cardValue.link;
    textImage.textContent = cardValue.name;
    openPopup(popUpImage);
  };

  likeButton.addEventListener('click', addLike);
  deleteButton.addEventListener('click', removeCard);
  defaultPicture.addEventListener('click', openImagePopup);
  
  return cardContainer;
};

initialCards.forEach( (card) => {
  const newCard = addCard(card);
  cardContainer.prepend(newCard);
});

function openPopup(popup) { 
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditPopup() { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(popUpEdit);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopup(popUpEdit);
};

function addPopUpForm(evt) {
  evt.preventDefault();
  const cardValue = {
    name: titleInput.value,
    link: linkInput.value,
  };
  cardContainer.prepend(addCard(cardValue));
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popUpAdd);
};

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(popUpAdd);
    closePopup(popUpEdit);
    closePopup(popUpImage);
  }
} 

function clickOverlay(evt) {
  const overlay = document.querySelector('.popup_opened')
  if (evt.target === overlay) {
    closePopup(popUpAdd);
    closePopup(popUpEdit);
    closePopup(popUpImage);
  }
}

openEditButton.addEventListener('click', () => openEditPopup(popUpEdit));
openAddButton.addEventListener('click', () => openPopup(popUpAdd));
closeEditButton.addEventListener('click', () => closePopup(popUpEdit));
closeAddButton.addEventListener('click', () => closePopup(popUpAdd));
closeImage.addEventListener('click', () => closePopup(popUpImage));
save.addEventListener('submit', formSubmitHandler);
create.addEventListener('submit', addPopUpForm);
document.addEventListener('keydown', keyHandler, true);
document.removeEventListener('keydown', keyHandler);
document.addEventListener('click', clickOverlay)
