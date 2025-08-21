// connection/onMessage.js
"use strict";

import { addMessageReceived } from '../chat/addMessageReceived.js';

export function onMessage(msg) {
  if (msg?.data) addMessageReceived(msg.data);
}

if (typeof window !== 'undefined') {
  window.onMessage = onMessage;
}
