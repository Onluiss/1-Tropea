// connection/respondToViewerRequest.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { publishGameState } from '../utils/publishGameState.js';
import { publishDeckState } from '../deck/publishDeckState.js';

const snapshotSentTo = new Set();

export function respondToViewerRequest(message) {
  if (!isBrowser()) return;

  const requester = message?.data?.requester;
  if (!requester) return;

  // evita di rispondere più volte allo stesso viewer
  if (snapshotSentTo.has(requester)) return;
  snapshotSentTo.add(requester);

  /* callback nominata per presence.get */
  function onPresenceGetViewer(err, members) {
    if (err) return;

    const roles = ['player', 'creator'];

    // aggiorna le mappe ruolo → clientId
    const creator = members.find(
      m => m.data?.role?.toLowerCase() === 'creator'
    );
    state.roleToClientId.creator = creator?.clientId || null;
    state.roleToClientId.players = members
      .filter(m => m !== creator && roles.includes(m.data?.role?.toLowerCase()))
      .map(m => m.clientId);

    /* ── invia al viewer ciò che serve ─────────────────────────── */
    if (state.gameStarted) {
      // un unico snapshot completo, deduplicato da publishGameState()
      publishGameState();
    } else if (state.briscolaImage && state.shuffledCards) {
      // partita non avviata: basta lo stato del mazzo
      publishDeckState();
    }
  }

  state.ablyChannel.presence.get(onPresenceGetViewer);
}

if (typeof window !== 'undefined') {
  window.respondToViewerRequest = respondToViewerRequest;
}
