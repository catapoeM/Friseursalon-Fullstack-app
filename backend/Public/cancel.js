  // GET-Parameter aus URL holen
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get("bookingId");
  const code = urlParams.get("code");

  const statusMessage = document.getElementById("statusMessage");
  const button = document.getElementById("cancelBtn");
  button.addEventListener("click", async () => {
    if (!bookingId || !code) {
      statusMessage.textContent = "Ungültiger Link!";
      statusMessage.classList.add("error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/booking/cancel", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, code })
      });

      const data = await res.json();

      if (res.ok) {
        statusMessage.textContent = data.message;
        statusMessage.classList.remove("error");
        button.disabled = true; // Button deaktivieren nach erfolgreicher Stornierung
      } else {
        statusMessage.textContent = data.message || "Fehler beim Stornieren";
        statusMessage.classList.add("error");
      }

    } catch (err) {
      statusMessage.textContent = "Serverfehler";
      statusMessage.classList.add("error");
      console.error(err);
    }
  });