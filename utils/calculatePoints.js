// /utils/calculatePoints.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { calculateCardPoints } from '../utils/calculateCardPoints.js';

import { getCallerTag } from "../callerTag.js";

export function calculatePoints(card1, card2) {
  // protezione da ambienti SSR/Node
  if (!isBrowser()) return;

  try { console.log(getCallerTag()); } catch {}
  
  const points1 = calculateCardPoints(card1);
  const points2 = calculateCardPoints(card2);
  return points1 + points2;
}

if (typeof window !== 'undefined') {
  window.calculatePoints = calculatePoints;
}
