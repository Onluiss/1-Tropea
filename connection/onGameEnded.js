// connection/onGameEnded.js
"use strict";

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
