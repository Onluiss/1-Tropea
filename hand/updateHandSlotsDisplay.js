// /hand/updateHandSlotsDisplay.js
'use strict';

export function updateHandSlotsDisplay(role, clientId) {
  // Protezione SSR / Node
  if (!isBrowser()) return;

  const selector = role === 'creator'
    ? '.creator-card1, .creator-card2, .creator-card3'
    : '.player-card1, .player-card2, .player-card3';

  document.querySelectorAll(selector).forEach((el, idx) => {
    const hasCard = !!state.playerHands[clientId]?.[idx];
    const isPlayed = el.classList.contains('card-played');
    el.style.display = (hasCard || isPlayed) ? 'block' : 'none';
  });

  applyHandLayoutForRemainingCards(role, false);
}

if (typeof window !== 'undefined') {
  window.updateHandSlotsDisplay = updateHandSlotsDisplay;
}
