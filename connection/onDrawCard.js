// connection/onDrawCard.js
"use strict";

export function onDrawCard(msg) {
  const { role, card } = msg.data || {};
  if (role !== state.userRole || !card) return;
  
  console.log('[onDrawCard] ricevuto draw-card:', msg.data);

  // 1️⃣ Assicura che lo storage della mano esista
  if (!Array.isArray(state.playerHands[state.userName])) {
    state.playerHands[state.userName] = [];
  }

  // 2️⃣ Aggiunge la carta alla mano locale
  state.playerHands[state.userName].push(card);

  // 3️⃣ Aggiorna il contatore (deckIndex è gestito solo in assignSingleCard)
  updateTalonCounter();

  // 4️⃣ Trova uno slot libero e mostra la carta
  const slots = Array.from(document.querySelectorAll(
    role === "creator"
      ? ".creator-card1, .creator-card2, .creator-card3"
      : ".player-card1, .player-card2, .player-card3"
  ));
  const freeIndex = findFreeSlotIndex(slots);
  if (freeIndex < 0) return;

  const w = slots[freeIndex];
  const img = w.querySelector("img");
  img.src = `/carte-napoletane/${card}`;
  img.dataset.front = "true";
}

if (typeof window !== 'undefined') {
  window.onDrawCard = onDrawCard;
}
