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

document.addEventListener("DOMContentLoaded", () => {
  if (!typ || !kategorieListe) {
    document.querySelector(".frage-text").textContent = "Fehler: Kein gültiger Typ übergeben.";
    return;
  }

  const fortschritt = JSON.parse(localStorage.getItem(fortschrittKey) || "[]");

  if (fortschritt.length >= kategorieListe.length) {
    const main = document.querySelector("main") || document.querySelector(".frage-container");
    main.innerHTML = zeigeAbschluss();
    return;
  }

  aktuellerIndex = fortschritt.length;
  aktuelleKategorie = kategorieListe[aktuellerIndex];
  ladeAufgabe(aktuelleKategorie);

  const button = document.getElementById("check-button");

  if (typ === "I" && button) {
    button.addEventListener("click", pruefeAntwort);
  } else if (typ === "II" && button) {
    button.addEventListener("click", () => {
      const erledigt = speichereFortschritt(aktuelleKategorie);
      if (erledigt >= kategorieListe.length) {
        const main = document.querySelector("main") || document.querySelector(".frage-container");
        main.innerHTML = zeigeAbschluss();
      } else {
        location.reload();
      }
    });
  }
});

function ladeAufgabe(kategorie) {
  console.log("Lade Aufgabe für Kategorie:", kategorie, "und Typ:", typ);

  fetch(`api/question.php?typ=${typ}&kategorie=${encodeURIComponent(kategorie)}`)
    .then(res => res.json())
    .then(data => {
      console.log("Antwort von question.php:", data);

      if (!data || !data.Aufgabe) {
        document.getElementById("frage-text").textContent = "Keine Aufgabe gefunden.";
        document.getElementById("themen-titel").textContent = "Fehler beim Laden";
        return;
      }

      document.getElementById("themen-titel").textContent = kategorie;
      document.getElementById("frage-text").textContent = data.Aufgabe;

      if (typ === "I" && data.Antwort) {
        document.getElementById("antwort").dataset.correct = data.Antwort.toLowerCase();
        document.getElementById("antwort").value = "";
      } else if (typ === "II") {
        document.getElementById("antwort")?.remove();
        document.getElementById("check-button").textContent = "Weiter";
      }

      const icon = document.getElementById("themen-icon");
      let iconName = kategorie
        .toLowerCase()
        .replaceAll("ä", "ae")
        .replaceAll("ö", "oe")
        .replaceAll("ü", "ue")
        .replaceAll("ß", "ss")
        .replaceAll(" ", "_");

      icon.src = `img/${iconName}_icon.svg`;
      icon.alt = `Icon für ${kategorie}`;
      icon.onerror = () => {
        console.warn("Konnte Icon nicht laden, verwende Fallback.");
        icon.src = "img/placeholder_icon.svg";
      };
    })
    .catch(err => {
      console.error("Fehler beim Laden der Aufgabe:", err);
      document.getElementById("frage-text").textContent = "Fehler beim Abrufen der Aufgabe.";
      document.getElementById("themen-titel").textContent = "Fehler";
    });
}

function pruefeAntwort() {
  const input = document.getElementById("antwort");
  const eingabe = input.value.trim().toLowerCase();
  const korrekt = input.dataset.correct?.toLowerCase();
  const main = document.querySelector("main") || document.querySelector(".frage-container");

  if (!korrekt || eingabe === "") return;

  const anzahlErledigt = speichereFortschritt(aktuelleKategorie);

  if (eingabe === korrekt) {
    if (anzahlErledigt >= kategorien[typ].length) {
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

  const heute = new Date().toISOString().slice(0, 10);

  // Fortschritt immer in DB speichern, auch wenn bereits lokal erledigt
  fetch("api/saveProgress.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      typ: typ,
      kategorie: kategorie,
      datum: heute
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Fehler beim Speichern in DB");
      return res.json();
    })
    .then(data => console.log("Serverantwort:", data))
    .catch(err => console.error("DB-Speicherung fehlgeschlagen:", err));

  if (!fortschritt.includes(kategorie)) {
    fortschritt.push(kategorie);
    localStorage.setItem(fortschrittKey, JSON.stringify(fortschritt));
  }

  return fortschritt.length;
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