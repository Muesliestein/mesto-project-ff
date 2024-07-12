import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';
import './pages/index.css';

// Элементы DOM
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

// Открытие попапа добавления карточки
buttonPopupCard.addEventListener('click', () => {
  formCard.reset(); // Сброс формы
  clearValidation(formCard, validationConfig); // Очистка ошибок валидации
  buttonPopupSave.setAttribute('disabled', true);
  buttonPopupSave.classList.add('popup__save_disabled');
  openPopup(popupCard);
});

// Открытие попапа редактирования профиля
buttonPopupProfile.addEventListener('click', () => {
  clearValidation(formProfile, validationConfig); // Очистка ошибок валидации
  openPopup(popupProfile);
  nameInput.value = userName.textContent; // Заполнение полей текущими данными пользователя
  descriptionInput.value = userJob.textContent;
});

// Обработчик отправки формы добавления карточки
function submitCardForm(evt) {
  evt.preventDefault(); // Предотвращение стандартного поведения формы
  const formElement = evt.target;
  const cardObject = {
    name: inputName.value,
    link: inputLink.value,
  };
  const newCard = createCard(cardObject, handleCardClick); // Создание новой карточки
  prependCard(newCard); // Добавление карточки в начало списка
  closePopup(popupCard); // Закрытие попапа
  formElement.reset(); // Сброс формы
}

formCard.addEventListener('submit', submitCardForm); // Добавление обработчика отправки формы

// Обработчик отправки формы редактирования профиля
function submitFormProfile(evt) {
  evt.preventDefault(); // Предотвращение стандартного поведения формы
  userName.textContent = nameInput.value; // Обновление имени пользователя
  userJob.textContent = descriptionInput.value; // Обновление описания пользователя
  closePopup(popupProfile); // Закрытие попапа
}

formProfile.addEventListener('submit', submitFormProfile); // Добавление обработчика отправки формы

// Массив начальных карточек
const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' },
];

// Рендер начальных карточек
initialCards.forEach((item) => {
  renderCard(item);
});

// Функция рендеринга карточки
function renderCard(card) {
  const newCard = createCard(card, handleCardClick); // Создание карточки
  appendCard(newCard); // Добавление карточки в конец списка
}

// Обработчик клика по карточке
function handleCardClick(card) {
  openPopup(popupImage); // Открытие попапа с изображением
  imageCaption.textContent = card.name; // Установка описания изображения
  imageOpen.src = card.link; // Установка ссылки на изображение
  imageOpen.alt = card.name; // Установка атрибута alt изображения
}

// Добавление карточки в начало списка
function prependCard(card) {
  elementsList.prepend(card);
}

// Добавление карточки в конец списка
function appendCard(card) {
  elementsList.append(card);
}

// Закрытие попапов при клике на крестик
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

// Включение валидации
enableValidation(validationConfig);
