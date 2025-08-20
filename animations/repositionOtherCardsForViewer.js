// /1-Tropea/animations/repositionOtherCardsForViewer.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';

export function repositionOtherCardsForViewer(role, cardNumber, options) {
  if (!isBrowser()) return;

  const animate = options?.animate !== false;

  // usa sempre placeholdersSwapped per decidere posizione
  const position = state.placeholdersSwapped
    ? (role === 'creator' ? 'top'    : 'bottom')
    : (role === 'creator' ? 'bottom' : 'top');

  const selectors = [`.${role}-card1`, `.${role}-card2`, `.${role}-card3`];

  // filtra le carte visibili/non giocate/esclude quella appena giocata
  const elements = Array
    .from(document.querySelectorAll(selectors.join(',')))
    .filter(el => el.style.display !== 'none' && !el.classList.contains('card-played'))
    .sort((a, b) => (+a.dataset.cardNumber) - (+b.dataset.cardNumber))
    .filter(el => +el.dataset.cardNumber !== cardNumber);

  const transforms = getTransformSet(role, position, elements.length);

  elements.forEach((el, idx) => {
    el.style.transition = animate ? 'transform 0.2s ease-in-out' : 'none';
    el.style.transform  = transforms[idx] || '';
  });
}

if (typeof window !== 'undefined') {
  window.repositionOtherCardsForViewer = repositionOtherCardsForViewer;
}
