// connection/onBriscola.js
"use strict";

import { state } from '../state.js';
import { displayAllCardsForViewer } from '../deck/displayAllCardsForViewer.js';
import { publishDeckState } from '../deck/publishDeckState.js';

export function onBriscola(msg) {
  state.briscolaImage = msg.data.card;
  state.shuffledCards = msg.data.shuffledDeck;
  const img = document.querySelector(".deck-card1 img");
  if (img) {
    img.src = `/carte-napoletane/${state.briscolaImage}`;
    img.alt = `Briscola: ${state.briscolaImage}`;
    img.onload = () => state.userRole === "viewer" && displayAllCardsForViewer();
  }
  publishDeckState();
}

if (typeof window !== 'undefined') {
  window.onBriscola = onBriscola;
}
