// /hand/initializeMyCards.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { isHandEmpty } from '../hand/isHandEmpty.js';
import { getMyCardElements } from '../hand/getMyCardElements.js';
import { setupCardElements } from '../hand/setupCardElements.js';
import { isMyTurn } from '../utils/isMyTurn.js';
import { hasAlreadyPlayed } from '../hand/hasAlreadyPlayed.js';
import { enableMyCards } from '../hand/enableMyCards.js';
import { playSafe } from '../utils/playSafe.js';
import { state } from '../state.js';
import { disableMyCards } from '../hand/disableMyCards.js';
import { updatePlaceholderBars } from '../placeholders/updatePlaceholderBars.js';
import { getCallerTag } from '../callerTag.js';

export function initializeMyCards() {
  // 1) Early exit
  if (!isBrowser() || isHandEmpty()) return;

  try { console.log(getCallerTag()); } catch {}

  // 2) NodeList → Array con guardia
  const nodes = getMyCardElements() || [];
  const myCards = Array.from(nodes);
  if (!myCards.length) return;

  // 3) Setup listener / classi
  setupCardElements(myCards);

  // 4) Stato turno
  const myTurnActive = isMyTurn() && !hasAlreadyPlayed();

  if (myTurnActive) {
    enableMyCards();
    document.body.classList.add('my-turn-active');
    if (state.myTurnAudio) {
      setTimeout(() => { try { playSafe(state.myTurnAudio); } catch {} }, 300);
    }
  } else {
    disableMyCards();
  }

  // 5) Sync UI
  updatePlaceholderBars();
}

if (typeof window !== 'undefined') {
  window.initializeMyCards = initializeMyCards;
}
