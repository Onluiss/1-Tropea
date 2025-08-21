// connection/onCardsRefused.js
"use strict";

import { state } from '../state.js';
import { showAlert } from '../chat/showAlert.js';

export function onCardsRefused(message) {
  if (message.data?.requester === state.userName) {
    showAlert('custom-alert');
  }
}

if (typeof window !== 'undefined') {
  window.onCardsRefused = onCardsRefused;
}
