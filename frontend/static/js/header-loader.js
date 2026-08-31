/**
 * header-loader.js — Dynamic header/topbar loader for static preview mode
 * Loads templates/components/header.html into #header-mount when not running in Django
 */

(function () {
  'use strict';

  function projectRoot() {
    if (window.CS2 && CS2.paths) return CS2.paths.projectRootFromScript('header-loader.js');
    const scriptSrc = document.currentScript
      ? document.currentScript.src
      : Array.from(document.querySelectorAll('script[src*="header-loader"]'))
             .pop()?.src || '';
    return scriptSrc.replace(/\/static\/js\/header-loader\.js.*$/, '');
  }

  function resolveHeaderPath() {
    return projectRoot() + '/templates/components/header.html';
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

  function injectHeader(html) {
    const mount = document.getElementById('header-mount');
    if (!mount) return;

    // Create container to parse HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract script tags before replacing mount
    const scripts = tempDiv.querySelectorAll('script');
    
    mount.outerHTML = tempDiv.innerHTML;

    // Fix relative links and images in header for static preview
    const pageUrl  = window.location.pathname;
    const rootBase = projectRoot();

    document.querySelectorAll('header a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;
      if (href.includes('dashboard.html') || href === '../dashboard.html') {
        link.href = computeRelativePath(pageUrl, rootBase + '/templates/pages/reception/dashboard.html');
      } else if (href.includes('notifications/history.html') || href.includes('history.html')) {
        link.href = computeRelativePath(pageUrl, rootBase + '/templates/pages/reception/notifications/history.html');
      } else if (href.includes('profile/index.html') || href.includes('profile')) {
        link.href = computeRelativePath(pageUrl, rootBase + '/templates/pages/profile/index.html');
      }
    });

    // Re-execute scripts that were inside the header template
    scripts.forEach(script => {
      if (script.textContent) {
        try {
          const newScript = document.createElement('script');
          newScript.textContent = script.textContent;
          document.body.appendChild(newScript);
        } catch (e) {
          console.error('[header-loader] Error executing header script:', e);
        }
      }
    });
  }

  function loadHeader() {
    const mount = document.getElementById('header-mount');
    if (!mount) return;

    const path = resolveHeaderPath();
    fetch(path)
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(html => injectHeader(html))
      .catch(err => console.warn('[header-loader] Error loading header:', err));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
