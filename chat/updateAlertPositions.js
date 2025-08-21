// chat/updateAlertPositions.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

export function updateAlertPositions() {
  if (!isBrowser()) return;
  let offsetTop = 10;
  state.activeAlerts.forEach(a => {
    a.style.top = `${offsetTop}px`;
    offsetTop += a.offsetHeight + 10;
  });
}

if (typeof window !== 'undefined') {
  window.updateAlertPositions = (deps) => updateAlertPositions(deps);
}
