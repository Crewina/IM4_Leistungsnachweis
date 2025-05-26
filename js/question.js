const urlParams = new URLSearchParams(window.location.search);
const typ = urlParams.get("typ"); // "I" (geistig) oder "II" (körperlich)

const kategorien = {
  I: ["Langzeitgedächtnis", "Kurzzeitgedächtnis", "Sprachzentrum", "Logik", "Rätsel"],
  II: ["Bewegung im Alltag", "Mobilisation", "Schritteziel"]
};

const fortschrittKey = typ === "I" ? "geistigeFortschritt" : "koerperFortschritt";
const kategorieListe = kategorien[typ];
let aktuellerIndex = 0;
let aktuelleKategorie = "";

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  if (!typ || !kategorieListe) {
    document.querySelector(".frage-text").textContent = "Fehler: Kein gültiger Typ übergeben.";
    return;
  }

  const fortschritt = JSON.parse(localStorage.getItem(fortschrittKey) || "[]");
  aktuellerIndex = fortschritt.length;

  if (aktuellerIndex >= kategorieListe.length) {
    zeigeAbschluss();
    return;
  }

  aktuelleKategorie = kategorieListe[aktuellerIndex];
  ladeAufgabe(aktuelleKategorie);

  const button = document.getElementById("check-button");
  if (typ === "I" && button) {
    button.addEventListener("click", pruefeAntwort);
  } else if (typ === "II" && button) {
    button.addEventListener("click", () => {
      speichereFortschritt(aktuelleKategorie);
      location.reload();
    });
  }
});

function ladeAufgabe(kategorie) {
  fetch(`api/question.php?typ=${typ}&kategorie=${encodeURIComponent(kategorie)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.Aufgabe) {
        document.querySelector(".frage-text").textContent = "Keine Aufgabe gefunden.";
        console.warn("Antwort von API:", data);
        return;
      }

      document.getElementById("themen-titel").textContent = kategorie;
      document.getElementById("frage-text").textContent = data.Aufgabe;

      if (typ === "I" && data.Antwort) {
        document.getElementById("antwort").dataset.correct = data.Antwort.toLowerCase();
      } else if (typ === "II") {
        // Keine Eingabe nötig
        document.getElementById("antwort")?.remove();
        document.getElementById("check-button").textContent = "Weiter";
      }
    })
    .catch(() => {
      document.querySelector(".frage-text").textContent = "Fehler beim Laden.";
    });
}

function pruefeAntwort() {
  const input = document.getElementById("antwort");
  const eingabe = input.value.trim().toLowerCase();
  const korrekt = input.dataset.correct?.toLowerCase();
  const main = document.querySelector("main") || document.querySelector(".frage-container");

  if (!korrekt || eingabe === "") return;

  if (eingabe === korrekt) {
    speichereFortschritt(aktuelleKategorie);
    if (aktuellerIndex + 1 >= kategorien[typ].length) {
      main.innerHTML = zeigeAbschluss();
    } else {
      main.innerHTML = zeigeErfolg();
    }
  } else {
    main.innerHTML = zeigeMisserfolg(korrekt);
  }
}

function speichereFortschritt(kategorie) {
  const fortschritt = JSON.parse(localStorage.getItem(fortschrittKey) || "[]");
  if (!fortschritt.includes(kategorie)) {
    fortschritt.push(kategorie);
    localStorage.setItem(fortschrittKey, JSON.stringify(fortschritt));
  }
}

function zeigeErfolg() {
  return `
    <div class="frage-header">
      <img src="kopfstand-logo.svg" class="logo-small" />
      <button class="close-button" onclick="window.location.href='protected.html'">✕</button>
    </div>
    <div class="frage-topic">
      <img src="img/icon-haken.svg" class="feedback-icon" />
      <h2 class="feedback-titel">Gut gemacht!</h2>
    </div>
    <div class="frage-card">
      <p class="lob-text">Du hast die Aufgabe sicher gemeistert.</p>
      <button class="naechste-btn" onclick="location.reload()">Nächste Aufgabe</button>
    </div>
  `;
}

function zeigeMisserfolg(korrekt) {
  return `
    <div class="frage-header">
      <img src="kopfstand-logo.svg" class="logo-small" />
      <button class="close-button" onclick="window.location.href='protected.html'">✕</button>
    </div>
    <div class="frage-topic">
      <img src="img/icon-kreuz.svg" class="feedback-icon" />
      <h2 class="feedback-titel">Noch nicht ganz.</h2>
    </div>
    <div class="frage-card">
      <p class="moegliche-antworten"><strong>Richtige Antwort:</strong><br>${korrekt}</p>
      <p class="ermutigung">Du hast es versucht – das zählt!<br>Morgen klappt’s besser.</p>
      <button class="naechste-btn" onclick="location.reload()">Nächste Aufgabe</button>
    </div>
  `;
}

function zeigeAbschluss() {
  return `
    <div class="frage-header">
      <img src="kopfstand-logo.svg" class="logo-small" />
      <button class="close-button" onclick="window.location.href='protected.html'">✕</button>
    </div>
    <div class="frage-topic">
      <img src="img/icon-flamme.svg" class="feedback-icon" />
      <h2 class="feedback-titel">Glückwunsch!</h2>
    </div>
    <div class="frage-card">
      <p class="lob-text">
        Du hast deine Aufgaben gelöst!<br>
        Deine Erfolgsserie beginnt – Tag 1!
      </p>
      <button class="naechste-btn" onclick="window.location.href='protected.html'">Training beenden</button>
    </div>
  `;
}