// connection/onGameStarted.js
"use strict";

import { publish } from '../utils/publish.js';
import { state } from '../state.js';

export function onGameStarted() {
  publish(state.ablyChannel, "request-current-deck", { requester: state.userName });
}

if (typeof window !== 'undefined') {
  window.onGameStarted = onGameStarted;
}
