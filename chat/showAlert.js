"use strict";

export function showAlert(alertId) {
  if (!isBrowser()) return;
  const alertContainer = document.getElementById('alert-container');
  const alertTemplate = document.getElementById(alertId);
  if (!alertTemplate) return;

  const alertClone = alertTemplate.cloneNode(true);
  alertClone.id = `alert-${Date.now()}`;
  alertClone.classList.add('alert-style');
  alertClone.style.display = 'block';

  alertContainer.appendChild(alertClone);
  state.activeAlerts.push(alertClone);
  updateAlertPositions();

  const alertSound = document.getElementById('alert-sound');
  if (alertSound) alertSound.play().catch(() => {});

  setTimeout(() => closeAlert(alertClone.id), 5000);
}

if (typeof window !== 'undefined') {
  window.showAlert = (deps) => showAlert(deps);
}
