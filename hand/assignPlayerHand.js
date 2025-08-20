// hand/assignPlayerHand.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';
import { publish } from '../utils/publish.js';
import { initializeMyCards } from '../hand/initializeMyCards.js';
import { updateTalonCounter } from '../contatore/updateTalonCounter.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export async function assignPlayerHand(hand) {
  if (!isBrowser()) return;
  if (state.userRole !== 'player') return;

//////////////////////////////////////////////////////////////
try { console.log(getCallerTag()); } catch {}
//////////////////////////////////////////////////////////////

  state.playerHands = state.playerHands || {};
  state.roleToClientId = state.roleToClientId || { creator: null, players: [] };
  if (!Number.isFinite(state.deckIndex)) state.deckIndex = 40;

  const myHand = Array.isArray(hand) ? hand : [];
  state.playerHands[state.userName] = myHand;

  const creatorCards = document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3');
  const playerCards  = document.querySelectorAll('.player-card1, .player-card2, .player-card3');

  const creatorTransforms = getTransformSet('creator', 'top', 3) || [];
  const playerTransforms  = getTransformSet('player', 'bottom', 3) || [];

  const canPublish = !!state.ablyChannel;
  const safePublish = (evt, data) => { if (canPublish) { try { publish(state.ablyChannel, evt, data); } catch {} } };

  // Trova mano del creator
  let creatorId = state.roleToClientId?.creator
    || Object.keys(state.playerHands).find(k => k !== state.userName) || null;

  let creatorHand = (creatorId && state.playerHands[creatorId]) || [];
  if (!creatorHand || creatorHand.length === 0) {
    await new Promise(r => setTimeout(r, 5));
    creatorId = state.roleToClientId?.creator
      || Object.keys(state.playerHands).find(k => k !== state.userName) || null;
    creatorHand = (creatorId && state.playerHands[creatorId]) || [];
  }

  // Mostra carte del creator come retro
  const nCreator = Math.min(creatorCards.length, creatorTransforms.length);
  for (let i = 0; i < nCreator; i++) {
    const wrapper = creatorCards[i];
    const img = wrapper && wrapper.querySelector ? wrapper.querySelector('img') : null;

    const deckIndexForThisCard = Number.isFinite(state.deckIndex) ? state.deckIndex : undefined;
    if (deckIndexForThisCard !== undefined) {
      const deckCard = document.querySelector(`.deck-card${deckIndexForThisCard}`);
      if (deckCard) deckCard.style.display = 'none';
    }

    if (img && wrapper) {
      img.src = '/carte-napoletane/asssss.png';
      img.alt = 'Carta Creatore (retro)';
      img.dataset.front = 'false';
      wrapper.style.display = 'block';
      wrapper.style.transition = 'none';
      if (creatorTransforms[i]) wrapper.style.transform = creatorTransforms[i];
    }

    if (Number.isFinite(state.deckIndex)) state.deckIndex--;

    if (creatorHand && creatorHand[i] != null) {
      safePublish('cards-distributed', {
        type: 'assignSingleCreatorCard',
        cardAssigned: creatorHand[i],
        deckIndex: deckIndexForThisCard,
        initialDistribution: true
      });
    }
  }

  // Mostra carte del player scoperte
  const nPlayer = Math.min(myHand.length, playerCards.length, playerTransforms.length);
  for (let i = 0; i < nPlayer; i++) {
    const card = myHand[i];
    const wrapper = playerCards[i];
    const img = wrapper && wrapper.querySelector ? wrapper.querySelector('img') : null;

    const deckIndexForThisCard = Number.isFinite(state.deckIndex) ? state.deckIndex : undefined;
    if (deckIndexForThisCard !== undefined) {
      const deckCard = document.querySelector(`.deck-card${deckIndexForThisCard}`);
      if (deckCard) deckCard.style.display = 'none';
    }

    if (img && wrapper) {
      img.src = `/carte-napoletane/${card}`;
      img.alt = `Carta Giocatore ${i + 1}: ${card}`;
      img.dataset.front = 'true';
      wrapper.style.display = 'block';
      wrapper.style.transition = 'none';
      if (playerTransforms[i]) wrapper.style.transform = playerTransforms[i];
    }

    if (Number.isFinite(state.deckIndex)) state.deckIndex--;

    safePublish('cards-distributed', {
      type: 'assignSinglePlayerCard',
      cardAssigned: card,
      deckIndex: deckIndexForThisCard,
      initialDistribution: true
    });
  }

  try { initializeMyCards(); } catch {}
  try { updateTalonCounter(); } catch {}
}

if (typeof window !== 'undefined') {
  window.assignPlayerHand = assignPlayerHand;
}
