// /hand/getMyCardElements.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

export function getMyCardElements() {
  // Protezione SSR/Node
  if (!isBrowser()) return;

  const role = state.userRole;
  if (role === 'creator') {
    return document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3');
  }
  if (role === 'player') {
    return document.querySelectorAll('.player-card1, .player-card2, .player-card3');
  }
  return [];
}

if (typeof window !== 'undefined') {
  window.getMyCardElements = getMyCardElements;
}
