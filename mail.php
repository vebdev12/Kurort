<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php'; // Укажите правильный путь
require 'path/to/PHPMailer/src/PHPMailer.php'; // Укажите правильный путь
require 'path/to/PHPMailer/src/SMTP.php';    // Укажите правильный путь

// Проверяем, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Получаем данные из формы
  $name = $_POST["name"];
  $phone = $_POST["phone"];

  // Настройки для отправки письма
  $to = "wd_website@mail.ru"; // Замените на ваш email
  $subject = "Новая заявка с сайта";
  $message = "Имя: " . $name . "\n";
  $message .= "Телефон: " . $phone;

  // Настройки PHPMailer
  $mail = new PHPMailer(true); // true включает обработку исключений

  try {
    // Настройки сервера
    $mail->SMTPDebug = 0; // 0 = выключить отладку, 1 = клиентские сообщения, 2 = клиентские и серверные сообщения
    $mail->isSMTP();                                      // Указываем, что будем отправлять через SMTP
    $mail->Host = 'smtp.mail.ru';  // Замените на ваш SMTP сервер (например, smtp.gmail.com)
    $mail->SMTPAuth = true;                               // Включаем аутентификацию SMTP
    $mail->Username = 'wd_website@mail.ru';   // Замените на ваш логин от почты
    $mail->Password = '0410besedaOL72!';             // Замените на ваш пароль от почты
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    // Отправитель и получатель
    $mail->setFrom('wd_website@mail.ru', 'Kurort'); // Замените на свой email и имя
    $mail->addAddress($to);     // Add a recipient

    // Контент письма
    $mail->isHTML(false);                                  // Указываем, что письмо отправляется в текстовом формате
    $mail->Subject = $subject;
    $mail->Body    = $message;

    $mail->send();
    echo 'Сообщение успешно отправлено!';
  } catch (Exception $e) {
    echo "Сообщение не было отправлено. Ошибка: {$mail->ErrorInfo}";
  }
} else {
  // Если форма не была отправлена, показываем сообщение об ошибке
  echo "Ошибка: форма не была отправлена.";
}
?>