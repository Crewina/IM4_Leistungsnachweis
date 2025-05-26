<?php
header('Content-Type: application/json');
require_once 'config.php';

$typ = $_GET['typ'] ?? 'I';
$kategorie = $_GET['kategorie'] ?? null;

try {
  // Basis-SQL
  $sql = "SELECT * FROM Test WHERE Typ = :typ";
  $params = ['typ' => $typ];

  // Wenn Kategorie gesetzt ist, ergänzen
  if ($kategorie) {
    $sql .= " AND Kategorie = :kategorie";
    $params['kategorie'] = $kategorie;
  }

  // Zufällige Frage ziehen
  $sql .= " ORDER BY RAND() LIMIT 1";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);
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