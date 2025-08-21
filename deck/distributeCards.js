// deck/distributeCards.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { setupGameFromState } from '../utils/setupGameFromState.js';
import { setupBriscolaCard } from '../connection/setupBriscolaCard.js';

export function distributeCards() {
  // Protezione per ambienti senza DOM
  if (!isBrowser()) return;

  // Se il setup iniziale è già stato eseguito, termina subito
  if (state.initialGameSetupDone) {
    return;
  }

  // Se la partita è già iniziata o ho ricevuto uno snapshot,
  // richiamo la funzione di setup basata sullo stato salvato
  if (state.gameStarted || window.gameStateMessage) {
    setupGameFromState();
  } else {
    // Altrimenti (prima distribuzione, creator), eseguo la configurazione della briscola
    setupBriscolaCard();
  }
}

if (typeof window !== 'undefined') {
  window.distributeCards = distributeCards;
}
