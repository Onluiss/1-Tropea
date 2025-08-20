"use strict";

export function setupEmojiButton(sel='#emoji-button') {
  if (!isBrowser()) return;
  const btn = document.querySelector(sel);
  if (!btn) return;
  btn.addEventListener('click',e=>{e.stopPropagation();toggleEmojiPicker();});
}

if (typeof window !== 'undefined') {
  window.setupEmojiButton = (deps) => setupEmojiButton(deps);
}
