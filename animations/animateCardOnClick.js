// animations/animateCardOnClick.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { setBusy } from '../utils/setBusy.js';
import { getTransformValue } from '../utils/getTransformValue.js';
import { state } from '../state.js';
import { playSafe } from '../utils/playSafe.js';
import { publish } from '../utils/publish.js';
import { disableMyCards } from '../hand/disableMyCards.js';
import { repositionOtherCards } from '../animations/repositionOtherCards.js';
import { clearBusy } from '../utils/clearBusy.js';
import { processEndOfBusy } from '../connection/processEndOfBusy.js';
import { getCallerTag } from '../callerTag.js';

export function animateCardOnClick(cardElement) {
  if (!isBrowser() || !cardElement) return;
  
  try { console.log(getCallerTag()); } catch {}
  
  // busy start
  setBusy();

  // reset transform
  cardElement.style.transform  = "";
  cardElement.style.transition = "transform 0.1s ease-in-out";
  // force reflow
  cardElement.offsetWidth;

  const cardNumber     = parseInt(cardElement.dataset.cardNumber, 10);
  const transformValue = getTransformValue(cardNumber, state.userRole, true);
  const cardImg        = cardElement.querySelector('img');
  const cardSrc        = cardImg ? cardImg.src : '';
  const cardName       = cardSrc.substring(cardSrc.lastIndexOf('/') + 1);

  const maybe = playSafe(state.cardPlayAudio);
  if (maybe && typeof maybe.finally === 'function') {
    maybe.finally(() => { cardElement.style.transform = transformValue; });
  } else {
    cardElement.style.transform = transformValue;
  }

  const cardIndex = Number.isFinite(cardNumber) ? cardNumber - 1 : -1;
  publish(
    state.ablyChannel,
    'card-played',
    { playerName: state.userName, role: state.userRole, cardIndex, card: cardName }
  );

  disableMyCards();

  cardElement.addEventListener('transitionend', function transitionEndHandler() {
    cardElement.removeEventListener('transitionend', transitionEndHandler);

    repositionOtherCards(state.userRole, cardNumber);
    cardElement.style.pointerEvents = 'none';

    // busy end
    clearBusy();
    processEndOfBusy();
  });
}

if (typeof window !== 'undefined') {
  window.animateCardOnClick = animateCardOnClick;
}
