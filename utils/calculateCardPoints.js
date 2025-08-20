// /utils/calculateCardPoints.js
"use strict";

export function calculateCardPoints(cardName) {
  if (!isBrowser()) return;
  const numberPart = cardName.split('-')[0];
  switch (numberPart) {
    case "1":  return 11;
    case "3":  return 10;
    case "10": return 4;
    case "9":  return 3;
    case "8":  return 2;
    default:   return 0;
  }
}

if (typeof window !== 'undefined') {
  window.calculateCardPoints = calculateCardPoints;
}
