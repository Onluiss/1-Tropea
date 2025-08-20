"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { updateArc } from '../timer/updateArc.js';
import { getCallerTag } from '../callerTag.js';

export function updateClockArcs() {
  if (!isBrowser()) return;
  try { console.log(getCallerTag()); } catch {}
  const frac = Math.max(
    0,
    Math.min(1, (state.timerRemaining ?? state.timer_duration_secs) / state.arc_full_secs)
  );

  document.querySelectorAll('.clock-arc').forEach(a => {
    /* 👇 forza la visibilità */
    a.style.display = '';
    updateArc(a, frac);
  });
}

if (typeof window !== 'undefined') {
  window.updateClockArcs = (deps) => updateClockArcs(deps);
}
