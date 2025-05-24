import { events } from '../data/events.js';
import { getCurrentUserId, getRegisteredEvents, saveRegisteredEvent } from '../storage/user.js';

export function renderEvents(containerId) {
  const section = document.getElementById(containerId);
  section.innerHTML = "";

  const currentUserId = getCurrentUserId();
  const registered = currentUserId ? getRegisteredEvents(currentUserId) : [];

  events.forEach(event => {
    const article = document.createElement("article");

    const title = document.createElement("h2");
    title.innerText = event.title;

    const description = document.createElement("p");
    description.innerText = event.description;

    const time = document.createElement("time");
    if (event.type === "one-time") {
      time.setAttribute("datetime", event.date);
      time.innerText = `Date: ${event.date}`;
    } else {
      time.innerText = `Every ${event.recurrence.dayOfWeek} at ${event.recurrence.time}`;
    }

    const button = document.createElement("button");
    const isRegistered = currentUserId && registered.includes(event.id);
    button.innerText = isRegistered ? "You are registered" : "Register";
    button.disabled = isRegistered;

    button.onclick = () => {
      const userId = getCurrentUserId();
      if (!userId) {
        window.location.href = "login.html";
        return;
      }
      saveRegisteredEvent(userId, event.id);
      renderEvents(containerId); 
    };

    article.append(title, description, time, button);
    section.appendChild(article);
  });
}
