var typ = new URLSearchParams(window.location.search).get("typ");

const kategorien = {
  I: ["Langzeitgedächtnis", "Kurzzeitgedächtnis", "Sprachzentrum", "Logik", "Rätsel"],
  II: ["Bewegung im Alltag", "Mobilisation", "Schritteziel"]
};

const fortschrittKey = typ === "I" ? "geistigeFortschritt" : "koerperFortschritt";
const kategorieListe = kategorien[typ];
let aktuellerIndex = 0;
let aktuelleKategorie = "";
let streak;

document.addEventListener("DOMContentLoaded", async () => {
  if (!typ) {
    document.querySelector(".frage-text").textContent = "Fehler: Kein gültiger Typ übergeben.";
    return;
  }

  // Body-Klasse für Hintergrundfarbe setzen
  if (typ === "I") {
    document.body.classList.add("typ-i");
  } else if (typ === "II") {
    document.body.classList.add("typ-ii");
  }

  deleteOldProgressData();
  streak = claculateStreak(await getProgress());

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
      const erledigt = speichereFortschrittLokal(aktuelleKategorie);
      if (erledigt >= kategorieListe.length) {
        const main = document.querySelector("main") || document.querySelector(".frage-container");
        speichereStrike(typ);
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
      const iconName = kategorie.replaceAll(' ', '_').toLowerCase();

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

  const anzahlErledigt = speichereFortschrittLokal(aktuelleKategorie);

  if (anzahlErledigt >= kategorien[typ].length) {
    speichereStrike(typ);
  }

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

function speichereFortschrittLokal(kategorie) {
  const fortschritt = JSON.parse(localStorage.getItem(fortschrittKey) || "[]");
  const heute = new Date().toISOString().slice(0, 10);

  if (!fortschritt.includes(kategorie)) {
    fortschritt.push({ kategorie, heute });
    localStorage.setItem(fortschrittKey, JSON.stringify(fortschritt));
  }

  return fortschritt.length;
}

function deleteOldProgressData() {
  let fortschritt = JSON.parse(localStorage.getItem(fortschrittKey) || "[]");
  const heute = new Date().toISOString().slice(0, 10);

  fortschritt = fortschritt.filter(item => item.heute === heute);
  localStorage.setItem(fortschrittKey, JSON.stringify(fortschritt));
}

function speichereStrike(typ) {
  const heute = new Date().toISOString().slice(0, 10);

  // Fortschritt immer in DB speichern, auch wenn bereits lokal erledigt
  fetch("api/saveProgress.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      typ: typ,
      datum: heute
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Fehler beim Speichern in DB");
      return res.json();
    })
    .then(data => console.log("Serverantwort:", data))
    .catch(err => console.error("DB-Speicherung fehlgeschlagen:", err));
}

function zeigeErfolg() {
  return `
    <div class="frage-header">
      <img src="img/kopfstand_logo.png" class="logo-small" />
      <button class="close-button" onclick="window.location.href='protected.html'">✕</button>
    </div>
    <div class="frage-topic">
      <img src="img/richtig_icon.svg" class="feedback-icon elefant-icon" />
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
      <img src="img/kopfstand_logo.png" class="logo-small" />
      <button class="close-button" onclick="window.location.href='protected.html'">✕</button>
    </div>
    <div class="frage-topic">
      <img src="img/falsch_icon.svg" class="feedback-icon elefant-icon" />
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
  const type1 = document.querySelector('body').classList.contains('typ-i');

  return `
    <div class="frage-header">
      <img src="img/${type1 ? "kopfstand_blau.png" : "kopfstand_gelb.png"}" class="logo-small" />
      <button class="close-button" onclick="window.location.href='protected.html'">✕</button>
    </div>
    <div class="frage-topic">
      <img src="img/${type1 ? "fortschritt_blau.svg" : "fortschritt_gelb.svg"}" class="feedback-icon elefant-icon" />
      <h2 class="feedback-titel">Glückwunsch!</h2>
    </div>
    <div class="frage-card">
      <p class="lob-text">
        Du hast deine Aufgaben gelöst!<br>
        ${streak == 1 ? "Deine Erfolgsserie beginnt – Tag 1!" : streak + " Tage am Stück erledigt!"}
      </p>
      <button class="naechste-btn" onclick="window.location.href='protected.html'">Training beenden</button>
    </div>
  `;
}

async function getProgress() {
  const response = await fetch("api/getProgress.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
  });

  if (!response.ok) {
      throw new Error("Failed to fetch progress data");
  }

  return await response.json();
}

function claculateStreak(data) {
  const date = moment();
  let streak = 0;

  for (let i = 0; i < data.length; i++) {
      if (data[i].Datum == date.format("YYYY-MM-DD") && data[i].Erledigt == 2) {
          date.subtract(1, 'days');
          streak++;
      } else {
          break;
      }
  }

  return streak;
}