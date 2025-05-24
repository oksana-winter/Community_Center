export function getCurrentUserId() {
    return localStorage.getItem("userId");
  }
  
  export function getRegisteredEvents(userId) {
    const data = JSON.parse(localStorage.getItem("registeredEvents") || "{}");
    return data[userId] || [];
  }
  
  export function saveRegisteredEvent(userId, eventId) {
    const data = JSON.parse(localStorage.getItem("registeredEvents") || "{}");
    if (!data[userId]) data[userId] = [];
    if (!data[userId].includes(eventId)) {
      data[userId].push(eventId);
      localStorage.setItem("registeredEvents", JSON.stringify(data));
    }
  }
  