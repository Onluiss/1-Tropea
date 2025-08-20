// /placeholders/updatePlaceholderBars.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getParticipants } from '../connection/getParticipants.js';
import { buildViewerPlaceholders } from './buildViewerPlaceholders.js';
import { buildUserPlaceholders } from './buildUserPlaceholders.js';
import { getTimerContent } from './getTimerContent.js';
import { applyPlaceholders } from './applyPlaceholders.js';
import { updateClockArcs } from '../timer/updateClockArcs.js';
import { startGlobalTimer } from '../timer/startGlobalTimer.js';
import { getCallerTag } from '../callerTag.js';

export function updatePlaceholderBars() {
  if (!isBrowser()) return;
  try { console.log(getCallerTag()); } catch {}

  if (state.isBusy || state.isUpdatingPlaceholderBars) return;

  const presence = state && state.ablyChannel && state.ablyChannel.presence;
  if (!presence || typeof presence.get !== 'function') return;

  state.isUpdatingPlaceholderBars = true;

  // IMPORTANTE: chiamare get direttamente su presence per mantenere il `this`
  presence.get((err, members) => {
    state.isUpdatingPlaceholderBars = false;
    if (err) return;

    const participants = getParticipants(members);
    let placeholders;

    if (state.userRole === 'viewer') {
      placeholders = buildViewerPlaceholders(participants);
    } else {
      placeholders = buildUserPlaceholders(participants);

      if (state.turnTimer === 'bottom') {
        placeholders.bottomHtml = getTimerContent(
          state.userRole === 'creator' ? participants.creatorNum  : participants.playerNum,
          state.userRole === 'creator' ? participants.creatorName : participants.playerName
        );
      } else if (state.turnTimer === 'top') {
        placeholders.topHtml = getTimerContent(
          state.userRole === 'creator' ? participants.playerNum  : participants.creatorNum,
          state.userRole === 'creator' ? participants.playerName : participants.creatorName
        );
      }
    }

    if (!placeholders) placeholders = { topHtml: "", bottomHtml: "" };
    applyPlaceholders(placeholders);

    if (state.turnTimer === 'top' || state.turnTimer === 'bottom') {
      updateClockArcs();
      startGlobalTimer({ resume: true });
    }
  });
}

if (typeof window !== 'undefined') {
  window.updatePlaceholderBars = updatePlaceholderBars;
}
