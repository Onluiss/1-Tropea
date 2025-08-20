// /animations/animateBriscolaCard.js
"use strict";

import { state } from '../state.js';
import { isBrowser } from '../utils/isBrowser.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export async function animateBriscolaCard() {
  if (!isBrowser()) return;
  // Seleziona l'elemento DOM che contiene la carta
  const briscolaCardWrapper = document.querySelector('.deck-card1');
  if (!briscolaCardWrapper) return;

  // Trasformazione finale
  const finalTransform =
    'translate(-150%, -50%) translate3d(242px, 122px, 0px) rotate(1.7deg) scale(0.2114)';

  // Applica immediatamente il "frame finale"
  briscolaCardWrapper.style.display    = 'block';
  briscolaCardWrapper.style.transition = '';
  briscolaCardWrapper.style.transform  = finalTransform;
  briscolaCardWrapper.style.zIndex     = '20';

  // Aggiorna stato e notifiche
  state.briscolaAnimated = true;
}

if (typeof window !== 'undefined') {
  window.animateBriscolaCard = animateBriscolaCard;
}
