let popUp = document.querySelector('.popup');
let edit = document.getElementById('edit');
let closeBt = document.querySelector('.popup__close-button');

popUp.classList.toggle('popup__opened');

function open() { 
  popUp.classList.add('popup__opened');
}
function close() {
  popUp.classList.remove('popup__opened');
}
closeBt.addEventListener('click', close);

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__lastname');

function  formValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
}

edit.addEventListener('click', function() {
  formValue();
  open();
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;
    close();
}

formElement.addEventListener('submit', formSubmitHandler);