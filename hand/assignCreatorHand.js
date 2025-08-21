// hand/assignCreatorHand.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';
import { publish } from '../utils/publish.js';
import { initializeMyCards } from './initializeMyCards.js';
import { updateTalonCounter } from '../contatore/updateTalonCounter.js';

export async function assignCreatorHand(hand) {
  if (!isBrowser()) return;
  if (state.userRole !== 'creator') return;

  // Setup base
  state.playerHands = state.playerHands || {};
  if (!Number.isFinite(state.deckIndex)) state.deckIndex = 40;

  state.playerHands[state.userName] = Array.isArray(hand) ? hand : [];

  // DOM queries
  const creatorCards = document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3');
  const playerCards  = document.querySelectorAll('.player-card1, .player-card2, .player-card3');

  // Transforms
  const creatorTransforms = getTransformSet('creator', 'bottom', 3) || [];
  const playerTransforms  = getTransformSet('player', 'top', 3) || [];

  // Helper publish sicuro
  const canPublish = !!state.ablyChannel;
  const safePublish = (evt, data) => { if (canPublish) try { publish(state.ablyChannel, evt, data); } catch {} };

  // Assegna carte al creator
  const nCreator = Math.min(hand.length, creatorCards.length, creatorTransforms.length);
  for (let i = 0; i < nCreator; i++) {
    const card    = hand[i];
    const wrapper = creatorCards[i];
    const img     = wrapper && wrapper.querySelector ? wrapper.querySelector('img') : null;

    // Hide carta dal mazzo corrente
    if (Number.isFinite(state.deckIndex)) {
      const deckCard = document.querySelector(`.deck-card${state.deckIndex}`);
      if (deckCard) deckCard.style.display = 'none';
    }

    if (img && wrapper) {
      img.src = `/carte-napoletane/${card}`;
      img.alt = `Carta Creatore ${i + 1}: ${card}`;
      img.dataset.front = 'true';

      wrapper.style.display = 'block';
      wrapper.style.transition = 'none';
      if (creatorTransforms[i]) wrapper.style.transform = creatorTransforms[i];
    }

    if (Number.isFinite(state.deckIndex)) state.deckIndex--;

    safePublish('cards-distributed', {
      type: 'assignSingleCreatorCard',
      cardAssigned: card,
      deckIndex: (Number.isFinite(state.deckIndex) ? state.deckIndex + 1 : undefined),
      initialDistribution: true
    });
  }

  // Ricava mano player diversa dal creator
  const myHand = state.playerHands[state.userName];
  const playerHand = Object.values(state.playerHands).find(h => h !== myHand) || [];

  // Assegna carte al player (retro)
  const nPlayer = Math.min(playerHand.length, playerCards.length, playerTransforms.length);
  for (let i = 0; i < nPlayer; i++) {
    const card    = playerHand[i];
    const wrapper = playerCards[i];
    const img     = wrapper && wrapper.querySelector ? wrapper.querySelector('img') : null;

    if (Number.isFinite(state.deckIndex)) {
      const deckCard = document.querySelector(`.deck-card${state.deckIndex}`);
      if (deckCard) deckCard.style.display = 'none';
    }

    if (img && wrapper) {
      img.src = '/carte-napoletane/asssss.png';
      img.alt = 'Carta Giocatore (retro)';
      img.dataset.front = 'false';

      wrapper.style.display = 'block';
      wrapper.style.transition = 'none';
      if (playerTransforms[i]) wrapper.style.transform = playerTransforms[i];
    }

    if (Number.isFinite(state.deckIndex)) state.deckIndex--;

    safePublish('cards-distributed', {
      type: 'assignSinglePlayerCard',
      cardAssigned: card,
      deckIndex: (Number.isFinite(state.deckIndex) ? state.deckIndex + 1 : undefined),
      initialDistribution: true
    });
  }

  try { initializeMyCards(); } catch {}
  try { updateTalonCounter(); } catch {}
}

if (typeof window !== 'undefined') {
  window.assignCreatorHand = assignCreatorHand;
}
