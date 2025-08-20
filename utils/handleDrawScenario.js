// /utils/handleDrawScenario.js
"use strict";

export function handleDrawScenario() {
  // 1️⃣ Protezione SSR / Node
  if (!isBrowser()) return;

  // evita doppie esecuzioni dello scenario di pareggio
  if (state.drawHandled) return;
  state.drawHandled = true;

  const gameBoard = document.getElementById('game-board');
  if (!gameBoard) return;
  const oldWin = document.getElementById('end-game-window');
  if (oldWin) oldWin.remove();

  const drawWindow = document.createElement('div');
  drawWindow.id = 'end-game-window';
  Object.assign(drawWindow.style, {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '10px', padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    width: '60%', textAlign: 'center', zIndex: '10000'
  });

  const creatorName = state.roleToClientId.creator || "Creatore";
  const playerName  = (state.roleToClientId.players && state.roleToClientId.players[0]) || "Giocatore";
  const cNum = assignUserNumber(creatorName), pNum = assignUserNumber(playerName);

  drawWindow.innerHTML = `
    <h3 style="margin:0;font-weight:normal;">
      <span style="font-size:22px;font-weight:bold;color:#444;">PAREGGIO!</span>
    </h3>
    <div style="display:flex;flex-direction:column;align-items:center;margin:20px 0;">
      <div style="display:flex;justify-content:space-evenly;width:80%;">
        <div style="text-align:center;width:120px;">
          <img src="/icone/${cNum}.png" alt="" style="width:80px;height:80px;border-radius:50%;"><br>
          <strong>${creatorName}</strong>
        </div>
        <div><img src="/image/vs.svg" alt="VS" style="width:60px;height:60px;"></div>
        <div style="text-align:center;width:120px;">
          <img src="/icone/${pNum}.png" alt="" style="width:80px;height:80px;border-radius:50%;"><br>
          <strong>${playerName}</strong>
        </div>
      </div>
      <div style="width:80%;margin:10px auto;border-bottom:1px solid #ddd;"></div>
      <div style="display:flex;justify-content:space-evenly;width:80%;margin-top:10px;">
        <div><span style="font-size:20px;font-weight:bold;">${state.creatorPoints}</span></div>
        <div><span>Punteggio</span></div>
        <div><span style="font-size:20px;font-weight:bold;">${state.playerPoints}</span></div>
      </div>
      <div style="display:flex;justify-content:space-evenly;width:80%;margin-top:10px;">
        <div><span style="font-size:20px;font-weight:bold;">${state.creatorGamesWon}</span></div>
        <div><span>Partite</span></div>
        <div><span style="font-size:20px;font-weight:bold;">${state.playerGamesWon}</span></div>
      </div>
    </div>
  `;
  gameBoard.appendChild(drawWindow);

  setTimeout(() => {
    drawWindow.remove();
    resetGameForNewRound();
    state.drawHandled = false;
  }, 5000);
}

if (typeof window !== 'undefined') {
  window.handleDrawScenario = handleDrawScenario;
}
