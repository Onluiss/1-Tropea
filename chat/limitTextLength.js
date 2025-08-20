// /chat/limitTextLength.js
"use strict";

export function limitTextLength(event, maxLength) {
    if (!isBrowser()) return;
    const textContainer = document.getElementById('text');
    let textContent = textContainer.innerText || textContainer.textContent;
    if (textContent.length > maxLength) {
        textContent = textContent.substring(0, maxLength);
        textContainer.innerText = textContent;
        alert(`Il messaggio non può superare i ${maxLength} caratteri.`);
    }
}

if (typeof window !== 'undefined') {
  window.limitTextLength = limitTextLength;
}
