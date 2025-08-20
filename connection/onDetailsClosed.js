// connection/onDetailsClosed.js
"use strict";

export function onDetailsClosed() {
  const w = document.getElementById('details-window');
  if (w) w.remove();
}

if (typeof window !== 'undefined') {
  window.onDetailsClosed = onDetailsClosed;
}
