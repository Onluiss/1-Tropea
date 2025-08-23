// /contatore/updateTalonCounter.js
"use strict";

import { state } from '../state.js';
import { isBrowser } from '../utils/isBrowser.js';
import { ensureTalonCounter } from './ensureTalonCounter.js';
import { getCallerTag } from '../callerTag.js';

export function updateTalonCounter() {
  if (!isBrowser()) return;
  try { console.log(getCallerTag()); } catch {}
  const board = document.getElementById('game-board');

  if (!board) return;

  const counter = ensureTalonCounter();
  if (!counter) return;

  const allDeckCards = Array.from(board.querySelectorAll('.deck-card'));
  const deckCards = allDeckCards.filter(card =>
    card && card.style.display !== 'none' && !card.classList.contains('deck-card1')
  );

  if (deckCards.length === 0) {
    counter.style.display = 'none';
    return;
  }

  const topCard = deckCards[0];
  if (!topCard || typeof topCard.getBoundingClientRect !== 'function' || typeof board.getBoundingClientRect !== 'function') {
    counter.style.display = 'none';
    return;
  }

  let cardRect, boardRect;
  try {
    cardRect  = topCard.getBoundingClientRect();
    boardRect = board.getBoundingClientRect();
  } catch {
    counter.style.display = 'none';
    return;
  }
  if (!cardRect || !boardRect) {
    counter.style.display = 'none';
    return;
  }

  const centerX = (cardRect.left + cardRect.width  / 2) - boardRect.left;
  const centerY = (cardRect.top  + cardRect.height / 2) - boardRect.top;

  counter.style.left = `${centerX}px`;
  counter.style.top  = `${centerY}px`;

  const displayCount = Math.max(0, Number(state.deckIndex) || 0);
  counter.textContent = String(displayCount);
  counter.style.display = displayCount > 0 ? 'block' : 'none';
}

if (typeof window !== 'undefined') {
  window.updateTalonCounter = updateTalonCounter;
}
