// --- CUSTOM TOAST NOTIFICATION ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3.5 rounded-xl font-bold shadow-2xl z-[100] transition-all duration-300 -translate-y-24 opacity-0 flex items-center gap-3 w-[90%] max-w-sm ${type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white border border-gray-700'}`;
    
    const icon = type === 'error' 
        ? '<svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
        : '<svg class="w-6 h-6 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

    toast.innerHTML = `${icon} <span class="text-sm tracking-wide leading-tight">${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => { toast.classList.remove('-translate-y-24', 'opacity-0'); }, 10);
    setTimeout(() => {
        toast.classList.add('-translate-y-24', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Custom Confirm Dialog for Delete
function showConfirmDialog(title, message, onConfirm) {
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 z-[150] flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity opacity-0';
    dialog.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform scale-95 transition-transform duration-300">
            <div class="p-6">
                <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
                <p class="text-sm text-gray-500">${message}</p>
            </div>
            <div class="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
                <button id="btnCancelDialog" class="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Batal</button>
                <button id="btnConfirmDialog" class="px-4 py-2 bg-red-600 rounded-xl text-sm font-bold text-white hover:bg-red-700 transition shadow-sm">Ya, Hapus</button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    
    setTimeout(() => {
        dialog.classList.remove('opacity-0');
        dialog.querySelector('div').classList.remove('scale-95');
    }, 10);

    const closeDialog = () => {
        dialog.classList.add('opacity-0');
        dialog.querySelector('div').classList.add('scale-95');
        setTimeout(() => dialog.remove(), 300);
    };

    document.getElementById('btnCancelDialog').onclick = closeDialog;
    document.getElementById('btnConfirmDialog').onclick = () => {
        closeDialog();
        onConfirm();
    };
}

function formatDateToYYYYMMDD(dateObjOrString) {
    if (!dateObjOrString) return "";
    try {
        if (typeof dateObjOrString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateObjOrString.trim())) {
            return dateObjOrString.trim();
        }
        const d = new Date(dateObjOrString);
        if (isNaN(d.getTime())) return dateObjOrString.toString().trim();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (e) {
        return dateObjOrString ? dateObjOrString.toString().trim() : "";
    }
}

function getCurrentPeriod() {
    const now = new Date();
    const month = now.getMonth(); 
    const year = now.getFullYear();
    if (month >= 6) { 
        return { semester: '1', tahunAjaran: `${year}/${year + 1}` };
    } else { 
        return { semester: '2', tahunAjaran: `${year - 1}/${year}` };
    }
}
