/**
 * CS² Health — Send Notification Module
 */

window.SIDEBAR_ACTIVE = 'send-notif';

function updateCharCount(textarea) {
  if (!textarea) return;
  const len = textarea.value.length;
  const counter = document.getElementById('sms-counter');
  const preview = document.getElementById('sms-preview');
  const smsCount = Math.ceil(len / 160) || 1;
  if (counter) counter.innerText = `${len} / 160 caractères (${smsCount} SMS)`;
  if (preview) preview.innerText = textarea.value || 'Aperçu du message...';
}

const patientsData = [
  { id: 'Jeanne DUPONT', name: 'Jeanne DUPONT', tel: '+225 07 08 45 12 90', email: 'jeanne.dupont@exemple.org', fullText: 'Jeanne DUPONT (+225 07 08 45 12 90 • jeanne.dupont@exemple.org)' },
  { id: 'Koffi EMMANUEL', name: 'Koffi EMMANUEL', tel: '+225 05 44 11 89 02', email: 'koffi.emmanuel@exemple.org', fullText: 'Koffi EMMANUEL (+225 05 44 11 89 02 • koffi.emmanuel@exemple.org)' },
  { id: 'Awa KONE', name: 'Awa KONE', tel: '+225 01 23 45 67 89', email: 'awa.kone@exemple.org', fullText: 'Awa KONE (+225 01 23 45 67 89 • awa.kone@exemple.org)' },
  { id: 'Mamadou DIARRA', name: 'Mamadou DIARRA', tel: '+225 07 99 88 77 66', email: 'mamadou.diarra@exemple.org', fullText: 'Mamadou DIARRA (+225 07 99 88 77 66 • mamadou.diarra@exemple.org)' },
  { id: 'Marie-Claire KOUASSI', name: 'Marie-Claire KOUASSI', tel: '+225 05 12 34 56 78', email: 'mc.kouassi@exemple.org', fullText: 'Marie-Claire KOUASSI (+225 05 12 34 56 78 • mc.kouassi@exemple.org)' }
];

document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('id_patient_input');
  const hiddenEl = document.getElementById('id_patient');
  const menuEl = document.getElementById('patient-dropdown-menu');

  function renderMenu(filterText = '') {
    if (!menuEl) return;
    const query = filterText.toLowerCase().trim();
    const filtered = patientsData.filter(item => 
      item.fullText.toLowerCase().includes(query) ||
      item.tel.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      menuEl.innerHTML = '<div class="p-3 text-xs text-cs2-neutral-400 font-medium text-center">Aucun patient trouvé</div>';
    } else {
      menuEl.innerHTML = filtered.map(item => `
        <div data-id="${item.id}" data-text="${item.fullText}" data-name="${item.name}"
             class="combobox-item p-3 text-xs cursor-pointer hover:bg-cs2-brand-50 transition flex items-center justify-between">
          <div>
            <div class="font-extrabold text-cs2-neutral-900">${item.name}</div>
            <div class="text-[11px] text-cs2-neutral-500 font-medium mt-0.5">${item.tel} • ${item.email}</div>
          </div>
          <svg class="w-4 h-4 text-cs2-brand-600 opacity-0 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
      `).join('');

      menuEl.querySelectorAll('.combobox-item').forEach(el => {
        el.addEventListener('click', () => {
          if (inputEl) inputEl.value = el.dataset.text;
          if (hiddenEl) hiddenEl.value = el.dataset.id;
          menuEl.classList.add('hidden');

          const msgArea = document.getElementById('id_message');
          if (msgArea) {
            msgArea.value = `CS2 Health: Mme/M. ${el.dataset.name}, nous vous confirmons votre RDV du 26/08 à 09h30 avec le Dr Valois.`;
            updateCharCount(msgArea);
          }
        });
      });
    }
  }

  if (inputEl && menuEl) {
    inputEl.addEventListener('focus', () => {
      renderMenu(inputEl.value);
      menuEl.classList.remove('hidden');
    });

    inputEl.addEventListener('input', () => {
      renderMenu(inputEl.value);
      menuEl.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!inputEl.contains(e.target) && !menuEl.contains(e.target)) {
        menuEl.classList.add('hidden');
      }
    });
  }
});
