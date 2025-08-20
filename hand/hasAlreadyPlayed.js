// /hand/hasAlreadyPlayed.js
"use strict";

import { state } from '../state.js';

import { getCallerTag } from '../callerTag.js';

export function hasAlreadyPlayed() {

  try { console.log(getCallerTag()); } catch {}
  
  if (state.userRole === 'creator')  return Boolean(state.creatorPlayedCard);
  if (state.userRole === 'player')   return Boolean(state.playerPlayedCard);
  return true;
}

if (typeof window !== 'undefined') {
  window.hasAlreadyPlayed = hasAlreadyPlayed;
}
