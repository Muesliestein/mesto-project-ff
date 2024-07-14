// Функция для управления текстом кнопки во время загрузки
export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    if (isLoading) {
        button.textContent = loadingText;
    } else {
        button.textContent = buttonText;
    }
}

// Универсальная функция для обработки отправки форм
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
    // Предотвращение перезагрузки формы при сабмите
    evt.preventDefault();

    // Получение кнопки сабмита из события
    const submitButton = evt.submitter;
    // Сохранение начального текста кнопки
    const initialText = submitButton.textContent;
    // Изменение текста кнопки на время выполнения запроса
    renderLoading(true, submitButton, initialText, loadingText);

    // Выполнение запроса
    request()
        .then(() => {
            // Очистка формы после успешного ответа от сервера
            evt.target.reset();
        })
        .catch((err) => {
            // Обработка ошибки
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            // Восстановление начального текста кнопки
            renderLoading(false, submitButton, initialText);
        });
}
