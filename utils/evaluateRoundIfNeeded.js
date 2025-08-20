// /utils/evaluateRoundIfNeeded.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from "../state.js";
import { getBriscolaSuit } from '../utils/getBriscolaSuit.js';
import { determineRoundWinner } from '../utils/determineRoundWinner.js';
import { calculatePoints } from '../utils/calculatePoints.js';
import { updateScores } from '../utils/updateScores.js';
import { resetTimers } from '../timer/resetTimers.js';
import { startMyTurn } from '../utils/startMyTurn.js';
import { endMyTurn } from '../utils/endMyTurn.js';
import { setBusy } from '../utils/setBusy.js';
import { animateWinningCards } from '../animations/animateWinningCards.js';
import { clearBusy } from '../utils/clearBusy.js';
import { getCallerTag } from "../callerTag.js";

export function evaluateRoundIfNeeded() {
  if (!isBrowser()) return;
  try { console.log(getCallerTag()); } catch {}

  const { creatorPlayedCard, playerPlayedCard } = state;
  if (!creatorPlayedCard || !playerPlayedCard) return;

  const briscolaSuit = getBriscolaSuit(state.briscolaImage);
  const leader = state.currentTurn === 'player' ? 'creator' : 'player';

  const winner = leader === 'creator'
    ? determineRoundWinner(creatorPlayedCard, playerPlayedCard, briscolaSuit, leader)
    : determineRoundWinner(playerPlayedCard, creatorPlayedCard, briscolaSuit, leader);

  if (winner !== 'creator' && winner !== 'player') return; // guard

  updateScores(winner, calculatePoints(creatorPlayedCard, playerPlayedCard));
  resetTimers();

  state.currentTurn = winner;
  if (state.currentTurn === state.userRole) startMyTurn(); else endMyTurn();

  setBusy();
  setTimeout(() => {
    try {
      animateWinningCards(winner, [creatorPlayedCard, playerPlayedCard]);
    } finally {
      state.creatorPlayedCard  = null;
      state.playerPlayedCard   = null;
      state.creatorPlayedIndex = null;
      state.playerPlayedIndex  = null;
      clearBusy();
    }
  }, 1000);
}

if (typeof window !== 'undefined') {
  window.evaluateRoundIfNeeded = evaluateRoundIfNeeded;
}
