/**
 * CS² Health — Theme Manager (Light / Dark)
 * js/core/theme.js
 */

const CS2Theme = (() => {
  const STORAGE_KEY = 'cs2-theme';
  const DARK_CLASS  = 'dark';

  /**
   * Obtenir le thème actuel
   * @returns {'light'|'dark'}
   */
  function getTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Appliquer le thème
   * @param {'light'|'dark'} theme
   */
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Mettre à jour les icônes soleil/lune
    const sunIcons  = document.querySelectorAll('[data-theme-icon="sun"]');
    const moonIcons = document.querySelectorAll('[data-theme-icon="moon"]');

    sunIcons.forEach(el  => el.style.display = theme === 'dark'  ? '' : 'none');
    moonIcons.forEach(el => el.style.display = theme === 'light' ? '' : 'none');

    // Mettre à jour aria-label du bouton
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
    }
  }

  /**
   * Définir et sauvegarder le thème
   * @param {'light'|'dark'} theme
   */
  function set(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    apply(theme);
  }

  /**
   * Basculer entre clair et sombre
   */
  function toggle() {
    const current = getTheme();
    set(current === 'dark' ? 'light' : 'dark');
  }

  /**
   * Initialiser le thème
   */
  function init() {
    apply(getTheme());

    // Bouton de bascule
    const btn = document.getElementById('theme-toggle-btn');
    btn?.addEventListener('click', toggle);

    // Écouter les changements système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        apply(e.matches ? 'dark' : 'light');
      }
    });
  }

  return { init, getTheme, set, toggle, apply };
})();

window.CS2Theme = CS2Theme;

// Appliquer le thème immédiatement pour éviter le flash
(function() {
  const stored = localStorage.getItem('cs2-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => CS2Theme.init());
