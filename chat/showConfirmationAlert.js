"use strict";

export function showConfirmationAlert(message, onAccept, onReject) {
  if (!isBrowser()) return;

  const alertContainer = document.getElementById('alert-container');
  const alertTemplate  = document.getElementById('confirmation-alert');
  if (!alertTemplate) {
    console.error('Template di conferma alert non trovato');
    return;
  }

  const alertClone = alertTemplate.cloneNode(true);
  alertClone.id    = `alert-${Date.now()}`;
  alertClone.classList.add('alert-style');
  alertClone.style.display = 'block';

  // Estrai il nome del richiedente dal messaggio
  const requesterMatch = message.match(/^(\S+)\s+/);
  const requesterName  = requesterMatch ? requesterMatch[1] : 'Unknown';
  const userNumber     = assignUserNumber(requesterName);

  const alertContent = `
    <div style="display: flex; align-items: center;">
      <img src="/icone/${userNumber}.png" class="alert-icon" alt="Avatar"
           style="width:50px;height:50px;border-radius:50%;margin-right:10px;">
      <span><strong>${requesterName}:</strong> ti chiede di visualizzare le tue carte.</span>
    </div>
  `;
  const messageDiv = alertClone.querySelector('.alert-message');
  if (messageDiv) messageDiv.innerHTML = alertContent;

  // Aggiungi al DOM
  alertContainer.appendChild(alertClone);
  state.activeAlerts.push(alertClone);

  // Eventi sui pulsanti
  const acceptButton = alertClone.querySelector('.accept-button');
  const rejectButton = alertClone.querySelector('.reject-button');

  if (acceptButton) acceptButton.onclick = () => { closeAlert(alertClone.id); onAccept?.(); };
  if (rejectButton) rejectButton.onclick = () => { closeAlert(alertClone.id); onReject?.(); };

  const alertSound = document.getElementById('alert-sound');
  if (alertSound) playSafe(alertSound, { reset: false });
}

if (typeof window !== 'undefined') {
  window.showConfirmationAlert = (deps) => showConfirmationAlert(deps);
}
