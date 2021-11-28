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

/* отрисовка данных пользователя */

const userName = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/users/me',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1'
  }
})

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

userName.getUserInfo()
    .then((data) => {
      renderProfileInfo(data)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

/* отрисовка карточек */

const uploadCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/cards',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1'
  }
})

const renderedCard = new Section({
  renderer: (data) => renderCard(data)
}, 
cardList
);

function renderCard(element) {
  renderedCard.addItem(createCard(element));
}

uploadCards.getCardsInfo()
    .then((data) => {
      renderedCard.renderItems(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

/* изменение информации профиля */

const editProfile = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/users/me',
  method: 'PATCH',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1',
    'Content-Type': 'application/json'
  }
})

function changeUserInfo() {
  editProfile.setNewData({
    name: profileName.value,
    about: profileText.value
  })
  .then((data) => {
    renderProfileInfo(data)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    editPopup.renderLoading(false);
    editPopup.close();
  })
}

/* Создание новой карточки */

const newCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30/cards',
  method: 'POST',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1',
    'Content-Type': 'application/json'
  }
})


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
  newCard.setNewData({
    name: element.name,
    link: element.link
  })
  .then((data) => {
    renderCard(data)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    addPopup.renderLoading(false);
    addPopup.close();
  })
}

/* Установка лайка */

const likeCard = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-30/cards/likes/`,
  method: 'PUT',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1'
  }
})

/* Удаление лайка */

const removeCardLike = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-30/cards/likes/`,
  method: 'DELETE',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1'
  }
})

function handleLikeClick(card) {
  if(card.isCardLiked()) {
    removeCardLike.clickLike(card.id)
        .then((data) => {
          card.likeCard(data.likes);
          card.changeNumberOfLikes(data.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
          
  } else {
    likeCard.clickLike(card.id)
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

const removeCard = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-30/cards/`,
  method: 'DELETE',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1'
  }
})

function handleCardDelete(card) {
  removeCard.deleteCard(card.id)
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

const editProfileAvatar = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-30/users/me/avatar`,
  method: 'PATCH',
  headers: {
    authorization: 'f1819b78-ec7d-4290-94af-f13ebfcefce1',
    'Content-Type': 'application/json'
  }
})

function changeAvatar() {
  editProfileAvatar.setNewData({
    avatar: profileAvatar.value
  })
  .then((data) => {
    renderProfileInfo(data)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    updateAvatarPopup.renderLoading(false);
    updateAvatarPopup.close();
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