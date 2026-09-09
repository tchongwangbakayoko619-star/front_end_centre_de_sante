/**
 * CS² Health — Medical Slots & Unavailabilities Module
 */

window.SIDEBAR_ACTIVE = 'medical-slots';

function openSlotModal(dayName) {
  const modal = document.getElementById('slot-modal');
  const title = document.getElementById('slot-modal-title');
  const selectDay = document.getElementById('slot-day-select');

  if (title) title.textContent = dayName ? `Configurer le créneau du ${dayName}` : "Ajouter un créneau de consultation";
  if (selectDay && dayName) selectDay.value = dayName;
  if (modal) modal.classList.remove('hidden');
}

function closeSlotModal() {
  const modal = document.getElementById('slot-modal');
  if (modal) modal.classList.add('hidden');
}

function editSlot(day, start, end, pause, duration) {
  openSlotModal(day);
  const startTime = document.getElementById('slot-start-time');
  const endTime = document.getElementById('slot-end-time');
  const pauseInput = document.getElementById('slot-pause');
  const durationSelect = document.getElementById('slot-duration');

  if (startTime) startTime.value = start;
  if (endTime) endTime.value = end;
  if (pauseInput) pauseInput.value = pause;
  if (durationSelect) durationSelect.value = duration;
}

function deleteSlot(day) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer la plage de consultation du ${day} ?`)) {
    if (typeof showToast === 'function') {
      showToast(`Créneau du ${day} réinitialisé.`, 'info');
    } else {
      alert(`Créneau du ${day} réinitialisé.`);
    }
  }
}

function handleSaveSlot(e) {
  e.preventDefault();
  closeSlotModal();
  if (typeof showToast === 'function') {
    showToast("Créneau de consultation enregistré avec succès !", "success");
  } else {
    alert("Créneau enregistré avec succès !");
  }
}

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

function cancelUnavailability(motif) {
  if (confirm(`Annuler l'indisponibilité '${motif}' ?`)) {
    if (typeof showToast === 'function') {
      showToast(`Indisponibilité '${motif}' annulée.`, 'info');
    } else {
      alert(`Indisponibilité '${motif}' annulée.`);
    }
  }
}
