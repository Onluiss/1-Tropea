// hand/assignSingleCreatorCard.js
"use strict";

export async function assignSingleCreatorCard(animate = true) {
  if (!isBrowser()) return null;
  const card = await assignSingleCard('creator', animate);
  return card;
}

if (typeof window !== "undefined") {
  window.assignSingleCreatorCard = assignSingleCreatorCard;
}
