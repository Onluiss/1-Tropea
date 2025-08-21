// hand/applyHandLayoutForRemainingCards.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';

export function applyHandLayoutForRemainingCards(role, animate = true) {
  // Protezione da SSR/Node
  if (!isBrowser()) return;

  // 👁️ Se sei spettatore, mostra carte retro e basta
  if (state.userRole === 'viewer') {
    const wrappers = role === 'creator'
      ? document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3')
      : document.querySelectorAll('.player-card1, .player-card2, .player-card3');
    wrappers.forEach(w => {
      w.style.display = 'block';
      const img = w.querySelector('img');
      if (img && img.dataset.front !== 'true') {
        img.src = '/carte-napoletane/asssss.png';
        img.alt = 'Carta (retro)';
        img.dataset.front = 'false';
      }
    });
    return;
  }

  // 🎯 Seleziona le carte del ruolo specificato
  const wrappers = Array.from(
    role === 'creator'
      ? document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3')
      : document.querySelectorAll('.player-card1, .player-card2, .player-card3')
  );

  // 🔍 Filtra carte visibili e non giocate
  const visible = wrappers.filter(w =>
    w.style.display !== 'none' && !w.classList.contains('card-played')
  );
  const count = visible.length;
  if (count < 1) return;

  // 📐 Ottieni il set di trasformazioni corretto in base alla posizione
  const position = (role === state.userRole) ? 'bottom' : 'top';
  const transforms = getTransformSet(role, position, count);

  // 🔄 Applica le trasformazioni animate (o no)
  visible.forEach((w, i) => {
    w.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
    w.offsetWidth;
    w.style.transform = transforms[i];
  });
}

if (typeof window !== 'undefined') {
  window.applyHandLayoutForRemainingCards = applyHandLayoutForRemainingCards;
}
