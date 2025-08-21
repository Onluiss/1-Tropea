// /ui-utils/displayRequestedCards.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { aggiornaTimerViewerDopoSwap } from '../placeholders/aggiornaTimerViewerDopoSwap.js';
import { forceDisplayedCard } from '../animations/forceDisplayedCard.js';
import { updatePlaceholderBars } from '../placeholders/updatePlaceholderBars.js';
import { getTransformSet } from '../utils/getTransformSet.js';
import { repositionRemainingCardsForViewer } from '../animations/repositionRemainingCardsForViewer.js';
import { flipToBackAndTransform } from '../animations/flipToBackAndTransform.js';

export function displayRequestedCards(role, cards) {
  if (!isBrowser()) return;
  if (state.userRole !== 'viewer') return;

  state.viewerAuthorization[role] = true;
  state.hasViewerRequestedCards  = true;
  state.placeholdersSwapped      = (role === 'player');
  state.viewerForcedSwap         = true;

  aggiornaTimerViewerDopoSwap();

  if (state.creatorPlayedCard != null && typeof state.creatorPlayedIndex === 'number') {
    forceDisplayedCard('creator', state.creatorPlayedCard, state.creatorPlayedIndex);
  }
  if (state.playerPlayedCard != null && typeof state.playerPlayedIndex === 'number') {
    forceDisplayedCard('player', state.playerPlayedCard, state.playerPlayedIndex);
  }

  updatePlaceholderBars();

  const renderAndLayout = (r, els, pos) => {
    els.forEach((ph, i) => {
      const name = cards[i];
      if (!name && !ph.classList.contains('card-played')) {
        ph.style.display = 'none'; return;
      }
      if (name && !ph.classList.contains('card-played')) {
        ph.style.display = 'block';
        const img = ph.querySelector('img');
        img.src           = `/carte-napoletane/${name}`;
        img.alt           = `Carta ${r} ${i+1}: ${name}`;
        img.dataset.front = 'true';
      }
    });
    const visible = els.filter(ph => ph && ph.style.display!=='none' && !ph.classList.contains('card-played'));
    if (!visible.length) return;
    const tf = getTransformSet(r, pos, visible.length);
    visible.forEach((ph,i)=>ph.style.transform=tf[i]);
  };

  if (role==='player') {
    renderAndLayout('player', [
      document.querySelector('.player-card1'),
      document.querySelector('.player-card2'),
      document.querySelector('.player-card3')
    ], 'bottom');
    if (state.playerPlayedCard!=null) repositionRemainingCardsForViewer('player');
    if (state.creatorPlayedCard!=null) repositionRemainingCardsForViewer('creator');
  } else {
    renderAndLayout('creator', [
      document.querySelector('.creator-card1'),
      document.querySelector('.creator-card2'),
      document.querySelector('.creator-card3')
    ], 'bottom');
    if (state.creatorPlayedCard!=null) repositionRemainingCardsForViewer('creator');
    if (state.playerPlayedCard!=null) repositionRemainingCardsForViewer('player');
  }

  const other = role==='player'?'creator':'player';
  const otherEls = other==='player'
    ? [document.querySelector('.player-card1'),document.querySelector('.player-card2'),document.querySelector('.player-card3')]
    : [document.querySelector('.creator-card1'),document.querySelector('.creator-card2'),document.querySelector('.creator-card3')];
  const visO = otherEls.filter(ph=>ph&&ph.style.display!=='none'&&!ph.classList.contains('card-played'));
  if (visO.length) {
    const tfTop = getTransformSet(other,'top',visO.length);
    visO.forEach((ph,i)=>flipToBackAndTransform(ph,tfTop[i],other.charAt(0).toUpperCase()+other.slice(1)));
  }
}

if (typeof window !== 'undefined') {
  window.displayRequestedCards = displayRequestedCards;
}
