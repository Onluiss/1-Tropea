// /alerts/closeAlert.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { updateAlertPositions } from '../chat/updateAlertPositions.js';

export function closeAlert(alertId) {
  if (!isBrowser()) return;
  const el = document.getElementById(alertId);
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.remove();
    state.activeAlerts = state.activeAlerts.filter(a => a.id !== alertId);
    updateAlertPositions();
  }, 500);
}

if (typeof window !== 'undefined') {
  window.closeAlert = closeAlert;
}
