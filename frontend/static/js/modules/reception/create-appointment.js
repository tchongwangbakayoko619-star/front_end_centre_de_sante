/**
 * CS² Health — Create Appointment Module
 */

window.SIDEBAR_ACTIVE = 'appointments-create';

const specialtiesData = [
  { id: 'Cardiologie', name: 'Cardiologie', details: 'Maladies vasculaires & cardiovasculaires', fullText: 'Cardiologie (Cœur & Vaisseaux)' },
  { id: 'Médecine Générale', name: 'Médecine Générale', details: 'Consultations générales & suivi', fullText: 'Médecine Générale (Soins primaires)' },
  { id: 'Pédiatrie', name: 'Pédiatrie', details: 'Santé des enfants & adolescents', fullText: 'Pédiatrie (Suivi pédiatrique)' },
  { id: 'Neurologie', name: 'Neurologie', details: 'Cerveau & système nerveux', fullText: 'Neurologie (Cerveau & Nerfs)' },
  { id: 'Dermatologie', name: 'Dermatologie', details: 'Pathologies cutanées', fullText: 'Dermatologie (Peau & Mucoses)' },
  { id: 'Gynécologie', name: 'Gynécologie', details: 'Santé génésique féminine', fullText: 'Gynécologie (Santé de la femme)' },
  { id: 'Ophtalmologie', name: 'Ophtalmologie', details: 'Examens de la vue & chirurgie de l’œil', fullText: 'Ophtalmologie (Vision & Yeux)' }
];

const patientsData = [
  { id: '254-890-412', name: 'Jeanne DUPONT', nup: '254-890-412', tel: '+225 07 08 45 12 90', fullText: 'Jeanne DUPONT (NUP: 254-890-412 • +225 07 08 45 12 90)' },
  { id: '108-765-209', name: 'Koffi EMMANUEL', nup: '108-765-209', tel: '+225 05 44 11 89 02', fullText: 'Koffi EMMANUEL (NUP: 108-765-209 • +225 05 44 11 89 02)' },
  { id: '312-904-581', name: 'Awa KONE', nup: '312-904-581', tel: '+225 01 23 45 67 89', fullText: 'Awa KONE (NUP: 312-904-581 • +225 01 23 45 67 89)' },
  { id: '419-203-776', name: 'Mamadou DIARRA', nup: '419-203-776', tel: '+225 07 99 88 77 66', fullText: 'Mamadou DIARRA (NUP: 419-203-776 • +225 07 99 88 77 66)' },
  { id: '550-112-984', name: 'Marie-Claire KOUASSI', nup: '550-112-984', tel: '+225 05 12 34 56 78', fullText: 'Marie-Claire KOUASSI (NUP: 550-112-984 • +225 05 12 34 56 78)' }
];

const doctorsData = [
  { id: 'Valois', name: 'Dr. Marc VALOIS', spec: 'Cardiologie', fullText: 'Dr. Marc VALOIS (Cardiologue)' },
  { id: 'Bamba', name: 'Dr. Aminata BAMBA', spec: 'Médecine Générale', fullText: 'Dr. Aminata BAMBA (Médecine Générale)' },
  { id: 'Koffi', name: 'Dr. Jean-Baptiste KOFFI', spec: 'Pédiatrie', fullText: 'Dr. Jean-Baptiste KOFFI (Pédiatrie)' },
  { id: 'Traore', name: 'Dr. Sarah TRAORE', spec: 'Neurologie', fullText: 'Dr. Sarah TRAORE (Neurologie)' }
];

function setupCombobox(inputEl, hiddenEl, menuEl, items, onSelectCallback) {
  if (!inputEl || !hiddenEl || !menuEl) return;

  function renderMenu(filterText = '') {
    const query = filterText.toLowerCase().trim();
    const filtered = items.filter(item => 
      item.fullText.toLowerCase().includes(query) ||
      (item.nup && item.nup.toLowerCase().includes(query)) ||
      (item.tel && item.tel.toLowerCase().includes(query)) ||
      (item.spec && item.spec.toLowerCase().includes(query)) ||
      (item.name && item.name.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      menuEl.innerHTML = '<div class="p-3 text-xs text-cs2-neutral-400 font-medium text-center">Aucun résultat trouvé</div>';
    } else {
      menuEl.innerHTML = filtered.map(item => `
        <div data-id="${item.id}" data-text="${item.fullText || item.name}" data-name="${item.name}" data-spec="${item.spec || item.id || ''}"
             class="combobox-item p-3 text-xs cursor-pointer hover:bg-cs2-brand-50 transition flex items-center justify-between">
          <div>
            <div class="font-extrabold text-cs2-neutral-900">${item.name}</div>
            <div class="text-[11px] text-cs2-neutral-500 font-medium mt-0.5">${item.details || item.spec || item.nup || ''}</div>
          </div>
          <svg class="w-4 h-4 text-cs2-brand-600 opacity-0 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </div>
      `).join('');

      menuEl.querySelectorAll('.combobox-item').forEach(el => {
        el.addEventListener('click', () => {
          inputEl.value = el.dataset.text;
          hiddenEl.value = el.dataset.id;
          menuEl.classList.add('hidden');
          if (onSelectCallback) onSelectCallback(el.dataset);
        });
      });
    }
  }

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

document.addEventListener('DOMContentLoaded', () => {
  const patientInput = document.getElementById('id_patient_search_input');
  const patientHidden = document.getElementById('id_patient_search');
  const patientMenu = document.getElementById('patient-dropdown-menu');
  setupCombobox(patientInput, patientHidden, patientMenu, patientsData);

  const specInput = document.getElementById('id_specialite_input');
  const specHidden = document.getElementById('id_specialite');
  const specMenu = document.getElementById('specialty-dropdown-menu');
  
  const doctorInput = document.getElementById('id_medecin_input');
  const doctorHidden = document.getElementById('id_medecin');
  const doctorMenu = document.getElementById('doctor-dropdown-menu');

  setupCombobox(specInput, specHidden, specMenu, specialtiesData, (data) => {
    const matchingDoc = doctorsData.find(d => d.spec === data.id);
    if (matchingDoc && doctorInput && doctorHidden) {
      doctorInput.value = matchingDoc.fullText;
      doctorHidden.value = matchingDoc.id;
    }
  });

  setupCombobox(doctorInput, doctorHidden, doctorMenu, doctorsData, (data) => {
    if (data.spec && specInput && specHidden) {
      specInput.value = data.spec;
      specHidden.value = data.spec;
    }
  });
});

function selectSlot(timeStr, btn) {
  document.querySelectorAll('.slot-btn').forEach(b => {
    b.className = 'slot-btn py-2 px-3 rounded-xl border border-cs2-neutral-200 bg-white font-bold text-cs2-neutral-800 text-center hover:bg-cs2-brand-50 hover:border-cs2-brand-300 transition';
    b.innerText = b.innerText.replace(' (Sélectionné)', ' (Libre)');
  });
  btn.className = 'slot-btn py-2 px-3 rounded-xl bg-cs2-brand-600 text-white font-bold shadow-sm text-center border border-cs2-brand-600 transition';
  if (!btn.innerText.includes('(Sélectionné)')) {
    btn.innerText = timeStr + ' (Sélectionné)';
  }
  const heureInput = document.getElementById('id_heure_rdv');
  if (heureInput) heureInput.value = timeStr;
}
