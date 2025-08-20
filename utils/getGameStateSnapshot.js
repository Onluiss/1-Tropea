// /utils/getGameStateSnapshot.js
"use strict";

export function getGameStateSnapshot() {
  // 👉 deep-clone di array/oggetti che potresti mutare in seguito
  const clone = JSON.parse(JSON.stringify({
    briscolaImage:        state.briscolaImage,
    shuffledCards:        state.shuffledCards,
    playerHands:          state.playerHands,
    creatorPlayedCard:    state.creatorPlayedCard,
    playerPlayedCard:     state.playerPlayedCard,
    creatorPlayedIndex:   state.creatorPlayedIndex,
    playerPlayedIndex:    state.playerPlayedIndex,
    briscolaAnimated:     state.briscolaAnimated,
    briscolaDrawn:        state.briscolaDrawn,
    deckIndex:            state.deckIndex,
    currentTurn:          state.currentTurn,
    placeholdersSwapped:  state.placeholdersSwapped,
    turnTimer:            state.turnTimer,
    timerRemaining:       state.timerRemaining,
    timerExpiry:          state.timerExpiry,
    isBusy:               state.isBusy,

    /* --- punteggi --- */
    creatorPoints:        state.creatorPoints,
    playerPoints:         state.playerPoints,
    creatorGamesWon:      state.creatorGamesWon,
    playerGamesWon:       state.playerGamesWon,

    /* --- ruoli (necessari al ripristino da viewer) --- */
    roleToClientId:       state.roleToClientId
  }));

  return clone;
}

if (typeof window !== 'undefined') {
  window.getGameStateSnapshot = getGameStateSnapshot;
}
