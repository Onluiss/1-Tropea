"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { toggleEmojiPicker } from './toggleEmojiPicker.js';

export function setupEmojiButton(sel='#emoji-button') {
  if (!isBrowser()) return;
  const btn = document.querySelector(sel);
  if (!btn) return;
  btn.addEventListener('click',e=>{e.stopPropagation();toggleEmojiPicker();});
}

if (typeof window !== 'undefined') {
  window.setupEmojiButton = (deps) => setupEmojiButton(deps);
}
