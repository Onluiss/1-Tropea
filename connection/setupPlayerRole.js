// connection/setupPlayerRole.js
"use strict";

import { sub } from '../utils/sub.js';
import { handlePlayerHand } from './handlePlayerHand.js';
import { handleRequestCardsPlayer } from './handleRequestCardsPlayer.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function setupPlayerRole() {
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  sub('player-hand',    handlePlayerHand,        'playerHandSubscribed');
  sub('request-cards',  handleRequestCardsPlayer,'requestCardsSubscribedPlayer');
}

if (typeof window !== 'undefined') {
  window.setupPlayerRole = setupPlayerRole;
}
