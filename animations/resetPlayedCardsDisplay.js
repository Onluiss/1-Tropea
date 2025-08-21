// animations/resetPlayedCardsDisplay.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';

export function resetPlayedCardsDisplay() {
  // Protezione SSR / Node
  if (!isBrowser()) return;
// console.log(`resetPlayedCardsDisplay ← Chiamata da ${getCallerTag()}`);
  document.querySelectorAll('.card-played').forEach(el => {
    el.classList.remove('card-played');
    el.style.transition = '';
    el.style.transform  = '';
  });
}

if (typeof window !== 'undefined') {
  window.resetPlayedCardsDisplay = resetPlayedCardsDisplay;
}
