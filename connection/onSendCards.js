// connection/onSendCards.js
"use strict";

export function onSendCards(message) {
  if (message.data?.requester === state.userName) {
    displayRequestedCards(message.data.role, message.data.cards);
  }
}

if (typeof window !== 'undefined') {
  window.onSendCards = onSendCards;
}
