/**
 * CS² Health — Reception Dashboard Module
 */

window.SIDEBAR_ACTIVE = 'dashboard';

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

// Period Selector Handlers
function handlePeriodSelectChange(val) {
  const customPanel = document.getElementById('custom-date-range-panel');
  const periodText = document.getElementById('active-period-text');

  if (val === 'custom') {
    if (customPanel) customPanel.classList.remove('hidden');
  } else {
    if (customPanel) customPanel.classList.add('hidden');
    const labels = {
      day: "Aujourd'hui • 28/08/2026",
      week: "Cette Semaine • Sem. 35",
      month: "Ce Mois • Août 2026",
      year: "Année 2026"
    };
    if (periodText && labels[val]) {
      periodText.textContent = labels[val];
    }
  }
}

function toggleCustomDateRange(show) {
  const customPanel = document.getElementById('custom-date-range-panel');
  if (!customPanel) return;
  if (show) customPanel.classList.remove('hidden');
  else customPanel.classList.add('hidden');
}

function applyCustomDateRange() {
  const start = document.getElementById('start-date-input')?.value;
  const end = document.getElementById('end-date-input')?.value;
  const periodText = document.getElementById('active-period-text');
  if (start && end && periodText) {
    periodText.textContent = `Du ${start} au ${end}`;
  }
  toggleCustomDateRange(false);
}

// Initialize Chart.js Graphs
document.addEventListener('DOMContentLoaded', function() {
  // 1. Line Chart: Weekly Activity
  const weeklyCanvas = document.getElementById('receptionWeeklyChart');
  if (weeklyCanvas && typeof Chart !== 'undefined') {
    const ctxWeekly = weeklyCanvas.getContext('2d');
    new Chart(ctxWeekly, {
      type: 'line',
      data: {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: 'RDV Planifiés',
            data: [38, 45, 42, 50, 48, 25, 12],
            borderColor: '#0d9488',
            backgroundColor: 'rgba(13, 148, 136, 0.08)',
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0d9488'
          },
          {
            label: 'Accueil Effectué',
            data: [32, 40, 38, 46, 42, 22, 10],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            borderDash: [4, 4],
            pointRadius: 3,
            pointBackgroundColor: '#10b981'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
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

  // 2. Doughnut Chart: Status Breakdown
  const statusCanvas = document.getElementById('receptionStatusChart');
  if (statusCanvas && typeof Chart !== 'undefined') {
    const ctxStatus = statusCanvas.getContext('2d');
    new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: ['Confirmés', 'En attente', 'Annulés', 'Décalés'],
        datasets: [{
          data: [32, 6, 3, 1],
          backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'],
          borderWidth: 3,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
});
