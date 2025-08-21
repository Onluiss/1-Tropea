// /utils/publishGameState.js
"use strict";

import { state } from '../state.js';
import { getGameStateSnapshot } from './getGameStateSnapshot.js';

export function publishGameState(overrides = {}) {
  if (!state?.ablyChannel) return;

  const payload = {
    ...getGameStateSnapshot(),
    turnTimer: state.turnTimer,
    ...overrides
  };

  const ser = JSON.stringify(payload);
  if (ser === state.lastSnapshot) return;   // niente doppioni
  state.lastSnapshot = ser;

  state.ablyChannel.publish('game-state', payload);
}

if (typeof window !== 'undefined') {
  window.publishGameState = publishGameState;
}
