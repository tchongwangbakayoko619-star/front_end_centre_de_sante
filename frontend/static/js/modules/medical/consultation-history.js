/**
 * CS² Health — Medical Consultation History Module
 */

window.SIDEBAR_ACTIVE = 'medical-consultations';

function applyFilters() {
  if (typeof showToast === 'function') {
    showToast("Filtres d'historique appliqués.", 'info');
  }
}

function exportHistory() {
  if (typeof showToast === 'function') {
    showToast("Export PDF/Excel de l'historique en cours...", 'success');
  } else {
    alert("Export de l'historique en cours...");
  }
}
