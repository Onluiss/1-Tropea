// connection/getParticipants.js
"use strict";

import { assignUserNumber } from '../utils/assignUserNumber.js';
import { getCallerTag } from '../callerTag.js';

export function getParticipants(members) {
    
  try { console.log(getCallerTag()); } catch {}
  
  // Filtro i membri per ruolo (creatore o giocatore)
  const players = members
    .filter(m => m.data?.role && ['player', 'creator'].includes(m.data.role.toLowerCase()));

  // Trovo il creatore
  const creator = players.find(m => m.data.role.toLowerCase() === 'creator');

  // Trovo i giocatori (tutti i membri che non sono il creatore)
  const playersList = players.filter(m => m !== creator);

  // Ritorno le informazioni sui partecipanti
  return {
    creatorName: creator?.clientId || '',
    creatorNum:  creator ? assignUserNumber(creator.clientId) : null,
    playerName:  playersList[0]?.clientId || '',
    playerNum:   playersList[0] ? assignUserNumber(playersList[0].clientId) : null
  };
}

if (typeof window !== 'undefined') {
  window.getParticipants = getParticipants;
}
