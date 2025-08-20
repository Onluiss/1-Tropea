// animations/animateWinningCards.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from "../state.js";
import { setBusy } from '../utils/setBusy.js';
import { playSafe } from '../utils/playSafe.js';
import { animateCardsOut } from '../animations/animateCardsOut.js';
import { isMyTurn } from '../utils/isMyTurn.js';
import { enableMyCards } from '../hand/enableMyCards.js';
import { disableMyCards } from '../hand/disableMyCards.js';
import { resetPlayedSlot } from '../utils/resetPlayedSlot.js';
import { endGame } from '../utils/endGame.js';
import { clearBusy } from '../utils/clearBusy.js';
import { processEndOfBusy } from '../connection/processEndOfBusy.js';
import { assignSingleCreatorCard } from '../hand/assignSingleCreatorCard.js';
import { publish } from '../utils/publish.js';
import { assignSinglePlayerCard } from '../hand/assignSinglePlayerCard.js';
import { checkForGameEnd } from '../utils/checkForGameEnd.js';

import { getCallerTag } from "../callerTag.js";

export async function animateWinningCards(winner, playedCards) {
  if (!isBrowser()) return;
  try { console.log(getCallerTag()); } catch {}

  // 1) Rimuovo le carte giocate dallo stato, con guardia su undefined
  if (typeof state.creatorPlayedIndex === 'number') {
    const cid = state.roleToClientId.creator;
    if (cid && state.playerHands[cid]) {
      state.playerHands[cid][state.creatorPlayedIndex] = null;
    }
  }
  if (typeof state.playerPlayedIndex === 'number') {
    const pid = state.roleToClientId.players?.[0];
    if (pid && state.playerHands[pid]) {
      state.playerHands[pid][state.playerPlayedIndex] = null;
    }
  }

  // 2) Segnalo inizio animazione
  setBusy();

  // 3) Calcolo direzione dello scarto
  const playedCardElements = document.querySelectorAll('.card-played');
  const winnerIsAtBottom = state.userRole === 'viewer'
    ? ((winner === 'player') ? state.placeholdersSwapped : !state.placeholdersSwapped)
    : (winner === state.userRole);
  const translateDirection = winnerIsAtBottom ? ' translateY(500vh)' : ' translateY(-500vh)';

  // 4) Suono di vittoria + animazione dei mazzi
  try { await playSafe(state.cardWinAudio); } catch {}
  await animateCardsOut(playedCardElements, translateDirection);

  // 5) Se il mazzo è finito ma il turno non è concluso, riabilito/disabilito
  const deckEmptyAndDrawn = state.deckIndex <= 0 && state.briscolaDrawn;
  if (deckEmptyAndDrawn) {
    isMyTurn() ? enableMyCards() : disableMyCards();
  }

  // 6) Verifico se il gioco è finito
  const allHandsEmpty = Object.values(state.playerHands)
    .every(hand => hand.every(c => c === null));
  if (deckEmptyAndDrawn && allHandsEmpty) {
    playedCardElements.forEach(slot =>
      resetPlayedSlot(slot, { keepVisible: state.userRole === 'viewer' })
    );
    endGame();
    clearBusy();
    processEndOfBusy();
    return;
  }

  // 7) Ridistribuisco carte SOLO se il mazzo NON è finito
  if (!deckEmptyAndDrawn && state.userRole !== 'viewer') {
    if (winner === 'creator') {
      const cardCreator = await assignSingleCreatorCard(true);
      if (cardCreator) publish(state.ablyChannel, 'draw-card', { role: 'creator', card: cardCreator });

      const cardPlayer = await assignSinglePlayerCard(true);
      if (cardPlayer) publish(state.ablyChannel, 'draw-card', { role: 'player', card: cardPlayer });
    } else {
      const cardPlayer = await assignSinglePlayerCard(true);
      if (cardPlayer) publish(state.ablyChannel, 'draw-card', { role: 'player', card: cardPlayer });

      const cardCreator = await assignSingleCreatorCard(true);
      if (cardCreator) publish(state.ablyChannel, 'draw-card', { role: 'creator', card: cardCreator });
    }
  }

  // 8) Fine round
  checkForGameEnd();
  clearBusy();
  processEndOfBusy();
}

if (typeof window !== 'undefined') {
  window.animateWinningCards = animateWinningCards;
}
