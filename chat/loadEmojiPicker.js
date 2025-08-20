// /chat/loadEmojiPicker.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { attachEmojiEventListeners } from './attachEmojiEventListeners.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function loadEmojiPicker(url='emoji-picker.html',containerSel='#emoji-picker-container') {
  if (!isBrowser()) return;

//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  fetch(url).then(r=>r.text()).then(html=>{
    const c = document.querySelector(containerSel);
    if (c) { c.innerHTML=html; attachEmojiEventListeners(); }
  }).catch(err=>console.error('Errore caricamento emoji picker:',err));
}

if (typeof window !== 'undefined') {
  window.loadEmojiPicker = loadEmojiPicker;
}
