// connection/onSendCards.js
"use strict";

import { state } from '../state.js';
import { displayRequestedCards } from '../ui-utils/displayRequestedCards.js';

export function onSendCards(message) {
  if (message.data?.requester === state.userName) {
    displayRequestedCards(message.data.role, message.data.cards);
  }
}

if (typeof window !== 'undefined') {
  window.onSendCards = onSendCards;
}
