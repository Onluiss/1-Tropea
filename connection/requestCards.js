// connection/requestCards.js
"use strict";

export function requestCards(role) {
  if (!isBrowser()) return;
  
  if (state.userRole !== 'viewer') return;
  state.hasRequestedCards = true;
  publish(state.ablyChannel, 'request-cards', { role, requester: state.userName });
}

if (typeof window !== 'undefined') {
  window.requestCards = requestCards;
}
