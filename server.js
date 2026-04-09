// const TOKEN = `8612631410:AAFRV1PXbgLbSHd--QLGluUkNSN3Wwiko88`;
// const CHAT_ID = '493566464';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('callback');
  // !!! ВАЖНО: ВСТАВЬТЕ СЮДА URL ВАШЕГО WORKER'А !!!
  const workerUrl = 'https://form-handler.devalmanu.workers.dev';

  if (form) {
    form.addEventListener('submit', async function (event) {
      // 1. Отменяем стандартную отправку формы
      event.preventDefault();

      // 2. Показываем пользователю, что идет отправка (опционально)
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Отправляем...';
      submitButton.disabled = true;

      // 3. Собираем данные из формы в объект FormData
      const formData = new FormData(form);

      try {
        // 4. Отправляем данные на наш Cloudflare Worker
        const response = await fetch(workerUrl, {
          method: 'POST',
          body: formData, // Worker обработает их как form-data
        });

        const result = await response.json();

        if (response.ok && result.ok) {
          // 5. УСПЕХ: Показываем ваше скрытое сообщение "Спасибо"
          const successDiv = form.querySelector('.success');
          if (successDiv) {
            successDiv.style.display = 'block';
            // Скрыть сообщение через 5 секунд
            setTimeout(() => { successDiv.style.display = 'none'; }, 5000);
          }
          // Очищаем форму
          form.reset();
        } else {
          // 6. ОШИБКА: Сообщаем пользователю
          alert(`Ошибка: ${result.error || 'Не удалось отправить заявку. Попробуйте позже.'}`);
        }
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        alert('Произошла сетевая ошибка. Проверьте соединение и попробуйте снова.');
      } finally {
        // Возвращаем кнопку в исходное состояние
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
});