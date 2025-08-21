// /utils/playSafe.js
"use strict";

export function playSafe(audioObj, { volume = 1, reset = true } = {}) {
  if (!audioObj) return;
  if (reset) audioObj.currentTime = 0;
  audioObj.volume = volume;
  return audioObj.play().catch(() => {});
}

if (typeof window !== 'undefined') {
  window.playSafe = playSafe;
}
