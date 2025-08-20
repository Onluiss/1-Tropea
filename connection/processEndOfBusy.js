// /1-Tropea/connection/processEndOfBusy.js
"use strict";

import { isBrowser } from "../utils/isBrowser.js";
import { state } from "../state.js";
import { clearBusy } from "../utils/clearBusy.js";
import { updatePlaceholderBars } from "../placeholders/updatePlaceholderBars.js";
import { respondToViewerRequest } from "../connection/respondToViewerRequest.js";
import { publishGameState } from "../utils/publishGameState.js";
import { getCallerTag } from "../callerTag.js";

export function processEndOfBusy() {
  if (!isBrowser() || state.busyUnwinding) return;

  try { console.log(getCallerTag()); } catch {}
  state.busyUnwinding = true;

  // reset click-lock
  state.cardAlreadyClicked = false;

  // 1) sblocca stato
  try { clearBusy(); } catch {}

  // 2) refresh UI
  try { updatePlaceholderBars(); } catch {}

  // 3) smaltisci coda viewer in modo sicuro
  const queue = Array.isArray(state.pendingRequests)
    ? state.pendingRequests
    : (state.pendingRequests = []);
  while (queue.length) {
    try { respondToViewerRequest(queue.shift()); } catch {}
  }

  // 4) snapshot solo se chi ha aperto il busy
  if (state.iWasBusy && (state.userRole === "creator" || state.userRole === "player")) {
    try { publishGameState({ isBusy: false, reason: "end-of-busy" }); } catch {}
  }
  state.iWasBusy = false;

  state.busyUnwinding = false;
}

if (typeof window !== "undefined") window.processEndOfBusy = processEndOfBusy;
