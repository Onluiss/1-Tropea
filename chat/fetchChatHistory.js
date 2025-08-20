// /chat/fetchChatHistory.js
"use strict";

export function fetchChatHistory() {
    if (!isBrowser()) return;
    state.ablyChannel.history({ limit: 50, direction: 'backwards' }, function (err, page) {
        if (err) return;
        const messages = page.items.reverse();
        messages.forEach(function (message) {
            if (message.name === 'message') {
                addMessageReceived(message.data);
            }
        });
    });
}

if (typeof window !== 'undefined') {
  window.fetchChatHistory = fetchChatHistory;
}
