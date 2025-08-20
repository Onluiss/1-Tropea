// /utils/setBusy.js
"use strict";

export function setBusy() {
    state.isBusy = true;
}

if (typeof window !== 'undefined') {
  window.setBusy = setBusy;
}
