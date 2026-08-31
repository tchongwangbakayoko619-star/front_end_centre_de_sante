/**
 * CS² Health — Agenda & Appointment Management Module
 */

window.SIDEBAR_ACTIVE = 'agenda';

function filterAgendaSlots() {
  const searchVal = document.getElementById('agenda-patient-search')?.value.toLowerCase() || '';
  const docVal = document.getElementById('agenda-doctor-select')?.value.toLowerCase() || '';
  const statusVal = document.getElementById('agenda-status-select')?.value.toLowerCase() || '';

  const rows = document.querySelectorAll('.agenda-slot-row');
  rows.forEach(row => {
    const patient = (row.getAttribute('data-patient') || '').toLowerCase();
    const doctor = (row.getAttribute('data-doctor') || '').toLowerCase();
    const status = (row.getAttribute('data-status') || '').toLowerCase();

    const matchSearch = !searchVal || patient.includes(searchVal) || row.textContent.toLowerCase().includes(searchVal);
    const matchDoc = !docVal || doctor.includes(docVal);
    const matchStatus = !statusVal || status.includes(statusVal) || row.textContent.toLowerCase().includes(statusVal);

    if (matchSearch && matchDoc && matchStatus) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function openCancelModal(rdvId = 'RDV-0042', patientName = 'Jeanne DUPONT', doctorName = 'Dr. Valois') {
  const modal = document.getElementById('cancel-appointment-modal');
  const rdvEl = document.getElementById('modal-cancel-rdv-id');
  const patientEl = document.getElementById('modal-cancel-patient');
  const doctorEl = document.getElementById('modal-cancel-doctor');

  if (rdvEl) rdvEl.textContent = rdvId;
  if (patientEl) patientEl.textContent = patientName;
  if (doctorEl) doctorEl.textContent = doctorName;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeCancelModal() {
  const modal = document.getElementById('cancel-appointment-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleCancelAppointment(e) {
  if (e) e.preventDefault();
  closeCancelModal();

  const alertBanner = document.getElementById('operation-alert-banner');
  if (alertBanner) {
    const title = alertBanner.querySelector('h4');
    const subtitle = alertBanner.querySelector('p');
    const rdvId = document.getElementById('modal-cancel-rdv-id')?.textContent || 'le RDV';
    const patient = document.getElementById('modal-cancel-patient')?.textContent || '';
    
    if (title) title.textContent = 'Rendez-vous Annulé avec Succès';
    if (subtitle) subtitle.textContent = 'Le créneau ' + rdvId + ' (' + patient + ') a été annulé. Une notification SMS a été transmise au patient.';
    
    alertBanner.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-2xl p-3.5 sm:p-4 rounded-2xl bg-red-50/95 backdrop-blur-md border border-red-300/90 text-red-950 shadow-2xl flex items-center justify-between gap-4 transition-all duration-300 animate-slide-down';
    
    const iconContainer = alertBanner.querySelector('.w-9');
    if (iconContainer) {
      iconContainer.className = 'w-9 h-9 rounded-xl bg-red-100 text-red-700 font-extrabold flex items-center justify-center flex-shrink-0 border border-red-200 shadow-2xs';
      iconContainer.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>';
    }
    alertBanner.style.display = 'flex';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('cancel') === 'true' || window.AUTO_OPEN_CANCEL === true) {
    openCancelModal(urlParams.get('rdv') || 'RDV-0042', urlParams.get('patient') || 'Jeanne DUPONT', urlParams.get('doctor') || 'Dr. Valois');
  }
});
