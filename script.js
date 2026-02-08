document.getElementById("msgForm").addEventListener("submit", async e => {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector("button");
  const successMsg = document.getElementById("successMsg");

  // Loading state
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
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );

    // Show success
    form.style.display = "none";
    successMsg.classList.add("active");

    // Optional: reload after 4.8 seconds
    setTimeout(() => {
      window.location.reload();
    }, 4800);

  } catch (err) {
    console.error(err);
    alert("Something went wrong 😔\nPlease try again later.");
  } finally {
    button.classList.remove("loading");
    button.disabled = false;
  }
});
