// connection/triggerRestart.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { publish } from '../utils/publish.js';
import { state } from '../state.js';

export function triggerRestart() {
  if (!isBrowser()) return;
  publish(state.ablyChannel, 'game-started');
}

if (typeof window !== 'undefined') {
  window.triggerRestart = triggerRestart;
}
