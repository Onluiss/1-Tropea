// /hand/showCreatorHand.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

export function showCreatorHand() {
  // Protezione SSR / Node
  if (!isBrowser()) return;

  // Se l'utente è il creator, uso state.userName, altrimenti prendo il primo ID diverso
  let creatorId = (state.userRole === "creator")
      ? state.userName
      : Object.keys(state.playerHands).find(key => key !== state.userName);

  // Prendo la mano (può essere [] se non ancora arrivata)
  const cHand = state.playerHands[creatorId] || [];
  const placeholders = document.querySelectorAll(".creator-card1, .creator-card2, .creator-card3");
  const isMyHand = (creatorId === state.userName);

  placeholders.forEach((slot, i) => {
    const cardName = cHand[i];
    const img = slot.querySelector("img");

    // Mostro sempre lo slot (mai display:none)
    slot.style.display = "block";

    if (cardName) {
      // C'è una carta effettiva: se è la mia mano la mostro, altrimenti mostro il retro
      if (isMyHand) {
        img.src = `/carte-napoletane/${cardName}`;
        img.alt = `Carta Creatore ${i + 1}: ${cardName}`;
        img.dataset.front = "true";
      } else {
        img.src = `/carte-napoletane/asssss.png`;
        img.alt = "Carta Creatore (retro)";
        img.dataset.front = "false";
      }
    } else {
      // Non c'è carta in questo slot: mostro sempre il retro
      img.src = `/carte-napoletane/asssss.png`;
      img.alt = "Carta Creatore (retro)";
      img.dataset.front = "false";
    }
  });
}

if (typeof window !== 'undefined') {
  window.showCreatorHand = showCreatorHand;
}
