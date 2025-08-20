// /utils/endMyTurn.js
"use strict";

export function endMyTurn() {
  state.isMyTurn = false;
}

if (typeof window !== 'undefined') {
  window.endMyTurn = endMyTurn;
}
