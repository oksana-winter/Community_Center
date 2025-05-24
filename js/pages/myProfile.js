import { getCurrentUserId, getRegisteredEvents } from '../storage/user.js';
import { events } from '../data/events.js';
import { renderUserEvents } from '../ui/renderUserEvents.js';

const userId = getCurrentUserId();
if (!userId) {
  window.location.href = "login.html";
}

const registeredEventIds = getRegisteredEvents(userId);
renderUserEvents("myEvents", events, registeredEventIds);
