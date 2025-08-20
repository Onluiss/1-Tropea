// /placeholders/aggiornaTimerViewerDopoSwap.js
"use strict";

export function aggiornaTimerViewerDopoSwap() {
  /* ─────────── GUARDIA SSR ─────────── */
  // Evita esecuzione in ambienti non-browser (Server-Side Rendering o Node)
  if (!isBrowser()) return;

  /* ─────────── SOLO PER VIEWER IN MODALITÀ “FORCED SWAP” ─────────── */
  // L’aggiornamento del timer grafico serve unicamente:
  //   1) se l’utente corrente è un viewer
  //   2) se è stato eseguito uno “forcedSwap” delle placche
  if (state.userRole === 'viewer' && state.viewerForcedSwap) {

    // 1) Determina chi (creator o player) è finito in BASSO dopo lo swap
    const bottomRole = state.placeholdersSwapped ? 'player' : 'creator';

    // 2) Imposta la posizione del timer:
    //    - 'bottom' se il turno appartiene al ruolo in basso
    //    - 'top'    se appartiene a quello in alto
    state.turnTimer =
      (state.currentTurn === bottomRole) ? 'bottom' : 'top';

    // 3) Aggiorna le barre segnaposto + timer SVG a schermo
    updatePlaceholderBars();
  }
}

if (typeof window !== 'undefined') {
  window.aggiornaTimerViewerDopoSwap = aggiornaTimerViewerDopoSwap;
}
