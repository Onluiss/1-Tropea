// animations/forceDisplayedCard.js
"use strict";

export function forceDisplayedCard(role, cardName, cardIndex = 0) {
    // console.log(`forceDisplayedCard ← Chiamata da ${getCallerTag()}`);
  // Protezione SSR / Node
  if (!isBrowser()) return;

  const idx = cardIndex + 1;
  const wrapper = document.querySelector(`.${role}-card${idx}`);
  if (!wrapper) return;

  wrapper.classList.add('card-played', 'card-disabled');
  wrapper.style.pointerEvents = 'none';

  const img = wrapper.querySelector('img');
  if (img) {
    img.src = `/carte-napoletane/${cardName}`;
    img.alt = `Carta ${role} giocata: ${cardName}`;
    img.dataset.front = "true";
  }

  // Calcolo yTranslate
  let yTranslate;
  if (state.userRole === 'viewer') {
    const isCreator = role === 'creator';
    const swapped   = state.placeholdersSwapped;
    const show64    = (isCreator && !swapped) || (!isCreator && swapped);
    yTranslate = show64 ? '-64%' : '-86%';
  } else {
    yTranslate = (state.userRole === role) ? '-64%' : '-86%';
  }

  const finalTransform =
    `translate(-150%, ${yTranslate}) ` +
    `translate3d(493.601px, 368.226px, 0px) ` +
    `scale(var(--card-scale)) rotate(6deg)`;

  wrapper.style.transition = 'none';
  wrapper.style.transform  = finalTransform;
}

if (typeof window !== 'undefined') {
  window.forceDisplayedCard = forceDisplayedCard;
}
