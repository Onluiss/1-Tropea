// /utils/setBusy.js
"use strict";

import { state } from '../state.js';

export function setBusy() {
    state.isBusy = true;
}

if (typeof window !== 'undefined') {
  window.setBusy = setBusy;
}
