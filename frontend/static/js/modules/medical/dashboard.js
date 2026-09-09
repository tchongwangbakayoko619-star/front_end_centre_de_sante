/**
 * CS² Health — Medical Dashboard Module
 */

window.SIDEBAR_ACTIVE = 'medical-dashboard';

// Dynamic greeting based on current local hour
(function() {
  const h = new Date().getHours();
  const label = document.getElementById('greeting-label');
  if (label) {
    if (h >= 5 && h < 12)       label.textContent = 'Bonjour,';
    else if (h >= 12 && h < 18) label.textContent = 'Bon après-midi,';
    else                        label.textContent = 'Bonsoir,';
  }
})();

// Presence Modal Handlers
function openPresenceModal(patientName, timeSlot, patientMeta) {
  const modal = document.getElementById('presence-modal');
  const nameEl = document.getElementById('presence-patient-name');
  const timeEl = document.getElementById('presence-patient-time');
  const metaEl = document.getElementById('presence-patient-meta');
  const reschedulePanel = document.getElementById('reschedule-panel');

  if (nameEl) nameEl.textContent = patientName;
  if (timeEl) timeEl.textContent = timeSlot;
  if (metaEl) metaEl.textContent = patientMeta;
  if (reschedulePanel) reschedulePanel.classList.add('hidden');

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closePresenceModal() {
  const modal = document.getElementById('presence-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function confirmPresence(status) {
  closePresenceModal();
  if (status === 'REALISE') {
    if (typeof showToast === 'function') {
      showToast("Patient marqué comme PRÉSENT. Ouverture de la consultation...", "success");
    } else {
      alert("Patient marqué comme PRÉSENT (RÉALISÉ). Redirection vers la consultation.");
    }
    setTimeout(() => {
      window.location.href = "consultations/create.html";
    }, 800);
  } else if (status === 'NON_PRESENTE') {
    if (typeof showToast === 'function') {
      showToast("Patient marqué comme NON PRÉSENT (No-Show).", "warning");
    } else {
      alert("Patient marqué comme NON PRÉSENT.");
    }
  }
}

function openReschedulePanel() {
  const panel = document.getElementById('reschedule-panel');
  if (panel) {
    panel.classList.toggle('hidden');
  }
}

function confirmReschedule() {
  const date = document.getElementById('reschedule-date')?.value;
  const time = document.getElementById('reschedule-time')?.value;
  closePresenceModal();
  if (typeof showToast === 'function') {
    showToast(`Rendez-vous reporté au ${date} à ${time}.`, "info");
  } else {
    alert(`Rendez-vous reporté au ${date} à ${time}.`);
  }
}

function callPatient(patientName) {
  if (typeof showToast === 'function') {
    showToast(`Patient ${patientName} appelé en salle de consultation.`, "info");
  } else {
    alert(`Appel du patient ${patientName}...`);
  }
}

// Chart.js initialization for weekly medical activity
document.addEventListener('DOMContentLoaded', function() {
  const weeklyCanvas = document.getElementById('medicalWeeklyChart');
  if (weeklyCanvas && typeof Chart !== 'undefined') {
    const ctx = weeklyCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        datasets: [
          {
            label: 'Consultations Réalisées',
            data: [6, 8, 7, 9, 8, 4],
            borderColor: '#0d9488',
            backgroundColor: 'rgba(13, 148, 136, 0.08)',
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0d9488'
          },
          {
            label: 'Prescriptions',
            data: [4, 6, 5, 7, 5, 3],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            borderDash: [4, 4],
            pointRadius: 3,
            pointBackgroundColor: '#3b82f6'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { size: 11, weight: 'bold' },
              color: '#334155'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            ticks: { color: '#64748b', font: { size: 11 } }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { size: 11 } }
          }
        }
      }
    });
  }
});
