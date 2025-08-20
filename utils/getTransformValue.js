// /utils/getTransformValue.js
"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { state } from "../state.js";

export function getTransformValue(cardNumber, role, isOwnCard) {
  if (!isBrowser()) return "";
  
  const rotateValue     = "rotate(6deg)";
  const commonTransform = "translate3d(493.601px, 368.226px, 0px) scale(var(--card-scale))";
  let baseTransform = "";
    
  // qui serve 'state' globale per userRole/placeholdersSwapped
  if (state.userRole === "viewer") {
    if (state.placeholdersSwapped) {
      baseTransform = (role === "creator")
        ? (isOwnCard
            ? "translate(-150%, -86%) " + commonTransform
            : "translate(-150%, -64%) " + commonTransform)
        : (isOwnCard
            ? "translate(-150%, -64%) " + commonTransform
            : "translate(-150%, -86%) " + commonTransform);
    } else {
      baseTransform = (role === "creator")
        ? (isOwnCard
            ? "translate(-150%, -64%) " + commonTransform
            : "translate(-150%, -86%) " + commonTransform)
        : (isOwnCard
            ? "translate(-150%, -86%) " + commonTransform
            : "translate(-150%, -64%) " + commonTransform);
    }
  } else {
    baseTransform = isOwnCard
      ? "translate(-150%, -64%) " + commonTransform
      : "translate(-150%, -86%) " + commonTransform;
  }

  return `${baseTransform} ${rotateValue}`;
}

if (typeof window !== 'undefined') {
  window.getTransformValue = getTransformValue;
}
