// animations/flipToBackAndTransform.js
"use strict";

export function flipToBackAndTransform(wrapper, transform, ruolo = 'Player', force = false) {
  // questa non accede a window/document, ma tocca il DOM
  if (!isBrowser()) return;

  const img = wrapper.querySelector("img");
  if (img && (img.dataset.front!=="true"||force)) {
    img.src = '/carte-napoletane/asssss.png';
    img.alt = `Carta ${ruolo} (retro)`;
    img.dataset.front = 'false';
  }
  wrapper.style.transform = transform;
}

if (typeof window !== 'undefined') {
  window.flipToBackAndTransform = flipToBackAndTransform;
}
