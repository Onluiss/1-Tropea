// connection/handleCreatorHand.js
"use strict";

import { state } from '../state.js';
import { assignCreatorHand } from '../hand/assignCreatorHand.js';
import { publishDeckState } from '../deck/publishDeckState.js';

export async function handleCreatorHand(message) {
  if (message.data?.playerName !== state.userName) return;
  await assignCreatorHand(message.data.hand);
  publishDeckState();
}

if (typeof window !== 'undefined') {
  window.handleCreatorHand = handleCreatorHand;
}
