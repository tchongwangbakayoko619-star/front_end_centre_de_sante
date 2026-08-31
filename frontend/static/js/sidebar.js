/**
 * CS² Health — Sidebar Module
 * js/components/sidebar.js
 *
 * Gère: toggle mobile, active state automatique
 */

const CS2Sidebar = (() => {

  const SIDEBAR_ID     = 'sidebar';
  const OVERLAY_ID     = 'sidebar-overlay';
  const TOGGLE_BTN_ID  = 'sidebar-toggle-btn';
  const OPEN_CLASS     = 'is-open';
  const VISIBLE_CLASS  = 'is-visible';
  const ACTIVE_CLASS   = 'is-active';

  let sidebar, overlay, toggleBtn;

  /**
   * Ouvrir la sidebar (mobile)
   */
  function open() {
    sidebar?.classList.add(OPEN_CLASS);
    overlay?.classList.add(VISIBLE_CLASS);
    toggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Fermer la sidebar (mobile)
   */
  function close() {
    sidebar?.classList.remove(OPEN_CLASS);
    overlay?.classList.remove(VISIBLE_CLASS);
    toggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /**
   * Basculer la sidebar
   */
  function toggle() {
    if (sidebar?.classList.contains(OPEN_CLASS)) {
      close();
    } else {
      open();
    }
  }

  /**
   * Définir l'élément actif dans la sidebar
   * basé sur l'URL courante
   */
  function setActiveItem() {
    if (!sidebar) return;

    const currentPath = window.location.pathname;
    const currentFile = window.location.href;

    const items = sidebar.querySelectorAll('.sidebar-item');

    items.forEach(item => {
      item.classList.remove(ACTIVE_CLASS);
      item.removeAttribute('aria-current');
    });

    // Correspondance par attribut data-page ou par href
    let matched = false;

    // 1. Chercher data-active-on correspondant au path
    items.forEach(item => {
      const activePaths = item.getAttribute('data-active-on');
      if (activePaths) {
        const paths = activePaths.split(',').map(p => p.trim());
        if (paths.some(p => currentPath.includes(p) || currentFile.includes(p))) {
          item.classList.add(ACTIVE_CLASS);
          item.setAttribute('aria-current', 'page');
          matched = true;
        }
      }
    });

    // 2. Fallback: correspondance par href
    if (!matched) {
      let bestMatch = null;
      let bestLength = 0;

      items.forEach(item => {
        const href = item.getAttribute('href');
        if (!href || href === '#') return;

        // Extraire le nom du fichier du href
        const hrefFile = href.split('/').pop();
        const currentFilename = currentFile.split('/').pop().split('?')[0];

        if (hrefFile && currentFilename && hrefFile === currentFilename) {
          if (hrefFile.length > bestLength) {
            bestLength = hrefFile.length;
            bestMatch = item;
          }
        }
      });

      if (bestMatch) {
        bestMatch.classList.add(ACTIVE_CLASS);
        bestMatch.setAttribute('aria-current', 'page');
      }
    }
  }

  /**
   * Initialiser la sidebar
   */
  function init() {
    sidebar    = document.getElementById(SIDEBAR_ID);
    overlay    = document.getElementById(OVERLAY_ID);
    toggleBtn  = document.getElementById(TOGGLE_BTN_ID);

    if (!sidebar) return;

    // Bouton toggle
    toggleBtn?.addEventListener('click', toggle);

    // Fermer en cliquant sur l'overlay
    overlay?.addEventListener('click', close);

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains(OPEN_CLASS)) {
        close();
      }
    });

    // Fermer la sidebar quand on clique sur un lien (mobile)
    sidebar.querySelectorAll('.sidebar-item[href]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          close();
        }
      });
    });

    // Fermer sur resize vers desktop
    window.addEventListener('resize', CS2Utils?.debounce(() => {
      if (window.innerWidth >= 768) {
        close();
      }
    }, 200) || (() => {}));

    // Activer l'élément courant
    setActiveItem();
  }

  return { init, open, close, toggle, setActiveItem };
})();

window.CS2Sidebar = CS2Sidebar;

document.addEventListener('DOMContentLoaded', () => CS2Sidebar.init());
