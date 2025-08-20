// connection/onCardsRefused.js
"use strict";

export function onCardsRefused(message) {
  if (message.data?.requester === state.userName) {
    showAlert('custom-alert');
  }
}

if (typeof window !== 'undefined') {
  window.onCardsRefused = onCardsRefused;
}
