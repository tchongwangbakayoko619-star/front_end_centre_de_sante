/**
 * CS² Health — Medical Settings Module
 */

window.SIDEBAR_ACTIVE = 'medical-settings';

function handleSavePersonalSettings(e) {
  e.preventDefault();
  if (typeof showToast === 'function') {
    showToast("Informations personnelles mises à jour avec succès !", "success");
  } else {
    alert("Informations personnelles mises à jour !");
  }
}

function handleSavePreferences(e) {
  e.preventDefault();
  if (typeof showToast === 'function') {
    showToast("Préférences de consultation enregistrées.", "success");
  } else {
    alert("Préférences enregistrées.");
  }
}

function handleSecurityUpdate(e) {
  e.preventDefault();
  if (typeof showToast === 'function') {
    showToast("Mot de passe mis à jour avec succès.", "success");
  } else {
    alert("Mot de passe mis à jour avec succès.");
  }
}
