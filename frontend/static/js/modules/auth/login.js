/**
 * CS² Health — Login Module & Splash Screen Animation
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  const splash = document.getElementById('cs2-splash');
  const splashContent = document.getElementById('cs2-splash-content');
  const splashText = document.getElementById('cs2-splash-text');
  const splashDots = document.getElementById('cs2-splash-dots');
  const splashBar = document.getElementById('cs2-splash-bar');

  function triggerSplashScreen(targetUrl) {
    if (!splash) {
      window.location.href = targetUrl;
      return;
    }

    splash.classList.remove('pointer-events-none');
    splash.style.pointerEvents = 'all';
    splash.style.opacity = '1';

    if (splashContent) {
      splashContent.style.opacity = '1';
      splashContent.style.transform = 'scale(1) translateY(0)';
    }

    if (splashText) {
      splashText.style.opacity = '1';
      splashText.style.transform = 'translateY(0)';
    }

    if (splashDots) {
      splashDots.style.opacity = '1';
    }

    if (splashBar) {
      splashBar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      requestAnimationFrame(() => {
        splashBar.style.width = '100%';
      });
    }

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1300);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      if (loginForm.checkValidity && !loginForm.checkValidity()) {
        return;
      }
      e.preventDefault();
      
      const redirectUrl = loginForm.getAttribute('action') && loginForm.getAttribute('action') !== '#'
        ? loginForm.getAttribute('action')
        : '../reception/dashboard.html';

      triggerSplashScreen(redirectUrl);
    });
  }
});
