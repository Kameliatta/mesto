let popUp = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('description');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

function openPopup() { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  popUp.classList.add('popup_opened');
}

function closePopup() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    closePopup();
}

edit.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);