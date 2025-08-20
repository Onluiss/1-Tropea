// connection/setupCreatorRole.js
"use strict";

import { sub } from '../utils/sub.js';
import { handleCreatorHand } from './handleCreatorHand.js';
import { handleRequestCardsCreator } from './handleRequestCardsCreator.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function setupCreatorRole() {
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  sub('creator-hand',   handleCreatorHand,      'creatorHandSubscribed');
  sub('request-cards',  handleRequestCardsCreator, 'requestCardsSubscribedCreator');
}

if (typeof window !== 'undefined') {
  window.setupCreatorRole = setupCreatorRole;
}
