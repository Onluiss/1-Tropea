// /utils/startMyTurn.js
"use strict";

import { state } from "../state.js";

export function startMyTurn() {
  state.isMyTurn = true;
}

if (typeof window !== 'undefined' && !window.startMyTurnDI) {
  window.startMyTurnDI = startMyTurn; // alias solo informativo, non usato nei test
}
