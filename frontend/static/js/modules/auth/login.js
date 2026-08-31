// js/auth/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const btnLogin = document.getElementById('btn-login');

    if (loginForm && btnLogin) {
        loginForm.addEventListener('submit', (e) => {
            // Le form-validation.js global bloque si invalid
            if (loginForm.checkValidity()) {
                // Formulaire valide, soumission normale sans état de chargement
            }
        });
    }
});
