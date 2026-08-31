// js/auth/reset-password.js
document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-form');
    const btnReset = document.getElementById('btn-reset');
    const newPasswordInput = document.getElementById('id_new_password');
    const confirmPasswordInput = document.getElementById('id_confirm_password');

    if (resetForm && btnReset && newPasswordInput && confirmPasswordInput) {
        
        // Custom validation: Passwords must match
        const validatePasswordsMatch = () => {
            if (confirmPasswordInput.value && confirmPasswordInput.value !== newPasswordInput.value) {
                confirmPasswordInput.setCustomValidity("Les mots de passe ne correspondent pas.");
                confirmPasswordInput.classList.add('is-invalid');
            } else {
                confirmPasswordInput.setCustomValidity("");
                if (confirmPasswordInput.value) {
                    confirmPasswordInput.classList.remove('is-invalid');
                }
            }
        };

        newPasswordInput.addEventListener('input', validatePasswordsMatch);
        confirmPasswordInput.addEventListener('input', validatePasswordsMatch);

        resetForm.addEventListener('submit', (e) => {
            validatePasswordsMatch(); // Re-check before submit
            
            if (!resetForm.checkValidity()) {
                e.preventDefault();
            }
        });
    }
});
