// /chat/displayNewMessage.js
"use strict";

export function displayNewMessage(message) {
    if (!isBrowser()) return;
    addMessageReceived(message);
}

if (typeof window !== 'undefined') {
  window.displayNewMessage = displayNewMessage;
}
