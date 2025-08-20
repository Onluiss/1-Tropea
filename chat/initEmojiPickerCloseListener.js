// /chat/initEmojiPickerCloseListener.js
"use strict";

export function initEmojiPickerCloseListener() {
    if (!isBrowser()) return;
  document.addEventListener('click', function(event) {
    const picker = document.getElementById('emoji-picker');
    if (picker && !picker.contains(event.target) && event.target.id !== 'emoji-button') {
      picker.classList.remove('active');
    }
  });
}

if (typeof window !== 'undefined') {
  window.initEmojiPickerCloseListener = initEmojiPickerCloseListener;
}
