// ui-utils/showDetailsAfterDelay.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { showDetailsWindow } from './showDetailsWindow.js';

export function showDetailsAfterDelay(delayMs = 1000) {
  if (!isBrowser()) return;

  // callback nominata per setTimeout
  function onTimeout() {
    if (state.isDetailsWindowShown) return;
    showDetailsWindow();
    state.isDetailsWindowShown = true;
  }

  setTimeout(onTimeout, delayMs);
}

if (typeof window !== 'undefined') {
  window.showDetailsAfterDelay = showDetailsAfterDelay;
}
