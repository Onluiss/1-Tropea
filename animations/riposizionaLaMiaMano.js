'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';

export function riposizionaLaMiaMano(ruolo) {
  if (!isBrowser()) return 0;

  const role = (ruolo === 'creator' || ruolo === 'player') ? ruolo : null;
  if (!role) {
    try { console.warn('[riposizionaLaMiaMano] ruolo non valido:', ruolo); } catch {}
    return 0;
  }

  const selettoriCarte = role === 'creator'
    ? ['.creator-card1', '.creator-card2', '.creator-card3']
    : ['.player-card1',  '.player-card2',  '.player-card3'];

  const doc = document;
  const placeholders = selettoriCarte.map(sel => doc.querySelector(sel));

  const staInBasso = (role === state.userRole);
  const posizione  = staInBasso ? 'bottom' : 'top';

  let transformazioni = [];
  try {
    transformazioni = (typeof getTransformSet === 'function'
      ? (getTransformSet(role, posizione, 3) || [])
      : []);
  } catch { transformazioni = []; }

  if (!Array.isArray(transformazioni) || transformazioni.length < 3) {
    transformazioni = Array.from({ length: 3 }, (_, i) =>
      `translate(${i * 10}px, ${posizione === 'bottom' ? 100 : 0}px)`
    );
  }

  let applied = 0;
  placeholders.forEach((cartaEl, i) => {
    if (!cartaEl || cartaEl.style.display === 'none') return;
    const next = transformazioni[i] ?? '';
    cartaEl.style.transition = 'transform 0.3s ease-in-out';
    void cartaEl.offsetWidth;
    cartaEl.style.transform = next;
    cartaEl.dataset.riposizionata = '1'; // flag per test
    if (next) applied += 1;
  });

  return applied;
}

if (typeof window !== 'undefined') {
  window.riposizionaLaMiaMano = riposizionaLaMiaMano;
}
