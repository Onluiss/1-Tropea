// connection/triggerRestart.js
"use strict";

export function triggerRestart() {
  if (!isBrowser()) return;
  publish(state.ablyChannel, 'game-started');
}

if (typeof window !== 'undefined') {
  window.triggerRestart = triggerRestart;
}
