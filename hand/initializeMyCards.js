// /hand/initializeMyCards.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { isHandEmpty } from './isHandEmpty.js';
import { getMyCardElements } from './getMyCardElements.js';
import { setupCardElements } from './setupCardElements.js';
import { isMyTurn } from '../utils/isMyTurn.js';
import { hasAlreadyPlayed } from './hasAlreadyPlayed.js';
import { enableMyCards } from './enableMyCards.js';
import { playSafe } from '../utils/playSafe.js';
import { state } from '../state.js';
import { disableMyCards } from './disableMyCards.js';
import { updatePlaceholderBars } from '../placeholders/updatePlaceholderBars.js';

export function initializeMyCards() {
  // 1) Early exit
  if (!isBrowser() || isHandEmpty()) return;

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
