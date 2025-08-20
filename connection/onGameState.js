// connection/onGameState.js
"use strict";

export function onGameState(message) {
  const data = message.data;                // Estraggo il payload dal messaggio
  if (!data) return;                        // Se non c’è data, esco

  const viewerPerspectiveSwapped = state.placeholdersSwapped;
                                            // Salvo l’impostazione corrente di placeholdersSwapped

  /* ——— Timer per lo spettatore ——— */
  if (state.userRole === 'viewer') {        // Se sono uno spettatore
    if (data.isBusy || data.turnTimer === 'off') {
      state.turnTimer = 'off';              //   disabilito il timer
    } else {
      const currentTurn = data.currentTurn; //   prendo il turno corrente dal server
      //   imposto il timer in alto o in basso a seconda di placeholdersSwapped
      state.turnTimer = viewerPerspectiveSwapped
        ? (currentTurn === 'creator' ? 'top' : 'bottom')
        : (currentTurn === 'creator' ? 'bottom' : 'top');
    }
  } else {
    // Se non sono viewer, uso direttamente il valore ricevuto (o 'off' di default)
    state.turnTimer = data.turnTimer || 'off';
  }

  /* ——— Sincronizzo placeholdersSwapped per creator/player ——— */
  if (state.userRole !== 'viewer') {
    state.placeholdersSwapped = !!data.placeholdersSwapped;
  }

  /* ——— Stato di “busy” ——— */
  state.isBusy = !!data.isBusy;             // Aggiorno il flag busy

  /* ——— Turno e carte giocate ——— */
  state.currentTurn        = data.currentTurn       || 'creator';
  state.creatorPlayedCard  = data.creatorPlayedCard;
  state.playerPlayedCard   = data.playerPlayedCard;
  state.creatorPlayedIndex = data.creatorPlayedIndex;
  state.playerPlayedIndex  = data.playerPlayedIndex;

  /* ——— Mani dei giocatori ——— */
  // Se viene inviato un nuovo objeto playerHands, lo applico;
  // altrimenti mantengo quello già in memoria
  state.playerHands = data.playerHands || state.playerHands;

  /* ——— Aggiorno il contatore del mazzo in UI ——— */
  updateTalonCounter();                     // Ridisegna badge numero carte
}

if (typeof window !== 'undefined') {
  window.onGameState = onGameState;
}
