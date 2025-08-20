// timer/resetTimers.js
"use strict";

import { state } from '../state.js';
import { updatePlaceholderBars } from '../placeholders/updatePlaceholderBars.js';
import { getCallerTag } from '../callerTag.js';

export function resetTimers() {
  try { console.log(getCallerTag()); } catch {}
  // ➤ Se esiste un intervallo attivo, lo azzera
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  // ➤ Riporta lo stato del timer a “off”
  state.turnTimer = "off";

  // ➤ Imposta i secondi rimasti al valore iniziale (45 s di default)
  state.timerRemaining = state.timer_duration_secs;
  state.timerExpiry    = null;   // ⬅️ azzera la scadenza assoluta

  // ➤ Aggiorna eventuali barre segnaposto/progress bar sull’interfaccia
  updatePlaceholderBars();
}

if (typeof window !== 'undefined') {
  window.resetTimers = (deps) => resetTimers(deps);
}
