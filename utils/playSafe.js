// /utils/playSafe.js
"use strict";

import { getCallerTag } from '../callerTag.js';

export function playSafe(audioObj, { volume = 1, reset = true } = {}) {
    
  try { console.log(getCallerTag()); } catch {}
  
  if (!audioObj) return;
  if (reset) audioObj.currentTime = 0;
  audioObj.volume = volume;
  return audioObj.play().catch(() => {});
}

if (typeof window !== 'undefined') {
  window.playSafe = playSafe;
}
