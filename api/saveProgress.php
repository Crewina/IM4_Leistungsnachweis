<?php
header('Content-Type: application/json');
require_once 'config.php';

// Eingehende JSON-Daten lesen
$daten = json_decode(file_get_contents("php://input"), true);

// Prüfen, ob die nötigen Felder vorhanden sind
if (!isset($daten['typ'], $daten['kategorie'], $daten['datum'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Fehlende Parameter']);
  exit;
}

$typ = $daten['typ'];
$kategorie = $daten['kategorie'];
$datum = $daten['datum'];

try {
  // Prüfen, ob der Eintrag für diesen Tag bereits existiert
  $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM Fortschritt WHERE Typ = :typ AND Kategorie = :kategorie AND Datum = :datum");
  $checkStmt->execute([
    'typ' => $typ,
    'kategorie' => $kategorie,
    'datum' => $datum
  ]);

  $exists = $checkStmt->fetchColumn();

  if ($exists) {
    // Bereits vorhanden – nichts tun oder aktualisieren falls nötig
    echo json_encode(['message' => 'Eintrag bereits vorhanden']);
  } else {
    // Eintrag neu speichern
    $stmt = $pdo->prepare("INSERT INTO Fortschritt (Typ, Kategorie, Datum, Erledigt) VALUES (:typ, :kategorie, :datum, 1)");
    $stmt->execute([
      'typ' => $typ,
      'kategorie' => $kategorie,
      'datum' => $datum
    ]);
    echo json_encode(['success' => true]);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Datenbankfehler: ' . $e->getMessage()]);
}
