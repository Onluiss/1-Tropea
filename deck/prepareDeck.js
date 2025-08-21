"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { updateTalonCounter } from '../contatore/updateTalonCounter.js';

export function prepareDeck() {
  if (!isBrowser()) return;

  const doc  = document;
  const root = doc.getElementById('game-board');
  if (!root) return;

  // idempotenza: se esiste già almeno una .deck-card non creare nulla
  if (root.querySelector('.deck-card')) return;

  const totalDeckCards = 40;
  const src = (window.state && window.state.cardBackUrl) || '/carte-napoletane/asssss.png'; // imposta un path valido nel tuo ambiente

  for (let i = 1; i <= totalDeckCards; i++) {
    const deckCard = doc.createElement('div');
    deckCard.classList.add('deck-card', `deck-card${i}`);
    const img = doc.createElement('img');
    img.src = src;
    img.alt = 'Carta Mazzo';
    deckCard.appendChild(img);
    root.appendChild(deckCard);
  }

  try { updateTalonCounter?.(); } catch {}
}

if (typeof window !== "undefined") {
  window.prepareDeck = prepareDeck;
}
