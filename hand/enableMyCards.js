// /hand/enableMyCards.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

import { getCallerTag } from '../callerTag.js';

export function enableMyCards() {
  if (!isBrowser()) return;

  try { console.log(getCallerTag()); } catch {}
  
  document.querySelectorAll('.my-card').forEach(card => {
    card.style.pointerEvents = 'auto';
    card.classList.remove('card-disabled');
  });
  state.cardAlreadyClicked = false;

  // Inizio del mio turno, timer in basso
  state.turnTimer = 'bottom';

}

if (typeof window !== 'undefined') {
  window.enableMyCards = enableMyCards;
}
