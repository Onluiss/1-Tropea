// animations/repositionOtherCards.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { getTransformSet } from '../utils/getTransformSet.js';

export function repositionOtherCards(role, cardNumber) {
  if (!isBrowser()) return;

  const selectors = role === 'creator'
    ? ['.creator-card1', '.creator-card2', '.creator-card3']
    : ['.player-card1',  '.player-card2',  '.player-card3'];

  const elements = Array
    .from(document.querySelectorAll(selectors.join(',')))
    .filter(el =>
      (parseInt(el.dataset.cardNumber, 10) || 0) !== cardNumber &&
      el.style.display !== 'none' &&
      !el.classList.contains('card-played')
    );

  const transforms = getTransformSet(role, 'bottom', elements.length);
  elements.forEach((el, idx) => {
    el.style.transition = 'transform 0.3s ease-in-out';
    el.style.transform  = transforms[idx] || '';
  });
}

if (typeof window !== 'undefined') {
  window.repositionOtherCards = repositionOtherCards;
}
