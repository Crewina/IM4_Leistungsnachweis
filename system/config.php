<?php
// config.php
$host = 'mq9yuh.myd.infomaniak.com';
$db   = 'mq9yuh_im4cv';  // Change to your DB name
$user = 'mq9yuh_im4cv';   // Change to your DB user
$pass = '9sZ.8pof-##7GI';       // Change to your DB pass if needed

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass);
    // Optional: Set error mode
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "Database connection error: " . $e->getMessage();
    exit;
}
?>