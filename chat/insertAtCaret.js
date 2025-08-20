// /chat/insertAtCaret.js
"use strict";

export function insertAtCaret(elementId, html) {
    if (!isBrowser()) return;
    const element = document.getElementById(elementId);
    if (element) {
        if (document.selection) {
            element.focus();
            const sel = document.selection.createRange();
            sel.pasteHTML(html);
        } else if (window.getSelection) {
            element.focus();
            const sel = window.getSelection();
            if (sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                range.deleteContents();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const frag = document.createDocumentFragment();
                let node;
                while ((node = tempDiv.firstChild)) {
                    frag.appendChild(node);
                }
                range.insertNode(frag);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
}

if (typeof window !== 'undefined') {
  window.insertAtCaret = insertAtCaret;
}
