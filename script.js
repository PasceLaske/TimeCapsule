document.getElementById("msgForm").addEventListener("submit", async e => {
  e.preventDefault();

  const form = e.target;
  const button = document.getElementById("submitBtn");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const envelope = document.querySelector(".envelope");
  const successMsg = document.getElementById("successMsg");
  const letterContent = document.querySelector(".letter-content");

  // Nachricht in den Brief schreiben
  letterContent.textContent = document.getElementById("message").value;

  // UI Zustand ändern
  button.classList.add("loading");
  button.disabled = true;
  form.style.opacity = "0.25";
  form.style.pointerEvents = "none";

  envelopeContainer.classList.add("active");

  // Versiegelungs-Animation starten
  setTimeout(() => {
    envelope.classList.add("sealed");
  }, 1400);

  // Take-off & Auflösung in Sternenstaub
  setTimeout(() => {
    envelope.classList.add("takeoff");
    createMagicDust(60); // 60 Partikel zaubern
  }, 3400);

  try {
    const data = {
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      send_at: document.getElementById("sendAt").value
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbykbV93i50bwYUA36uLNAO9gdAJZs-lPPFy_PLMEEagzYgMF446pf3nbjgX8e1gJ8si1g/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    // Erfolg zeigen
    setTimeout(() => {
      envelopeContainer.style.display = "none";
      successMsg.classList.add("active");

      // Nach 6 Sekunden neu starten
      setTimeout(() => window.location.reload(), 6200);
    }, 5200);

  } catch (err) {
    console.error(err);
    alert("Etwas ist schiefgelaufen... 🪄\nVersuch es bitte noch einmal.");
    resetForm();
  }
});

function resetForm() {
  const form = document.getElementById("msgForm");
  const button = document.getElementById("submitBtn");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const envelope = document.querySelector(".envelope");

  form.style.opacity = "1";
  form.style.pointerEvents = "auto";
  button.classList.remove("loading");
  button.disabled = false;
  envelopeContainer.classList.remove("active");
  envelope.classList.remove("sealed", "takeoff");
}

// Magische Staub-Partikel erzeugen
function createMagicDust(count) {
  const container = document.querySelector(".envelope-container");
  const dustContainer = document.createElement("div");
  dustContainer.className = "magic-dust";
  container.appendChild(dustContainer);

  for (let i = 0; i < count; i++) {
    const dust = document.createElement("div");
    dust.className = "dust";
    
    // Zufällige Flugbahn
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 220;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 100; // meist nach oben
    
    dust.style.setProperty("--dx", dx + "px");
    dust.style.setProperty("--dy", dy + "px");
    
    // Startposition im Zentrum des Umschlags
    dust.style.left = "50%";
    dust.style.top = "50%";
    dust.style.animationDelay = Math.random() * 0.8 + "s";
    
    dustContainer.appendChild(dust);
  }

  // Nach Animation entfernen
  setTimeout(() => dustContainer.remove(), 3000);
}

// Beim Laden ein paar schwebende Partikel im Hintergrund
window.addEventListener("load", () => {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 35; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDelay = Math.random() * 15 + "s";
    p.style.animationDuration = (12 + Math.random() * 18) + "s";
    p.style.width = p.style.height = (1 + Math.random() * 3.5) + "px";
    particlesContainer.appendChild(p);
  }
});
