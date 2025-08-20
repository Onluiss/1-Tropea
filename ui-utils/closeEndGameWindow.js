// /endgame/closeEndGameWindow.js
"use strict";

export function closeEndGameWindow() {
  // Protezione da SSR/Node
  if (!isBrowser()) return;

  if (window.parent !== window) {
    window.parent.postMessage(
      { type: 'remove-table', tableId: state.currentTableId },
      '*'
    );
  } else {
    publish(state.ablyChannel, 'remove-table', { tableId: state.currentTableId });
  }

  const endGameWindow = document.getElementById('end-game-window');
  if (endGameWindow) endGameWindow.remove();

  setTimeout(() => {
    // Torna alla home
    if (window.top) {
      window.top.location.href = '/';
    }
  }, 500);
}

if (typeof window !== 'undefined') {
  window.closeEndGameWindow = closeEndGameWindow;
}
