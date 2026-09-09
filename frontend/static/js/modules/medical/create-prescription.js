/**
 * CS² Health — Medical Create Prescription Module
 */

window.SIDEBAR_ACTIVE = 'medical-prescriptions';

let medCount = 1;

function addMedicationLine() {
  medCount++;
  const container = document.getElementById('medications-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = "med-line p-4 rounded-xl border border-cs2-neutral-200 bg-white space-y-3 shadow-2xs relative animate-fade-in";
  div.innerHTML = `
    <div class="flex items-center justify-between border-b border-cs2-neutral-100 pb-2">
      <span class="text-xs font-extrabold text-cs2-brand-700">Médicament #${medCount}</span>
      <button type="button" onclick="removeMedicationLine(this)" class="text-rose-600 hover:text-rose-800 text-xs font-extrabold">Supprimer</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div class="md:col-span-2">
        <label class="text-[11px] font-bold text-cs2-neutral-600 block mb-1">Médicament (Recherche / DCI)</label>
        <input type="text" oninput="checkAllergyWarning(this)" placeholder="Ex: Paracétamol, Spasfon..." class="w-full px-3 py-2 text-xs border border-cs2-neutral-200 rounded-lg font-bold text-cs2-neutral-900 focus:border-cs2-brand-600 focus:outline-none">
      </div>
      <div>
        <label class="text-[11px] font-bold text-cs2-neutral-600 block mb-1">Quantité</label>
        <input type="text" placeholder="1 Boîte" class="w-full px-3 py-2 text-xs border border-cs2-neutral-200 rounded-lg font-bold text-cs2-neutral-900 focus:border-cs2-brand-600 focus:outline-none">
      </div>
      <div>
        <label class="text-[11px] font-bold text-cs2-neutral-600 block mb-1">Durée</label>
        <input type="text" placeholder="7 Jours" class="w-full px-3 py-2 text-xs border border-cs2-neutral-200 rounded-lg font-bold text-cs2-neutral-900 focus:border-cs2-brand-600 focus:outline-none">
      </div>
    </div>
    <div>
      <label class="text-[11px] font-bold text-cs2-neutral-600 block mb-1">Posologie détaillée</label>
      <input type="text" placeholder="Posologie et conditions de prise..." class="w-full px-3 py-2 text-xs border border-cs2-neutral-200 rounded-lg font-medium text-cs2-neutral-900 focus:border-cs2-brand-600 focus:outline-none">
    </div>
  `;
  container.appendChild(div);

  if (typeof showToast === 'function') {
    showToast(`Ligne de médicament #${medCount} ajoutée.`, 'info');
  }
}

function removeMedicationLine(btn) {
  const line = btn.closest('.med-line');
  if (line) {
    line.remove();
    if (typeof showToast === 'function') {
      showToast("Ligne supprimée de l'ordonnance.", 'info');
    }
  }
}

function checkAllergyWarning(input) {
  const val = input.value.toLowerCase();
  if (val.includes('penicilline') || val.includes('amoxicilline') || val.includes('amox') || val.includes('beta')) {
    const modal = document.getElementById('allergy-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
}

function closeAllergyModal() {
  const modal = document.getElementById('allergy-modal');
  if (modal) modal.classList.add('hidden');
}

function overrideAllergyWarning() {
  closeAllergyModal();
  if (typeof showToast === 'function') {
    showToast("Avertissement ignoré. Prescription sous responsabilité du praticien.", "warning");
  }
}

function handleSavePrescription(e) {
  e.preventDefault();
  if (typeof showToast === 'function') {
    showToast("Ordonnance informatisée enregistrée et transmise au dossier patient.", "success");
  } else {
    alert("Ordonnance enregistrée avec succès !");
  }
  setTimeout(() => {
    window.location.href = "../patients/detail.html";
  }, 1000);
}
