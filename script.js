document.getElementById("msgForm").addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    email: email.value,
    message: message.value,
    send_at: sendAt.value
  };

  await fetch("HIER_DEINE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Nachricht gespeichert ✅");
});
