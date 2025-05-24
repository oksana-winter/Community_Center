document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const eventId = "event-001";

    const stored = localStorage.getItem("registrations");
    const registrations = stored ? JSON.parse(stored) : [];

    const alreadyRegistered = registrations.some(
      (entry) => entry.email === email && entry.eventId === eventId
    );

    const confirmation = document.getElementById("confirmation");

    if (alreadyRegistered) {
      confirmation.textContent = "This email is already registered.";
      confirmation.style.color = "red";
    } else {
      const userId = crypto.randomUUID();

      registrations.push({ eventId, name, email, password, userId });
      localStorage.setItem("registrations", JSON.stringify(registrations));

      localStorage.setItem("userId", userId);

      confirmation.textContent = "You have successfully registered!";
      confirmation.style.color = "green";

      setTimeout(() => {
        window.location.href = "eventsPage.html";
      }, 1000);
    }
  });