// deck/renderDeckForCurrentState.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { updateTalonCounter } from '../contatore/updateTalonCounter.js';

export function renderDeckForCurrentState() {
  if (!isBrowser()) return;

  const cards = document.querySelectorAll('.deck-card');
  let shown = 0, hidden = 0;

  cards.forEach(card => {
    const idx = +(card.className.match(/deck-card(\d+)/)?.[1] || 0);
    const isBriscola = idx === 1;

    const shouldShow =
      (isBriscola && !state.briscolaDrawn) ||
      (!isBriscola && idx <= state.deckIndex);

    card.style.display = shouldShow ? 'block' : 'none';
    if (shouldShow && !(isBriscola && state.briscolaAnimated)) {
      card.style.transform = '';
    }

    shouldShow ? shown++ : hidden++;
  });

  console.log(`[renderDeckForCurrentState] mostrati=${shown}, nascosti=${hidden}`);

  updateTalonCounter();
}

if (typeof window !== 'undefined') {
  window.renderDeckForCurrentState = renderDeckForCurrentState;
}
