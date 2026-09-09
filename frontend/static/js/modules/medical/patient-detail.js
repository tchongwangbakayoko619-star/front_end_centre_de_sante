/**
 * CS² Health — Medical Patient Detail Module
 */

window.SIDEBAR_ACTIVE = 'medical-patients';

function switchPatientTab(tabName) {
  const tabs = ['resume', 'consultations', 'prescriptions', 'examens', 'factures'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = 'px-4 py-2 rounded-xl text-cs2-brand-700 bg-cs2-brand-50 border border-cs2-brand-200 font-extrabold transition';
      } else {
        btn.className = 'px-4 py-2 rounded-xl text-cs2-neutral-600 hover:bg-cs2-neutral-100 transition';
      }
    }
  });

  if (typeof showToast === 'function') {
    showToast(`Onglet '${tabName}' sélectionné.`, 'info');
  }
}
