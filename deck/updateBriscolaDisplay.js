// deck/updateBriscolaDisplay.js
"use strict";

export function updateBriscolaDisplay() {
  // Protezione SSR / Node
  if (!isBrowser()) return;
  // console.log(`updateBriscolaDisplay ← Chiamata da ${getCallerTag()}`);
  const wrapper = document.querySelector('.deck-card1');
  if (!wrapper) return;

  if (!state.briscolaDrawn && state.briscolaImage) {
    const img = wrapper.querySelector('img');
    wrapper.style.display = 'block';
    if (img) {
      img.src = `/carte-napoletane/${state.briscolaImage}`;
      img.alt = `Briscola: ${state.briscolaImage}`;
    }
    if (state.briscolaAnimated) {
      Object.assign(wrapper.style, {
        transition: 'none',
        zIndex: '20',
        transform: 'translate(-150%, -50%) translate3d(242px,122px,0) rotate(1.7deg) scale(0.2114)'
      });
    } else {
      Object.assign(wrapper.style, { transition: '', zIndex: '', transform: '' });
    }
  } else {
    Object.assign(wrapper.style, { display: 'none', zIndex: '', transform: '' });
  }
}

if (typeof window !== 'undefined') {
  window.updateBriscolaDisplay = updateBriscolaDisplay;
}
