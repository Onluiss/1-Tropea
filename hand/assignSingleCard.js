// /1-Tropea/hand/assignSingleCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { setBusy } from '../utils/setBusy.js';
import { state } from '../state.js';
import { initializeMyCards } from './initializeMyCards.js';
import { processEndOfBusy } from '../connection/processEndOfBusy.js';
import { checkForGameEnd } from '../utils/checkForGameEnd.js';
import { clearBusy } from '../utils/clearBusy.js';
import { updateTalonCounter } from '../contatore/updateTalonCounter.js';
import { findFreeSlotIndex } from '../utils/findFreeSlotIndex.js';
import { getTransformSet } from '../utils/getTransformSet.js';
import { publish } from '../utils/publish.js';
import { animateCard } from '../animations/animateCard.js';
import { riposizionaLaMiaMano } from '../animations/riposizionaLaMiaMano.js';
import { riposizionaTutteLeMani } from '../animations/riposizionaTutteLeMani.js';

export async function assignSingleCard(role, animate = true) {
  if (!isBrowser()) return null;

  let card = null;
  try {
    // 1) Busy
    if (animate) {
      setBusy();
      state.iWasBusy = (state.userRole === role);
    }

    // 2) Mazzo vuoto
    if (state.deckIndex <= 0) {
      if (state.userRole === role) {
        initializeMyCards();
        processEndOfBusy();
        checkForGameEnd();
      }
      return null; // clearBusy in finally
    }

    // 3) Pesca carta (gestione briscola)
    const currentDeckIndex = state.deckIndex;
    let deckCardElement = null;

    if (currentDeckIndex === 1) {
      card            = state.briscolaImage;
      deckCardElement = document.querySelector('.deck-card1');
      state.briscolaDrawn = true;
    } else {
      if (!state.shuffledCards?.length) return null;
      card            = state.shuffledCards.shift();
      deckCardElement = document.querySelector(`.deck-card${currentDeckIndex}`);
    }

    // 4) Decrementa contatore mazzo
    state.deckIndex--;
    try { updateTalonCounter(); } catch {}

    // 5) Client destinatario
    const isCreator = (role === 'creator');
    const clientId  = isCreator
      ? state.roleToClientId?.creator
      : (state.roleToClientId?.players?.[0] ?? null);
    if (!clientId) return null;

    // 6) Assicura array mano
    if (!state.playerHands[clientId]) state.playerHands[clientId] = [null, null, null];

    // 7) Slot libero e stato
    const cardClass  = isCreator ? 'creator-card' : 'player-card';
    const cardEls    = document.querySelectorAll(`.${cardClass}1, .${cardClass}2, .${cardClass}3`);
    const indexToUse = findFreeSlotIndex(cardEls);
    if (indexToUse < 0) return null;

    state.playerHands[clientId][indexToUse] = card;

    // 8) Prepara DOM placeholder
    const cardWrapper = cardEls[indexToUse] || null;
    const cardImg     = cardWrapper ? cardWrapper.querySelector('img') : null;
    if (cardWrapper) cardWrapper.style.display = 'none';

    const useBottom       = state.userRole === role
      || (state.userRole === 'viewer' && state.viewerAuthorization?.[role]);
    const position        = useBottom ? 'bottom' : 'top';
    const transforms      = getTransformSet(role, position, 3) || [];
    const finalTransform  = transforms[indexToUse] ?? '';

    if (cardImg) {
      cardImg.src         = useBottom ? `/carte-napoletane/${card}` : '/carte-napoletane/asssss.png';
      cardImg.alt         = useBottom
        ? `Carta ${isCreator ? 'Creatore' : 'Giocatore'} ${indexToUse + 1}: ${card}`
        : `Carta (retro)`;
      cardImg.dataset.front = useBottom ? 'true' : 'false';
    }

    // 9) Notifica
    publish(state.ablyChannel, 'cards-distributed', {
      type: isCreator ? 'assignSingleCreatorCard' : 'assignSinglePlayerCard',
      cardAssigned: card,
      assignedTo: role,
      deckIndex: currentDeckIndex,
      playerHands: state.playerHands,
      initialDistribution: false
    });

    // 10) Animazione
    if (animate && state.userRole !== 'viewer') {
      if (deckCardElement && cardWrapper) {
        await animateCard(deckCardElement, cardWrapper, finalTransform, role);
      }
      processEndOfBusy();
    } else {
      if (cardWrapper) {
        cardWrapper.style.display   = 'block';
        cardWrapper.style.transform = finalTransform;
      }
      if (animate && deckCardElement && cardWrapper) {
        animateCard(deckCardElement, cardWrapper, finalTransform, role)
          .then(() => processEndOfBusy())
          .catch(() => processEndOfBusy());
      }
    }

    // 11) Se è la mia carta, aggiorna mano e layout
    if (state.userRole === role) {
      initializeMyCards();
      riposizionaLaMiaMano(role);
      riposizionaTutteLeMani();
    }

    // 12) Ritorna la carta
    return card;
  } finally {
    // Sempre pulizia busy
    try { clearBusy(); } catch {}
  }
}

if (typeof window !== "undefined") {
  window.assignSingleCard = assignSingleCard;
}
