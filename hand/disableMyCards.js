// /hand/disableMyCards.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

import { getCallerTag } from '../callerTag.js';

export function disableMyCards() {
  if (!isBrowser()) return;

  try { console.log(getCallerTag()); } catch {}
  
  /* Disabilita le mie carte */
  document.querySelectorAll('.my-card').forEach(card => {
    card.style.pointerEvents = 'none';
    card.classList.add('card-disabled');
  });

  // Fine del mio turno, timer in alto
  state.turnTimer = 'top';

}

if (typeof window !== 'undefined') {
  window.disableMyCards = disableMyCards;
}
