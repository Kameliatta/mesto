import './index.css';
import Card from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {initialCards} from "../scripts/utils/initialCards.js";
import {validationSettings} from "../scripts/utils/validationSettings.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  popupAdd,
  popupImage, 
  cardList,
  openAddButton,
  openEditButton,
  popupEdit,
  profileName,
  profileText
} from "../scripts/utils/constants.js";

const validationFormEdit = new FormValidator(validationSettings, '#edit-container');
validationFormEdit.enableValidation();
const validationFormAdd = new FormValidator(validationSettings, '#add-container');
validationFormAdd.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);

const addPopup = new PopupWithForm(popupAdd, handleCardFormSubmit);

const editPopup = new PopupWithForm(popupEdit, changeUserInfo);

const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__text'
});

const renderedCard = new Section({
  items: initialCards,
  renderer: (element) => renderCard(element)
}, 
cardList
);

function renderProfileInfo () {
  userInfo.setUserInfo({
    name: "Жак-Ив Кусто",
    description: "Исследователь океана"
  });
}

function changeUserInfo() {
  userInfo.setUserInfo({
    name: profileName.value,
    description: profileText.value
  })

  editPopup.close();
}

function createCard(element) {
  const card = new Card(element, '.element-container_template', handleCardClick);
  return card.generateCard();
}

function renderCard(element) {
  renderedCard.addItem(createCard(element));
}

function handleCardFormSubmit(element) {
  renderCard(element);
  
  addPopup.close();
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function openAddPopup() {
  validationFormAdd.toggleButtonState(false);
  addPopup.open();
}

function openEditPopup() { 
  const userData = userInfo.getUserInfo();

  profileName.value = userData.name;
  profileText.value = userData.description;

  editPopup.open();
}

openEditButton.addEventListener('click', () => {
  validationFormEdit.clearForm();
  openEditPopup();
})
openAddButton.addEventListener('click', () => {
  validationFormAdd.clearForm();
  openAddPopup();
});
editPopup.setEventListeners();
addPopup.setEventListeners();
popupWithImage.setEventListeners();

renderProfileInfo();
renderedCard.renderItems();