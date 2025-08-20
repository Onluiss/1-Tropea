// connection/onMessage.js
"use strict";

export function onMessage(msg) {
  if (msg?.data) addMessageReceived(msg.data);
}

if (typeof window !== 'undefined') {
  window.onMessage = onMessage;
}
