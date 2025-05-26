<?php
$host = 'mq9yuh.myd.infomaniak.com';
$db   = 'mq9yuh_im4cv';
$user = 'mq9yuh_im4cv';
$pass = '9sZ.8pof-##7GI';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Datenbankverbindung fehlgeschlagen']);
  exit;
}
?>
