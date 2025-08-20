// /hand/isHandEmpty.js
"use strict";

import { state } from '../state.js';
import { getCallerTag } from '../callerTag.js';

export function isHandEmpty() {

  try { console.log(getCallerTag()); } catch {}
  
  const hand = state.playerHands[state.userName];
  return !hand || hand.every(card => card === null);
}

if (typeof window !== 'undefined') {
  window.isHandEmpty = isHandEmpty;
}
