// /ui-utils/hideOverlay.js
"use strict";

export function hideOverlay(overlayEl) {
  if (!isBrowser()) return;
  overlayEl.style.display = 'none';
}

if (typeof window !== 'undefined') {
  window.hideOverlay = hideOverlay;
}
