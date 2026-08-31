/**
 * CS² Health — Static Preview Loader
 * Loads header and sidebar components for static HTML previews
 */
(function() {
  if (document.getElementById('sidebar-container')) {
    fetch('../../templates/components/sidebar.html')
      .then(r => r.text())
      .then(html => {
        const el = document.getElementById('sidebar-container');
        if (el) el.outerHTML = html;
      }).catch(() => {});
  }

  if (document.getElementById('header-container')) {
    fetch('../../templates/components/header.html')
      .then(r => r.text())
      .then(html => {
        const el = document.getElementById('header-container');
        if (el) el.outerHTML = html;
      }).catch(() => {});
  }
})();
