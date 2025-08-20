// /utils/getViewerCardTransform.js
"use strict";
import { isBrowser } from '../utils/isBrowser.js';

export function getViewerCardTransform(role, placeholdersSwapped) {
  if (!isBrowser()) return "";
  const swapped = !!placeholdersSwapped;
  const isCreator = role === "creator";
  const COMMON = "translate3d(493.601px, 368.226px, 0px) scale(0.2114) rotate(6deg)";
  const y = isCreator ? (swapped ? "-86%" : "-64%") : (swapped ? "-64%" : "-86%");
  return `translate(-150%, ${y}) ${COMMON}`;
}

if (typeof window !== 'undefined') window.getViewerCardTransform = getViewerCardTransform;
