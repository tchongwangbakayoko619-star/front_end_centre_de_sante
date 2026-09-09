/**
 * CS² Health — Medical Create Consultation Module
 */

window.SIDEBAR_ACTIVE = 'medical-consultations';

function handleSaveConsultation(e) {
  e.preventDefault();
  if (typeof showToast === 'function') {
    showToast("Consultation enregistrée avec succès dans le dossier médical.", "success");
  } else {
    alert("Consultation enregistrée avec succès !");
  }
  setTimeout(() => {
    window.location.href = "../patients/detail.html";
  }, 1000);
}
