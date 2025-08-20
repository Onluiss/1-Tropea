"use strict";

import { isBrowser } from "./utils/isBrowser.js";
import { shuffle }    from "./utils/shuffle.js";

import {
  cardScale,
  animationAudio, audio, cardPlayAudio, cardWinAudio, myTurnAudio,
  cardImages, cardValues, emoticons
} from "./constants/constants.js";

let urlParams, tableId, currentTableId, roleParam, userName, userRole;

if (isBrowser()) {
  urlParams        = new URLSearchParams(window.location.search);
  tableId          = urlParams.get('tableId');
  currentTableId   = tableId;
  roleParam        = urlParams.get('role') || 'player';
  userName         = urlParams.get('userName') || "Guest";
  userRole         = roleParam.toLowerCase(); // "creator", "player" o "viewer"
}

export const state = {
  // Parametri e configurazione iniziale
  urlParams,
  tableId,
  currentTableId,
  roleParam,
  userName,
  userRole,

  // Costanti
  cardScale,
  isViewer: (userRole === 'viewer'),
  animationAudio,
  audio,
  cardPlayAudio,
  cardWinAudio,
  myTurnAudio,
  cardImages,
  cardValues,
  emoticons,

  // Funzioni utili
  shuffle,      // ora state.shuffle() è definito

  // Stato del gioco e altre proprietà dinamiche
  isMyTurn: (userRole === 'creator'),
  turnTimer: 'off',    // "off" | "bottom" | "top"
  timerInterval: null,
  cardAlreadyClicked: false,
  ablyRealtime: null,
  ablyChannel: null,
  briscolaImage: null,
  shuffledCards: null,
  gameStarted: false,
  deckIndex: 40,
  playerHands: {},
  cardsDisplayedForViewer: false,
  hasViewerRequestedCards: false,
  briscolaAnimated: false,
  initialGameSetupDone: false,
  isDetailsWindowShown: false,
  isUpdatingPlaceholderBars: false,
  viewerForcedSwap: false,

  // Traccia delle carte giocate
  creatorPlayedCard: null,
  playerPlayedCard: null,
  creatorPlayedIndex: null,
  playerPlayedIndex: null,

  // Punteggi
  creatorPoints: 0,
  playerPoints: 0,
  creatorGamesWon: 0,
  playerGamesWon: 0,
  
  timerRemaining : 45,      // valore di default
  timeOffset     : 0,       // ← differenza (ms) tra clock locale e clock Ably
  timerExpiry    : null, // scadenza assoluta (ms epoca)
  
  timer_duration_secs: 45,
  arc_full_secs: 60,

  // Gestione placeholders alto/basso
  placeholdersSwapped: false,

  // Avvisi e gestione duplicazioni
  activeAlerts: [],
  alreadyHandled: {},

  // Mappa dei ruoli su clientId
  roleToClientId: {
    creator: null,
    players: []
  },

  isBusy: false,        // Indica se siamo nel mezzo di una giocata/distribuzione
  pendingRequests: [],  // Se arriva un viewer e isBusy è true, accumuliamo qui le richieste

  // Richiesta di visualizzazione carte e autorizzazioni per viewer
  hasRequestedCards: false,
  viewerAuthorization: { creator: false, player: false },
  briscolaDrawn: false,
  currentTurn: 'creator',
  
  iWasBusy: false,
  busyUnwinding: false,
  
  lastSnapshot: '',
  
  creatorHandSubscribed: false,
  requestCardsSubscribedCreator: false,
  
  playerHandSubscribed: false,
  requestCardsSubscribedPlayer: false,
  
  detailsClosedSubscribed: false,
  cardsRefusedSubscribed: false,
  sendCardsSubscribed: false,
  deckUpdateSubscribed: false,
  

  animateBriscolaSubscribed: false,
  messageSubscribed: false,
  briscolaSubscribed: false,
  gameStateSubscribed: false,
  
  requestCurrentDeckSubscribed: false,
  gameStartedSubscribed: false,
  cardPlayedSubscribed: false,
  drawCardSubscribed: false,
  cardsDistributedSubscribed: false,
  gameEndedSubscribed: false,
  resetGameSubscribed: false,
  timerTickSubscribed: false,
  timerStartSubscribed: false,
  

 

  // … eventuali altre flag di subscription …
};

if (typeof window !== 'undefined') {
  window.state = state;
}
