// C) FIX: /1-Tropea/connection/onTimerTick.js
"use strict";

import { state } from '../state.js';
import { playSafe } from '../utils/playSafe.js';
import { finalSound, countdownSound } from '../constants/constants.js';
import { autoPlayCard } from '../deck/autoPlayCard.js';
import { endMyTurn } from '../utils/endMyTurn.js';
import { updateArc } from '../timer/updateArc.js';

export function onTimerTick({ data = {} }) {
  const { remaining = null, finished = false, expiry = null } = data;
  if (expiry == null) {
    console.warn("[timer-tick] ignorato: expiry non valido", data);
    return;
  }
  state.timerExpiry    = expiry;
  state.timerRemaining = remaining;

  if (finished) {
    document.querySelectorAll(".clock-tm").forEach(el => {
      el.textContent = "";
      el.classList.remove("big-count");
      el.style.display = "none";
    });
    document.querySelectorAll(".clock-arc").forEach(el => el.style.display = "none");

    playSafe(finalSound, { reset: false }).finally(() => {
      if (state.isMyTurn && !state.cardAlreadyClicked) setTimeout(autoPlayCard, 1000);
      endMyTurn();
    });

    state.turnTimer      = "off";
    state.timerRemaining = 0;
    if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
    return;
  }

  const showBig = remaining > 0 && remaining <= 3;

  document.querySelectorAll(".clock-tm").forEach(el => {
    el.style.display = "";
    if (showBig) { el.textContent = remaining; el.classList.add("big-count"); }
    else { el.textContent = ""; el.classList.remove("big-count"); }
  });
  if (showBig) playSafe(countdownSound);

  const denomValid = Number.isFinite(state.arc_full_secs) && state.arc_full_secs > 0;
  const frac = denomValid ? Math.max(0, remaining / state.arc_full_secs) : 0;

  document.querySelectorAll(".clock-arc").forEach(a => {
    a.style.display = "";
    updateArc(a, frac);
  });
}

if (typeof window !== 'undefined') {
  window.onTimerTick = onTimerTick;
}
