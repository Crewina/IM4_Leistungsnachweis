document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const typ = urlParams.get("typ") || "I";

  fetch(`api/question.php?typ=${typ}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.Aufgabe) {
        document.querySelector(".frage-text").textContent = data.Aufgabe;
        document.querySelector(".antwort-input").dataset.correct = data.Antwort.toLowerCase();
        document.getElementById("themen-titel").textContent = data.Kategorie;
      } else {
        document.querySelector(".frage-text").textContent = "Keine Frage gefunden.";
      }
    })
    .catch(() => {
      document.querySelector(".frage-text").textContent = "Fehler beim Laden.";
    });

  // Antwort prüfen
  const input = document.getElementById("antwort");
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const eingabe = input.value.trim().toLowerCase();
      const korrekt = input.dataset.correct;
      if (eingabe === korrekt) {
        alert("Richtig!");
      } else {
        alert("Leider falsch!");
      }
    }
  });
});

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
