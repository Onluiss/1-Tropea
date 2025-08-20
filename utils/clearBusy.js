// /utils/clearBusy.js
"use strict";

export function clearBusy() {
    state.isBusy = false;
}

if (typeof window !== 'undefined') {
  window.clearBusy = clearBusy;
}
