// --- FITUR PORTAL PENGUNJUNG / WALI MURID ---

function viewDashboardPengunjung() {
    return renderLayout(`
        <div class="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mt-4 sm:mt-10">
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-800 transform rotate-3">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <h2 class="text-2xl font-black text-gray-900 tracking-tight">Cek Hasil Sertifikasi</h2>
                <p class="text-sm text-gray-500 mt-2 font-medium">Cari nama ananda untuk melihat hasil penilaian.</p>
            </div>

            <div class="relative mb-6">
                <input type="text" id="searchPengunjung" onkeyup="previewSearchPengunjung()" autocomplete="off" placeholder="Ketik nama lengkap ananda..." class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:bg-white transition text-sm font-medium shadow-sm outline-none">
                <div id="dropdownPengunjung" class="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl hidden z-50 max-h-60 overflow-y-auto"></div>
            </div>

            <div id="verifikasiSeksi" class="hidden transform transition-all duration-300 ease-in-out">
                <div class="p-6 bg-gray-900 rounded-xl border border-gray-800 text-white shadow-xl relative overflow-hidden">
                    <div class="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2">
                        <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
                            <h3 class="font-bold text-white tracking-wide uppercase text-sm">Verifikasi Keamanan</h3>
                        </div>
                        
                        <p class="text-xs text-gray-400 mb-4" id="namaVerifikasiDisplay"></p>
                        <input type="hidden" id="idVerifikasi">
                        
                        <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tanggal Lahir Ananda</label>
                        <input type="date" id="tglLahirVerifikasi" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-white text-sm font-medium outline-none text-white color-scheme-dark">
                        
                        <div id="errorVerifikasi" class="text-red-400 text-xs font-bold mt-3 hidden">Data tidak cocok! Silakan periksa kembali.</div>
                        
                        <button onclick="verifikasiDanLihat()" class="w-full mt-5 bg-white text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition active:scale-95 shadow-lg">Buka Hasil Penilaian</button>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function previewSearchPengunjung() {
    const input = document.getElementById('searchPengunjung').value.toLowerCase().trim();
    const dropdown = document.getElementById('dropdownPengunjung');
    document.getElementById('verifikasiSeksi').classList.add('hidden');

    if (!input) { dropdown.classList.add('hidden'); return; }

    const matches = state.db.filter(d => (d.nama || "").toLowerCase().includes(input));

    if (matches.length > 0) {
        let html = '';
        matches.forEach(m => {
            html += `
                <div onclick="pilihAnakPengunjung('${m.id}', '${m.nama}')" class="px-5 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition flex justify-between items-center group">
                    <div>
                        <div class="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition">${m.nama}</div>
                        <div class="text-[11px] text-gray-500 mt-1 font-medium">${m.kelas} &bull; Juz ${m.juz}</div>
                    </div>
                    <svg class="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            `;
        });
        dropdown.innerHTML = html;
        dropdown.classList.remove('hidden');
    } else {
        dropdown.innerHTML = `<div class="px-5 py-4 text-xs text-gray-500 font-medium text-center">Nama tidak ditemukan...</div>`;
        dropdown.classList.remove('hidden');
    }
}

function pilihAnakPengunjung(id, nama) {
    document.getElementById('dropdownPengunjung').classList.add('hidden');
    document.getElementById('searchPengunjung').value = nama;
    
    document.getElementById('idVerifikasi').value = id;
    document.getElementById('namaVerifikasiDisplay').innerHTML = `Masukkan tanggal lahir untuk membuka rekam nilai <br/><b class="text-white text-sm inline-block mt-1">${nama}</b>`;
    document.getElementById('tglLahirVerifikasi').value = '';
    document.getElementById('errorVerifikasi').classList.add('hidden');
    
    document.getElementById('verifikasiSeksi').classList.remove('hidden');
}

function verifikasiDanLihat() {
    const id = document.getElementById('idVerifikasi').value;
    const inputTgl = document.getElementById('tglLahirVerifikasi').value;
    const err = document.getElementById('errorVerifikasi');
    
    if(!inputTgl) {
        err.innerText = "Harap masukkan tanggal lahir!";
        err.classList.remove('hidden');
        return;
    }

    const data = state.db.find(d => d.id === id);
    if (data && formatDateToYYYYMMDD(data.tanggalLahir) === inputTgl) {
        navigate('cetak', data);
    } else {
        err.innerText = "Tanggal lahir salah!";
        err.classList.remove('hidden');
    }
}
