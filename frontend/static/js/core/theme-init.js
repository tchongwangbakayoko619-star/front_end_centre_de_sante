/**
 * CS² Health — Early Theme Initializer (prevents theme flash before render)
 */
(function() {
  var stored = localStorage.getItem('cs2-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
