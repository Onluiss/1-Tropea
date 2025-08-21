// utils/autoPlayCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

export function autoPlayCard() {
  // Protezione SSR / Node
  if (!isBrowser()) return;
  // console.log(`autoPlayCard ← Chiamata da ${getCallerTag()}`);
  let cardElements = [];
  if (state.userRole === 'creator') {
    // Seleziona le carte del creator
    cardElements = Array.from(document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3'));
  } else if (state.userRole === 'player') {
    // Seleziona le carte del player
    cardElements = Array.from(document.querySelectorAll('.player-card1, .player-card2, .player-card3'));
  }

  // Filtra le carte visibili e non già giocate
  cardElements = cardElements.filter(card =>
    card.style.display !== 'none' && !card.classList.contains('card-played')
  );

  if (cardElements.length > 0) {
    // Seleziona una carta casualmente
    const randomIndex = Math.floor(Math.random() * cardElements.length);
    const cardToPlay = cardElements[randomIndex];
    // Simula il click sulla carta scelta
    cardToPlay.click();
  }
}

if (typeof window !== 'undefined') {
  window.autoPlayCard = autoPlayCard;
}
