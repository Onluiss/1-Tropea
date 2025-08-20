// connection/initAblyTimeOffset.js
"use strict";

export async function initAblyTimeOffset() {
  return new Promise(resolve => {
    // se l’istanza non è pronta, abort (evita crash in SSR)
    if (!state.ablyRealtime) {
      console.warn('[timeSync] ablyRealtime mancante!');
      state.timeOffset = 0;
      return resolve(0);
    }

    state.ablyRealtime.connection.time((err, serverTime) => {
      const offset = err ? 0 : serverTime - Date.now();
      state.timeOffset = offset;
      resolve(offset);
    });
  });
}

if (typeof window !== 'undefined') {
  window.initAblyTimeOffset = initAblyTimeOffset;
}
