// /chat/initializeChat.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { fetchChatHistory } from './fetchChatHistory.js';
import { handleKeyPress } from './handleKeyPress.js';
import { handlePaste } from './handlePaste.js';
import { limitTextLength } from './limitTextLength.js';
import { toggleEmojiPicker } from './toggleEmojiPicker.js';
import { attachEmojiEventListeners } from './attachEmojiEventListeners.js';

export function initializeChat() {
  if (!isBrowser()) return;
  fetchChatHistory();
  const txt = document.getElementById('text');
  if (txt) {
    txt.addEventListener('keypress', handleKeyPress);
    txt.addEventListener('paste',    handlePaste);
    txt.addEventListener('input',    e=>limitTextLength(e,500));
  }
  const btn = document.getElementById('emoji-button');
  if (btn) btn.addEventListener('click',e=>{e.stopPropagation();toggleEmojiPicker();});
  fetch('emoji-picker.html')
    .then(r=>r.text())
    .then(html=>{
      const c = document.getElementById('emoji-picker-container');
      if (c) { c.innerHTML = html; attachEmojiEventListeners(); }
    })
    .catch(err=>console.error('Errore caricamento emoji picker:',err));
  document.querySelectorAll('img').forEach(img=>{
    img.onerror = ()=>{
      if (!img.dataset.fallback) {
        img.src = '/carte-napoletane/asssss.png';
        img.alt = 'Image Not Available';
        img.dataset.fallback = 'true';
      }
    };
  });
}

if (typeof window !== 'undefined') {
  window.initializeChat = initializeChat;
}
