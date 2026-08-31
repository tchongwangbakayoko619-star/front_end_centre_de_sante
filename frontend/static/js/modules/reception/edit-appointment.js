/**
 * CS² Health — Edit Appointment Module
 */

window.SIDEBAR_ACTIVE = 'agenda';

const doctorsData = [
  { id: 'Valois', name: 'Dr. Marc VALOIS', spec: 'Cardiologie', fullText: 'Dr. Marc VALOIS (Cardiologie)' },
  { id: 'Bamba', name: 'Dr. Alain BAMBA', spec: 'Médecine Générale', fullText: 'Dr. Alain BAMBA (Générale)' },
  { id: 'Koffi', name: 'Dr. Jean-Baptiste KOFFI', spec: 'Pédiatrie', fullText: 'Dr. Jean-Baptiste KOFFI (Pédiatrie)' },
  { id: 'Traore', name: 'Dr. Sarah TRAORE', spec: 'Neurologie', fullText: 'Dr. Sarah TRAORE (Neurologie)' }
];

document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('id_medecin_input');
  const hiddenEl = document.getElementById('id_medecin');
  const menuEl = document.getElementById('doctor-dropdown-menu');

  function renderMenu(filterText = '') {
    if (!menuEl) return;
    const query = filterText.toLowerCase().trim();
    const filtered = doctorsData.filter(item => 
      item.fullText.toLowerCase().includes(query) ||
      item.spec.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      menuEl.innerHTML = '<div class="p-3 text-xs text-cs2-neutral-400 font-medium text-center">Aucun médecin trouvé</div>';
    } else {
      menuEl.innerHTML = filtered.map(item => `
        <div data-id="${item.id}" data-text="${item.fullText}"
             class="combobox-item p-3 text-xs cursor-pointer hover:bg-cs2-brand-50 transition flex items-center justify-between">
          <div>
            <div class="font-extrabold text-cs2-neutral-900">${item.name}</div>
            <div class="text-[11px] text-cs2-neutral-500 font-medium mt-0.5">${item.spec}</div>
          </div>
        </div>
      `).join('');

      menuEl.querySelectorAll('.combobox-item').forEach(el => {
        el.addEventListener('click', () => {
          if (inputEl) inputEl.value = el.dataset.text;
          if (hiddenEl) hiddenEl.value = el.dataset.id;
          menuEl.classList.add('hidden');
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

function selectSlot(timeStr, btn) {
  document.querySelectorAll('.slot-btn').forEach(b => {
    b.className = 'slot-btn py-2 px-3 rounded-xl border border-cs2-neutral-200 bg-white font-bold text-cs2-neutral-800 text-center hover:bg-cs2-brand-50 transition';
    b.innerText = b.innerText.replace(' (Sélectionné)', ' (Libre)').replace(' (Actuel)', ' (Libre)');
  });
  btn.className = 'slot-btn py-2 px-3 rounded-xl bg-cs2-brand-600 text-white font-bold shadow-sm text-center border border-cs2-brand-600 transition';
  if (!btn.innerText.includes('(Sélectionné)')) {
    btn.innerText = timeStr + ' (Sélectionné)';
  }
  const heureInput = document.getElementById('id_heure_rdv');
  if (heureInput) heureInput.value = timeStr;
}
