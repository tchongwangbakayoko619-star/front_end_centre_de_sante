// navigation.js — Global Mobile Navigation Controller
(function() {
    'use strict';

    function getSidebar() {
        return document.getElementById('app-sidebar') || document.getElementById('sidebar');
    }

    function getOverlay() {
        return document.getElementById('mobile-sidebar-overlay') || document.getElementById('sidebar-overlay');
    }

    window.openMobileSidebar = function() {
        const sidebar = getSidebar();
        const overlay = getOverlay();
        if (sidebar) {
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0', 'is-open', 'open');
            sidebar.style.transform = 'translateX(0)';
        }
        if (overlay) {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'pointer-events-auto', 'is-visible');
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        }
        document.body.style.overflow = 'hidden';
    };

    window.closeMobileSidebar = function() {
        const sidebar = getSidebar();
        const overlay = getOverlay();
        if (sidebar) {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0', 'is-open', 'open');
            sidebar.style.transform = '';
        }
        if (overlay) {
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'pointer-events-auto', 'is-visible');
            overlay.style.opacity = '';
            overlay.style.pointerEvents = '';
        }
        document.body.style.overflow = '';
    };

    window.toggleMobileSidebar = function() {
        const sidebar = getSidebar();
        if (!sidebar) return;
        const isVisible = sidebar.classList.contains('translate-x-0') ||
                          sidebar.classList.contains('is-open') ||
                          sidebar.classList.contains('open') ||
                          sidebar.style.transform === 'translateX(0px)' ||
                          sidebar.style.transform === 'translateX(0)';
        if (isVisible) {
            window.closeMobileSidebar();
        } else {
            window.openMobileSidebar();
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeMobileSidebar();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            window.closeMobileSidebar();
        }
    });
})();
