// connection/onTimerStart.js
"use strict";

import { state } from "../state.js";
import { nowSync } from "./nowSync.js";

export function onTimerStart({ data = {} }) {
  const expiry = data && data.expiry;
  if (!Number.isFinite(expiry)) {
    console.error("timer-start senza expiry valido, esco");
    return;
  }
  if (expiry === state.lastReceivedExpiry) return;

  state.lastReceivedExpiry = expiry;
  state.timerExpiry = expiry;
  state.timerRemaining = Math.max(0, Math.ceil((expiry - nowSync()) / 1000));

  try {
    if (typeof window !== "undefined" && typeof window.updateClockArcs === "function") {
      window.updateClockArcs();
    }
  } catch {}
}

if (typeof window !== "undefined") {
  window.onTimerStart = onTimerStart;
}
