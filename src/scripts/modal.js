function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeHandlePopup);
  document.addEventListener('click', closeHandlePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeHandlePopup);
  document.removeEventListener('click', closeHandlePopup);
}

function closeHandlePopup(evt) {
  if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup };
