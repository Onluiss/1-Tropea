// /chat/insertEmoji.js
"use strict";

export function insertEmoji(emoji) {
    if (!isBrowser()) return;
    const textInput = document.getElementById('text');
    if (textInput) {
        textInput.innerHTML += emoji;
        textInput.focus();
        textInput.scrollLeft = textInput.scrollWidth;
    }
}

if (typeof window !== 'undefined') {
  window.insertEmoji = insertEmoji;
}
