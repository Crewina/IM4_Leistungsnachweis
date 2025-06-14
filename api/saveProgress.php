<?php
header('Content-Type: application/json');
require_once 'config.php';
session_start();

// Eingehende JSON-Daten lesen
$daten = json_decode(file_get_contents("php://input"), true);

// Prüfen, ob die nötigen Felder vorhanden sind
if (!isset($daten['typ'], $daten['datum'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Fehlende Parameter']);
  exit;
}

$typ = $daten['typ'];
$datum = $daten['datum'];
$userId = $_SESSION['user_id'];

try {
  // Prüfen, ob der Eintrag für diesen Tag bereits existiert
  $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM Fortschritt WHERE UserId = :userId AND Typ = :typ AND Datum = :datum");
  $checkStmt->execute([
    'typ' => $typ,
    'userId' => $userId,
    'datum' => $datum
  ]);

  $exists = $checkStmt->fetchColumn();

  if ($exists) {
    // Bereits vorhanden – nichts tun oder aktualisieren falls nötig
    echo json_encode(['message' => 'Eintrag bereits vorhanden']);
  } else {
    // Eintrag neu speichern
    $stmt = $pdo->prepare("INSERT INTO Fortschritt (Typ, Datum, UserId, Erledigt) VALUES (:typ, :datum, :userId, 1)");
    $stmt->execute([
      'typ' => $typ,
      'datum' => $datum,
      'userId' => $userId
    ]);
    echo json_encode(['success' => true]);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Datenbankfehler: ' . $e->getMessage()]);
}
