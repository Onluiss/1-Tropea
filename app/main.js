// app/main.js
"use strict";

import { initialize } from '../initialize.js';

// bootstrap senza DI né argomenti
const teardown = initialize();

// esporta per i test
export { teardown };
