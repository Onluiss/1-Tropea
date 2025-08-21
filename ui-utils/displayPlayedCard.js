// /ui-utils/displayPlayedCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { forceDisplayedCard } from '../animations/forceDisplayedCard.js';
import { repositionOtherCardsForViewer } from '../animations/repositionOtherCardsForViewer.js';

export function displayPlayedCard(role, card, index) {
  // Protezione SSR / Node
  if (!isBrowser()) return;

  forceDisplayedCard(role, card, index);
  const el = document.querySelector(`.${role}-card${index + 1}`);
  if (el) el.style.display = 'block';
  repositionOtherCardsForViewer(role, index + 1, { animate: false });
}

if (typeof window !== 'undefined') {
  window.displayPlayedCard = displayPlayedCard;
}
