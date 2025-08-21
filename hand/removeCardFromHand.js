// /hand/removeCardFromHand.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from "../state.js";

export function removeCardFromHand(cardIndex) {
  // Protezione SSR/Node
  if (!isBrowser()) return;

  const myCards = (state.userRole === 'creator')
    ? document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3')
    : document.querySelectorAll('.player-card1, .player-card2, .player-card3');

  const cardToRemove = myCards[cardIndex];
  if (cardToRemove) {
    cardToRemove.style.pointerEvents = 'none';
    cardToRemove.classList.add('card-played');
  }

  if (state.playerHands[state.userName] &&
      state.playerHands[state.userName][cardIndex] != null) {
    state.playerHands[state.userName][cardIndex] = null;
  }
}

if (typeof window !== 'undefined') {
  window.removeCardFromHand = removeCardFromHand;
}
