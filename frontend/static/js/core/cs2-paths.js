/**
 * CS² Health — résolution de chemins partagée (preview HTML statique)
 */
(function () {
  'use strict';

  function toPathname(value) {
    if (typeof value === 'string' && value.includes('://')) {
      try {
        return new URL(value, window.location.href).pathname;
      } catch (e) {
        return value.replace(/^https?:\/\/[^/]+/, '');
      }
    }
    return value;
  }

  function computeRelativePath(from, to) {
    from = toPathname(from);
    to = toPathname(to);
    const fromParts = from.replace(/[^/]*$/, '').split('/').filter(Boolean);
    const toParts = to.split('/').filter(Boolean);
    let common = 0;
    while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) {
      common++;
    }
    const ups = fromParts.length - common;
    const rel = '../'.repeat(ups) + toParts.slice(common).join('/');
    return rel || './';
  }

  function projectRootFromScript(scriptName) {
    const scriptSrc = document.currentScript
      ? document.currentScript.src
      : (Array.from(document.querySelectorAll('script[src*="' + scriptName + '"]')).pop() || {}).src || '';
    return scriptSrc.replace(/\/static\/js\/.*$/, '');
  }

  window.CS2 = window.CS2 || {};
  window.CS2.paths = {
    computeRelativePath: computeRelativePath,
    projectRootFromScript: projectRootFromScript
  };
})();
