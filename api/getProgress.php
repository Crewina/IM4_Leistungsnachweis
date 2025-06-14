<?php
header('Content-Type: application/json');
require_once 'config.php';
session_start();

$userId = $_SESSION['user_id'];

try {
    // Prüfen, ob der Eintrag für diesen Tag bereits existiert
    $stmt = $pdo->prepare("SELECT COUNT(Erledigt) AS Erledigt, Datum FROM Fortschritt WHERE UserId = :userId GROUP BY Datum ORDER BY Datum DESC;");
    $stmt->execute([
        'userId' => $userId
    ]);
    
    $data = $stmt->fetchAll();
    echo json_encode($data);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Datenbankfehler: ' . $e->getMessage()]);
}