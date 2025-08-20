// /placeholders/applyPlaceholders.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { getCallerTag } from '../callerTag.js';

export function applyPlaceholders({ topHtml, bottomHtml }) {
  if (!isBrowser()) return;
  
  try { console.log(getCallerTag()); } catch {}
  
  const topEl    = document.querySelector('.placeholder-bar');
  const bottomEl = document.querySelector('.placeholder-bar-bottom');
  if (topEl)    topEl.innerHTML    = topHtml    || '';
  if (bottomEl) bottomEl.innerHTML = bottomHtml || '';
}

if (typeof window !== 'undefined') {
  window.applyPlaceholders = applyPlaceholders;
}
