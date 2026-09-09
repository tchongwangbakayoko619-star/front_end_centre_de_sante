/**
 * CS² Health — Medical Agenda Module
 */

window.SIDEBAR_ACTIVE = 'medical-agenda';

function switchAgendaView(view) {
  const btnWeek = document.getElementById('btn-view-week');
  const btnMonth = document.getElementById('btn-view-month');
  const periodText = document.getElementById('current-period-text');

  if (view === 'week') {
    if (btnWeek) btnWeek.className = 'px-3 py-1 rounded-lg text-xs font-extrabold bg-cs2-brand-600 text-white transition';
    if (btnMonth) btnMonth.className = 'px-3 py-1 rounded-lg text-xs font-extrabold text-cs2-neutral-700 hover:bg-cs2-neutral-100 transition';
    if (periodText) periodText.textContent = '31 Août - 05 Septembre 2026';
  } else if (view === 'month') {
    if (btnWeek) btnWeek.className = 'px-3 py-1 rounded-lg text-xs font-extrabold text-cs2-neutral-700 hover:bg-cs2-neutral-100 transition';
    if (btnMonth) btnMonth.className = 'px-3 py-1 rounded-lg text-xs font-extrabold bg-cs2-brand-600 text-white transition';
    if (periodText) periodText.textContent = 'Mois de Septembre 2026';
  }
}

function navigatePeriod(direction) {
  if (typeof showToast === 'function') {
    showToast(`Période ${direction > 0 ? 'suivante' : 'précédente'} chargée.`, 'info');
  }
}

function goToToday() {
  switchAgendaView('week');
  if (typeof showToast === 'function') {
    showToast("Retour à aujourd'hui (31/08/2026)", 'info');
  }
}

function openAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  if (modal) modal.classList.add('hidden');
}

function handleCreateAppointment(e) {
  e.preventDefault();
  closeAppointmentModal();
  if (typeof showToast === 'function') {
    showToast("Rendez-vous planifié avec succès !", "success");
  } else {
    alert("Rendez-vous planifié avec succès !");
  }
}
