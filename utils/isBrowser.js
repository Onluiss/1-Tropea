"use strict";

export function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

if (typeof window !== "undefined") {
  window.isBrowser = isBrowser;
}
