// /placeholders/getTimerContent.js
"use strict";

import { getCallerTag } from '../callerTag.js';

export function getTimerContent(userNumber, userName) {
  try { console.log(getCallerTag()); } catch {}
  
  return `
  <div class="placeholder-info">
    <div class="placeholder-timer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="60" fill="#1f1f1f"/>
        <path class="clock-arc"
              fill="#ff582d" stroke="#ff582d" stroke-width="0.5"
              d="M60 60 L60 8 A52 52 0 0 1 60 8 Z"/>
        <text class="clock-tm" x="60" y="78" text-anchor="middle"></text>
      </svg>
    </div>
    <div class="placeholder-info-nick">${userName}</div>
  </div>`;
}

if (typeof window !== 'undefined') {
  window.getTimerContent = getTimerContent;
}
