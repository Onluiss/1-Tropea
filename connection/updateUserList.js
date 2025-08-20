// connection/updateUserList.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { assignUserNumber } from '../utils/assignUserNumber.js';
import { state } from '../state.js';
import { onExitClick } from './onExitClick.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function updateUserList() {
  if (!isBrowser()) return;

//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  /* callback nominata per presence.get */
  function onPresenceGetUI(err, members) {
      
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

    if (err) return;

    const userListDiv       = document.getElementById('user-list');
    const userListUtentiDiv = document.getElementById('user-list-utenti');
    const userActionsDiv    = document.getElementById('user-actions');
    const colonnaDiv        = document.getElementById('colonna');
    if (!(userListDiv && userListUtentiDiv && userActionsDiv && colonnaDiv)) return;

    members.sort((a, b) => b.timestamp - a.timestamp);

    let creatorMember  = null,
        playerMembers  = [],
        viewerMembers  = [];

    members.forEach(member => {
      if (member?.clientId) {
        const role = member.data?.role?.toLowerCase() || 'player';
        if      (role === 'creator') creatorMember = member;
        else if (role === 'player')  playerMembers.push(member);
        else if (role === 'viewer')  viewerMembers.push(member);
      }
    });

    const creatorHTML = creatorMember
      ? `<div class="user-item">
           <div class="user-icon-container">
             <img src="/icone/${assignUserNumber(creatorMember.clientId)}.png"
                  class="user-icon" alt="Avatar">
           </div>
           <span>${creatorMember.clientId}</span>
         </div>`
      : '';

    const vsHTML = `<div class="user-item">
                      <img src="/image/vs.svg" alt="VS"
                           style="width:60px; height:60px;">
                    </div>`;

    const playerHTML = playerMembers.map(m => `
      <div class="user-item">
        <div class="user-icon-container">
          <img src="/icone/${assignUserNumber(m.clientId)}.png"
               class="user-icon" alt="Avatar">
        </div>
        <span>${m.clientId}</span>
      </div>`).join('');

    const viewerHTML = viewerMembers.map(m => `
      <div class="user-item">
        <div class="user-icon-container">
          <img src="/icone/${assignUserNumber(m.clientId)}.png"
               class="user-icon" alt="Avatar">
        </div>
        <span class="viewer-name">${m.clientId}</span>
      </div>`).join('');

    /* ——— renderizza ——— */
    userListDiv.innerHTML       = creatorHTML + vsHTML + playerHTML;
    userListUtentiDiv.innerHTML = viewerHTML;
    userListUtentiDiv.style.display = viewerMembers.length ? 'block' : 'none';

    /* ——— azioni specifiche per viewer ——— */
    if (state.userRole === 'viewer') {
      if (!document.getElementById('exit-button')) {
        const exitButton      = document.createElement('button');
        exitButton.id         = 'exit-button';
        exitButton.className  = 'exit-button';
        exitButton.textContent = 'Esci';
        exitButton.onclick     = onExitClick;     // handler nominato
        colonnaDiv.insertBefore(exitButton, userActionsDiv);
      }

      userActionsDiv.innerHTML = `
        <div class="user-item">
          <button onclick="requestCards('creator')">Mostrami le carte</button>
        </div>
        <div class="user-item">
          <button onclick="requestCards('player')">Mostrami le carte</button>
        </div>`;
      Object.assign(userActionsDiv.style, {
        display: 'flex',
        borderBottom: '1px solid #dddddd',
        paddingTop: '10px',
        paddingBottom: '10px',
        overflowY: 'auto',
        justifyContent: 'space-around'
      });
    } else {
      const exitBtn = document.getElementById('exit-button');
      if (exitBtn) exitBtn.remove();
      userActionsDiv.innerHTML = '';
      userActionsDiv.style      = '';
    }
  }

  state.ablyChannel.presence.get(onPresenceGetUI);
}

if (typeof window !== 'undefined') {
  window.updateUserList = updateUserList;
}
