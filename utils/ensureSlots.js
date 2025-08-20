// /utils/ensureSlots.js
"use strict";

export function ensureSlots(array, minSlots, placeholder) {
  if (!Array.isArray(array)) array = [];
  while (array.length < minSlots) {
    array.push(placeholder);
  }
  return array;
}

if (typeof window !== 'undefined') {
  window.ensureSlots = ensureSlots;
}
