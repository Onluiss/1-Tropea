// connection/onResetGame.js
"use strict";

import { state } from '../state.js';
import { startMyTurn } from '../utils/startMyTurn.js';
import { endMyTurn } from '../utils/endMyTurn.js';
import { prepareDeck } from '../deck/prepareDeck.js';
import { setupBriscolaCard } from './setupBriscolaCard.js';

export function onResetGame() {
  window.gameStateMessage = null;

  // 1) turno iniziale
  if (state.userRole === "creator") {
    startMyTurn();
  } else {
    endMyTurn();
  }
  document.body.classList.remove("my-turn-active");

  // 2) reset dati di gioco
  state.deckIndex = 40;
  state.briscolaImage = null;
  state.shuffledCards = [];
  state.briscolaAnimated = state.briscolaDrawn = false;
  state.playerHands = {};
  state.creatorPlayedCard = state.playerPlayedCard = null;
  state.creatorPlayedIndex = state.playerPlayedIndex = null;
  state.creatorPoints = state.playerPoints = 0;
  state.placeholdersSwapped = false;
  state.cardsDisplayedForViewer = false;
  state.hasViewerRequestedCards = false;
  state.viewerAuthorization = { creator: false, player: false };
  state.gameStarted = false;
  state.initialGameSetupDone = false;
  state.alreadyHandled = {};
  state.lastSnapshot = '';  // azzera cache‑buster

  // 3) pulizia UI carte giocate
  document.querySelectorAll(
    ".creator-card1, .creator-card2, .creator-card3," +
    ".player-card1,  .player-card2,  .player-card3"
  ).forEach(ph => {
    ph.classList.remove("card-played", "card-disabled", "my-card");
    ph.style.display    = "none";
    ph.style.transform  = "";
    ph.style.transition = "";
    const img = ph.querySelector("img");
    if (img) {
      img.src = img.alt = "";
      img.dataset.front = "false";
    }
  });

  // 4) ripristino mazzo
  let deckCards = document.querySelectorAll(".deck-card");
  if (deckCards.length < 40) {
    deckCards.forEach(c => c.remove());
    prepareDeck();
    deckCards = document.querySelectorAll(".deck-card");
  }
  deckCards.forEach(c => {
    c.style.display   = "block";
    c.style.transform = "";
    const img = c.querySelector("img");
    if (img) {
      img.src = "/carte-napoletane/asssss.png";
      img.alt = "Carta Mazzo";
    }
  });

  // 5) azzera punteggi UI
  const cps = document.getElementById("creator-points");
  const pps = document.getElementById("player-points");
  if (cps) cps.textContent = "Creatore: 0 punti";
  if (pps) pps.textContent = "Giocatore: 0 punti";

  // 6) setup iniziale briscola (solo creator)
  if (state.userRole === "creator") {
    setTimeout(setupBriscolaCard, 100);
  }
}

if (typeof window !== 'undefined') {
  window.onResetGame = onResetGame;
}
