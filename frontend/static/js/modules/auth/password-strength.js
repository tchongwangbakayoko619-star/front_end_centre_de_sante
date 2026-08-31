// js/components/password-strength.js
document.addEventListener('DOMContentLoaded', () => {
    const newPasswordInput = document.getElementById('id_new_password');
    const strengthFill = document.getElementById('pwd-strength-fill');
    const strengthText = document.getElementById('pwd-strength-text');
    
    if (newPasswordInput && strengthFill && strengthText) {
        
        const updateStrength = (password) => {
            let score = 0;
            if (!password) {
                strengthFill.style.width = '0%';
                strengthFill.style.backgroundColor = 'transparent';
                strengthText.textContent = 'Niveau de sécurité';
                return;
            }

            // Critères basiques
            if (password.length >= 8) score += 1;
            if (password.match(/[A-Z]/)) score += 1;
            if (password.match(/[0-9]/)) score += 1;
            if (password.match(/[^A-Za-z0-9]/)) score += 1; // Special char
            if (password.length >= 12) score += 1;

            let percentage = (score / 5) * 100;
            if (percentage > 100) percentage = 100;
            
            strengthFill.style.width = `${percentage}%`;

            if (score <= 2) {
                strengthFill.style.backgroundColor = 'var(--color-error-500)';
                strengthText.textContent = 'Faible';
            } else if (score === 3 || score === 4) {
                strengthFill.style.backgroundColor = 'var(--color-warning-500)';
                strengthText.textContent = 'Moyen';
            } else {
                strengthFill.style.backgroundColor = 'var(--color-success-500)';
                strengthText.textContent = 'Fort';
            }
        };

        newPasswordInput.addEventListener('input', (e) => {
            updateStrength(e.target.value);
        });
    }
});
