// connection/setupPlayerRole.js
"use strict";

import { sub } from '../utils/sub.js';
import { handlePlayerHand } from './handlePlayerHand.js';
import { handleRequestCardsPlayer } from './handleRequestCardsPlayer.js';

export function setupPlayerRole() {
  sub('player-hand',    handlePlayerHand,        'playerHandSubscribed');
  sub('request-cards',  handleRequestCardsPlayer,'requestCardsSubscribedPlayer');
}

if (typeof window !== 'undefined') {
  window.setupPlayerRole = setupPlayerRole;
}
