// connection/onDeckUpdate.js
"use strict";

import { state } from '../state.js';
import { renderDeckForCurrentState } from '../deck/renderDeckForCurrentState.js';

export function onDeckUpdate(message) {
  const d = message.data;
  if (!d) return;

  state.shuffledCards = Array.isArray(d.shuffledDeck) ? d.shuffledDeck : [];
  state.briscolaImage = d.card;

  const briscolaAncoraSulTavolo = !state.briscolaDrawn;
  state.deckIndex = (state.shuffledCards.length) + (briscolaAncoraSulTavolo ? 1 : 0);

  renderDeckForCurrentState();
}

if (typeof window !== 'undefined') {
  window.onDeckUpdate = onDeckUpdate;
}
