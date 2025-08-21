// connection/onPresenceUpdate.js
"use strict";

import { updateUserList } from './updateUserList.js';
import { updatePlaceholderBars } from '../placeholders/updatePlaceholderBars.js';

export function onPresenceUpdate() {
  updateUserList();                // rinfresca la lista utenti
  updatePlaceholderBars(); // ridisegna le barre se serve
}

if (typeof window !== 'undefined') {
  window.onPresenceUpdate = onPresenceUpdate;
}
