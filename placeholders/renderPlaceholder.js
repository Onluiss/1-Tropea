// /placeholders/renderPlaceholder.js
"use strict";

const placeholderCache = new Map();   // fuori da tutto
import { getTimerContent } from './getTimerContent.js';
import { getAvatarContent } from './getAvatarContent.js';

//////////////////////////////////////////////////////////////
import { getCallerTag } from '../callerTag.js';
//////////////////////////////////////////////////////////////

export function renderPlaceholder(isTimer, userNum, userName, fallbackHtml) {
    
//////////////////////////////////////////////////////////////
console.log(getCallerTag());
//////////////////////////////////////////////////////////////

  if (!userName) return fallbackHtml;

  const key = `${isTimer}-${userNum}-${userName}`;
  if (placeholderCache.get(key)) return placeholderCache.get(key);

  const html = isTimer
    ? getTimerContent(userNum, userName)
    : getAvatarContent(userNum, userName);
  placeholderCache.set(key, html);
  return html;
}

if (typeof window !== 'undefined') {
  window.renderPlaceholder = renderPlaceholder;
}
