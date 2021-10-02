const popUpEdit = document.querySelector('#edit');
const popUpAdd = document.querySelector('#add');
const closeEditButton = document.querySelector('#close-edit');
const closeAddButton = document.querySelector('#close-add');
const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');
const save = document.querySelector('#edit-container');
const create = document.querySelector('#add-container');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const cardContainer = document.querySelector('.elements');
const popUpImage = document.querySelector('#open-image');
const closeImage = document.querySelector('#close-image');
const bigImage = document.querySelector('#big-image');
const textImage = document.querySelector('#image-text');

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

function addCard(cardValue) {
  const cardsTemplate = document.querySelector('#element-container').content;
  const cardContainer = cardsTemplate.querySelector('.element').cloneNode(true);
  
  const defaultPicture = cardContainer.querySelector('.element__image').src = cardValue.link;
  const defaultCardName = cardContainer.querySelector('.element__container-text').textContent = cardValue.name;
  
  const likeButton = cardContainer.querySelectorAll('.element__like-button').forEach(likeButton => 
    likeButton.addEventListener('click', addLike));
  function addLike(evt) {
    const selectedLikeButton = evt.target.classList.toggle('active');
  };

  const deleteButton = cardContainer.querySelectorAll('.element__delete-button').forEach(deleteButton =>
    deleteButton.addEventListener('click', removeCard));
  function removeCard(evt) {
    const deleteCard = evt.target.closest('.element').remove();
  };

  const openImage = cardContainer.querySelectorAll('.element__image').forEach(openImage => 
    openImage.addEventListener('click', openImagePopup));
  function openImagePopup() {
    bigImage.src = cardValue.link;
    textImage.textContent = cardValue.name;
    popUpImage.classList.add('popup_opened');
  };
  
  return cardContainer;
};

initialCards.forEach( (card) => {
  const newCard = addCard(card);
  cardContainer.prepend(newCard);
});

function openEditPopup() { 
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  
  popUpEdit.classList.add('popup_opened');
}

function openAddPopup() { 
  popUpAdd.classList.add('popup_opened');
}

function closeEditPopup() {
  popUpEdit.classList.remove('popup_opened');
}

function closeAddPopup() {
  popUpAdd.classList.remove('popup_opened');
}

function closeImagePopup() {
  popUpImage.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileText.textContent = jobInput.value;

    closeEditPopup();
};

function addPopUpForm(evt) {
  evt.preventDefault();
  const cardValue = {
    name: titleInput.value,
    link: linkInput.value,
  };
  cardContainer.prepend(addCard(cardValue));
  closeAddPopup();
};

openEditButton.addEventListener('click', openEditPopup);
openAddButton.addEventListener('click', openAddPopup);
closeEditButton.addEventListener('click', closeEditPopup);
closeAddButton.addEventListener('click', closeAddPopup);
closeImage.addEventListener('click', closeImagePopup);
save.addEventListener('submit', formSubmitHandler);
create.addEventListener('submit', addPopUpForm);