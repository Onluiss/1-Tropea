// utils/determineRoundWinner.js
"use strict";

import { isBrowser } from "./isBrowser.js";
import { cardValues } from "../constants/constants.js";

function other(role){ return role === "creator" ? "player" : "creator"; }
function faceNumber(card){
  const face = String(card).split("-")[0];
  const n = Number(face);
  return Number.isFinite(n) ? n : NaN; // fallback solo per carte numeriche
}

export function determineRoundWinner(card1, card2, briscolaSuit, leader) {
  if (!isBrowser()) return;

  const suit1  = (card1.split("-")[1] || "").charAt(0);
  const suit2  = (card2.split("-")[1] || "").charAt(0);
  const value1 = cardValues[card1];
  const value2 = cardValues[card2];

  const card1IsTrump = suit1 === briscolaSuit;
  const card2IsTrump = suit2 === briscolaSuit;

  // Briscole
  if (card1IsTrump && !card2IsTrump) return leader;
  if (card2IsTrump && !card1IsTrump) return other(leader);
  if (card1IsTrump && card2IsTrump) {
    if (value1 !== value2) return value1 > value2 ? leader : other(leader);
    // pari punti: confronto numerico faccia come tie-break
    const n1 = faceNumber(card1), n2 = faceNumber(card2);
    if (Number.isFinite(n1) && Number.isFinite(n2)) return n1 > n2 ? leader : (n1 < n2 ? other(leader) : leader);
    return leader;
  }

  // Non briscole
  if (suit2 !== suit1) return leader; // ha vinto chi ha iniziato
  if (value1 !== value2) return value1 > value2 ? leader : other(leader);
  // pari punti stesso seme: tie-break numerico
  const n1 = faceNumber(card1), n2 = faceNumber(card2);
  if (Number.isFinite(n1) && Number.isFinite(n2)) return n1 > n2 ? leader : (n1 < n2 ? other(leader) : leader);
  return leader;
}

if (typeof window !== "undefined") {
  window.determineRoundWinner = determineRoundWinner;
}
