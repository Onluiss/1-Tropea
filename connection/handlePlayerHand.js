// connection/handlePlayerHand.js
"use strict";

import { state } from '../state.js';
import { assignPlayerHand } from '../hand/assignPlayerHand.js';
import { publishDeckState } from '../deck/publishDeckState.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export async function handlePlayerHand(message) {
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  if (message.data?.playerName !== state.userName) return;
  await assignPlayerHand(message.data.hand);
  publishDeckState();
}

if (typeof window !== 'undefined') {
  window.handlePlayerHand = handlePlayerHand;
}
