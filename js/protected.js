async function checkAuth() {
  try {
    const response = await fetch("/api/protected.php", {
      credentials: "include",
    });

    if (response.status === 401) {
      window.location.href = "/login.html";
      return false;
    }

    const result = await response.json();

    const protectedContent = document.getElementById("protectedContent");

    // Dynamisches Dashboard-HTML im Kopfstand-Stil
    protectedContent.innerHTML = `
      <header class="dashboard-header">
        <img src="img/kopfstand_logo.png" alt="Kopfstand Logo" class="logo" />
        <img src="profilbild.jpg" alt="Profilbild von ${sanitize(result.email)}" class="avatar" />
      </header>

      <main>
        <h1>Guten Tag ${sanitize(result.name || result.email)}</h1>
        <p class="subtitle">Starte dein Training:</p>

        <a href="question.html?typ=I" class="card geistig">
        <p class="card-title">Deine geistigen Aufgaben</p>
        <img src="img/geistige_aufgaben_icon.svg" alt="Gehirn-Icon" class="card-icon" />
      </a>
      
      <a href="question.html?typ=II" class="card koerperlich">
        <p class="card-title">Deine körperlichen<br />Aufgaben</p>
        <img src="img/körperlichen_aufgaben_icon.svg" alt="Pfoten-Icon" class="card-icon" />
      </a>      

      <a href="progress.html" class="card fortschritt">
      <p class="card-title">Dein Fortschritt</p>
      <img src="img/fortschritt_icon.svg" alt="Flammen-Icon" class="card-icon" />
    </a>    

      </main>
    `;

    // Logout-Button aktivieren
    document.getElementById("logoutBtn").addEventListener("click", () => {
      fetch("/api/logout.php", { method: "POST", credentials: "include" })
        .then(() => window.location.href = "/login.html");
    });

    return true;

  } catch (error) {
    console.error("Auth check failed:", error);
    window.location.href = "/login.html";
    return false;
  }
}

// Schutzfunktion für unsichere Nutzereingaben
function sanitize(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Seite prüft Auth beim Laden
window.addEventListener("load", checkAuth);