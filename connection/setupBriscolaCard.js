// connection/setupBriscolaCard.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { shuffle } from '../utils/shuffle.js';
import { cardImages } from '../constants/constants.js';
import { publish } from '../utils/publish.js';
import { assignCreatorHand } from '../hand/assignCreatorHand.js';
import { getCallerTag } from '../callerTag.js';

export async function setupBriscolaCard() {
  if (!isBrowser() || state.gameStarted) return;
  try { console.log(getCallerTag()); } catch {}

  state.roleToClientId = state.roleToClientId || { creator: null, players: [] };
  state.playerHands = state.playerHands || {};

  const presence = state?.ablyChannel?.presence;
  if (!presence || typeof presence.get !== "function") return; // evita crash se canale non pronto

  async function onPresenceGetBriscola(err, members) {
    if (err) { setTimeout(setupBriscolaCard, 250); return; }

    const players = (members || []).filter(m => m?.data && (m.data.role === 'player' || m.data.role === 'creator'));
    const creatorPlayer = players.find(m => (m.data?.role || '').toLowerCase() === 'creator');
    if (!creatorPlayer) { setTimeout(setupBriscolaCard, 250); return; }
    if (players.length < 2) { setTimeout(setupBriscolaCard, 250); return; }

    const playerMembers = players.filter(m => m.clientId !== creatorPlayer.clientId);
    state.roleToClientId.creator = creatorPlayer.clientId;
    state.roleToClientId.players = playerMembers.map(m => m.clientId);

    if (state.userName === creatorPlayer.clientId) {
      if (state._dealingInProgress || state.gameStarted) return;
      state._dealingInProgress = true;
      try {
        state.shuffledCards = shuffle([...cardImages]);
        state.briscolaImage = state.shuffledCards.shift();

        for (const member of playerMembers) {
          const hand = state.shuffledCards.splice(0, 3);
          state.playerHands[member.clientId] = hand;
          publish(state.ablyChannel, 'player-hand', { playerName: member.clientId, hand });
        }

        const creatorHand = state.shuffledCards.splice(0, 3);
        state.playerHands[state.userName] = creatorHand;
        publish(state.ablyChannel, 'creator-hand', { hand: creatorHand });

        await assignCreatorHand(creatorHand);
        state.initialGameSetupDone = true;
        publish(state.ablyChannel, 'animate-briscola');
        publish(state.ablyChannel, 'briscola', { card: state.briscolaImage, shuffledDeck: state.shuffledCards });
        state.gameStarted = true;
      } finally {
        state._dealingInProgress = false;
      }
    }
  }

  // MANTIENI IL CONTESTO: non de-referenziare .get
  presence.get(onPresenceGetBriscola);
}

if (typeof window !== 'undefined') window.setupBriscolaCard = setupBriscolaCard;
