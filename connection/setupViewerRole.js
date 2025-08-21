// connection/setupViewerRole.js
"use strict";

import { sub } from '../utils/sub.js';
import { onDetailsClosed } from './onDetailsClosed.js';
import { onCardsRefused } from './onCardsRefused.js';
import { onSendCards } from './onSendCards.js';
import { onDeckUpdate } from './onDeckUpdate.js';
import { onGameState } from './onGameState.js';

export function setupViewerRole() {
  /* 0️⃣ chiusura finestra dettagli */
  sub('details-closed', onDetailsClosed,  'detailsClosedSubscribed');

  /* 1️⃣ rifiuto delle richieste carte */
  sub('cards-refused',  onCardsRefused,   'cardsRefusedSubscribed');

  /* 2️⃣ invio carte concesse */
  sub('send-cards',     onSendCards,      'sendCardsSubscribed');

  /* 3️⃣ aggiornamento mazzo */
  sub('deck-update',    onDeckUpdate,     'deckUpdateSubscribed');

  /* 4️⃣ stato di gioco completo */
  sub('game-state',     onGameState,      'gameStateSubscribed');
}

if (typeof window !== 'undefined') {
  window.setupViewerRole = setupViewerRole;
}
