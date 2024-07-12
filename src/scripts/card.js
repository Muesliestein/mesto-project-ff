const cardTemplate = document.querySelector('#card').content;

function deleteCard(evt) {
  const item = evt.target.closest('.card');
  item.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function createCard(card, handleCardClick) {
  const cardContent = cardTemplate.cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');
  const cardName = cardContent.querySelector('.card__name');

  cardName.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  cardContent.getElementById('card_delete').addEventListener('click', deleteCard);
  cardContent.querySelector('.card__like').addEventListener('click', toggleLike);
  cardContent.querySelector('.card__image').addEventListener('click', () => handleCardClick(card));

  return cardContent;
}

export { createCard };
