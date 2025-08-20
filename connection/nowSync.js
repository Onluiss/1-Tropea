// connection/nowSync.js
"use strict";

export const nowSync = () => {
  const time = Date.now() + (state.timeOffset ?? 0);
  return time;
};

if (typeof window !== 'undefined') {
  window.nowSync = nowSync;
}
