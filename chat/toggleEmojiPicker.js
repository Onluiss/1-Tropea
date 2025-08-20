"use strict";

export function toggleEmojiPicker() {
    if (!isBrowser()) return;
    const picker = document.getElementById('emoji-picker');
    if (picker) {
        picker.classList.toggle('active');
    }
}

if (typeof window !== 'undefined') {
  window.toggleEmojiPicker = (deps) => toggleEmojiPicker(deps);
}
