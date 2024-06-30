
const cardTemplate = document.querySelector('#card').content;
const elementsList = document.querySelector('.elements__list');
const imageOpen = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__description');
const popupImage = document.getElementById('popup-image');

// Импортируем функции для открытия и закрытия попапа
import { openPopup, closePopup } from './modal.js';

function deleteCard(evt) {
  const item = evt.target.closest('.card');
  item.remove();
}

function createCard(card) {
  const cardContent = cardTemplate.cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');
  const cardName = cardContent.querySelector('.card__name');

  cardName.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  cardContent.getElementById('card_delete').addEventListener('click', deleteCard);
  cardContent.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardContent.querySelector('.card__image').addEventListener('click', () => {
    openPopup(popupImage);
    imageCaption.textContent = card.name;
    imageOpen.src = card.link;
    imageOpen.alt = card.name;
  });

  return cardContent;
}

function prependCard(card) {
  elementsList.prepend(card)
}

function appendCard(card) {
  elementsList.append(card)
}

// Экспортируем функции
export { createCard, prependCard, appendCard, deleteCard };
