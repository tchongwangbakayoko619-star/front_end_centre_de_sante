/**
 * CS² Health — Logo component
 *
 * Unique source for the brand mark. Use anywhere:
 *   <cs2-logo size="lg" variant="full"></cs2-logo>
 *
 * Attributes:
 *   size    xs | sm | md | lg | xl   (default: md)
 *   variant mark | full              (default: full)
 *   theme   default | inverse        (default: default)
 *   href    optional link target
 */
(function () {
  'use strict';

  const SIZES = { xs: 28, sm: 36, md: 48, lg: 96, xl: 128 };

  const MARK_SVG = `
    <svg class="cs2-logo-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="CS2_GRAD" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#2dd4bf"/>
          <stop offset="55%" stop-color="#0d9488"/>
          <stop offset="100%" stop-color="#0f766e"/>
        </linearGradient>
        <mask id="CS2_MASK">
          <rect width="64" height="64" fill="black"/>
          <rect x="26" y="12" width="12" height="40" rx="3.5" fill="white"/>
          <rect x="12" y="26" width="40" height="12" rx="3.5" fill="white"/>
          <path d="M14 32 H24 L27.5 24 L32 42 L36.5 22 L40 38 L43 32 H50"
                fill="none" stroke="black" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        </mask>
      </defs>
      <rect class="cs2-logo-plate" width="64" height="64" rx="16" fill="url(#CS2_GRAD)"/>
      <rect class="cs2-logo-cross" width="64" height="64" fill="#ffffff" mask="url(#CS2_MASK)"/>
    </svg>`;

  let uid = 0;

  function uniqueSvg(svg) {
    const id = 'cs2l' + (++uid);
    return svg
      .replace(/id="CS2_GRAD"/g, 'id="' + id + '-g"')
      .replace(/url\(#CS2_GRAD\)/g, 'url(#' + id + '-g)')
      .replace(/id="CS2_MASK"/g, 'id="' + id + '-m"')
      .replace(/url\(#CS2_MASK\)/g, 'url(#' + id + '-m)');
  }

  function wordmark(theme) {
    const inverse = theme === 'inverse';
    const main = inverse ? '#ffffff' : '#020617';
    const accent = inverse ? '#99f6e4' : '#0d9488';
    return (
      '<span class="cs2-logo-wordmark" aria-hidden="true">' +
        '<span class="cs2-logo-word-main" style="color:' + main + '">CS²</span>' +
        '<span class="cs2-logo-word-accent" style="color:' + accent + '">Health</span>' +
      '</span>'
    );
  }

  class Cs2Logo extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'variant', 'theme', 'href'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const size = this.getAttribute('size') || 'md';
      const variant = this.getAttribute('variant') || 'full';
      const theme = this.getAttribute('theme') || 'default';
      const href = this.getAttribute('href');
      const px = SIZES[size] || SIZES.md;

      const inner =
        uniqueSvg(MARK_SVG) +
        (variant === 'mark' ? '' : wordmark(theme));

      const wrapClass = 'cs2-logo cs2-logo--' + size + ' cs2-logo--' + variant + ' cs2-logo--' + theme;

      if (href) {
        this.innerHTML =
          '<a class="' + wrapClass + '" href="' + href + '" aria-label="CS² Health">' + inner + '</a>';
      } else {
        this.innerHTML = '<span class="' + wrapClass + '" role="img" aria-label="CS² Health">' + inner + '</span>';
      }

      const mark = this.querySelector('.cs2-logo-mark');
      if (mark) {
        mark.style.width = px + 'px';
        mark.style.height = px + 'px';
      }
    }
  }

  function injectStyles() {
    if (document.getElementById('cs2-logo-styles')) return;
    const style = document.createElement('style');
    style.id = 'cs2-logo-styles';
    style.textContent = [
      'cs2-logo{display:inline-flex;line-height:0;vertical-align:middle}',
      '.cs2-logo{display:inline-flex;align-items:center;gap:.65rem;text-decoration:none;color:inherit}',
      '.cs2-logo-mark{display:block;flex-shrink:0;filter:drop-shadow(0 8px 16px rgba(13,148,136,.28))}',
      '.cs2-logo-wordmark{display:flex;flex-direction:column;line-height:1.05;font-family:"Plus Jakarta Sans",Inter,sans-serif}',
      '.cs2-logo-word-main{font-weight:800;letter-spacing:-.04em;font-size:1.05em}',
      '.cs2-logo-word-accent{font-weight:700;letter-spacing:.02em;font-size:.72em}',
      '.cs2-logo--xs .cs2-logo-wordmark{font-size:.7rem}',
      '.cs2-logo--sm .cs2-logo-wordmark{font-size:.85rem}',
      '.cs2-logo--md .cs2-logo-wordmark{font-size:1rem}',
      '.cs2-logo--lg .cs2-logo-wordmark{font-size:1.45rem}',
      '.cs2-logo--xl .cs2-logo-wordmark{font-size:1.85rem}',
      '.cs2-logo--auth{transition:transform .3s ease}',
      '.cs2-logo--auth:hover{transform:scale(1.04)}'
    ].join('');
    document.head.appendChild(style);
  }

  injectStyles();

  if (!customElements.get('cs2-logo')) {
    customElements.define('cs2-logo', Cs2Logo);
  }

  window.CS2 = window.CS2 || {};
  window.CS2.Logo = {
    sizes: SIZES,
    mount: function (el, attrs) {
      if (!el) return;
      const node = document.createElement('cs2-logo');
      Object.keys(attrs || {}).forEach(function (key) {
        if (attrs[key] != null) node.setAttribute(key, attrs[key]);
      });
      el.replaceWith(node);
    }
  };
})();
