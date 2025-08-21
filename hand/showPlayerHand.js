// /hand/showPlayerHand.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

export function showPlayerHand() {
  // Protezione SSR / Node
  if (!isBrowser()) return;

  // Se l'utente è player, uso state.userName, altrimenti prendo il primo ID diverso
  let playerId = (state.userRole === "player")
      ? state.userName
      : Object.keys(state.playerHands).find(key => key !== state.userName);

  const pHand = state.playerHands[playerId] || [];
  const placeholders = document.querySelectorAll(".player-card1, .player-card2, .player-card3");
  const isMyHand = (playerId === state.userName);

  placeholders.forEach((slot, i) => {
    const cardName = pHand[i];
    const img = slot.querySelector("img");

    // Mostro sempre lo slot
    slot.style.display = "block";

    if (cardName) {
      // C'è carta: se è la mia mano la mostro, altrimenti retro
      if (isMyHand) {
        img.src = `/carte-napoletane/${cardName}`;
        img.alt = `Carta Giocatore ${i + 1}: ${cardName}`;
        img.dataset.front = "true";
      } else {
        img.src = `/carte-napoletane/asssss.png`;
        img.alt = "Carta Giocatore (retro)";
        img.dataset.front = "false";
      }
    } else {
      // Nessuna carta: mostro retro
      img.src = `/carte-napoletane/asssss.png`;
      img.alt = "Carta Giocatore (retro)";
      img.dataset.front = "false";
    }
  });
}

if (typeof window !== 'undefined') {
  window.showPlayerHand = showPlayerHand;
}
