
const showInputError = (errorElement, inputElement, errorMessage, validationConfig) => {
    // Находим элемент ошибки внутри самой функции
    console.log(errorElement);
    // Остальной код такой же
    if (errorElement && errorMessage) {
        inputElement.classList.add(validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(validationConfig.errorClass);
    };
};

const hideInputError = (errorElement, inputElement, validationConfig) => {
    // Находим элемент ошибки

    if (errorElement) {
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';
    };



};
const inputHasErrorClass = (inputElement, errorElement, validationConfig) => {
    console.log(inputElement.classList.contains(validationConfig.inputErrorClass));
    console.log(errorElement.classList.contains(validationConfig.errorClass));
    console.log(validationConfig);
    return inputElement.classList.contains(validationConfig.inputErrorClass) && errorElement.classList.contains(validationConfig.errorClass);
}


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, submitButton, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage, validationConfig);
        submitButton.classList.add(validationConfig.inactiveButtonClass);
        submitButton.setAttribute('disabled', true); // Добавление атрибута disabled
        console.log('ERROR');
        return false;
    } else if (inputHasErrorClass(inputElement, errorElement, validationConfig)) {
        hideInputError(errorElement, inputElement, validationConfig);
        submitButton.removeAttribute('disabled', true); // Удаление атрибута disabled
        console.log('VALID');
        return true;
    } else {
        console.log('CLEAR');
        submitButton.setAttribute('disabled', true); // Добавление атрибута disabled
        return true;
    }
};

const validateAllFields = (inputList) => {
    let formIsValid = true;

    inputList.forEach(input => {
        if (input.value === '' && input.hasAttribute('required')) {
            formIsValid = false;
        };
    });
    return formIsValid;
};


// Вызовем функцию isValid на каждый ввод символа
const setEventListeners = (formElement, validationConfig) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            if (
                isValid(formElement, inputElement, submitButton, validationConfig) && validateAllFields(inputList)) {
                submitButton.classList.remove(validationConfig.inactiveButtonClass);
                submitButton.removeAttribute('disabled'); // удаление атрибута disabled
            }
        });
    });
}

const enableValidation = (validationConfig) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        console.log('button', formElement)
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement, validationConfig);
    });
};

// Вызовем функцию
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
});

export { showInputError, hideInputError, isValid, validateAllFields, setEventListeners, enableValidation };
