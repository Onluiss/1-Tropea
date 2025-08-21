// connection/connect.js
"use strict";

import { state } from '../state.js';
import { isBrowser } from '../utils/isBrowser.js';
import { animateBriscolaCard } from '../animations/animateBriscolaCard.js';

import { publish } from '../utils/publish.js';

import { onMessage } from './onMessage.js';
import { onBriscola } from './onBriscola.js';
import { onGameState } from './onGameState.js';
import { onRequestCurrentDeck } from './onRequestCurrentDeck.js';
import { onGameStarted } from './onGameStarted.js';
import { onCardPlayed } from './onCardPlayed.js';
import { onDrawCard } from './onDrawCard.js';
import { onCardsDistributed } from './onCardsDistributed.js';
import { onGameEnded } from './onGameEnded.js';
import { onResetGame } from './onResetGame.js';
import { onTimerTick } from './onTimerTick.js';
import { onTimerStart } from './onTimerStart.js';
import { onPresenceUpdate } from './onPresenceUpdate.js';
import { fetchChatHistory } from '../chat/fetchChatHistory.js';
import { onConnectionFailed } from './onConnectionFailed.js';
import { setupCreatorRole } from './setupCreatorRole.js';
import { setupPlayerRole } from './setupPlayerRole.js';
import { setupViewerRole } from './setupViewerRole.js';
import { showEndGameWindow } from '../ui-utils/showEndGameWindow.js';
import { setupGameFromState } from '../utils/setupGameFromState.js';

export async function connect() {
  // Se non siamo in un browser, non fare nulla
  if (!isBrowser()) return;

  // ① Cleanup: se esiste una sessione Ably attiva, chiudila
  if (state.ablyRealtime) {
    try {
      state.ablyRealtime.close();
    } catch {} // ignora eventuali errori
  }
  // ② Cleanup: se esiste un canale Ably, rimuovi listener e presence
  if (state.ablyChannel) {
    try {
      state.ablyChannel.off();
    } catch {}
    try {
      state.ablyChannel.presence.unsubscribe();
    } catch {}
  }

  // ③ Inizializza una nuova connessione Realtime con Ably
  try {
    state.ablyRealtime = new window.Ably.Realtime({
      key:      "TueUjg.5vi4KQ:oxqC1vVRXL_Feb-T_lPO0nu0ODiaKvi6xWosh14YTVI",
      clientId: state.userName
    });
  } catch (e) {
    // Se fallisce la connessione, esci
    console.error("Impossibile creare Realtime:", e);
    return;
  }

  // ④ Ottieni il canale di gioco corrispondente alla tableId
  state.ablyChannel = state.ablyRealtime.channels.get(`table-game-${state.tableId}`);

  // ───────────────── Recupero cronologia per ripristino stato ─────────────────
  try {
    // Leggi gli ultimi 50 messaggi sulla storia del canale
    const page = await new Promise((res, rej) =>
      state.ablyChannel.history({ limit: 50, direction: "backwards" }, (err, p) =>
        err ? rej(err) : res(p)
      )
    );
    const messages = page.items;

    // Se trovi un evento "game-ended", mostra subito la finestra di fine partita
    const ended = messages.find(m => m.name === "game-ended");
    if (ended?.data) {
      const { finalWinner, creatorPoints, playerPoints, creatorGamesWon, playerGamesWon } = ended.data;
      showEndGameWindow(finalWinner, creatorPoints, playerPoints, creatorGamesWon, playerGamesWon);
      return;
    }

    // Se trovi uno "snapshot" di game-state, applicalo e chiama setupGameFromState()
    const gameState = messages.find(m => m.name === "game-state");
    if (gameState) {
      window.gameStateMessage   = gameState;
      Object.assign(state, gameState.data);
      state.placeholdersSwapped  = !!state.placeholdersSwapped;
      state.isBusy              = !!state.isBusy;
      state.turnTimer           = gameState.data.turnTimer || "off";
      state.gameStarted         = true;
      await setupGameFromState();
    } else {
      // Nessuno snapshot: partita non avviata
      state.gameStarted = false;
    }
  } catch (err) {
    // In caso di errore, segnala e marca partita come non iniziata
    console.error("Errore nel recupero dello stato di gioco:", err);
    state.gameStarted = false;
  }

  // ───────────────────── Subscriptions (con guardia) ───────────────────
  const { ablyChannel } = state;
  const sub = (ev, fn, flag) => {
    // Sottoscrivi solo se non già sottoscritto
    if (!state[flag]) {
      ablyChannel.subscribe(ev, fn);
      state[flag] = true;
    }
  };

  // Sottoscrivi ai vari eventi di gioco
  sub("animate-briscola", animateBriscolaCard, "animateBriscolaSubscribed");
  sub("message",          onMessage,          "messageSubscribed");
  sub("briscola",         onBriscola,         "briscolaSubscribed");
  sub("game-state",       onGameState,        "gameStateSubscribed");

  // Entra in presenza con ruolo e nome
  ablyChannel.presence.enter({ playerName: state.userName, role: state.userRole });

  // Altre sottoscrizioni
  sub("request-current-deck", onRequestCurrentDeck, "requestCurrentDeckSubscribed");
  publish(ablyChannel, "game-started", {}); // notifica l’avvio
  sub("game-started",          onGameStarted,       "gameStartedSubscribed");
  sub("card-played",           onCardPlayed,        "cardPlayedSubscribed");
  sub("draw-card",             onDrawCard,          "drawCardSubscribed");
  sub("cards-distributed",     onCardsDistributed,  "cardsDistributedSubscribed");
  sub("game-ended",            onGameEnded,         "gameEndedSubscribed");
  sub("reset-game",            onResetGame,         "resetGameSubscribed");
  sub("timer-tick",            onTimerTick,         "timerTickSubscribed");
  sub("timer-start",           onTimerStart,        "timerStartSubscribed");

  // Sottoscrivi agli aggiornamenti di presence
  ablyChannel.presence.subscribe(onPresenceUpdate);

  // Recupera la chat cronologica
  fetchChatHistory();

  // Gestione errori di connessione
  state.ablyRealtime.connection.on("failed", onConnectionFailed);

  // Setup specifico per ruolo
  if (state.userRole === "creator")      setupCreatorRole();
  else if (state.userRole === "player")  setupPlayerRole();
  else                                   setupViewerRole();
}

if (typeof window !== 'undefined') window.connect = connect;
