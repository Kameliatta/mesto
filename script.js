let popUp = document.querySelector('.popup');
let edit = document.getElementById('edit');
let closeBt = document.querySelector('.popup__close-button');
popUp.classList.remove('popup__opened');
function open() { 
  popUp.classList.add('popup__opened');
}
edit.addEventListener('click', open);
function close() {
  popUp.classList.remove('popup__opened');
}
closeBt.addEventListener('click', close);