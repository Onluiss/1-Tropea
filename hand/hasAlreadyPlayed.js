// /hand/hasAlreadyPlayed.js
"use strict";

import { state } from '../state.js';

export function hasAlreadyPlayed() {

  if (state.userRole === 'creator')  return Boolean(state.creatorPlayedCard);
  if (state.userRole === 'player')   return Boolean(state.playerPlayedCard);
  return true;
}

if (typeof window !== 'undefined') {
  window.hasAlreadyPlayed = hasAlreadyPlayed;
}
