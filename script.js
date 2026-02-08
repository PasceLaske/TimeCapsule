document.getElementById("msgForm").addEventListener("submit", async e => {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector("button");
  const successMsg = document.getElementById("successMsg");

  // Ladezustand
  button.classList.add("loading");
  button.disabled = true;

  try {
    const data = {
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      send_at: document.getElementById("sendAt").value
    };

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbykbV93i50bwYUA36uLNAO9gdAJZs-lPPFy_PLMEEagzYgMF446pf3nbjgX8e1gJ8si1g/exec",
      {
        method: "POST",
        mode: "no-cors",           // wichtig bei Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );

    // Erfolg anzeigen
    form.style.display = "none";
    successMsg.classList.add("active");

    // Optional: nach 4 Sekunden neu laden
    setTimeout(() => {
      window.location.reload();
    }, 4800);

  } catch (err) {
    console.error(err);
    alert("Leider ist etwas schiefgelaufen 😔\nBitte versuche es später noch einmal.");
  } finally {
    button.classList.remove("loading");
    button.disabled = false;
  }
});
