<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем и очищаем данные
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));

    // Массив для ошибок
    $errors = [];

    // Валидация имени
    if (empty($name)) {
        $errors[] = "Имя обязательно для заполнения";
    } elseif (strlen($name) < 2 || strlen($name) > 30) {
        $errors[] = "Имя должно быть от 2 до 30 символов";
    } elseif (!preg_match('/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/u', $name)) {
        $errors[] = "Имя содержит недопустимые символы";
    }

    // Валидация телефона
    if (empty($phone)) {
        $errors[] = "Телефон обязателен для заполнения";
    } elseif (strlen($phone) < 10 || strlen($phone) > 20) {
        $errors[] = "Телефон должен быть от 10 до 20 символов";
    } elseif (!preg_match('/^[\d\s\-\+\(\)]+$/', $phone)) {
        $errors[] = "Телефон содержит недопустимые символы";
    }

    // Если есть ошибки - выводим их
    if (!empty($errors)) {
        echo "Ошибки:\n" . implode("\n", $errors);
        http_response_code(400);
        exit;
    }

    // Если ошибок нет - обрабатываем данные
    try {
        // Здесь можно:
        // 1. Отправить email
        // 2. Сохранить в базу данных
        // 3. Отправить в CRM
        // 4. Отправить в Telegram и т.д.

        // Пример отправки email
        $to = "manuilova-1986@mail.ru";
        $subject = "Новая заявка с сайта";
        $message = "Поступила новая заявка:\n\n";
        $message .= "Имя: " . $name . "\n";
        $message .= "Телефон: " . $phone . "\n";
        $message .= "Время: " . date('Y-m-d H:i:s') . "\n";

        $headers = "From: webmaster@site.com\r\n";
        $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

        // Раскомментируйте для реальной отправки email
        // if (mail($to, $subject, $message, $headers)) {
        //     echo "Спасибо, " . htmlspecialchars($name) . "! Мы свяжемся с вами в ближайшее время.";
        // } else {
        //     throw new Exception("Ошибка при отправке email");
        // }

        // Для демонстрации просто выводим успешное сообщение
        echo "Спасибо, " . htmlspecialchars($name) . "! Мы свяжемся с вами по номеру " . htmlspecialchars($phone) . " в ближайшее время.";

        // Логируем данные (для отладки)
        file_put_contents(
            'form_log.txt',
            date('Y-m-d H:i:s') . " - Имя: $name, Телефон: $phone\n",
            FILE_APPEND | LOCK_EX
        );
    } catch (Exception $e) {
        echo "Произошла ошибка при обработке вашей заявки. Пожалуйста, попробуйте еще раз.";
        http_response_code(500);
        error_log("Form error: " . $e->getMessage());
    }
} else {
    echo "Неверный метод запроса";
    http_response_code(405);
}
