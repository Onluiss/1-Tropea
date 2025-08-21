// initialize.js
"use strict";

import { isBrowser } from './utils/isBrowser.js';
import { initializeDeckForRole } from './deck/initializeDeckForRole.js';
import { updateTalonCounter } from './contatore/updateTalonCounter.js';

// —————————————— INIZIALIZZAZIONE ——————————————
// Funzione di bootstrap, spostata su evento “game-started”
export function initialize() {
  if (!isBrowser()) return;

  // 1) Prepara subito il mazzo (deck + UI)
  initializeDeckForRole();

}

if (isBrowser()) {
  window.addEventListener("resize", () => updateTalonCounter());
  window.initialize = initialize;  // resta esposto per test/manual
}
