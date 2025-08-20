// connection/onExitClick.js
"use strict";

export function onExitClick() {
  removeViewer(state.userName);
}

if (typeof window !== 'undefined') {
  window.onExitClick = onExitClick;
}
