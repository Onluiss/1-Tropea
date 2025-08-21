// /chat/displayNewMessage.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { addMessageReceived } from './addMessageReceived.js';

export function displayNewMessage(message) {
    if (!isBrowser()) return;
    addMessageReceived(message);
}

if (typeof window !== 'undefined') {
  window.displayNewMessage = displayNewMessage;
}
