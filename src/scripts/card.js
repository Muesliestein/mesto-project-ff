const cardTemplate = document.querySelector('#card').content;

function deleteCard(evt) {
  const item = evt.target.closest('.card');
  item.remove();
}

function toggleLike(evt) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest('.card');
  const likeCountElement = cardElement.querySelector('.card__like_count');
  
  likeButton.classList.toggle('card__like_active');
  
  let likeCount = parseInt(likeCountElement.textContent);
  
  if (likeButton.classList.contains('card__like_active')) {
    likeCount += 1;
  } else {
    likeCount -= 1;
  }
  
  likeCountElement.textContent = likeCount;
}

function createCard(card, handleCardClick) {
  const cardContent = cardTemplate.cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');
  const cardName = cardContent.querySelector('.card__name');
  const likeCountElement = cardContent.querySelector('.card__like_count');

  cardName.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  likeCountElement.textContent = card.likes.length; // Отображение количества лайков

  cardContent.getElementById('card_delete').addEventListener('click', deleteCard);
  cardContent.querySelector('.card__like').addEventListener('click', toggleLike);
  cardContent.querySelector('.card__image').addEventListener('click', () => handleCardClick(card));

  return cardContent;
}

export { createCard };
