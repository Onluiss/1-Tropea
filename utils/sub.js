// /utils/sub.js
"use strict";

import { state } from '../state.js';
import { legacySub } from '../utils/legacySub.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function sub(...args) {
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  /* ► Nuova firma: (eventName, handler, flag[, channel]) */
  if (typeof args[0] === 'string') {
    const [event, cb, flag, channel = state.ablyChannel] = args;

    if (!channel || state[flag]) return () => {};
    state[flag] = true;

    /* usa la logica collaudata del legacy */
    const unsubscribe = legacySub(channel, event, cb);

    /* reset automatico del flag */
    return () => {
      if (state[flag]) state[flag] = false;
      unsubscribe();
    };
  }

  /* ► Vecchia firma: (channel, eventName, handler) */
  return legacySub(...args);
}

if (typeof window !== 'undefined') {
  window.sub = sub;
}
