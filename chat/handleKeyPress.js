// /chat/handleKeyPress.js
"use strict";

export function handleKeyPress(event) {
    if (!isBrowser()) return;
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

if (typeof window !== 'undefined') {
  window.handleKeyPress = handleKeyPress;
}
