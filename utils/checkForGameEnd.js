// /utils/checkForGameEnd.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { resetPlayedSlot } from '../utils/resetPlayedSlot.js';
import { endGame } from '../utils/endGame.js';

import { getCallerTag } from '../callerTag.js';

export function checkForGameEnd() {
  if (!isBrowser()) return;

  try { console.log(getCallerTag()); } catch {}
  
  const deckEmpty = (state.deckIndex <= 0 && state.briscolaDrawn);
  let creatorHandEmpty = true;
  let playerHandEmpty  = true;

  const creatorId = state.roleToClientId.creator;
  const playerId  = (state.roleToClientId.players && state.roleToClientId.players[0]) || null;

  if (creatorId && state.playerHands[creatorId]) {
    creatorHandEmpty = state.playerHands[creatorId].every(c => c === null);
  }
  if (playerId && state.playerHands[playerId]) {
    playerHandEmpty = state.playerHands[playerId].every(c => c === null);
  }

  if (deckEmpty && creatorHandEmpty && playerHandEmpty) {
    const playedCards = document.querySelectorAll('.card-played');
    playedCards.forEach(slot => {
      resetPlayedSlot(slot, { keepVisible: state.userRole === 'viewer' });
    });

    // ✅ Reset completo dello stato delle carte giocate
    state.creatorPlayedCard  = null;
    state.playerPlayedCard   = null;
    state.creatorPlayedIndex = null;
    state.playerPlayedIndex  = null;

    endGame();
  }
}

if (typeof window !== 'undefined') {
  window.checkForGameEnd = checkForGameEnd;
}
