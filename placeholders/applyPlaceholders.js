// /placeholders/applyPlaceholders.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';

export function applyPlaceholders({ topHtml, bottomHtml }) {
  if (!isBrowser()) return;

  const topEl    = document.querySelector('.placeholder-bar');
  const bottomEl = document.querySelector('.placeholder-bar-bottom');
  if (topEl)    topEl.innerHTML    = topHtml    || '';
  if (bottomEl) bottomEl.innerHTML = bottomHtml || '';
}

if (typeof window !== 'undefined') {
  window.applyPlaceholders = applyPlaceholders;
}
