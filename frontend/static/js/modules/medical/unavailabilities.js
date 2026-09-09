/**
 * CS² Health — Medical Unavailabilities Module
 */

window.SIDEBAR_ACTIVE = 'medical-unavailabilities';

function openUnavailabilityModal() {
  const modal = document.getElementById('unavailability-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeUnavailabilityModal() {
  const modal = document.getElementById('unavailability-modal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveUnavailability(e) {
  e.preventDefault();
  closeUnavailabilityModal();
  if (typeof showToast === 'function') {
    showToast("Période d'indisponibilité ajoutée.", "info");
  } else {
    alert("Période d'indisponibilité ajoutée.");
  }
}

function openRecurringModal() {
  const modal = document.getElementById('recurring-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeRecurringModal() {
  const modal = document.getElementById('recurring-modal');
  if (modal) modal.classList.add('hidden');
}

function handleSaveRecurring(e) {
  e.preventDefault();
  closeRecurringModal();
  if (typeof showToast === 'function') {
    showToast("Récurrence d'indisponibilité activée (Tous les vendredis après-midi).", "success");
  } else {
    alert("Indisponibilité récurrente activée.");
  }
}

function deleteRecurringRule() {
  if (confirm("Supprimer la règle d'indisponibilité récurrente du vendredi ?")) {
    if (typeof showToast === 'function') {
      showToast("Règle récurrente supprimée.", "info");
    }
  }
}

function cancelUnavailability(motif) {
  if (confirm(`Annuler l'indisponibilité '${motif}' ?`)) {
    if (typeof showToast === 'function') {
      showToast(`Indisponibilité '${motif}' annulée.`, 'info');
    }
  }
}
