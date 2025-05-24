import { getCurrentUserId } from '../storage/user.js';

export function ensureAuth() {
  if (!getCurrentUserId()) {
    window.location.href = "login.html"; 
  }
}
