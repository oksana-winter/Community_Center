export function renderUserEvents(containerId, events, registeredEventIds) {
    const section = document.getElementById(containerId);
    section.innerHTML = "";
  
    const registeredEvents = events.filter(event => registeredEventIds.includes(event.id));
  
    if (registeredEvents.length === 0) {
      const msg = document.createElement("p");
      msg.innerText = "You have not registered for any events yet.";
      section.appendChild(msg);
      return;
    }
  
    registeredEvents.forEach(event => {
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
  
      article.append(title, description, time);
      section.appendChild(article);
    });
  }
  