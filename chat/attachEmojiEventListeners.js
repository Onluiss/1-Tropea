// /chat/attachEmojiEventListeners.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { insertAtCaret } from './insertAtCaret.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function attachEmojiEventListeners() {
    if (!isBrowser()) return;
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

    document.querySelectorAll('.emoji').forEach(emoji => {
        emoji.addEventListener('click', () => {
            const textInput = document.getElementById('text');
            if (textInput) {
                const emojiImg = emoji.querySelector('img')?.cloneNode(true);
                if (emojiImg) {
                    emojiImg.classList.add('emoji');
                    insertAtCaret('text', emojiImg.outerHTML);
                }
            }
        });
    });
}

if (typeof window !== 'undefined') {
  window.attachEmojiEventListeners = attachEmojiEventListeners;
}
