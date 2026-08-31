/**
 * CS² Health — Core Application Script & Universal Button Loading Effect
 * Gère les interactions globales, les états de chargement des boutons et les retours visuels.
 */
(function() {
    function createSpinnerSVG(customColorClass) {
        const colorClass = customColorClass || 'text-current';
        return `<svg class="animate-spin h-4 w-4 ${colorClass} flex-shrink-0 inline-block align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
    }

    function applyLoadingState(btn, customText) {
        // Effet de chargement désactivé sur les boutons
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        console.log('CS² Health - Core Application Initialized');

        // 1. Soumission des Formulaires (Navigation immédiate sans délai de chargement)
        document.querySelectorAll('form').forEach((form) => {
            form.addEventListener('submit', (e) => {
                if (form.checkValidity && !form.checkValidity()) return;

                const action = form.getAttribute('action');
                if (action && action !== '#' && (action.endsWith('.html') || action.includes('/'))) {
                    e.preventDefault();
                    window.location.href = action;
                }
            });
        });

        // 2. Clics sur Liens d'Action (Navigation directe sans spinner ni délai)
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button, .btn, a.btn, [role="button"], .button-action, .btn-primary, .btn-secondary, .btn-outline');
            if (!btn) return;

            // Ignorer les éléments de contrôle de sous-menus / modales / onglets
            if (
                btn.getAttribute('data-toggle') ||
                btn.getAttribute('data-bs-toggle') ||
                btn.getAttribute('data-modal-toggle') ||
                btn.classList.contains('dropdown-toggle') ||
                btn.classList.contains('no-loader') ||
                btn.hasAttribute('aria-expanded') ||
                btn.type === 'submit'
            ) {
                return;
            }

            const href = btn.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                if (href.endsWith('.html') || href.includes('/')) {
                    e.preventDefault();
                    window.location.href = href;
                }
            }
        });
    });
})();
