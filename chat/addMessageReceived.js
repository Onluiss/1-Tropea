// /chat/addMessageReceived.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { replaceEmoticons } from './replaceEmoticons.js';

export function addMessageReceived(newMessageReceived) {
    if (!isBrowser()) return;
    if (!newMessageReceived || !newMessageReceived.text) return;

    const messagesContainer = document.getElementById('messages-container');
    if (!messagesContainer) return;

    const newMessage = document.createElement('div');
    newMessage.className = 'new-message';

    const formattedText = replaceEmoticons(newMessageReceived.text);
    newMessage.innerHTML = `<div class="details-container">
        <strong>${newMessageReceived.sender}<span class="smaller">»</span></strong> 
        ${formattedText}
    </div>`;

    messagesContainer.appendChild(newMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

if (typeof window !== 'undefined') {
  window.addMessageReceived = addMessageReceived;
}
