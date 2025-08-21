// /chat/handlePaste.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';

export function handlePaste(event) {
    if (!isBrowser()) return;
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const text = clipboardData.getData('text');
    if (text) {
        document.execCommand('insertText', false, text);
        const textInput = document.getElementById('text');
        if (textInput) {
            textInput.scrollLeft = textInput.scrollWidth;
        }
    }
}

if (typeof window !== 'undefined') {
  window.handlePaste = handlePaste;
}
