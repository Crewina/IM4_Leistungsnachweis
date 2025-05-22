document.addEventListener("DOMContentLoaded", () => {
  // Typ aus der URL auslesen (?typ=I oder ?typ=II)
  const typ = new URLSearchParams(window.location.search).get("typ");

  // 1. Body-Klasse setzen (für CSS-Anpassung)
  if (typ === "I") {
    document.body.classList.add("typ-i");
  } else if (typ === "II") {
    document.body.classList.add("typ-ii");
  }

  // 2. Titel und Icon dynamisch anpassen
  const titel = document.getElementById("themen-titel");
  const icon = document.getElementById("themen-icon");

  if (titel && icon) {
    if (typ === "I") {
      titel.textContent = "Deine geistige Aufgabe";
      icon.src = "img/icon-gehirn.svg"; // Pfad ggf. anpassen
      icon.alt = "Icon für geistige Aufgabe";
    } else if (typ === "II") {
      titel.textContent = "Deine körperliche Aufgabe";
      icon.src = "img/icon-pfote.svg"; // Pfad ggf. anpassen
      icon.alt = "Icon für körperliche Aufgabe";
    }
  }

  // 3. Antwortfeld auf Enter überwachen
  const input = document.getElementById("antwort");
  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const antwort = input.value.trim();
        alert("Danke für deine Antwort: " + antwort);

        // Optional: Weiterleitung oder Logging je nach Typ
        if (typ === "I") {
          console.log("Antwort auf geistige Aufgabe:", antwort);
        } else if (typ === "II") {
          console.log("Antwort auf körperliche Aufgabe:", antwort);
        }

        // window.location.href = "dashboard.html"; // optional aktivieren
      }
    });
  }
});
