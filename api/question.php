<?php
header('Content-Type: application/json');
require_once 'config.php';

$typ = $_GET['typ'] ?? 'I';

try {
  $stmt = $pdo->prepare("SELECT * FROM Aufgabenkatalog WHERE Typ = :typ ORDER BY RAND() LIMIT 1");
  $stmt->execute(['typ' => $typ]);
  $frage = $stmt->fetch();

  if ($frage) {
    echo json_encode($frage);
  } else {
    echo json_encode(['error' => 'Keine passende Frage gefunden']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'SQL-Fehler: ' . $e->getMessage()]);
}
?>
