// connection/onGameEnded.js
"use strict";

import { handleDrawScenario } from '../utils/handleDrawScenario.js';
import { showEndGameWindow } from '../ui-utils/showEndGameWindow.js';

export function onGameEnded(msg) {
  if (!msg.data) return;
  const { finalWinner, creatorPoints, playerPoints, creatorGamesWon, playerGamesWon } = msg.data;
  finalWinner === "Pareggio!"
    ? handleDrawScenario()
    : showEndGameWindow(finalWinner, creatorPoints, playerPoints, creatorGamesWon, playerGamesWon);
}

if (typeof window !== 'undefined') {
  window.onGameEnded = onGameEnded;
}
