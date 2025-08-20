// ui-utils/showDetailsWindow.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from '../state.js';
import { distributeCards } from '../deck/distributeCards.js';
import { assignUserNumber } from '../utils/assignUserNumber.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function showDetailsWindow() {
  if (!isBrowser()) return;

//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  if (state.gameStarted || window.gameStateMessage) {
    distributeCards();
    return;
  }

  // callback nominata
  function handlePresence(err, members) {

//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

    if (err) {
      setTimeout(() => state.ablyChannel.presence.get(handlePresence), 250);
      return;
    }

    const validRoles = ['player', 'creator'];
    const players = Array.isArray(members)
      ? members.filter(member =>
          member.data?.role &&
          validRoles.includes(member.data.role.toLowerCase())
        )
      : [];

    if (players.length < 2) {
      setTimeout(() => state.ablyChannel.presence.get(handlePresence), 250);
      return;
    }

    const creatorPlayer = players.find(m => m.data.role.toLowerCase() === 'creator');
    const playerMembers = players.filter(m => m.data.role.toLowerCase() === 'player');

    if (!creatorPlayer || playerMembers.length === 0) {
      setTimeout(() => state.ablyChannel.presence.get(handlePresence), 250);
      return;
    }

    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) return;

    const creatorName       = creatorPlayer.clientId;
    const creatorUserNumber = assignUserNumber(creatorName);
    const otherPlayerName   = playerMembers[0].clientId;
    const playerUserNumber  = assignUserNumber(otherPlayerName);

    const detailsWindow = document.createElement('div');
    detailsWindow.id = 'details-window';
    Object.assign(detailsWindow.style, {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      width: '60%',
      textAlign: 'center',
      zIndex: '10000',
    });

    detailsWindow.innerHTML = `
      <h3 style="margin: 0;">Inizia la partita!</h3>
      <div id="avatar-section" style="display: flex; flex-direction: column; align-items: center; margin: 20px 0; width: 100%;">
        <div style="display: flex; justify-content: space-evenly; width: 80%; margin: 0 auto;">
          <div style="display: flex; flex-direction: column; align-items: center; width: 120px;">
            <img src="/icone/${creatorUserNumber}.png" alt="Avatar di ${creatorName}"
                 style="width: 80px; height: 80px; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            <span style="font-size: 18px; font-weight: bold; margin-top: 5px;">${creatorName}</span>
          </div>
          <div style="width: 120px; display: flex; justify-content: center;">
            <img src="/image/vs.svg" alt="VS" style="width: 60px; height: 60px;">
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; width: 120px;">
            <img src="/icone/${playerUserNumber}.png" alt="Avatar di ${otherPlayerName}"
                 style="width: 80px; height: 80px; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            <span style="font-size: 18px; font-weight: bold; margin-top: 5px;">${otherPlayerName}</span>
          </div>
        </div>
        <div style="width: 80%; margin: 10px auto; border-bottom: 1px solid #ddd;"></div>
      </div>
    `;
    gameBoard.appendChild(detailsWindow);

    function onCloseDetails() {
      detailsWindow.remove();
      if (state.userRole !== 'viewer') {
        state.ablyChannel.publish('details-closed', {});
        distributeCards();
      }
    }
    // poi nel timeout usi la funzione nominata
    setTimeout(onCloseDetails, 5000);
  }

  // prima invocazione della callback di presenza
  state.ablyChannel.presence.get(handlePresence);
}

if (typeof window !== 'undefined') {
  window.showDetailsWindow = showDetailsWindow;
}
