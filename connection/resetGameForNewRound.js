// connection/resetGameForNewRound.js
"use strict";

export function resetGameForNewRound() {
  if (!isBrowser()) return;

  window.gameStateMessage = null;        // niente snapshot da ripristinare
  publish(state.ablyChannel, 'reset-game'); // 2. reset globale

  // 3. piccolo delay per far propagare il reset, poi ri‑avvia la partita
  setTimeout(triggerRestart, 50);
}

if (typeof window !== 'undefined') {
  window.resetGameForNewRound = resetGameForNewRound;
}
