// chat/setupTextInput.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { handleKeyPress } from './handleKeyPress.js';
import { handlePaste } from './handlePaste.js';
import { limitTextLength } from './limitTextLength.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function setupTextInput(selector='#text',maxLength=500) {
  if (!isBrowser()) return;
  const el = document.querySelector(selector);
  
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  if (!el) return;
  el.addEventListener('keypress', handleKeyPress);
  el.addEventListener('paste',    handlePaste);
  el.addEventListener('input',    e=>limitTextLength(e,maxLength));
}

if (typeof window !== 'undefined') {
  window.setupTextInput = (deps) => setupTextInput(deps);
}
