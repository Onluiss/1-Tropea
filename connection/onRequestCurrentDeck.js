// connection/onRequestCurrentDeck.js
"use strict";

import { state } from '../state.js';
import { respondToViewerRequest } from './respondToViewerRequest.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

const respondedTo = new Set();

export function onRequestCurrentDeck(msg) {
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  const r = msg?.data?.requester;
  if (!r || respondedTo.has(r)) return;
  if (state.isBusy) {
    if (!state.pendingRequests.some(m => m?.data?.requester === r)) {
      state.pendingRequests.push(msg);
      respondedTo.add(r);
    }
  } else {
    respondToViewerRequest(msg);
    respondedTo.add(r);
  }
}

if (typeof window !== 'undefined') {
  window.onRequestCurrentDeck = onRequestCurrentDeck;
}