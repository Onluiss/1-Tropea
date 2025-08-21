// /utils/endMyTurn.js
"use strict";

import { state } from '../state.js';

export function endMyTurn() {
  state.isMyTurn = false;
}

if (typeof window !== 'undefined') {
  window.endMyTurn = endMyTurn;
}
