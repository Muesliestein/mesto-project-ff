import { deleteCardFromServer, addLike, removeLike } from './api.js';

// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;

// Функция удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest('.card');
  const cardId = cardElement.dataset.id;

  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

// Функция переключения лайка
function toggleLike(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest('.card');
  const likeCountElement = cardElement.querySelector('.card__like_count');
  const cardId = cardElement.dataset.id;
  const isLiked = likeButton.classList.contains('card__like_active');

  if (isLiked) {
    removeLike(cardId)
      .then(card => {
        likeButton.classList.remove('card__like_active');
        likeCountElement.textContent = card.likes.length;
      })
      .catch(err => {
        console.error(`Ошибка при снятии лайка: ${err}`);
      });
  } else {
    addLike(cardId)
      .then(card => {
        likeButton.classList.add('card__like_active');
        likeCountElement.textContent = card.likes.length;
      })
      .catch(err => {
        console.error(`Ошибка при добавлении лайка: ${err}`);
      });
  }
}

// Функция создания карточки
function createCard(card, handleCardClick, userId) {
  const cardContent = cardTemplate.cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');
  const cardName = cardContent.querySelector('.card__name');
  const likeCountElement = cardContent.querySelector('.card__like_count');
  const deleteButton = cardContent.getElementById('card_delete');

  cardContent.querySelector('.card').dataset.id = card._id;

  cardName.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  likeCountElement.textContent = card.likes.length; // Отображение количества лайков

  if (card.owner._id === userId) {
    deleteButton.addEventListener('click', deleteCard);
  } else {
    deleteButton.remove();
  }

  cardContent.querySelector('.card__like').addEventListener('click', toggleLike);
  cardContent.querySelector('.card__image').addEventListener('click', () => handleCardClick(card));

  return cardContent;
}

export { createCard };
