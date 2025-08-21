// connection/onExitClick.js
"use strict";

import { removeViewer } from '../utils/removeViewer.js';
import { state } from '../state.js';

export function onExitClick() {
  removeViewer(state.userName);
}

if (typeof window !== 'undefined') {
  window.onExitClick = onExitClick;
}
