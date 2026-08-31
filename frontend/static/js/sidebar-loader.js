/**
 * sidebar-loader.js — Chargement dynamique de la sidebar partagée
 * 
 * UTILISATION dans chaque page HTML :
 *   1. Ajouter <div id="sidebar-mount"></div> là où la sidebar doit apparaître
 *   2. Inclure ce script : <script src="[chemin]/static/js/sidebar-loader.js"></script>
 *   3. Définir window.SIDEBAR_ACTIVE = 'dashboard' (ou 'patients-list', etc.)
 *
 * SOURCE UNIQUE : templates/components/sidebar.html
 * ➜ Toute modification de la sidebar se fait UNIQUEMENT dans ce fichier.
 */

(function () {
  'use strict';

  function projectRoot() {
    if (window.CS2 && CS2.paths) return CS2.paths.projectRootFromScript('sidebar-loader.js');
    const scriptSrc = document.currentScript
      ? document.currentScript.src
      : Array.from(document.querySelectorAll('script[src*="sidebar-loader"]'))
             .pop()?.src || '';
    return scriptSrc.replace(/\/static\/js\/sidebar-loader\.js.*$/, '');
  }

  function resolveComponentPath() {
    return projectRoot() + '/templates/components/sidebar.html';
  }

  function computeRelativePath(from, to) {
    if (window.CS2 && CS2.paths) return CS2.paths.computeRelativePath(from, to);
    if (typeof from === 'string' && from.includes('://')) {
      try { from = new URL(from, window.location.href).pathname; } catch (e) { from = from.replace(/^https?:\/\/[^/]+/, ''); }
    }
    if (typeof to === 'string' && to.includes('://')) {
      try { to = new URL(to, window.location.href).pathname; } catch (e) { to = to.replace(/^https?:\/\/[^/]+/, ''); }
    }
    const fromParts = from.replace(/[^/]*$/, '').split('/').filter(Boolean);
    const toParts   = to.split('/').filter(Boolean);
    let common = 0;
    while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) common++;
    const ups = fromParts.length - common;
    const rel = '../'.repeat(ups) + toParts.slice(common).join('/');
    return rel || './';
  }

  // ── Submenu State Management (Persistence & Multi-Open) ────────────────────
  const STORAGE_KEY = 'cs2_open_submenus';

  function getOpenSubmenus() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveOpenSubmenus(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  window.toggleSidebarSubmenu = function(id) {
    const sub     = document.getElementById(id);
    const chevron = document.getElementById(id + '-chevron');
    if (!sub) return;

    const isHidden = sub.classList.contains('hidden');
    let openList   = getOpenSubmenus();

    if (isHidden) {
      // Déplie le sous-menu (sans fermer aucun autre sous-menu ouvert)
      sub.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
      if (!openList.includes(id)) {
        openList.push(id);
      }
    } else {
      // Replie uniquement le sous-menu sur lequel l'utilisateur a cliqué
      sub.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
      openList = openList.filter(item => item !== id);
    }

    saveOpenSubmenus(openList);
  };

  function restoreOpenSubmenus() {
    let openList = getOpenSubmenus();

    // Auto-ouvrir le sous-menu parent du lien actif
    const active = window.SIDEBAR_ACTIVE || '';
    if (active) {
      const link = document.querySelector('[data-nav-link="' + active + '"]');
      if (link) {
        const parentSub = link.closest('[id$="-sub"]');
        if (parentSub && !openList.includes(parentSub.id)) {
          openList.push(parentSub.id);
        }
      }
    }

    saveOpenSubmenus(openList);

    // Restaurer l'état ouvert de tous les sous-menus enregistrés
    openList.forEach(id => {
      const sub     = document.getElementById(id);
      const chevron = document.getElementById(id + '-chevron');
      if (sub)     sub.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
    });
  }

  // ── 3. Injection de la sidebar ─────────────────────────────────────────
  function injectSidebar(html) {
    const mount = document.getElementById('sidebar-mount');
    if (!mount) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const scripts = tempDiv.querySelectorAll('script');

    mount.outerHTML = tempDiv.innerHTML;

    // Résolution des liens relatifs selon la page courante
    const pageUrl  = window.location.pathname;
    const rootBase = projectRoot();

    // Résolution des hrefs pour les liens nav
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      const target = link.getAttribute('data-nav-href');
      if (!target) return;
      const absoluteTarget = rootBase + '/templates/pages/' + target;
      link.href = computeRelativePath(pageUrl, absoluteTarget);
    });

    // Re-execute script tags from inside sidebar template
    scripts.forEach(script => {
      if (script.textContent) {
        try {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          document.body.appendChild(newScript);
        } catch (e) {
          console.error('[sidebar-loader] Error executing sidebar script:', e);
        }
      }
    });

    // Active item highlighting & Submenus restoration
    highlightActive();
    restoreOpenSubmenus();

    // Fermer la sidebar mobile lors du clic sur un lien nav
    document.querySelectorAll('#app-sidebar a[href], #sidebar a[href]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768 && typeof window.closeMobileSidebar === 'function') {
          window.closeMobileSidebar();
        }
      });
    });
  }

  // ── 4. Highlighting de l'élément actif ────────────────────────────────
  function highlightActive() {
    const active = window.SIDEBAR_ACTIVE || '';
    if (!active) return;

    const link = document.querySelector('[data-nav-link="' + active + '"]');
    if (!link) return;

    link.classList.add('nav-active');
    link.style.backgroundColor = '#0f766e';
    link.style.color = '#ffffff';
  }

  // ── 5. Fetch & injection ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const mount = document.getElementById('sidebar-mount');
    if (!mount) return;

    const componentPath = resolveComponentPath();

    fetch(componentPath)
      .then(function (res) {
        if (!res.ok) throw new Error('sidebar-loader: HTTP ' + res.status + ' — ' + componentPath);
        return res.text();
      })
      .then(function (html) {
        injectSidebar(html);
      })
      .catch(function (err) {
        console.error('[sidebar-loader]', err);
      });
  });

})();
