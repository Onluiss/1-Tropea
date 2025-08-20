// deck/displayAllCardsForViewer.js
"use strict";

export function displayAllCardsForViewer() {
// console.log(`displayAllCardsForViewer ← Chiamata da ${getCallerTag()}`);
  // Protezione SSR / Node
  if (!isBrowser()) return;

  // Se il ruolo dell'utente non è 'viewer', esco dalla funzione
  if (state.userRole !== 'viewer') return;

  // Se le carte sono già state mostrate al viewer, esco dalla funzione
  if (state.cardsDisplayedForViewer) return;

  // Indica che il viewer ha richiesto di vedere le carte
  state.hasViewerRequestedCards = true;

  // Seleziono tutte le carte del creator e del player
  const creatorCards = Array.from(document.querySelectorAll('.creator-card1, .creator-card2, .creator-card3'));
  const playerCards  = Array.from(document.querySelectorAll('.player-card1, .player-card2, .player-card3'));

  // Filtro le carte che non sono state giocate
  const visibleCreatorCards = creatorCards.filter(card => !card.classList.contains('card-played'));
  const visiblePlayerCards  = playerCards.filter(card => !card.classList.contains('card-played'));

  // Ottengo trasformazioni dinamiche
  const creatorTransforms = getTransformSet('creator', 'bottom', visibleCreatorCards.length);
  const playerTransforms  = getTransformSet('player', 'top', visiblePlayerCards.length);

  // Funzione helper per impostare le proprietà delle carte
  const setCardProperties = (cards, transforms) => {
    // console.log(`setCardProperties ← Chiamata da ${getCallerTag()}`);
    cards.forEach((card, index) => {
      if (index >= transforms.length) return;

      const img = card.querySelector('img');
      if (img && img.dataset.front !== "true") {
        img.src = '/carte-napoletane/asssss.png';
        img.alt = 'Retro carta';
        img.dataset.front = "false";
      }

      card.style.display = 'block';
      card.style.transition = 'none';
      card.style.transform = transforms[index];
    });
  };

  // Applico le trasformazioni dinamiche
  setCardProperties(visibleCreatorCards, creatorTransforms);
  setCardProperties(visiblePlayerCards, playerTransforms);

  // Evito future duplicazioni
  state.cardsDisplayedForViewer = true;
}

if (typeof window !== 'undefined') {
  window.displayAllCardsForViewer = displayAllCardsForViewer;
}
