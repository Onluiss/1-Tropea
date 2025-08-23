// /contatore/ensureTalonCounter.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { getCallerTag } from '../callerTag.js';

export function ensureTalonCounter() {
  if (!isBrowser()) return null;
  try { console.log(getCallerTag()); } catch {}
  const board = document.getElementById('game-board');
  if (!board) return null;

  let counter = board.querySelector('#gs_game_score_tallone');
  if (counter) return counter;

  counter = document.createElement('div');
  counter.id = 'gs_game_score_tallone';
  counter.className = 'nocopy';
  Object.assign(counter.style, {
    position      : 'absolute',
    transform     : 'translate(-50%, -50%)',
    width         : '45px',
    height        : '45px',
    lineHeight    : '45px',
    borderRadius  : '50%',
    background    : 'rgba(0,0,0,0.8)',
    color         : '#fff',
    fontSize      : '20px',
    fontWeight    : '700',            // numerico per normalizzazione coerente
    textAlign     : 'center',
    pointerEvents : 'none',
    zIndex        : '1000'
  });

  board.appendChild(counter);
  return counter;
}

if (typeof window !== 'undefined') {
  window.ensureTalonCounter = ensureTalonCounter;
}
