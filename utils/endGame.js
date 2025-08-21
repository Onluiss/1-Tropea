// /utils/endGame.js
"use strict";

import { state } from '../state.js';
import { publish } from './publish.js';
import { showEndGameWindow } from '../ui-utils/showEndGameWindow.js';
import { handleDrawScenario } from './handleDrawScenario.js';

export function endGame() {
  let finalWinner = '';
  if (state.creatorPoints > state.playerPoints) {
    finalWinner = 'creator';
    state.creatorGamesWon += 1;
  } else if (state.playerPoints > state.creatorPoints) {
    finalWinner = 'player';
    state.playerGamesWon += 1;
  } else {
    finalWinner = 'draw';
  }

  publish(state.ablyChannel, 'game-ended', {
    finalWinner: finalWinner === 'draw'
      ? 'Pareggio!'
      : `${finalWinner.charAt(0).toUpperCase()}${finalWinner.slice(1)} ha vinto!`,
    creatorPoints:   state.creatorPoints,
    playerPoints:    state.playerPoints,
    creatorGamesWon: state.creatorGamesWon,
    playerGamesWon:  state.playerGamesWon
  });

  if (finalWinner !== 'draw') {
    showEndGameWindow(
      `${finalWinner.charAt(0).toUpperCase()}${finalWinner.slice(1)} ha vinto!`,
      state.creatorPoints,
      state.playerPoints,
      state.creatorGamesWon,
      state.playerGamesWon
    );
  } else {
    handleDrawScenario();
  }
}

if (typeof window !== 'undefined') {
  window.endGame = endGame;
}
