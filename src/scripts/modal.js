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

// Обработчик закрытия попапа по нажатию Esc и клику на оверлей
function closeHandlePopup(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
