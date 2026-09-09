/**
 * CS² Health — Medical Edit Consultation Module
 */

window.SIDEBAR_ACTIVE = 'medical-consultations';

function handleUpdateConsultation(e) {
  e.preventDefault();
  if (typeof showToast === 'function') {
    showToast("Consultation mise à jour. Entrée enregistrée dans le journal d'audit.", "info");
  } else {
    alert("Modifications enregistrées avec succès !");
  }
  setTimeout(() => {
    window.location.href = "history.html";
  }, 1000);
}
