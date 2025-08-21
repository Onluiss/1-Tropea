// /ui-utils/playAudio.js
"use strict";

import { playSafe } from '../utils/playSafe.js';

export function playAudio(audio, options = { reset: false }) {
  playSafe(audio, options).catch(err =>
    console.error("Audio playback error:", err)
  );
}

if (typeof window !== 'undefined') {
  window.playAudio = playAudio;
}
