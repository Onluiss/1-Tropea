// hand/assignSinglePlayerCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { assignSingleCard } from '../hand/assignSingleCard.js';
import { getCallerTag } from '../callerTag.js';


export async function assignSinglePlayerCard(animate = true) {
  if (!isBrowser()) return null;
  
  try { console.log(getCallerTag()); } catch {}
  
  const card = await assignSingleCard('player', animate);
  return card;
}

if (typeof window !== "undefined") {
  window.assignSinglePlayerCard = assignSinglePlayerCard;
}
