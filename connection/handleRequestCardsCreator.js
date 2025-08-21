// connection/handleRequestCardsCreator.js
"use strict";

import { state } from '../state.js';
import { sendRequestedCards } from '../chat/sendRequestedCards.js';
import { publish } from '../utils/publish.js';
import { showConfirmationAlert } from '../chat/showConfirmationAlert.js';

export function handleRequestCardsCreator(message) {
  const { role, requester } = message.data ?? {};
  if (state.userRole !== 'creator' || role !== 'creator') return;

  /** accetta la richiesta */
  function acceptCreatorRequest() {
    sendRequestedCards('creator', requester);
  }
  /** rifiuta la richiesta */
  function refuseCreatorRequest() {
    publish(state.ablyChannel, 'cards-refused', { requester });
  }

  showConfirmationAlert(
    `${requester} richiede di visualizzare le tue carte. Accetti?`,
    acceptCreatorRequest,
    refuseCreatorRequest
  );
}

if (typeof window !== 'undefined') {
  window.handleRequestCardsCreator = handleRequestCardsCreator;
}
