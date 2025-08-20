// connection/handleRequestCardsPlayer.js
"use strict";

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
