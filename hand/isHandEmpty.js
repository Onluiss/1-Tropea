// /hand/isHandEmpty.js
"use strict";

import { state } from '../state.js';

export function isHandEmpty() {
  const hand = state.playerHands[state.userName];
  return !hand || hand.every(card => card === null);
}

if (typeof window !== 'undefined') {
  window.isHandEmpty = isHandEmpty;
}
