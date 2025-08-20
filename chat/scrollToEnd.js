"use strict";

export function scrollToEnd() {
    if (!isBrowser()) return;
  // Seleziona il contenitore della chat
  const container = document.getElementById('chat-container');
  if (container) {
    // Imposta lo scroll in fondo al contenitore
    container.scrollTop = container.scrollHeight;
  }
}

if (typeof window !== 'undefined') {
  window.scrollToEnd = deps => scrollToEnd(deps);
}
