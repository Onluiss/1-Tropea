// /placeholders/buildViewerPlaceholders.js
"use strict";

import { state } from '../state.js';
import { renderPlaceholder } from '../placeholders/renderPlaceholder.js';
import { getCallerTag } from '../callerTag.js';

export function buildViewerPlaceholders({ creatorName, creatorNum, playerName, playerNum }) {
    
  try { console.log(getCallerTag()); } catch {}
  
  const roleOrder = state.placeholdersSwapped
    ? ['player', 'creator']
    : ['creator', 'player'];

  const [bottomRole, topRole] = roleOrder;
  const bottom = {
    num:   bottomRole === 'player' ? playerNum : creatorNum,
    name:  bottomRole === 'player' ? playerName : creatorName,
    timer: state.turnTimer === 'bottom',
    fallback: bottomRole === 'player'
      ? `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa di un avversario...</div></div>`
      : `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa del creatore...</div></div>`
  };
  const top = {
    num:   topRole === 'player' ? playerNum : creatorNum,
    name:  topRole === 'player' ? playerName : creatorName,
    timer: state.turnTimer === 'top',
    fallback: topRole === 'player'
      ? `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa di un avversario...</div></div>`
      : `<div class="placeholder-info"><div class="placeholder-info-nick">In attesa del creatore...</div></div>`
  };

  return {
    bottomHtml: renderPlaceholder(bottom.timer, bottom.num, bottom.name, bottom.fallback),
    topHtml:    renderPlaceholder(top.timer,    top.num,    top.name,    top.fallback)
  };
}

if (typeof window !== 'undefined') {
  window.buildViewerPlaceholders = buildViewerPlaceholders;
}
