// /hand/handleCardClick.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { animateCardOnClick }  from '../animations/animateCardOnClick.js';

export function handleCardClick(event) {
  if (!isBrowser()) return;

  if (state.cardAlreadyClicked) return;
  state.cardAlreadyClicked = true;
  animateCardOnClick(event.currentTarget);
}

if (typeof window !== 'undefined') {
  window.handleCardClick = handleCardClick;
}
