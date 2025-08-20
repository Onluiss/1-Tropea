// connection/onConnectionFailed.js
"use strict";

export function onConnectionFailed(err) {
  console.error("Connessione Ably fallita:", err);
}

if (typeof window !== 'undefined') {
  window.onConnectionFailed = onConnectionFailed;
}
