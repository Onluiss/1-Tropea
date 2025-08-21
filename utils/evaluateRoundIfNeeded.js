// /utils/evaluateRoundIfNeeded.js
"use strict";

import { isBrowser } from './isBrowser.js';
import { state } from "../state.js";
import { getBriscolaSuit } from './getBriscolaSuit.js';
import { determineRoundWinner } from './determineRoundWinner.js';
import { calculatePoints } from './calculatePoints.js';
import { updateScores } from './updateScores.js';
import { resetTimers } from '../timer/resetTimers.js';
import { startMyTurn } from './startMyTurn.js';
import { endMyTurn } from './endMyTurn.js';
import { setBusy } from './setBusy.js';
import { animateWinningCards } from '../animations/animateWinningCards.js';
import { clearBusy } from './clearBusy.js';

export function evaluateRoundIfNeeded() {
  if (!isBrowser()) return;

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
