// /1-Tropea/animations/riposizionaTutteLeMani.js
'use strict';

import { isBrowser } from '../utils/isBrowser.js';
import { riposizionaLaMiaMano } from './riposizionaLaMiaMano.js';


export function riposizionaTutteLeMani() {
  if (!isBrowser()) return;
  ['creator', 'player'].forEach(role => riposizionaLaMiaMano(role));
}

if (typeof window !== 'undefined') {
  window.riposizionaTutteLeMani = riposizionaTutteLeMani;
}
