// animations/displayOpponentCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { resetTimers } from '../timer/resetTimers.js';
import { updatePlaceholderBars } from '../placeholders/updatePlaceholderBars.js';
import { state } from "../state.js";
import { getViewerCardTransform } from '../utils/getViewerCardTransform.js';
import { playSafe } from '../utils/playSafe.js';
import { repositionOtherCardsForViewer } from '../animations/repositionOtherCardsForViewer.js';
import { getTransformValue } from '../utils/getTransformValue.js';
import { repositionOpponentCards } from '../animations/repositionOpponentCards.js';

export function displayOpponentCard(playerName, card, cardIndex) {
  if (!isBrowser()) return;
  
    resetTimers();
    updatePlaceholderBars();

  if (state.userRole === 'viewer') {
    // Determina il ruolo in base al nome
    let playedRole = '';
    const trimmed = playerName.trim().toLowerCase();
    const creatorId = state.roleToClientId.creator?.trim().toLowerCase() || '';
    const playerIds = state.roleToClientId.players?.map(p => p.trim().toLowerCase()) || [];

    if (creatorId === trimmed)       playedRole = 'creator';
    else if (playerIds.includes(trimmed)) playedRole = 'player';
    else return;

    const transform = getViewerCardTransform(playedRole, state.placeholdersSwapped);
    const el = document.querySelector(`.${playedRole}-card${cardIndex+1}`);
    if (!el) return;

    const img = el.querySelector('img');
    if (img) {
      img.src = `/carte-napoletane/${card}`;
      img.alt = `Carta del ${playedRole}: ${card}`;
      img.dataset.front = "true";
    }

    el.style.transition = 'transform 0.2s ease-in-out';
    // eslint-disable-next-line no-unused-expressions
    el.offsetWidth;
    playSafe(state.cardPlayAudio)
      .finally(() => { el.style.transform = transform; });

    el.classList.add('card-played');
    el.addEventListener('transitionend', function handler() {
      el.removeEventListener('transitionend', handler);
      repositionOtherCardsForViewer(playedRole, cardIndex+1);
    });
    el.style.pointerEvents = 'none';
    return;
  }

  // Se non viewer, mostro la carta avversaria nel modo corrispondente
  let wrapper, opponentRole;
  if (state.userRole === 'creator') {
    wrapper = document.querySelector(`.player-card${cardIndex+1}`);
    opponentRole = 'player';
  } else if (state.userRole === 'player') {
    wrapper = document.querySelector(`.creator-card${cardIndex+1}`);
    opponentRole = 'creator';
  } else return;

  if (!wrapper) return;
  const img = wrapper.querySelector('img');
  if (img) {
    img.src = `/carte-napoletane/${card}`;
    img.alt = `Carta avversario: ${card}`;
    img.dataset.front = "true";
  }

  const finalTransform = getTransformValue(cardIndex+1, opponentRole, false);
  wrapper.style.transition = 'transform 0.2s ease-in-out';
  // eslint-disable-next-line no-unused-expressions
  wrapper.offsetWidth;
  playSafe(state.cardPlayAudio)
    .finally(() => { wrapper.style.transform = finalTransform; });

  wrapper.classList.add('card-played');
  wrapper.addEventListener('transitionend',
  function handler() {
    wrapper.removeEventListener('transitionend', handler);
    repositionOpponentCards(opponentRole, cardIndex+1);
  });
  wrapper.style.pointerEvents = 'none';
}

if (typeof window !== 'undefined') {
  window.displayOpponentCard = displayOpponentCard;
}
