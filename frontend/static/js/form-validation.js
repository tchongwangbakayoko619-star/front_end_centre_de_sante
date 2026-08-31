// js/components/form-validation.js
// Basic HTML5 form validation enabler for styling
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[novalidate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Appliquer la classe sur tous les inputs pour activer les styles CSS :invalid
            Array.from(form.elements).forEach(field => {
                if(field.classList && !field.validity.valid) {
                    field.classList.add('is-invalid');
                } else if(field.classList && field.validity.valid) {
                    field.classList.remove('is-invalid');
                }
            });
            
        }, false);

        // Retirer l'erreur quand l'utilisateur commence à taper
        Array.from(form.elements).forEach(field => {
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) {
                    field.classList.remove('is-invalid');
                }
            });
        });
    });
});
