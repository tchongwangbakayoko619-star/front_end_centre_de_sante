// js/auth/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            if (loginForm.checkValidity && loginForm.checkValidity()) {
                e.preventDefault();
                window.location.href = '../reception/dashboard.html';
            }
        });
    }
});
