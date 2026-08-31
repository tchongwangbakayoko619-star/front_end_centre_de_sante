/**
 * CS² Health — Notifications History Module
 */

function markAllNotifsReadInHistory() {
  document.querySelectorAll('#notif-table-body .notif-row').forEach(row => {
    row.setAttribute('data-read', 'true');
    const dot = row.querySelector('.unread-dot');
    if (dot) {
      dot.classList.remove('bg-cs2-brand-600');
      dot.classList.add('bg-transparent');
    }
    const nameEl = row.querySelector('.notif-patient-name');
    if (nameEl) {
      nameEl.classList.remove('font-extrabold', 'text-cs2-neutral-950');
      nameEl.classList.add('font-bold', 'text-cs2-neutral-900');
    }
  });
  if (typeof window.markAllNotifsRead === 'function') {
    window.markAllNotifsRead();
  }
}

function toggleReadState(btn) {
  const row = btn.closest('.notif-row');
  if (!row) return;
  const isRead = row.getAttribute('data-read') === 'true';
  row.setAttribute('data-read', !isRead ? 'true' : 'false');
  
  const dot = row.querySelector('.unread-dot');
  if (dot) {
    if (!isRead) {
      dot.classList.remove('bg-cs2-brand-600');
      dot.classList.add('bg-transparent');
    } else {
      dot.classList.remove('bg-transparent');
      dot.classList.add('bg-cs2-brand-600');
    }
  }
}

function deleteNotifRow(btn) {
  const row = btn.closest('.notif-row');
  if (row) row.remove();
}

function openNotifModal(patient, contact, channel, status, date, origin, content) {
  const pEl = document.getElementById('modal-notif-patient');
  const cEl = document.getElementById('modal-notif-contact');
  const chEl = document.getElementById('modal-notif-channel');
  const stEl = document.getElementById('modal-notif-status');
  const dEl = document.getElementById('modal-notif-date');
  const oEl = document.getElementById('modal-notif-origin');
  const cntEl = document.getElementById('modal-notif-content');

  if (pEl) pEl.textContent = patient;
  if (cEl) cEl.textContent = contact;
  if (chEl) chEl.textContent = channel;
  if (stEl) stEl.textContent = status;
  if (dEl) dEl.textContent = date;
  if (oEl) oEl.textContent = origin;
  if (cntEl) cntEl.textContent = content;

  const modal = document.getElementById('notification-detail-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeNotifModal() {
  const modal = document.getElementById('notification-detail-modal');
  if (modal) modal.classList.add('hidden');
}

function filterNotificationsTable() {
  const searchVal = (document.getElementById('notif-search')?.value || '').toLowerCase();
  const channelVal = (document.getElementById('filter-channel')?.value || '').toLowerCase();

  document.querySelectorAll('#notif-table-body .notif-row').forEach(row => {
    const text = row.textContent.toLowerCase();
    const rowChannel = (row.getAttribute('data-channel') || '').toLowerCase();

    const matchesSearch = !searchVal || text.includes(searchVal);
    const matchesChannel = !channelVal || rowChannel === channelVal;

    if (matchesSearch && matchesChannel) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function resetNotifFilters() {
  const searchInput = document.getElementById('notif-search');
  const channelSelect = document.getElementById('filter-channel');
  if (searchInput) searchInput.value = '';
  if (channelSelect) channelSelect.value = '';
  filterNotificationsTable();
}
