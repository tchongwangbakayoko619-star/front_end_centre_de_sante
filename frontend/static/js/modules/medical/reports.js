/**
 * CS² Health — Medical Reports Module
 */

window.SIDEBAR_ACTIVE = 'medical-reports';

function exportPDF() {
  if (typeof showToast === 'function') {
    showToast("Génération du rapport médical PDF...", "info");
  } else {
    alert("Export PDF en cours...");
  }
}

function exportExcel() {
  if (typeof showToast === 'function') {
    showToast("Génération du rapport Excel (.xlsx)...", "info");
  } else {
    alert("Export Excel en cours...");
  }
}

function setReportPeriod(period) {
  if (typeof showToast === 'function') {
    showToast(`Période '${period}' sélectionnée. Données réactualisées.`, 'info');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const chartCanvas = document.getElementById('medicalReportsChart');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
        datasets: [
          {
            label: 'Consultations',
            data: [35, 40, 42, 38, 45, 48, 38, 42],
            backgroundColor: '#0d9488',
            borderRadius: 6
          },
          {
            label: 'Prescriptions',
            data: [22, 28, 30, 25, 32, 30, 26, 31],
            backgroundColor: '#3b82f6',
            borderRadius: 6
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
            labels: { font: { size: 11, weight: 'bold' }, color: '#334155' }
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
