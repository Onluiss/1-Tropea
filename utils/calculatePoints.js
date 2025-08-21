// /utils/calculatePoints.js
"use strict";

import { isBrowser } from './isBrowser.js';
import { calculateCardPoints } from './calculateCardPoints.js';

export function calculatePoints(card1, card2) {
  // protezione da ambienti SSR/Node
  if (!isBrowser()) return;

  const points1 = calculateCardPoints(card1);
  const points2 = calculateCardPoints(card2);
  return points1 + points2;
}

if (typeof window !== 'undefined') {
  window.calculatePoints = calculatePoints;
}
