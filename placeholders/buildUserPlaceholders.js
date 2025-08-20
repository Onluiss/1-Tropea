// /placeholders/buildUserPlaceholders.js
"use strict";

import { state } from '../state.js';
import { assignUserNumber } from '../utils/assignUserNumber.js';
import { renderPlaceholder } from './renderPlaceholder.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function buildUserPlaceholders({ creatorName, creatorNum, playerName, playerNum }) {
    
//////////////////////////////////////////////////////////////
  try { console.log(getCallerTag()); } catch {}
//////////////////////////////////////////////////////////////

  const isCreator = state.userName === creatorName;
  const isPlayer  = state.userName === playerName;

  // Bottom bar (mostra sempre il placeholder dell’utente)
  const bottomHtml = (() => {
    const fallback = isCreator
      ? `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa del creatore...</div></div>`
      : `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa di un avversario...</div></div>`;

    const userNum  = isCreator ? creatorNum : isPlayer ? playerNum : assignUserNumber(state.userName);
    const userName = isCreator ? creatorName : isPlayer ? playerName : state.userName;
    const isTimer  = state.turnTimer === 'bottom';

    return renderPlaceholder(isTimer, userNum, userName, fallback);
  })();

  // Top bar (mostra sempre il placeholder dell’avversario)
  const topHtml = (() => {
    // Se non c’è timer in alto e l’utente non è né creator né player, mostro fallback generico
    if (state.turnTimer !== 'top' && ![creatorName, playerName].includes(state.userName)) {
      return `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa di un avversario...</div></div>`;
    }

    const isOppCreator = state.userName === playerName;
    const userNum  = isOppCreator ? creatorNum : playerNum;
    const userName = isOppCreator ? creatorName : playerName;
    const isTimer  = state.turnTimer === 'top';

    const fallback = isOppCreator
      ? `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa del creatore...</div></div>`
      : `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa di un avversario...</div></div>`;

    return renderPlaceholder(isTimer, userNum, userName, fallback);
  })();

  return state.placeholdersSwapped
    ? { bottomHtml: topHtml, topHtml: bottomHtml }
    : { bottomHtml, topHtml };
}

if (typeof window !== 'undefined') {
  window.buildUserPlaceholders = buildUserPlaceholders;
}
