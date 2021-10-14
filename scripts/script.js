const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupImage = document.querySelector('#open-image');
const popup = document.querySelector('.popup');
const closeEditButton = document.querySelector('#close-edit');
const closeAddButton = document.querySelector('#close-add');
const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');
const editContainer = document.querySelector('#edit-container');
const addContainer = document.querySelector('#add-container');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const card = document.querySelector('.elements');
const closeImage = document.querySelector('#close-image');
const bigImage = document.querySelector('#big-image');
const textImage = document.querySelector('#image-text');
const submitBtn = document.querySelector('#create');

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

function createCard(cardValue) {
  const cardsTemplate = document.querySelector('#element-container').content;
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const likeButton = card.querySelector('.element__like-button');
  
  const defaultPicture = card.querySelector('.element__image')
  defaultPicture.src = cardValue.link;
  defaultPicture.alt = `Изображение ${cardValue.name}`;

  card.querySelector('.element__container-text').textContent = cardValue.name;

  function addLike(evt) {
    evt.target.classList.toggle('active');
  };
  
  function removeCard(evt) {
    evt.target.closest('.element').remove();
  };
  
  function openImagePopup() {
    bigImage.src = cardValue.link;
    textImage.textContent = cardValue.name;
    openPopup(popupImage);
  };

  likeButton.addEventListener('click', addLike);
  deleteButton.addEventListener('click', removeCard);
  defaultPicture.addEventListener('click', openImagePopup);
  
  return card;
};

initialCards.forEach( (element) => {
  const newCard = createCard(element);
  card.append(newCard);
});

function openPopup(popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKey);
  submitBtn.classList.add('popup__submit_disabled');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKey);
}

function openEditPopup() { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(popupEdit);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closePopup(popupEdit);
};

function addNewCard(evt) {
  evt.preventDefault();
  const cardValue = {
    name: titleInput.value,
    link: linkInput.value,
  };
  card.prepend(createCard(cardValue));
  closePopup(popupAdd);
  titleInput.value = '';
  linkInput.value = '';
};

function closePopupKey(evt) {
  const openPopupClass = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openPopupClass);
  }
} 

function clickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

openEditButton.addEventListener('click', openEditPopup);
openAddButton.addEventListener('click', (settings) => {
  toggleButtonState(submitBtn, false, settings);
  openPopup(popupAdd);
});
closeEditButton.addEventListener('click', () => closePopup(popupEdit));
closeAddButton.addEventListener('click', () => closePopup(popupAdd));
closeImage.addEventListener('click', () => closePopup(popupImage));
editContainer.addEventListener('submit', handleProfileFormSubmit);
addContainer.addEventListener('submit', addNewCard);
popupEdit.addEventListener('click', clickOverlay);
popupAdd.addEventListener('click', clickOverlay);
popupImage.addEventListener('click', clickOverlay);
