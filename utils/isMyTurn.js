// /utils/isMyTurn.js
"use strict";

import { state } from '../state.js';

export function isMyTurn() {
  return state.isMyTurn;
}

if (typeof window !== 'undefined') {
  window.isMyTurn = isMyTurn;
}
