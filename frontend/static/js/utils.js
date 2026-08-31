/**
 * CS² Health — Utility Functions
 * js/core/utils.js
 */

const CS2Utils = (() => {

  /**
   * Formater un montant en FCFA
   * @param {number} amount
   * @returns {string}
   */
  function formatMoney(amount) {
    if (typeof amount !== 'number') return '—';
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  }

  /**
   * Formater une date en français
   * @param {string|Date} date
   * @param {object} options
   * @returns {string}
   */
  function formatDate(date, options = {}) {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d)) return '—';
    const defaultOptions = {
      day: '2-digit', month: '2-digit', year: 'numeric',
      ...options
    };
    return new Intl.DateTimeFormat('fr-FR', defaultOptions).format(d);
  }

  /**
   * Formater une date + heure
   * @param {string|Date} date
   * @returns {string}
   */
  function formatDateTime(date) {
    return formatDate(date, {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  /**
   * Débounce
   * @param {Function} fn
   * @param {number} delay
   * @returns {Function}
   */
  function debounce(fn, delay = 300) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * Throttle
   */
  function throttle(fn, limit = 100) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Sanitizer basique pour éviter XSS
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Générer des initiales depuis un nom
   * @param {string} name
   * @returns {string}
   */
  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Copier du texte dans le presse-papier
   * @param {string} text
   * @returns {Promise<boolean>}
   */
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Récupérer la valeur d'un paramètre URL
   * @param {string} name
   * @returns {string|null}
   */
  function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /**
   * Vérifier si un élément est visible dans le viewport
   * @param {Element} el
   * @returns {boolean}
   */
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Attendre N millisecondes
   * @param {number} ms
   * @returns {Promise}
   */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return {
    formatMoney,
    formatDate,
    formatDateTime,
    debounce,
    throttle,
    escapeHtml,
    getInitials,
    copyToClipboard,
    getUrlParam,
    isInViewport,
    sleep,
  };
})();

// Exposer globalement
window.CS2Utils = CS2Utils;
