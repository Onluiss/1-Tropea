// connection/handleRequestCardsPlayer.js
"use strict";

import { state } from '../state.js';
import { sendRequestedCards } from '../chat/sendRequestedCards.js';
import { publish } from '../utils/publish.js';
import { showConfirmationAlert } from '../chat/showConfirmationAlert.js';

export function handleRequestCardsPlayer(message) {
  const { role, requester } = message.data ?? {};
  if (state.userRole !== 'player' || role !== 'player') return;

  function acceptPlayerRequest() {
    sendRequestedCards('player', requester);
  }
  function refusePlayerRequest() {
    publish(state.ablyChannel, 'cards-refused', { requester });
  }

  showConfirmationAlert(
    `${requester} richiede di visualizzare le tue carte. Accetti?`,
    acceptPlayerRequest,
    refusePlayerRequest
  );
}

if (typeof window !== 'undefined') {
  window.handleRequestCardsPlayer = handleRequestCardsPlayer;
}
