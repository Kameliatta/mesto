import Card from "./Card.js";
import {validationSettings, FormValidator} from "./FormValidator.js";

const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const popupImage = document.querySelector('#open-image');
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
const cardList = document.querySelector('.elements');
const closeImageBtn = document.querySelector('#close-image');

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

initialCards.forEach( (element) => {
  const card = new Card(element, '.element-container_template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

function openPopup(popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
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

const renderCard = (evt) => {
  evt.preventDefault();
  const cardValue = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const newCard = new Card(cardValue, '.element-container_template');
  const cardElement = newCard.generateCard();
  cardList.prepend(cardElement);
  closePopup(popupAdd);
  titleInput.value = '';
  linkInput.value = '';
}

function closePopupByEsc(evt) {
  const openPopupClass = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openPopupClass);
  }
} 

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}
openEditButton.addEventListener('click', () => {
  const validationFormEdit = new FormValidator(validationSettings, '#edit-container');
  validationFormEdit.enableValidation();
  openEditPopup();
});
openAddButton.addEventListener('click', () => {
  const validationFormAdd = new FormValidator(validationSettings, '#add-container');
  validationFormAdd.enableValidation();
  validationFormAdd.toggleButtonState(false);
  openPopup(popupAdd);
});
closeEditButton.addEventListener('click', () => closePopup(popupEdit));
closeAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
  clearForm(addContainer);
});
closeImageBtn.addEventListener('click', () => closePopup(popupImage));
editContainer.addEventListener('submit', handleProfileFormSubmit);
addContainer.addEventListener('submit', renderCard);
popupEdit.addEventListener('click', closeByOverlay);
popupAdd.addEventListener('click', closeByOverlay);
popupImage.addEventListener('click', closeByOverlay);

function clearForm(form) {
  const forms = document.querySelectorAll('.popup__field');
  Array.from(forms).forEach(formElement => {
    const errorText = formElement.querySelector('.popup__error-text');
    const input = formElement.querySelector('.popup__info')
    form.reset();
    errorText.textContent = '';
    input.classList.remove('popup__info-error');
  })
}