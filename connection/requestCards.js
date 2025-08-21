// connection/requestCards.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { publish } from '../utils/publish.js';

export function requestCards(role) {
  if (!isBrowser()) return;
  
  if (state.userRole !== 'viewer') return;
  state.hasRequestedCards = true;
  publish(state.ablyChannel, 'request-cards', { role, requester: state.userName });
}

if (typeof window !== 'undefined') {
  window.requestCards = requestCards;
}
