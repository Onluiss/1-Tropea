// connection/onGameStarted.js
"use strict";

export function onGameStarted() {
  publish(state.ablyChannel, "request-current-deck", { requester: state.userName });
}

if (typeof window !== 'undefined') {
  window.onGameStarted = onGameStarted;
}
