"use strict";

export function assignUserNumber(username, maxIcons = 100) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % maxIcons) + 1;
}

if (typeof window !== 'undefined') {
  window.assignUserNumber = assignUserNumber;
}
