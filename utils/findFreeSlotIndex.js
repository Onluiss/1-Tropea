// /utils/findFreeSlotIndex.js
"use strict";

import { isBrowser } from './isBrowser.js';

export function findFreeSlotIndex(cardPlaceholders) {
  if (!isBrowser()) return -1;

  const list = Array.from(cardPlaceholders || []);
  if (!list.length) return -1;

  for (let j = 0; j < list.length; j++) {
    const wrapper = list[j];
    if (!wrapper || !wrapper.classList) continue;

    if (
      wrapper.classList.contains("card-played") ||
      wrapper.style.display === "none"
    ) {
      wrapper.classList.remove("card-played");
      wrapper.style.display    = "block";
      wrapper.style.transform  = "";
      wrapper.style.transition = "";
      return j;
    }
  }
  return -1;
}

if (typeof window !== 'undefined') {
  window.findFreeSlotIndex = findFreeSlotIndex;
}
