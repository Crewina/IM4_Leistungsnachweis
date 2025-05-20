// Beispiel: Bei Enter drücken, Antwort anzeigen oder weiterleiten
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("antwort");
  
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        alert("Danke für deine Antwort: " + input.value);
        // Optional: Weiterleitung oder Auswertung
        // window.location.href = "dashboard.html";
      }
    });
  });