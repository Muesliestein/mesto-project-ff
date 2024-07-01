// main.js

import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation } from './scripts/validation.js';
import './pages/index.css';

const elementsList = document.querySelector('.elements__list');
const imageOpen = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__description');
const popupImage = document.getElementById('popup-image');

const popupProfile = document.getElementById('popup-profile');
const popupCard = document.getElementById('popup-card');
const formProfile = document.getElementById('form_profile');
const formCard = document.getElementById('form_card');
const buttonPopupProfile = document.querySelector('.profile__edit');
const buttonPopupCard = document.querySelector('.profile__button');
const buttonPopupSave = document.getElementById('buttonSave');
const nameInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const inputName = document.getElementById('name');
const inputLink = document.getElementById('link');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');

buttonPopupCard.addEventListener('click', () => {
  formCard.reset();
  buttonPopupSave.setAttribute('disabled', true);
  buttonPopupSave.classList.add('popup__save_disabled');
  openPopup(popupCard);
});

buttonPopupProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = userName.textContent;
  descriptionInput.value = userJob.textContent;
});

function submitCardForm(evt) {
  evt.preventDefault();
  const formElement = evt.target;
  const cardObject = {
    name: inputName.value,
    link: inputLink.value,
  };
  const newCard = createCard(cardObject, handleCardClick);
  prependCard(newCard);
  closePopup(popupCard);
  formElement.reset();
}

formCard.addEventListener('submit', submitCardForm);

function submitFormProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', submitFormProfile);

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
  },
];

initialCards.forEach((item) => {
  renderCard(item);
});

function renderCard(card) {
  const newCard = createCard(card, handleCardClick);
  appendCard(newCard);
};

function handleCardClick(card) {
  openPopup(popupImage);
  imageCaption.textContent = card.name;
  imageOpen.src = card.link;
  imageOpen.alt = card.name;
};

function prependCard(card) {
  elementsList.prepend(card);
};

function appendCard(card) {
  elementsList.append(card);
};

document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});
