// connection/onCardsDistributed.js
"use strict";

import { state } from '../state.js';
import { getTransformSet } from '../utils/getTransformSet.js';
import { animateCard }         from '../animations/animateCard.js';
import { riposizionaTutteLeManiPerViewer } from '../animations/riposizionaTutteLeManiPerViewer.js';
import { findFreeSlotIndex } from '../utils/findFreeSlotIndex.js';
import { updateTalonCounter } from '../contatore/updateTalonCounter.js';

export function onCardsDistributed(msg) {
  const d = msg.data;
  if (!d) return;

  /* ——— deduplica (evita di ripetere la stessa animazione) ——— */
  const key = `${d.type}:${d.deckIndex}:${d.cardAssigned}`;
  if (state.alreadyHandled[key]) return;
  state.alreadyHandled[key] = true;
  
  /* Solo lo spettatore deve eseguire il resto */
  if (state.userRole !== "viewer") return;

  /* helper per mostrare / animare la carta */
  function applyTransform(w, deckEl, role, idx, pos, initial) {
    const final = getTransformSet(role, pos, 3)[idx];
    if (initial) {
      w.style.display    = "block";
      w.style.transition = "none";
      w.style.transform  = final;

      deckEl.style.display   = "none";
      deckEl.style.transform = "";
    } else {
      w.style.display   = "none";
      w.style.transform = "none";

      animateCard(deckEl, w, final, role)
        .then(riposizionaTutteLeManiPerViewer)
        .catch(() => {});
    }
  }

  /* ——— assegnazione carta al CREATOR ——— */
  if (d.type === "assignSingleCreatorCard") {
    const deckEl = document.querySelector(`.deck-card${d.deckIndex}`);
    if (!deckEl) return;

    const slots = Array.from(
      document.querySelectorAll(".creator-card1, .creator-card2, .creator-card3")
    );
    const idx = findFreeSlotIndex(slots);
    if (idx < 0) return;

    const w   = slots[idx];
    const img = w.querySelector("img");

    if (state.viewerAuthorization.creator) {
      img.src           = `/carte-napoletane/${d.cardAssigned}`;
      img.alt           = "Carta Creator (scoperta)";
      img.dataset.front = "true";
    } else {
      img.src           = "/carte-napoletane/asssss.png";
      img.alt           = "Carta Creator (retro)";
      img.dataset.front = "false";
    }
    applyTransform(w, deckEl, "creator", idx, state.placeholdersSwapped ? "top" : "bottom", d.initialDistribution);
  /* ——— assegnazione carta al PLAYER ——— */
  } else if (d.type === "assignSinglePlayerCard") {
    const deckEl = document.querySelector(`.deck-card${d.deckIndex}`);
    if (!deckEl) return;

    const slots = Array.from(
      document.querySelectorAll(".player-card1, .player-card2, .player-card3")
    );
    const idx = findFreeSlotIndex(slots);
    if (idx < 0) return;

    const w   = slots[idx];
    const img = w.querySelector("img");

    if (state.viewerAuthorization.player) {
      img.src           = `/carte-napoletane/${d.cardAssigned}`;
      img.alt           = "Carta Player (scoperta)";
      img.dataset.front = "true";
    } else {
      img.src           = "/carte-napoletane/asssss.png";
      img.alt           = "Carta Player (retro)";
      img.dataset.front = "false";
    }
    applyTransform(w, deckEl, "player", idx, state.placeholdersSwapped ? "bottom" : "top", d.initialDistribution);
  }
  /* 🔸  AGGIORNA IL TALLON PER IL VIEWER  🔸 */
  state.deckIndex = d.deckIndex;   // valore già decrementato dal creator/player
  updateTalonCounter();            // ridisegna il contatore
}

if (typeof window !== 'undefined') {
  window.onCardsDistributed = onCardsDistributed;
}
