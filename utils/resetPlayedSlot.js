// /utils/resetPlayedSlot.js
"use strict";

import { isBrowser } from './isBrowser.js';

export function resetPlayedSlot(slot, { keepVisible = false } = {}) {
  if (!isBrowser() || !slot) return;

  if (!keepVisible) {
    slot.style.display = 'none';
    slot.classList.remove('card-played', 'card-disabled');
    slot.style.transform = '';
    slot.style.transition = '';
    if (typeof slot.querySelector === 'function') {
      const img = slot.querySelector('img');
      if (img) {
        img.src = '';
        img.alt = '';
        img.dataset.front = 'false';
      }
    }
  } else {
    slot.classList.remove('card-disabled');
  }
}

if (typeof window !== 'undefined') {
  window.resetPlayedSlot = resetPlayedSlot;
}
