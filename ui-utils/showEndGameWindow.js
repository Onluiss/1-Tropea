// ui-utils/showEndGameWindow.js
"use strict";

import { state } from '../state.js';
import { assignUserNumber } from '../utils/assignUserNumber.js';
import { isBrowser } from '../utils/isBrowser.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function showEndGameWindow(finalWinner, cPoints = state.creatorPoints, pPoints = state.playerPoints, cGamesWon = state.creatorGamesWon, pGamesWon = state.playerGamesWon) {
  // Protezione SSR/Node
  if (!isBrowser()) return;

//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  const gameBoard = document.getElementById('game-board');
  if (!gameBoard) return;
  const existingWindow = document.getElementById('end-game-window');
  if (existingWindow) existingWindow.remove();

  const creatorName        = state.roleToClientId.creator || "Creatore";
  const playerName         = (state.roleToClientId.players && state.roleToClientId.players[0]) || "Giocatore";
  const creatorUserNumber  = assignUserNumber(creatorName);
  const playerUserNumber   = assignUserNumber(playerName);

  let winnerName = "";
  if (finalWinner !== 'Pareggio!') {
    if (/creatore|creator/i.test(finalWinner))   winnerName = creatorName;
    else if (/giocatore|player/i.test(finalWinner)) winnerName = playerName;
  } else {
    winnerName = "Pareggio!";
  }

  const endGameWindow = document.createElement('div');
  endGameWindow.id = 'end-game-window';
  Object.assign(endGameWindow.style, {
    position: 'absolute',
    left:     '50%',
    top:      '50%',
    transform:'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius:    '10px',
    padding:         '30px',
    boxShadow:       '0 4px 20px rgba(0,0,0,0.5)',
    width:           '60%',
    textAlign:       'center',
    zIndex:          '10000'
  });

  endGameWindow.innerHTML = `
    <h3 style="margin:0;font-weight:normal;">
      <span style="font-size:30px;">🏆</span>
      <span style="font-weight:bold;">${winnerName}</span>
      <span style="font-size:16px;"> ha vinto</span>
      <span style="font-size:30px;">🏆</span>
    </h3>
    <div id="avatar-section" style="display:flex;flex-direction:column;align-items:center;justify-content:center;margin:20px 0;width:100%;">
      <div style="display:flex;justify-content:space-evenly;width:80%;margin:0 auto;">
        <div style="display:flex;flex-direction:column;align-items:center;width:120px;">
          <img src="/icone/${creatorUserNumber}.png" alt="${creatorName}" style="width:80px;height:80px;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.3);">
          <span style="font-size:16px;font-weight:bold;margin-top:5px;">${creatorName}</span>
        </div>
        <div style="width:120px;display:flex;justify-content:center;">
          <img src="/image/vs.svg" alt="VS" style="width:60px;height:60px;">
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;width:120px;">
          <img src="/icone/${playerUserNumber}.png" alt="${playerName}" style="width:80px;height:80px;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.3);">
          <span style="font-size:16px;font-weight:bold;margin-top:5px;">${playerName}</span>
        </div>
      </div>
      <div style="width:80%;margin:10px auto;border-bottom:1px solid #ddd;"></div>
      <div style="display:flex;justify-content:space-evenly;width:80%;margin-top:10px;">
        <div><span style="font-size:20px;font-weight:bold;">${cPoints}</span></div>
        <div><span>Punteggio</span></div>
        <div><span style="font-size:20px;font-weight:bold;">${pPoints}</span></div>
      </div>
      <div style="display:flex;justify-content:space-evenly;width:80%;margin-top:10px;">
        <div><span style="font-size:20px;font-weight:bold;">${cGamesWon}</span></div>
        <div><span>Partite</span></div>
        <div><span style="font-size:20px;font-weight:bold;">${pGamesWon}</span></div>
      </div>
    </div>
    <button onclick="closeEndGameWindow()" style="
      padding:10px 20px;
      font-size:18px;
      border:none;
      border-radius:5px;
      background-color:#4CAF50;
      color:#fff;
      cursor:pointer;
      transition:background-color 0.3s;
      margin-top:20px;
    ">Chiudi</button>
  `;

  gameBoard.appendChild(endGameWindow);
  document.body.classList.remove('my-turn-active');
}

if (typeof window !== 'undefined') window.showEndGameWindow = showEndGameWindow;

