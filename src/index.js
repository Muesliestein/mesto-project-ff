import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateUserAvatar } from './scripts/api.js';
import { renderLoading, handleSubmit } from './scripts/utils.js'; // Импортируем функции renderLoading и handleSubmit
import './pages/index.css'; // Импортируем стили

// Элементы DOM
const elementsList = document.querySelector('.elements__list');
const imageOpen = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__description');
const popupImage = document.getElementById('popup-image');
const popupProfile = document.getElementById('popup-profile');
const popupCard = document.getElementById('popup-card');
const popupAvatar = document.getElementById('popup-avatar');
const formProfile = document.forms.profile_form;
const formCard = document.forms.card_form;
const formAvatar = document.forms.avatar_form;
const buttonPopupProfile = document.querySelector('.profile__edit');
const buttonPopupCard = document.querySelector('.profile__button');
const buttonPopupAvatar = document.querySelector('.profile__avatar');
const nameInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const inputName = document.getElementById('name');
const inputLink = document.getElementById('link');
const avatarLinkInput = document.getElementById('avatar_link');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const userAvatar = document.querySelector('.profile__image');

let userId; // Переменная для хранения _id пользователя

// Открытие попапа добавления карточки
buttonPopupCard.addEventListener('click', () => {
  formCard.reset(); // Сброс формы
  clearValidation(formCard, validationConfig); // Очистка ошибок валидации
  openPopup(popupCard);
});

// Открытие попапа редактирования профиля
buttonPopupProfile.addEventListener('click', () => {
  clearValidation(formProfile, validationConfig); // Очистка ошибок валидации
  openPopup(popupProfile);
  nameInput.value = userName.textContent; // Заполнение полей текущими данными пользователя
  descriptionInput.value = userJob.textContent;
});

// Открытие попапа изменения аватара
buttonPopupAvatar.addEventListener('click', () => {
  formAvatar.reset(); // Сброс формы
  clearValidation(formAvatar, validationConfig); // Очистка ошибок валидации
  openPopup(popupAvatar);
});

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  handleSubmit(() => addNewCard(inputName.value, inputLink.value).then((cardData) => {
    const newCard = createCard(cardData, handleCardClick, userId); // Создание новой карточки
    prependCard(newCard); // Добавление карточки в начало списка
    closePopup(popupCard); // Закрытие попапа
  }), evt, 'Создание...');
}

formCard.addEventListener('submit', handleCardFormSubmit); // Добавление обработчика отправки формы

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  handleSubmit(() => updateUserInfo(nameInput.value, descriptionInput.value).then((userData) => {
    userName.textContent = userData.name;
    userJob.textContent = userData.about;
    closePopup(popupProfile);
  }), evt);
}

formProfile.addEventListener('submit', handleProfileFormSubmit); // Добавление обработчика отправки формы

// Обработчик отправки формы изменения аватара
function handleAvatarFormSubmit(evt) {
  handleSubmit(() => updateUserAvatar(avatarLinkInput.value).then((userData) => {
    userAvatar.src = userData.avatar;
    closePopup(popupAvatar);
  }), evt);
}

formAvatar.addEventListener('submit', handleAvatarFormSubmit); // Добавление обработчика отправки формы

// Загрузка информации о пользователе и карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    // Установка данных пользователя
    userName.textContent = userData.name;
    userJob.textContent = userData.about;
    userAvatar.src = userData.avatar;
    userId = userData._id;

    // Рендеринг карточек
    cardsData.forEach((card) => {
      const newCard = createCard(card, handleCardClick, userId);
      appendCard(newCard);
    });
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });

// Функция рендеринга карточки
function renderCard(card) {
  const newCard = createCard(card, handleCardClick, userId); // Создание карточки
  appendCard(newCard); // Добавление карточки в конец списка
}

// Обработчик клика по карточке
function handleCardClick(card) {
  openPopup(popupImage); // Открытие попапа с изображением
  imageCaption.textContent = card.name;
  imageOpen.src = card.link;
  imageOpen.alt = card.name;
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
