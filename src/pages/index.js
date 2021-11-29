import "regenerator-runtime/runtime";
import './index.css';
import Card from "../scripts/components/Card.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {validationSettings} from "../scripts/utils/validationSettings.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from '../scripts/components/Api.js';
import {
  popupAdd,
  popupImage, 
  cardList,
  openAddButton,
  openEditButton,
  popupEdit,
  profileName,
  profileText,
  popupDelete,
  popupUpdate,
  openUpdateButton,
  profileAvatar
} from "../scripts/utils/constants.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";

let userId = null;

const validationFormEdit = new FormValidator(validationSettings, '#edit-container');
validationFormEdit.enableValidation();
const validationFormAdd = new FormValidator(validationSettings, '#add-container');
validationFormAdd.enableValidation();
const validationFormUpdate = new FormValidator(validationSettings, '#update-container');
validationFormUpdate.enableValidation();

const popupWithImage = new PopupWithImage(popupImage);

const addPopup = new PopupWithForm(popupAdd, handleCardFormSubmit);

const editPopup = new PopupWithForm(popupEdit, changeUserInfo);

const deletePopup = new PopupWithConfirmation(popupDelete, confirmDelete);

const updateAvatarPopup = new PopupWithForm(popupUpdate, changeAvatar);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1',
    'Content-Type': 'application/json'
  }
})

/* отрисовка данных пользователя */

const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  aboutSelector: '.profile__text',
  avatarSelector: '.profile__avatar'
});

function renderProfileInfo (data) {
  userId = data._id
  userInfo.setUserInfo({
    name: data.name,
    description: data.about
  });
  userInfo.setUserAvatar({
    avatar: data.avatar
  })
}

api.getUserInfo()
    .then((data) => {
      renderProfileInfo(data)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

/* отрисовка карточек */

const renderedCard = new Section({
  renderer: (data) => renderCard(data)
}, 
cardList
);

function renderCard(element) {
  renderedCard.addItem(createCard(element));
}

api.getCardsInfo()
    .then((data) => {
      data.reverse();
      renderedCard.renderItems(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

/* изменение информации профиля */

function changeUserInfo() {
  api.setNewData({
    name: profileName.value,
    about: profileText.value
  }, 'PATCH', `users/me`)
  .then((data) => {
    renderProfileInfo(data);
    editPopup.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    editPopup.renderLoading(false);
  })
}

/* Создание новой карточки */

function createCard(data) {
  const card = new Card({
    data: {...data, 
      actualUserId: userId,
      likes: data.likes
    }
  }, 
    '.element-container_template', 
    handleCardClick, 
    handleLikeClick,
    confirmDelete);
  return card.generateCard();
}

function handleCardFormSubmit(element) {
  api.setNewData({
    name: element.name,
    link: element.link
  }, 'POST', `cards`)
  .then((data) => {
    renderCard(data);
    addPopup.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    addPopup.renderLoading(false);
  })
}

/* Установка и удаление лайка */

function handleLikeClick(card) {
  if(card.isCardLiked()) {
    api.clickLike(card.id, 'DELETE', `cards/likes/`)
        .then((data) => {
          card.likeCard(data.likes);
          card.changeNumberOfLikes(data.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
          
  } else {
    api.clickLike(card.id, 'PUT', `cards/likes/`)
        .then((data) => {
          card.likeCard(data.likes);
          card.changeNumberOfLikes(data.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
  }
}

/* Удаление карточки */

function handleCardDelete(card) {
  api.deleteCard(card.id, 'DELETE', `cards/`)
  .then(() => {
    card.removeCard();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  deletePopup.close();
}

function confirmDelete(card) {
  deletePopup.open();
  deletePopup.setSubmitClick(() => {
    handleCardDelete(card);
  })
}

/* Изменение аватара */

function changeAvatar() {
  api.setNewData({
    avatar: profileAvatar.value
  }, 'PATCH', `users/me/avatar`)
  .then((data) => {
    renderProfileInfo(data);
    updateAvatarPopup.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    updateAvatarPopup.renderLoading(false);
  })
}

/* Открытие попапов */

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

function openUpdatePopup() {
  validationFormUpdate.toggleButtonState(false);
  updateAvatarPopup.open();
}


openEditButton.addEventListener('click', () => {
  validationFormEdit.clearForm();
  openEditPopup();
})
openAddButton.addEventListener('click', () => {
  validationFormAdd.clearForm();
  openAddPopup();
});
openUpdateButton.addEventListener('click', () => {
  validationFormUpdate.clearForm();
  openUpdatePopup();
})
editPopup.setEventListeners();
addPopup.setEventListeners();
popupWithImage.setEventListeners();
deletePopup.setEventListeners();
updateAvatarPopup.setEventListeners();