// /utils/updateScores.js
"use strict";

import { isBrowser } from './isBrowser.js';
import { state } from '../state.js';

export function updateScores(winner, pointsWon) {
  // protezione da ambienti SSR/Node
  if (!isBrowser()) return;

  if (winner === 'creator') {
    state.creatorPoints += pointsWon;
  } else {
    state.playerPoints += pointsWon;
  }
  const creatorPointsSpan = document.getElementById('creator-points');
  const playerPointsSpan  = document.getElementById('player-points');
  if (creatorPointsSpan) creatorPointsSpan.textContent = `Creatore: ${state.creatorPoints} punti`;
  if (playerPointsSpan)  playerPointsSpan.textContent  = `Giocatore: ${state.playerPoints} punti`;
}

if (typeof window !== 'undefined') {
  window.updateScores = updateScores;
}
