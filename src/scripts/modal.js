// modal.js

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
    if (
      evt.key === 'Escape' || // закрытие по нажатию на Esc
      (evt.target.classList.contains('popup_opened')) // закрытие по клику на оверлей
    ) {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }
  
  
  
  export { openPopup, closePopup };
  