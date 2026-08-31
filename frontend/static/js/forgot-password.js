// js/auth/forgot-password.js
document.addEventListener('DOMContentLoaded', () => {
    const forgotForm = document.getElementById('forgot-form');
    const btnForgot = document.getElementById('btn-forgot');

    if (forgotForm && btnForgot) {
        forgotForm.addEventListener('submit', (e) => {
            if (forgotForm.checkValidity()) {
                // Formulaire valide, soumission normale sans état de chargement
            }
        });
    }
});
