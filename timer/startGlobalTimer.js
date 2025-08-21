// timer/startGlobalTimer.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { nowSync } from '../connection/nowSync.js';
import { updateClockArcs } from './updateClockArcs.js';
import { publish } from '../utils/publish.js';

export function startGlobalTimer({ resume = false } = {}) {
  if (!isBrowser()) return;

  /* GUARDIE */
  if (state.turnTimer === 'off' || state.timerInterval) return;

  const DURATION_MS   = state.timer_duration_secs * 1000;
  const now           = nowSync();
  const hasValidExpiry =
    typeof state.timerExpiry === 'number' && state.timerExpiry > now;

  /* ============================================================
       A) PLAYER / VIEWER  → timer locale silente
     ============================================================ */
  if (state.userRole !== 'creator') {
    if (!(resume && hasValidExpiry)) return;

    const secsLeft = () =>
      Math.max(0, Math.ceil((state.timerExpiry - nowSync()) / 1000));

    state.timerRemaining = secsLeft();

    const tick = () => {
      state.timerRemaining = secsLeft();
      updateClockArcs();
      if (state.timerRemaining <= 0) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
      }
    };

    tick();
    state.timerInterval = setInterval(tick, 1000);
    return;                           // ⬅️ niente publish()
  }

  /* ============================================================
       B) CREATOR  → timer globale
     ============================================================ */
  if (!(resume && hasValidExpiry)) {
    state.timerExpiry = now + DURATION_MS;

    publish(state.ablyChannel, 'timer-start', { expiry: state.timerExpiry });
  }

  const secsLeft = () =>
    Math.max(0, Math.ceil((state.timerExpiry - nowSync()) / 1000));

  state.timerRemaining = secsLeft();

  const tick = () => {
    const remaining = secsLeft();
    state.timerRemaining = remaining;
    updateClockArcs();

    publish(state.ablyChannel, 'timer-tick', {
      remaining,
      finished: remaining <= 0,
      expiry: state.timerExpiry
    });

    if (remaining <= 0) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      state.turnTimer     = 'off';
    }
  };

  tick();                                 // primo colpo
  state.timerInterval = setInterval(tick, 1000);
}

if (typeof window !== 'undefined') {
  window.startGlobalTimer = (deps) => startGlobalTimer(deps);
}
