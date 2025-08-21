// connection/onCardPlayed.js
"use strict";

import { state } from "../state.js";
import { displayOpponentCard } from "../animations/displayOpponentCard.js";
import { removeCardFromHand } from "../hand/removeCardFromHand.js";
import { setBusy } from "../utils/setBusy.js";
import { startMyTurn } from "../utils/startMyTurn.js";
import { playSafe } from "../utils/playSafe.js";
import { enableMyCards } from "../hand/enableMyCards.js";
import { processEndOfBusy } from "./processEndOfBusy.js";
import { evaluateRoundIfNeeded } from "../utils/evaluateRoundIfNeeded.js";

export function onCardPlayed(msg) {
  if (!msg || !msg.data) return;
  const { playerName, role, cardIndex, card } = msg.data;
  if (role !== "creator" && role !== "player") return;

  const isMe = playerName === state.userName;

  // Aggiorna mani & tavolo
  if (!isMe) {
    displayOpponentCard(playerName, card, cardIndex);
    if (
      state.playerHands &&
      state.playerHands[playerName] &&
      state.playerHands[playerName][cardIndex] != null
    ) {
      state.playerHands[playerName][cardIndex] = null;
    }
  } else {
    removeCardFromHand(cardIndex);
  }

  if (role === "creator") {
    state.creatorPlayedCard = card;
    state.creatorPlayedIndex = cardIndex;
  } else {
    state.playerPlayedCard = card;
    state.playerPlayedIndex = cardIndex;
  }

  // Quante carte sul tavolo?
  const creatorHas = !!state.creatorPlayedCard;
  const playerHas = !!state.playerPlayedCard;

  // 1) Una sola carta
  if (creatorHas !== playerHas) {
    state.iWasBusy = true;
    setBusy();

    // turno in base al role
    state.currentTurn = role === "creator" ? "player" : "creator";

    if (!isMe && state.userRole !== "viewer") {
      startMyTurn();
      setTimeout(() => {
        playSafe(state.myTurnAudio);
        enableMyCards();
        if (typeof document !== "undefined" && document.body && document.body.classList) {
          document.body.classList.add("my-turn-active");
        }
      }, 300);
    }

    processEndOfBusy();

  // 2) Entrambe le carte
  } else if (creatorHas && playerHas) {
    state.iWasBusy = true;
    setBusy();
    processEndOfBusy();
    evaluateRoundIfNeeded();
  }
}

if (typeof window !== "undefined") {
  window.onCardPlayed = onCardPlayed;
}
