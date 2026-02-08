document.getElementById("msgForm").addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    email: email.value,
    message: message.value,
    send_at: sendAt.value
  };

  await fetch("https://script.google.com/macros/s/AKfycbykbV93i50bwYUA36uLNAO9gdAJZs-lPPFy_PLMEEagzYgMF446pf3nbjgX8e1gJ8si1g/exec", {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Nachricht gespeichert ✅");
});
