// connection/ensureRoleClientIds.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';

export async function ensureRoleClientIds() {
  if (!isBrowser()) return;

  /* helper per risolvere la Promise senza arrow anonima */
  function getPresenceList(resolve) {
    function onPresenceGet(err, list) {
      resolve(err ? [] : list);
    }
    state.ablyChannel.presence.get(onPresenceGet);
  }

  const members = await new Promise(getPresenceList);

  // Filtra creator e player dai membri
  const participants = members.filter(m =>
    m.data?.role && ['creator', 'player'].includes(m.data.role.toLowerCase())
  );
  const foundCreator = participants.find(m => m.data.role.toLowerCase() === 'creator');
  const foundPlayers = participants.filter(m => m !== foundCreator);

  if (foundCreator) state.roleToClientId.creator = foundCreator.clientId;
  if (foundPlayers.length) {
    state.roleToClientId.players = foundPlayers.map(m => m.clientId);
  }

  return {
    creatorId: state.roleToClientId.creator,
    playerId:  state.roleToClientId.players?.[0] || null
  };
}

if (typeof window !== 'undefined') {
  window.ensureRoleClientIds = ensureRoleClientIds;
}
