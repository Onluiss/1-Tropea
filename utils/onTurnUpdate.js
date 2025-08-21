// /utils/onTurnUpdate.js
"use strict";

import { state } from '../state.js';
import { resetTimers } from '../timer/resetTimers.js';
import { startGlobalTimer } from '../timer/startGlobalTimer.js';

export function onTurnUpdate(newTurn) {
  if (newTurn === state.currentTurn) return;  // ❌ nessun vero cambio

  state.currentTurn = newTurn;                // ✅ aggiorna lo stato globale
  resetTimers();                               // azzera i cronometri UNA SOLA VOLTA
  startGlobalTimer();                          // fa partire il countdown

  /* Imposta la posizione del timer ('bottom' per chi deve giocare) ------- */
  state.turnTimer = (
    (newTurn === 'creator' && state.userRole === 'creator') ||
    (newTurn === 'player'  && state.userRole === 'player')
  ) ? 'bottom' : 'top';
}

if (typeof window !== 'undefined') {
  window.onTurnUpdate = onTurnUpdate;
}
