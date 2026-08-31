/**
 * CS² Health — Modal System
 * js/components/modal.js
 *
 * Usage:
 *   CS2Modal.open('modal-id');
 *   CS2Modal.close('modal-id');
 *   CS2Modal.confirm({ title, message, onConfirm, type });
 */

const CS2Modal = (() => {
  let openModals = [];

  /**
   * Ouvrir un modal
   * @param {string} modalId
   */
  function open(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) {
      console.warn(`[CS2Modal] Modal #${modalId} introuvable.`);
      return;
    }

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    openModals.push(modalId);

    // Focus le premier élément focusable
    const focusable = overlay.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      setTimeout(() => focusable.focus(), 50);
    }
  }

  /**
   * Fermer un modal
   * @param {string} modalId
   */
  function close(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;

    overlay.classList.remove('is-open');
    openModals = openModals.filter(id => id !== modalId);

    if (openModals.length === 0) {
      document.body.style.overflow = '';
    }
  }

  /**
   * Fermer le dernier modal ouvert
   */
  function closeLast() {
    if (openModals.length > 0) {
      close(openModals[openModals.length - 1]);
    }
  }

  /**
   * Modal de confirmation dynamique
   * @param {object} options
   */
  function confirm({
    title = 'Confirmer',
    message = 'Êtes-vous sûr de vouloir effectuer cette action ?',
    confirmText = 'Confirmer',
    cancelText = 'Annuler',
    type = 'default', // 'danger' | 'default'
    onConfirm = () => {},
    onCancel = () => {},
  } = {}) {
    const id = 'cs2-confirm-modal-' + Date.now();

    const btnClass = type === 'danger' ? 'btn-danger' : 'btn-primary';

    const overlay = document.createElement('div');
    overlay.id = id;
    overlay.className = 'modal-overlay is-open';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', `${id}-title`);

    overlay.innerHTML = `
      <div class="modal modal-sm" role="document">
        <div class="modal-header">
          <h2 class="modal-title" id="${id}-title"></h2>
          <button class="modal-close p-1.5 rounded-lg text-cs2-neutral-500 hover:bg-cs2-neutral-100 transition cursor-pointer" type="button" aria-label="Fermer la fenêtre modale">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body p-4">
          <p id="${id}-message" class="text-xs text-cs2-neutral-700 leading-relaxed"></p>
        </div>
        <div class="modal-footer flex items-center justify-end gap-3 p-4 border-t border-cs2-neutral-200">
          <button class="btn btn-secondary px-4 py-2 rounded-xl text-xs font-bold text-cs2-neutral-700 bg-cs2-neutral-100 hover:bg-cs2-neutral-200 transition cursor-pointer" id="${id}-cancel" type="button"></button>
          <button class="btn ${btnClass} px-4 py-2 rounded-xl text-xs font-bold text-white transition cursor-pointer" id="${id}-confirm" type="button"></button>
        </div>
      </div>
    `;

    overlay.querySelector(`#${id}-title`).textContent = title;
    overlay.querySelector(`#${id}-message`).textContent = message;
    overlay.querySelector(`#${id}-cancel`).textContent = cancelText;
    overlay.querySelector(`#${id}-confirm`).textContent = confirmText;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const cleanup = () => {
      overlay.classList.remove('is-open');
      setTimeout(() => overlay.remove(), 300);
      document.body.style.overflow = '';
    };

    overlay.querySelector(`#${id}-confirm`).addEventListener('click', () => {
      cleanup();
      onConfirm();
    });

    overlay.querySelector(`#${id}-cancel`).addEventListener('click', () => {
      cleanup();
      onCancel();
    });

    overlay.querySelector('.modal-close').addEventListener('click', () => {
      cleanup();
      onCancel();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        onCancel();
      }
    });

    // Focus sur le bouton de confirmation
    setTimeout(() => overlay.querySelector(`#${id}-confirm`).focus(), 50);
  }

  /**
   * Initialiser les événements sur tous les boutons de modal dans la page
   */
  function init() {
    // Ouvrir via data-modal-open
    document.addEventListener('click', (e) => {
      const opener = e.target.closest('[data-modal-open]');
      if (opener) {
        const modalId = opener.getAttribute('data-modal-open');
        open(modalId);
      }

      // Fermer via data-modal-close
      const closer = e.target.closest('[data-modal-close]');
      if (closer) {
        const modalId = closer.getAttribute('data-modal-close');
        close(modalId);
      }

      // Fermer en cliquant sur l'overlay
      const overlay = e.target.closest('.modal-overlay');
      if (overlay && e.target === overlay) {
        const overlayId = overlay.id;
        if (overlayId) close(overlayId);
      }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLast();
      }
    });
  }

  return { open, close, closeLast, confirm, init };
})();

window.openConfirmationModal = function() {
  document.getElementById('confirmation-modal')?.classList.remove('hidden');
};
window.closeConfirmationModal = function() {
  document.getElementById('confirmation-modal')?.classList.add('hidden');
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => CS2Modal.init());
