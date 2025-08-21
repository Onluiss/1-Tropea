"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { resetPlayedSlot } from '../utils/resetPlayedSlot.js';
import { state } from "../state.js";

export function animateCardsOut(playedCardElements, translateDirection, callback) {
  // Se non siamo in un browser, esci immediatamente
  if (!isBrowser()) return;

  // Se non ci sono elementi o l’array è vuoto, esegui il callback e restituisci una Promise risolta
  if (!playedCardElements || playedCardElements.length === 0) {
    if (callback) callback();
    return Promise.resolve();
  }

  let completed = 0;                          // Contatore carte animate
  const total   = playedCardElements.length;  // Totale carte da animare

  // Ritorna una Promise che si risolve al termine di tutte le animazioni
  return new Promise(resolve => {
    playedCardElements.forEach(cardEl => {
      // Forzo un reflow per assicurarmi che la transition venga applicata
      // eslint-disable-next-line no-unused-expressions
      cardEl.offsetWidth;

      // Metto la carta in primo piano e imposto la durata/curva della transizione
      cardEl.style.zIndex     = '1000';
      cardEl.style.transition = 'transform 1s ease-in-out';

      // Leggo la trasformazione corrente per concatenarla a quella di scarto
      const style            = window.getComputedStyle(cardEl);
      const currentTransform = style.transform === 'none' ? '' : style.transform;
      // Applico lo scarto verso l’alto o verso il basso
      cardEl.style.transform = currentTransform + translateDirection;

      // Al termine della transizione
      cardEl.addEventListener('transitionend', function onEnd() {
        // Rimuovo il listener per evitare doppie chiamate
        cardEl.removeEventListener('transitionend', onEnd);
        // Ripristino lo zIndex originale
        cardEl.style.zIndex = '';
        completed++;  // Incremento contatore

        // Se ho animato tutte le carte…
        if (completed === total) {
          // Reset dei slot delle carte giocate, mantenendo visibili per lo spettatore
          playedCardElements.forEach(slot => {
            resetPlayedSlot(slot, { keepVisible: state.userRole === 'viewer' });
          });
          // Esegui il callback di fine animazione, se fornito
          if (callback) callback();
          // Risolvo la Promise
          resolve();
        }
      });
    });
  });
}

if (typeof window !== 'undefined') {
  window.animateCardsOut = animateCardsOut;
}
