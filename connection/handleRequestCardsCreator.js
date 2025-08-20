// connection/handleRequestCardsCreator.js
"use strict";

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
