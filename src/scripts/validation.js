const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  namePattern: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  urlPattern: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.valueMissing) {
      showInputError(formElement, inputElement, 'Вы пропустили это поле.', config);
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      showInputError(formElement, inputElement, inputElement.dataset.error, config);
    } else if (inputElement.validity.patternMismatch) {
      showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.', config);
    } else if (inputElement.type === 'url' && !config.urlPattern.test(inputElement.value)) {
      showInputError(formElement, inputElement, 'Введите адрес сайта.', config);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
  } else if (inputElement.type === 'text' && !config.namePattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.', config);
  } else if (inputElement.type === 'url' && !config.urlPattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, 'Введите адрес сайта.', config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || 
           (inputElement.type === 'text' && !validationConfig.namePattern.test(inputElement.value)) || 
           (inputElement.type === 'url' && !validationConfig.urlPattern.test(inputElement.value));
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
};

export { enableValidation, clearValidation, validationConfig };
