// /utils/startMyTurn.js
"use strict";

import { state } from "../state.js";

import { getCallerTag } from "../callerTag.js";

export function startMyTurn() {
    
  try { console.log(getCallerTag()); } catch {}
  
  state.isMyTurn = true;
}

if (typeof window !== 'undefined' && !window.startMyTurnDI) {
  window.startMyTurnDI = startMyTurn; // alias solo informativo, non usato nei test
}
