// modal.js

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeHandlePopup);
  document.addEventListener('click', closeHandlePopup);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeHandlePopup);
  document.removeEventListener('click', closeHandlePopup);
}

// Обработчик для закрытия попапа по нажатию на Escape или клику на оверлей
function closeHandlePopup(evt) {
  if (
    evt.key === 'Escape' || // Закрытие по нажатию на Esc
    (evt.target.classList.contains('popup_opened')) // Закрытие по клику на оверлей
  ) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
