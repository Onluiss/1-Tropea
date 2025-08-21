// deck/publishDeckState.js
"use strict";

import { publish } from '../utils/publish.js';
import { state } from '../state.js';

export function publishDeckState() {
  // console.log(`publishDeckState ← Chiamata da ${getCallerTag()}`);
  publish(state.ablyChannel,'deck-update',{
      shuffledDeck: state.shuffledCards,
      card: state.briscolaImage,
      deckIndex: state.deckIndex
    }
  );
}

if (typeof window !== 'undefined') {
  window.publishDeckState = publishDeckState;
}
