// js/components/password-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.password-toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const wrapper = this.closest('.password-input-wrapper');
            const input = wrapper.querySelector('input');
            const iconEye = this.querySelector('.icon-eye');
            const iconEyeOff = this.querySelector('.icon-eye-off');
            
            if (input.type === 'password') {
                input.type = 'text';
                iconEye.style.display = 'none';
                iconEyeOff.style.display = 'block';
                this.setAttribute('aria-label', 'Masquer le mot de passe');
            } else {
                input.type = 'password';
                iconEye.style.display = 'block';
                iconEyeOff.style.display = 'none';
                this.setAttribute('aria-label', 'Afficher le mot de passe');
            }
        });
    });
});
