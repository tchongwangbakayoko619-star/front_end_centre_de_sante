/**
 * CS² Health — Appointment Cancellation Module
 */

window.SIDEBAR_ACTIVE = 'agenda';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const rdvId = urlParams.get('rdv');
  const patient = urlParams.get('patient');
  const doctor = urlParams.get('doctor');

  const rdvEl = document.getElementById('cancel-rdv-id');
  const patientEl = document.getElementById('cancel-patient');
  const doctorEl = document.getElementById('cancel-doctor');

  if (rdvId && rdvEl) rdvEl.textContent = rdvId;
  if (patient && patientEl) patientEl.textContent = patient;
  if (doctor && doctorEl) doctorEl.textContent = doctor;
});

function handleCancelFormSubmit(e) {
  if (e) e.preventDefault();
  window.location.href = 'agenda.html?operation=cancelled';
}
