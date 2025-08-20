"use strict";

export function sendRequestedCards(role, requester) {
  if (!isBrowser()) return;
  
  let cards = [];
  if ((role==='creator'&&state.userRole==='creator')||(role==='player'&&state.userRole==='player')) {
    cards = state.playerHands[state.userName]||[];
  } else return;
  publish(state.ablyChannel,'send-cards',{role,requester,cards});
}

if (typeof window !== 'undefined') {
  window.sendRequestedCards = deps => sendRequestedCards(deps);
}
