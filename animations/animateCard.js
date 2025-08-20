// /animations/animateCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { playSafe } from '../utils/playSafe.js';
import { state } from '../state.js';

export async function animateCard(deckCard, cardWrapper, finalTransform, type) {
  if (!isBrowser()) return;

  playSafe(state.animationAudio);
  
  deckCard.style.transition = 'transform 0.3s ease-in-out';
  // Forzo il reflow per assicurare che il browser applichi la transizione
  // (lettura di offsetWidth)
  // eslint-disable-next-line no-unused-expressions
  deckCard.offsetWidth;
  deckCard.style.transform = finalTransform;

  await new Promise(resolve =>
    deckCard.addEventListener('transitionend', resolve, { once: true })
  );

  deckCard.style.display = 'none';
  deckCard.style.transform = '';
  cardWrapper.style.display = 'block';
  cardWrapper.style.transform = finalTransform;
}

if (typeof window !== 'undefined') {
  window.animateCard = animateCard;
}
