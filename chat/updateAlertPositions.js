"use strict";

export function updateAlertPositions() {
  if (!isBrowser()) return;
  let offsetTop = 10;
  state.activeAlerts.forEach(a => {
    a.style.top = `${offsetTop}px`;
    offsetTop += a.offsetHeight + 10;
  });
}

if (typeof window !== 'undefined') {
  window.updateAlertPositions = (deps) => updateAlertPositions(deps);
}
