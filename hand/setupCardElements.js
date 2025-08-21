// /hand/setupCardElements.js
"use strict";

import { handleCardClick } from './handleCardClick.js';

export function setupCardElements(cards) {
  cards.forEach((cardEl, idx) => {
    cardEl.classList.add('my-card');
    cardEl.dataset.cardNumber = String(idx + 1);
    cardEl.removeEventListener('click', handleCardClick);
    cardEl.addEventListener('click', handleCardClick);
  });
}

if (typeof window !== 'undefined') {
  window.setupCardElements = setupCardElements;
}
