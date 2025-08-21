// chat/showCategory.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';

export function showCategory(category) {
    if (!isBrowser()) return;
    // Rimuove la classe 'active' da tutte le categorie di emoji
    document.querySelectorAll('.emoji-category').forEach(cat => {
        cat.classList.remove('active');
    });

    // Seleziona la categoria di emoji specificata
    const selectedCategory = document.getElementById(`${category}-category`);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }
}

if (typeof window !== 'undefined') {
  window.showCategory = (deps) => showCategory(deps);
}
