// utils/setupGameFromState.js
"use strict";

import { isBrowser } from './isBrowser.js';
import { state } from '../state.js';
import { renderDeckForCurrentState } from '../deck/renderDeckForCurrentState.js';
import { ensureSlots } from './ensureSlots.js';
import { resetPlayedCardsDisplay } from '../animations/resetPlayedCardsDisplay.js';
import { showCreatorHand } from '../hand/showCreatorHand.js';
import { showPlayerHand } from '../hand/showPlayerHand.js';
import { displayAllCardsForViewer } from '../deck/displayAllCardsForViewer.js';
import { riposizionaTutteLeManiPerViewer } from '../animations/riposizionaTutteLeManiPerViewer.js';
import { updateBriscolaDisplay } from '../deck/updateBriscolaDisplay.js';
import { displayPlayedCard } from '../ui-utils/displayPlayedCard.js';
import { ensureRoleClientIds } from '../connection/ensureRoleClientIds.js';
import { updateHandSlotsDisplay } from '../hand/updateHandSlotsDisplay.js';
import { startMyTurn } from './startMyTurn.js';
import { endMyTurn } from './endMyTurn.js';
import { initializeMyCards } from '../hand/initializeMyCards.js';

export async function setupGameFromState() {
  if (!isBrowser()) return;

  /* Stop immediato se già effettuato o manca lo snapshot */
  if (state.initialGameSetupDone || !window.gameStateMessage) {
    console.log('[setupGameFromState] Skip: già completato o nessun snapshot.');
    return;
  }

  /* 1.  Importa lo snapshot nello state */
  Object.assign(state, window.gameStateMessage.data);

  /* 2.  Normalizza flag / default */
  state.placeholdersSwapped = !!state.placeholdersSwapped;
  state.isBusy             = !!state.isBusy;
  state.briscolaDrawn      = !!state.briscolaDrawn;
  state.deckIndex          = Number.isFinite(state.deckIndex) ? state.deckIndex : 40;
  state.currentTurn        = state.currentTurn || 'creator';
  state.turnTimer          = window.gameStateMessage.data.turnTimer || 'off';

  /* 3.  Redraw mazzo (senza updateTalonCounter qui) */
  renderDeckForCurrentState();

  /* 4.  Assicura tre carte nella mano del player */
  state.playerHands[state.userName] = ensureSlots(
    state.playerHands[state.userName],
    3,
    'asssss.png'
  );

  /* 5.  Chi tocca se c’è solo una carta sul tavolo */
  if (state.creatorPlayedCard && !state.playerPlayedCard && state.userRole === 'player') {
    state.currentTurn = 'player';
  } else if (state.playerPlayedCard && !state.creatorPlayedCard && state.userRole === 'creator') {
    state.currentTurn = 'creator';
  }

  /* 6.  Reset tavolo + mani */
  resetPlayedCardsDisplay();
  showCreatorHand();
  showPlayerHand();

  /* 7.  Se viewer: mostra tutto */
  if (state.userRole === 'viewer') {
    displayAllCardsForViewer();
    riposizionaTutteLeManiPerViewer();
  }

  /* 8.  Briscola */
  updateBriscolaDisplay();

  /* 9.  Carte già giocate sul tavolo */
  if (state.creatorPlayedCard != null && typeof state.creatorPlayedIndex === 'number') {
    displayPlayedCard('creator', state.creatorPlayedCard, state.creatorPlayedIndex);
  }
  if (state.playerPlayedCard != null && typeof state.playerPlayedIndex === 'number') {
    displayPlayedCard('player', state.playerPlayedCard, state.playerPlayedIndex);
  }

  /* 10. ClientId creatore / giocatore */
  const { creatorId, playerId } = await ensureRoleClientIds();

  /* 11. Slot vuoti/pieni */
  updateHandSlotsDisplay('creator', creatorId);
  updateHandSlotsDisplay('player',  playerId);

  /* 12. Turno attivo */
  const isMyTurn =
    (state.currentTurn === 'creator' && state.userRole === 'creator') ||
    (state.currentTurn === 'player'  && state.userRole === 'player');

  if (isMyTurn) startMyTurn(); else endMyTurn();
  document.body.classList.toggle('my-turn-active', isMyTurn);

  /* 13. Click & timer sulle mie carte */
  initializeMyCards();

  /* 15. Flag finale */
  state.initialGameSetupDone = true;
  console.log('[setupGameFromState] Completato.');
}

if (typeof window !== 'undefined') window.setupGameFromState = setupGameFromState;

