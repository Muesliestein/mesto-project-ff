import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard } from './scripts/api.js';
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
const userAvatar = document.querySelector('.profile__avatar');

let userId; // Переменная для хранения _id пользователя

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
  const name = inputName.value;
  const link = inputLink.value;

  addNewCard(name, link)
    .then((cardData) => {
      const newCard = createCard(cardData, handleCardClick); // Создание новой карточки
      prependCard(newCard); // Добавление карточки в начало списка
      closePopup(popupCard); // Закрытие попапа
      formCard.reset(); // Сброс формы
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

formCard.addEventListener('submit', submitCardForm); // Добавление обработчика отправки формы

// Обработчик отправки формы редактирования профиля
function submitFormProfile(evt) {
  evt.preventDefault(); // Предотвращение стандартного поведения формы
  const name = nameInput.value;
  const about = descriptionInput.value;

  updateUserInfo(name, about)
    .then((userData) => {
      userName.textContent = userData.name; // Обновление имени пользователя
      userJob.textContent = userData.about; // Обновление описания пользователя
      closePopup(popupProfile); // Закрытие попапа
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}

formProfile.addEventListener('submit', submitFormProfile); // Добавление обработчика отправки формы

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
      const newCard = createCard(card, handleCardClick);
      appendCard(newCard);
    });
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
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
