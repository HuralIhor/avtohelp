<?php 

$name = $_POST['name'];
$service = $_POST['service'];
$text = $_POST['feedback'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'autohelp.lviv.ua@gmail.com';                 // Наш логин
$mail->Password = 'igorhural';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('autohelp.lviv.ua@gmail.com', 'autohelp.lviv.ua');   // От кого письмо 
$mail->addAddress('yobirem439@givehit.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Відгук';
$mail->Body    = '
		Нове повідомлення <br> 
	Імя: ' . $name . ' <br>
	Послуга: ' . $service . '<br>
	Повідомлення: ' . $text . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>