import Card from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./utils/initialCards.js";
import {validationSettings} from "./validationSettings.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
  popupAdd,
  popupImage, 
  cardList,
  openAddButton,
  titleInput,
  linkInput,
  openEditButton,
  popupEdit,
  profileName,
  profileText,
  saveButton
} from "./utils/constants.js";

const validationFormEdit = new FormValidator(validationSettings, '#edit-container');
validationFormEdit.enableValidation();
const validationFormAdd = new FormValidator(validationSettings, '#add-container');
validationFormAdd.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);

const addPopup = new PopupWithForm(popupAdd, createCard);

const editPopup = new Popup(popupEdit);

const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__text'
});

function renderProfileInfo () {
  userInfo.setUserInfo({
    name: "Жак-Ив Кусто",
    description: "Исследователь океана"
  });
  userInfo.updateUserInfo();
}

function changeUserInfo() {
  userInfo.setUserInfo({
    name: profileName.value,
    description: profileText.value
  })
  userInfo.updateUserInfo();

  editPopup.close();
}

function createCard ({name, link}) {
  renderCard({
    name: name, 
    link: link
  });
  addPopup.close();
  titleInput.value = '';
  linkInput.value = '';
}

const renderedCard = new Section({
    items: initialCards,
    renderer: (element) => renderCard(element)
  }, 
  cardList
);

function renderCard(element) {
  const newCard = new Card(element, '.element-container_template', handleCardClick);
  const cardElement = newCard.generateCard();
  renderedCard.addItem(cardElement);
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function openAddPopup() {
  validationFormAdd.toggleButtonState(false);
  addPopup.open();
}

function openEditPopup() { 
  profileName.value = userInfo.getUserInfo().name;
  profileText.value = userInfo.getUserInfo().description;

  editPopup.open();
}

openEditButton.addEventListener('click', openEditPopup)
openAddButton.addEventListener('click', openAddPopup);
saveButton.addEventListener('click', changeUserInfo);
editPopup.setEventListeners();
addPopup.setEventListeners();
popupWithImage.setEventListeners();

renderProfileInfo();
renderedCard.renderItems();