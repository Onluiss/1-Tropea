// animations/repositionRemainingCardsForViewer.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';

export function repositionRemainingCardsForViewer(role) {
  if (!isBrowser()) return;

  // Determina i selettori delle carte in base al ruolo
  const cardSelectors = role === 'player'
    ? ['.player-card1', '.player-card2', '.player-card3']
    : ['.creator-card1', '.creator-card2', '.creator-card3'];

  // Ottieni gli elementi DOM e filtra quelli visibili e non ancora giocati
  const wrappers = cardSelectors.map(sel => document.querySelector(sel));
  const visibleWrappers = wrappers.filter(
    w => w && w.style.display !== 'none' && !w.classList.contains('card-played')
  );

  // Calcola la posizione (top/bottom) per il viewer
  const position = (
    (role === 'player' && state.placeholdersSwapped) ||
    (role === 'creator' && !state.placeholdersSwapped)
  ) ? 'bottom' : 'top';

  const transforms = getTransformSet(role, position, visibleWrappers.length);

  visibleWrappers.forEach((wrapper, idx) => {
    wrapper.style.transition = 'transform 0.3s ease-in-out';
    // eslint-disable-next-line no-unused-expressions
    wrapper.offsetWidth;
    wrapper.style.transform = transforms[idx] || '';
  });
}

if (typeof window !== 'undefined') {
  window.repositionRemainingCardsForViewer = repositionRemainingCardsForViewer;
}
