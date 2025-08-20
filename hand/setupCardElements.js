// /hand/setupCardElements.js
"use strict";

import { handleCardClick } from '../hand/handleCardClick.js';
import { getCallerTag } from '../callerTag.js';

export function setupCardElements(cards) {

  try { console.log(getCallerTag()); } catch {}
  
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
