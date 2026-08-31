/**
 * CS² Health — User Profile Module
 */

window.SIDEBAR_ACTIVE = 'profile';

function switchTab(tabId) {
  document.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.setAttribute('aria-selected', 'false');
    btn.classList.remove('border-cs2-brand-600', 'text-cs2-brand-700');
    btn.classList.add('border-transparent', 'text-cs2-neutral-600');
  });
  document.querySelectorAll('.profile-tab-content').forEach(content => {
    content.classList.add('hidden');
  });

  const activeBtn = document.getElementById('tab-' + tabId);
  const activeContent = document.getElementById('content-' + tabId);
  if (activeBtn && activeContent) {
    activeBtn.setAttribute('aria-selected', 'true');
    activeBtn.classList.remove('border-transparent', 'text-cs2-neutral-600');
    activeBtn.classList.add('border-cs2-brand-600', 'text-cs2-brand-700');
    activeContent.classList.remove('hidden');
  }
}

function saveProfileChanges() {
  const toast = document.getElementById('profile-toast');
  if (toast) {
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (['info', 'security', 'preferences', 'activity'].includes(hash)) {
    switchTab(hash);
  }
});
