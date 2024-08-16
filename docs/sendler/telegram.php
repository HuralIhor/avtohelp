<?php

$name = $_POST['name'];
$service = $_POST['service'];
$feedback = $_POST['feedback'];
$token = "7545295821:AAEhsnPNNcFeDBUntP-xyIbJUfCtjR9IaOU";
$chat_id = "555618468";
$arr = array(
  'Імґя: ' => $name,
  'Послуга: ' => $service,
  'Відгук' => $feedback
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: success.html');
} else {
  echo "Error";
}
?>