// /utils/removeViewer.js
"use strict";

import { state } from '../state.js';

export function removeViewer(username) {
  if (username === state.userName) {
    // Protezione SSR / Node
    if (typeof window !== 'undefined' && window.top) {
      window.top.location.href = '/';
    }
  }
}

if (typeof window !== 'undefined') {
  window.removeViewer = removeViewer;
}
