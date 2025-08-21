// deck/initializeDeckForRole.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { prepareDeck } from './prepareDeck.js';
import { playAudioAndStartAnimations } from '../connection/playAudioAndStartAnimations.js';

export function initializeDeckForRole() {
  if (!isBrowser()) return;

  const root = document.getElementById('game-board');
  if (!root) return;

  // esegui solo se il mazzo non esiste nel board
  if (!root.querySelector('.deck-card')) {

    try { prepareDeck(); } catch {}
    try { playAudioAndStartAnimations(); } catch {}
  }
}

if (typeof window !== 'undefined') {
  window.initializeDeckForRole = initializeDeckForRole;
}