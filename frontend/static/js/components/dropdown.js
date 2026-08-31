/**
 * CS² Health — Dropdown Module
 * js/components/dropdown.js
 *
 * Activation automatique par data-dropdown="toggle"
 */

const CS2Dropdown = (() => {

  const OPEN_CLASS = 'is-open';

  /**
   * Ouvrir un dropdown
   */
  function open(dropdownEl) {
    if (!dropdownEl) return;
    dropdownEl.classList.add(OPEN_CLASS);
    const toggle = dropdownEl.querySelector('[data-dropdown="toggle"]');
    toggle?.setAttribute('aria-expanded', 'true');
  }

  /**
   * Fermer un dropdown
   */
  function close(dropdownEl) {
    if (!dropdownEl) return;
    dropdownEl.classList.remove(OPEN_CLASS);
    const toggle = dropdownEl.querySelector('[data-dropdown="toggle"]');
    toggle?.setAttribute('aria-expanded', 'false');
  }

  /**
   * Fermer tous les dropdowns
   */
  function closeAll() {
    document.querySelectorAll(`.dropdown.${OPEN_CLASS}`).forEach(close);
  }

  /**
   * Basculer un dropdown
   */
  function toggle(dropdownEl) {
    if (dropdownEl.classList.contains(OPEN_CLASS)) {
      close(dropdownEl);
    } else {
      closeAll();
      open(dropdownEl);
    }
  }

  /**
   * Initialiser les dropdowns
   */
  function init() {
    // Clic sur le toggle
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('[data-dropdown="toggle"]');

      if (toggleBtn) {
        e.stopPropagation();
        const dropdown = toggleBtn.closest('.dropdown');
        if (dropdown) toggle(dropdown);
        return;
      }

      // Clic en dehors = fermer tous
      if (!e.target.closest('.dropdown')) {
        closeAll();
      }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });

    // Navigation au clavier dans le menu
    document.addEventListener('keydown', (e) => {
      const openDropdown = document.querySelector(`.dropdown.${OPEN_CLASS}`);
      if (!openDropdown) return;

      const items = Array.from(openDropdown.querySelectorAll('.dropdown-item'));
      const focusedIndex = items.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[focusedIndex + 1] || items[0];
        next?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[focusedIndex - 1] || items[items.length - 1];
        prev?.focus();
      }
    });
  }

  return { init, open, close, closeAll, toggle };
})();

window.CS2Dropdown = CS2Dropdown;

document.addEventListener('DOMContentLoaded', () => CS2Dropdown.init());

// ── Global Header Dropdown Handlers ──────────────────────────────────────────
window.toggleNotificationsDropdown = function(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const notifMenu = document.getElementById('notifications-dropdown-menu');
  const userMenu = document.getElementById('user-dropdown-menu');
  const langMenu = document.getElementById('language-dropdown-menu');

  if (userMenu) userMenu.classList.add('hidden');
  if (langMenu) langMenu.classList.add('hidden');

  if (notifMenu) {
    notifMenu.classList.toggle('hidden');
  }
};

window.toggleUserDropdown = function(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const userMenu = document.getElementById('user-dropdown-menu');
  const notifMenu = document.getElementById('notifications-dropdown-menu');
  const langMenu = document.getElementById('language-dropdown-menu');

  if (notifMenu) notifMenu.classList.add('hidden');
  if (langMenu) langMenu.classList.add('hidden');

  if (userMenu) {
    userMenu.classList.toggle('hidden');
  }
};

window.toggleLanguageDropdown = function(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const langMenu = document.getElementById('language-dropdown-menu');
  const notifMenu = document.getElementById('notifications-dropdown-menu');
  const userMenu = document.getElementById('user-dropdown-menu');

  if (notifMenu) notifMenu.classList.add('hidden');
  if (userMenu) userMenu.classList.add('hidden');

  if (langMenu) {
    langMenu.classList.toggle('hidden');
  }
};

window.markAllNotifsRead = function() {
  const badgeDot = document.getElementById('notif-badge-dot');
  const countBadge = document.getElementById('notif-count-badge');
  if (badgeDot) badgeDot.classList.add('hidden');
  if (countBadge) {
    countBadge.textContent = '0 nouvelle';
    countBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cs2-neutral-100 text-cs2-neutral-600 border border-cs2-neutral-200';
  }
};

window.selectLanguage = function(lang) {
  const label = document.getElementById('current-lang-label');
  if (label) label.textContent = lang;
  const langMenu = document.getElementById('language-dropdown-menu');
  if (langMenu) langMenu.classList.add('hidden');
};

window.toggleMobileSearchBar = function() {
  const bar = document.getElementById('mobile-search-bar');
  if (bar) {
    bar.classList.toggle('hidden');
    if (!bar.classList.contains('hidden')) {
      const input = bar.querySelector('input');
      if (input) {
        setTimeout(function() { input.focus(); }, 50);
      }
    }
  }
};

document.addEventListener('click', (e) => {
  const notifMenu = document.getElementById('notifications-dropdown-menu');
  const notifBtn = document.getElementById('notif-menu-btn');
  const userMenu = document.getElementById('user-dropdown-menu');
  const userBtn = document.getElementById('user-menu-btn');
  const langMenu = document.getElementById('language-dropdown-menu');
  const langBtn = document.getElementById('lang-menu-btn');

  // If clicking directly on any toggle button, let onclick handle it
  if (notifBtn && notifBtn.contains(e.target)) return;
  if (userBtn && userBtn.contains(e.target)) return;
  if (langBtn && langBtn.contains(e.target)) return;

  // Close dropdowns when clicking outside
  if (notifMenu && !notifMenu.contains(e.target)) {
    notifMenu.classList.add('hidden');
  }
  if (userMenu && !userMenu.contains(e.target)) {
    userMenu.classList.add('hidden');
  }
  if (langMenu && !langMenu.contains(e.target)) {
    langMenu.classList.add('hidden');
  }
});


