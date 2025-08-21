"use strict";

import { isBrowser } from '../utils/isBrowser.js';

export function setupImageErrorHandlers(fbSrc='/carte-napoletane/asssss.png',fbAlt='Image Not Available') {
  if (!isBrowser()) return;
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error',()=>{
      if (!img.dataset.fallback) {
        img.src=fbSrc; img.alt=fbAlt; img.dataset.fallback='true';
      }
    });
  });
}

if (typeof window !== 'undefined') {
  window.setupImageErrorHandlers = (deps) => setupImageErrorHandlers(deps);
}
