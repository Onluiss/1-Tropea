"use strict";

const avatarCache = new Map();

export function getAvatarContent(userNumber, userName) {
  const key = `${userNumber}-${userName}`;

  if (avatarCache.has(key)) {
    return avatarCache.get(key);      // già pronto: ri-usa
  }

  const html = `
    <div class="placeholder-info">
      <div class="placeholder-info-first-cell">
        <img src="/icone/${userNumber}.png" class="gs-avatar" alt="Avatar">
      </div>
      <div class="placeholder-info-nick">${userName}</div>
    </div>
  `;

  avatarCache.set(key, html);         // salva per le prossime volte
  return html;
}

if (typeof window !== 'undefined') {
  window.getAvatarContent = getAvatarContent;
}