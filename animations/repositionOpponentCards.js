// /1-Tropea/animations/repositionOpponentCards.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { getTransformSet } from '../utils/getTransformSet.js';

export function repositionOpponentCards(role, cardNumber) {
  if (!isBrowser()) return;
  if (role !== 'creator' && role !== 'player') return;

  const n = Number(cardNumber) || 0;

  const selectors = role === 'creator'
    ? ['.creator-card1', '.creator-card2', '.creator-card3']
    : ['.player-card1',  '.player-card2',  '.player-card3'];

  const elements = Array.from(document.querySelectorAll(selectors.join(',')))
    .filter(el => (Number(el.dataset.cardNumber) || 0) !== n &&
                  el.style.display !== 'none' &&
                  !el.classList.contains('card-played'))
    .sort((a,b) => (Number(a.dataset.cardNumber)||0) - (Number(b.dataset.cardNumber)||0));

  const transforms = getTransformSet(role, 'top', elements.length);

  elements.forEach((el, idx) => {
    el.style.transition = 'transform 0.3s ease-in-out';
    el.style.transform  = transforms[idx] || '';
  });
}

if (typeof window !== 'undefined') {
  window.repositionOpponentCards = repositionOpponentCards;
}
