// /utils/getBriscolaSuit.js
"use strict";

export function getBriscolaSuit(briscolaCardName) {
  // protezione da ambienti SSR/Node
  if (!isBrowser()) return;

  if (!briscolaCardName) return '';
  const parts = briscolaCardName.split('-');
  return parts.length > 1 ? parts[1].charAt(0) : '';
}

if (typeof window !== 'undefined') {
  window.getBriscolaSuit = getBriscolaSuit;
}
