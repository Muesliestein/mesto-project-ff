import { createCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation, validationConfig } from './scripts/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateUserAvatar } from './scripts/api.js';
import './pages/index.css';

// Элементы DOM
const elementsList = document.querySelector('.elements__list');
const imageOpen = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__description');
const popupImage = document.getElementById('popup-image');
const popupProfile = document.getElementById('popup-profile');
const popupCard = document.getElementById('popup-card');
const popupAvatar = document.getElementById('popup-avatar');
const formProfile = document.getElementById('form_profile');
const formCard = document.getElementById('form_card');
const formAvatar = document.getElementById('form_avatar');
const buttonPopupProfile = document.querySelector('.profile__edit');
const buttonPopupCard = document.querySelector('.profile__button');
const buttonPopupAvatar = document.querySelector('.profile__avatar');
const buttonPopupSave = document.getElementById('buttonSave');
const nameInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const inputName = document.getElementById('name');
const inputLink = document.getElementById('link');
const avatarLinkInput = document.getElementById('avatar_link');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const userAvatar = document.querySelector('.profile__image');

let userId; // Переменная для хранения _id пользователя

// Функция для изменения текста кнопки во время загрузки
function renderLoading(isLoading, formElement, loadingText = 'Сохранение...') {
  const submitButton = formElement.querySelector('.popup__save');
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = formElement.id === 'form_card' ? 'Создать' : 'Сохранить';
  }
}

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

// Открытие попапа изменения аватара
buttonPopupAvatar.addEventListener('click', () => {
  formAvatar.reset(); // Сброс формы
  clearValidation(formAvatar, validationConfig); // Очистка ошибок валидации
  openPopup(popupAvatar);
});

// Обработчик отправки формы добавления карточки
function submitCardForm(evt) {
  evt.preventDefault(); // Предотвращение стандартного поведения формы
  renderLoading(true, formCard, 'Создание...'); // Показ состояния загрузки
  const name = inputName.value;
  const link = inputLink.value;

  addNewCard(name, link)
    .then((cardData) => {
      const newCard = createCard(cardData, handleCardClick, userId); // Создание новой карточки
      prependCard(newCard); // Добавление карточки в начало списка
      closePopup(popupCard); // Закрытие попапа
      formCard.reset(); // Сброс формы
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, formCard); // Убрать состояние загрузки
    });
}

formCard.addEventListener('submit', submitCardForm); // Добавление обработчика отправки формы

// Обработчик отправки формы редактирования профиля
function submitFormProfile(evt) {
  evt.preventDefault(); // Предотвращение стандартного поведения формы
  renderLoading(true, formProfile); // Показ состояния загрузки
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
    })
    .finally(() => {
      renderLoading(false, formProfile); // Убрать состояние загрузки
    });
}

formProfile.addEventListener('submit', submitFormProfile); // Добавление обработчика отправки формы

// Обработчик отправки формы изменения аватара
function submitFormAvatar(evt) {
  evt.preventDefault(); // Предотвращение стандартного поведения формы
  renderLoading(true, formAvatar); // Показ состояния загрузки
  const avatarLink = avatarLinkInput.value;

  updateUserAvatar(avatarLink)
    .then((userData) => {
      userAvatar.src = userData.avatar; // Обновление аватара пользователя
      closePopup(popupAvatar); // Закрытие попапа
      formAvatar.reset(); // Сброс формы
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, formAvatar); // Убрать состояние загрузки
    });
}

formAvatar.addEventListener('submit', submitFormAvatar); // Добавление обработчика отправки формы

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
