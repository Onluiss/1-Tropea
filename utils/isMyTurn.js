// /utils/isMyTurn.js
"use strict";

import { state } from '../state.js';

import { getCallerTag } from '../callerTag.js';

export function isMyTurn() {
    
  try { console.log(getCallerTag()); } catch {}
  
  return state.isMyTurn;
}

if (typeof window !== 'undefined') {
  window.isMyTurn = isMyTurn;
}
