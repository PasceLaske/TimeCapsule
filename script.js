document.getElementById("msgForm").addEventListener("submit", async e => {
  e.preventDefault();

  const form = e.target;
  const button = document.getElementById("submitBtn");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const successMsg = document.getElementById("successMsg");
  const letterContent = document.querySelector(".letter-content");

  // Show message in envelope
  letterContent.textContent = document.getElementById("message").value;

  // Start animation sequence
  button.classList.add("loading");
  button.disabled = true;
  form.style.opacity = "0.3";
  form.style.pointerEvents = "none";

  envelopeContainer.classList.add("active");

  // Small delay → then seal
  setTimeout(() => {
    document.querySelector(".envelope").classList.add("sealed");
  }, 1200);

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

    // After animation completes → show success
    setTimeout(() => {
      envelopeContainer.style.display = "none";
      successMsg.classList.add("active");

      setTimeout(() => {
        window.location.reload();
      }, 5000);

    }, 2800); // time until envelope is fully sealed + some pause

  } catch (err) {
    console.error(err);
    alert("Something went wrong 😔\nPlease try again later.");
    resetForm();
  }
});

function resetForm() {
  const form = document.getElementById("msgForm");
  const button = document.getElementById("submitBtn");
  const envelopeContainer = document.getElementById("envelopeContainer");

  form.style.opacity = "1";
  form.style.pointerEvents = "auto";
  button.classList.remove("loading");
  button.disabled = false;
  envelopeContainer.classList.remove("active");
  document.querySelector(".envelope").classList.remove("sealed");
}
