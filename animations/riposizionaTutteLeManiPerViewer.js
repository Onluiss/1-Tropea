// animations/riposizionaTutteLeManiPerViewer.js
'use strict';

export function riposizionaTutteLeManiPerViewer() {
  if (!isBrowser()) return;

  const creatorCards = document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3');
  const playerCards  = document.querySelectorAll('.player-card1, .player-card2, .player-card3');

  // Usa placeholdersSwapped per decidere posizione attuale
  const creatorPosition = state.placeholdersSwapped ? 'top'    : 'bottom';
  const playerPosition  = state.placeholdersSwapped ? 'bottom' : 'top';

  creatorCards.forEach((cardEl, i) => {
    if (cardEl.style.display !== 'none') {
      const transforms = getTransformSet('creator', creatorPosition, 3);
      cardEl.style.transition = 'transform 0.3s ease-in-out';
      cardEl.offsetWidth;
      cardEl.style.transform = transforms[i] || '';
    }
  });

  playerCards.forEach((cardEl, i) => {
    if (cardEl.style.display !== 'none') {
      const transforms = getTransformSet('player', playerPosition, 3);
      cardEl.style.transition = 'transform 0.3s ease-in-out';
      cardEl.offsetWidth;
      cardEl.style.transform = transforms[i] || '';
    }
  });
}

if (typeof window !== 'undefined') {
  window.riposizionaTutteLeManiPerViewer = riposizionaTutteLeManiPerViewer;
}
