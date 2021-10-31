import Card from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./initialCards.js";
import {validationSettings} from "./validationSettings.js"

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
const bigImage = document.querySelector('#big-image');
const textImage = document.querySelector('#image-text');

const validationFormEdit = new FormValidator(validationSettings, '#edit-container');
const validationFormAdd = new FormValidator(validationSettings, '#add-container');

initialCards.forEach( (element) => {
  createCard(element);
});

function createCard(element) {
  const newCard = new Card(element, '.element-container_template', () => openPopup(popupImage), textImage, bigImage);
  const cardElement = newCard.generateCard();
  cardList.prepend(cardElement);
}

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
  };;
  createCard(cardValue);
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
  validationFormEdit.enableValidation();
  openEditPopup();
});
openAddButton.addEventListener('click', () => {
  validationFormAdd.enableValidation();
  validationFormAdd.toggleButtonState(false);
  openPopup(popupAdd);
});
closeEditButton.addEventListener('click', () => closePopup(popupEdit));
closeAddButton.addEventListener('click', () => {
  closePopup(popupAdd)
  validationFormAdd.clearForm();
});
closeImageBtn.addEventListener('click', () => closePopup(popupImage));
editContainer.addEventListener('submit', handleProfileFormSubmit);
addContainer.addEventListener('submit', renderCard);
popupEdit.addEventListener('click', closeByOverlay);
popupAdd.addEventListener('click', closeByOverlay);
popupImage.addEventListener('click', closeByOverlay);