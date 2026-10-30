// --- FITUR LAPORAN HASIL SERTIFIKASI ---

function gantiTabLaporan(tab) {
    state.tabLaporan = tab;
    render();
    if (state.searchLaporan) {
        const searchEl = document.getElementById('filterNama');
        if (searchEl) { searchEl.value = state.searchLaporan; filterLaporanDOM(); }
    }
}

function updateFilterArsipLaporan(val) {
    state.filterLaporan = val;
    render();
    if (state.searchLaporan) {
        const searchEl = document.getElementById('filterNama');
        if (searchEl) { searchEl.value = state.searchLaporan; filterLaporanDOM(); }
    }
}

function bukaCetakSemuaLaporan() {
    const currentPeriod = getCurrentPeriod();
    if (state.tabLaporan === 'arsip') {
        if (state.filterLaporan && state.filterLaporan !== 'semua') {
            const [ta, smt] = state.filterLaporan.split('_');
            state.filterCetak = { tahunAjaran: ta, semester: smt };
        } else {
            state.filterCetak = null;
        }
    } else {
        state.filterCetak = { tahunAjaran: currentPeriod.tahunAjaran, semester: String(currentPeriod.semester) };
    }
    navigate('cetakSemua');
}

function updateSortLaporan(val) {
    state.sortLaporan = val;
    render();
    if (state.searchLaporan) {
        const searchEl = document.getElementById('filterNama');
        if (searchEl) { searchEl.value = state.searchLaporan; filterLaporanDOM(); }
    }
}

function formatCatatanLaporan(d) {
    let items = [];
    if (d.catatan && d.catatan.trim()) {
        items.push(`<div class="text-gray-800"><span class="font-semibold text-gray-500">Umum:</span> ${escapeHtml(d.catatan.trim())}</div>`);
    }
    if (d.nilai && typeof d.nilai._catatan === 'object' && d.nilai._catatan !== null) {
        Object.entries(d.nilai._catatan).forEach(([surah, note]) => {
            if (note && String(note).trim()) {
                items.push(`<div class="text-gray-700"><span class="font-semibold text-gray-900">${escapeHtml(surah)}:</span> <span class="text-gray-600">${escapeHtml(String(note).trim())}</span></div>`);
            }
        });
    }
    if (items.length === 0) return '<span class="text-gray-400 italic">-</span>';
    return `<div class="space-y-1 text-xs max-w-xs break-words">${items.join('')}</div>`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function viewLaporan() {
    if (state.role !== 'admin' && state.role !== 'penguji') return navigate('dashboard');

    if (!state.tabLaporan) state.tabLaporan = 'aktif';

    const currentPeriod = getCurrentPeriod();
    const isCurrent = (d) => {
        const ta = d.tahunAjaran || tahunAjaranList[0];
        const smt = String(d.semester || '1');
        return ta === currentPeriod.tahunAjaran && smt === String(currentPeriod.semester);
    };

    const aktifList = state.db.filter(isCurrent);
    const arsipList = state.db.filter(d => !isCurrent(d));

    // Kumpulkan sesi-sesi arsip yang tersedia
    const pastPeriods = [];
    const seenPeriodKeys = new Set();
    arsipList.forEach(d => {
        const ta = d.tahunAjaran || tahunAjaranList[0];
        const smt = String(d.semester || '1');
        const key = `${ta}_${smt}`;
        if (!seenPeriodKeys.has(key)) {
            seenPeriodKeys.add(key);
            pastPeriods.push({ key, tahunAjaran: ta, semester: smt });
        }
    });

    let displayDb = [];
    if (state.tabLaporan === 'aktif') {
        displayDb = [...aktifList];
    } else {
        if (state.filterLaporan && state.filterLaporan !== 'semua') {
            displayDb = arsipList.filter(d => {
                const ta = d.tahunAjaran || tahunAjaranList[0];
                const smt = String(d.semester || '1');
                return `${ta}_${smt}` === state.filterLaporan;
            });
        } else {
            displayDb = [...arsipList];
        }
    }

    if (state.sortLaporan === 'nama_az') displayDb.sort((a, b) => String(a.nama || '').localeCompare(String(a.nama || '')));
    else if (state.sortLaporan === 'nama_za') displayDb.sort((a, b) => String(b.nama || '').localeCompare(String(a.nama || '')));
    else if (state.sortLaporan === 'kelas') displayDb.sort((a, b) => String(a.kelas || '').localeCompare(String(b.kelas || ''), undefined, {numeric: true}));
    else if (state.sortLaporan === 'nilai_tinggi') displayDb.sort((a, b) => (b.rataRata || 0) - (a.rataRata || 0));
    else if (state.sortLaporan === 'nilai_rendah') displayDb.sort((a, b) => (a.rataRata || 0) - (b.rataRata || 0));

    let desktopTrs = '';
    let mobileCards = '';

    if (displayDb.length === 0) {
        const pesanKosong = state.tabLaporan === 'aktif' 
            ? `Belum ada data nilai untuk Sesi Aktif (${currentPeriod.tahunAjaran} Semester ${currentPeriod.semester}).`
            : `Tidak ada data pada arsip yang dipilih.`;
        const emptyMsg = `<div class="py-12 text-center text-gray-500 font-medium text-sm">${pesanKosong}</div>`;
        desktopTrs = `<tr><td colspan="8">${emptyMsg}</td></tr>`;
        mobileCards = emptyMsg;
    } else {
        displayDb.forEach((d, index) => {
            const statusText = d.keterangan || 'Belum Dinilai';
            const statusBgClass = statusText === 'Lulus' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                                  statusText === 'Remedial' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                                  statusText === 'Belum Lulus' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-gray-50 text-gray-600 border border-gray-200';

            const catatanContent = formatCatatanLaporan(d);
            const hasCatatan = !catatanContent.includes('italic');
            const periodeBadge = state.tabLaporan === 'arsip' ? `
                <span class="inline-block mt-0.5 text-[10px] text-gray-400 font-normal">
                    TA ${d.tahunAjaran || '-'} Smt ${d.semester || '-'}
                </span>
            ` : '';

            desktopTrs += `
                <tr class="hover:bg-gray-50 border-b border-gray-100 transition">
                    <td class="px-4 py-4 text-sm text-gray-500 text-center">${index + 1}</td>
                    <td class="px-4 py-4 text-sm font-bold text-gray-900 searchable-name-desktop">
                        ${d.nama}
                        ${periodeBadge ? `<div class="leading-none">${periodeBadge}</div>` : ''}
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-600 text-center font-medium">${d.kelas}</td>
                    <td class="px-4 py-4 text-sm font-bold text-gray-600 text-center">Juz ${d.juz}</td>
                    <td class="px-4 py-4 text-sm font-black text-center text-gray-900">${d.rataRata}</td>
                    <td class="px-4 py-4 text-xs">${catatanContent}</td>
                    <td class="px-4 py-4 text-sm text-center">
                        <span class="px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-bold ${statusBgClass}">${statusText}</span>
                    </td>
                    <td class="px-4 py-4 text-sm text-center">
                        <div class="flex justify-center gap-2">
                            <button onclick="bukaCetak('${d.id}')" class="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 p-2 rounded-lg transition" title="Cetak/Excel"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg></button>
                            ${(state.role === 'admin' || (state.role === 'penguji' && (!d.penguji || d.penguji === state.namaPenguji))) ? `
                                <button onclick="bukaEdit('${d.id}')" class="bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white p-2 rounded-lg transition" title="Edit Nilai"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                                <button onclick="hapusData('${d.id}', 'laporan')" class="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-lg transition" title="Hapus"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;

            mobileCards += `
                <div class="mobile-card-item bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4 relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-1.5 h-full ${statusText === 'Lulus' ? 'bg-emerald-500' : statusText === 'Remedial' ? 'bg-amber-500' : statusText === 'Belum Lulus' ? 'bg-red-500' : 'bg-gray-300'}"></div>
                    <div class="pl-3">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-bold text-gray-900 text-sm searchable-name-mobile line-clamp-1 pr-2">${d.nama}</div>
                            <span class="px-2.5 py-1 rounded-md text-[9px] uppercase tracking-widest font-bold shrink-0 ${statusBgClass}">${statusText}</span>
                        </div>
                        <div class="text-[11px] font-medium text-gray-500 mb-2">
                            ${d.kelas} &bull; Juz ${d.juz}
                            ${state.tabLaporan === 'arsip' ? `&bull; <span class="text-indigo-600 font-semibold">TA ${d.tahunAjaran || '-'} Smt ${d.semester || '-'}</span>` : ''}
                        </div>
                        ${hasCatatan ? `
                            <div class="mb-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                                <span class="font-bold text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Catatan:</span>
                                ${catatanContent}
                            </div>
                        ` : ''}
                        
                        <div class="flex justify-between items-end border-t border-gray-100 pt-4">
                            <div>
                                <div class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Rata-rata</div>
                                <div class="font-black text-xl text-gray-900 leading-none mt-1">${d.rataRata}</div>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="bukaCetak('${d.id}')" class="bg-indigo-50 text-indigo-600 active:bg-indigo-100 p-2.5 rounded-xl transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg></button>
                                ${(state.role === 'admin' || (state.role === 'penguji' && (!d.penguji || d.penguji === state.namaPenguji))) ? `
                                    <button onclick="bukaEdit('${d.id}')" class="bg-gray-100 text-gray-700 active:bg-gray-200 p-2.5 rounded-xl transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                                    <button onclick="hapusData('${d.id}', 'laporan')" class="bg-red-50 text-red-600 active:bg-red-100 p-2.5 rounded-xl transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    let arsipPeriodOptions = '';
    if (pastPeriods.length > 0) {
        arsipPeriodOptions = `
            <select onchange="updateFilterArsipLaporan(this.value)" class="w-full sm:w-auto px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white focus:ring-gray-900 outline-none shadow-sm">
                <option value="semua" ${(!state.filterLaporan || state.filterLaporan === 'semua') ? 'selected' : ''}>Semua Periode Arsip (${arsipList.length})</option>
                ${pastPeriods.map(p => {
                    const count = arsipList.filter(d => (d.tahunAjaran || tahunAjaranList[0]) === p.tahunAjaran && String(d.semester || '1') === String(p.semester)).length;
                    return `<option value="${p.key}" ${state.filterLaporan === p.key ? 'selected' : ''}>TA ${p.tahunAjaran} - Smt ${p.semester} (${count})</option>`;
                }).join('')}
            </select>
        `;
    }

    return renderLayout(`
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Header Tabs & Filter Bar -->
            <div class="p-5 sm:p-6 border-b border-gray-100 bg-gray-50 flex flex-col gap-4">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                        <h2 class="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap">Hasil Sertifikasi</h2>
                        <button onclick="bukaCetakSemuaLaporan()" class="w-full sm:w-auto justify-center bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Cetak Rekap PDF
                        </button>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                        <select id="sortLaporan" onchange="updateSortLaporan(this.value)" class="w-full sm:w-auto px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-gray-900 focus:border-gray-900 bg-white shadow-sm font-semibold text-gray-600 outline-none">
                            <option value="terbaru" ${state.sortLaporan === 'terbaru' ? 'selected' : ''}>Urutan Terbaru</option>
                            <option value="nama_az" ${state.sortLaporan === 'nama_az' ? 'selected' : ''}>Nama (A - Z)</option>
                            <option value="nama_za" ${state.sortLaporan === 'nama_za' ? 'selected' : ''}>Nama (Z - A)</option>
                            <option value="kelas" ${state.sortLaporan === 'kelas' ? 'selected' : ''}>Urutan Kelas</option>
                            <option value="nilai_tinggi" ${state.sortLaporan === 'nilai_tinggi' ? 'selected' : ''}>Nilai Tertinggi</option>
                            <option value="nilai_rendah" ${state.sortLaporan === 'nilai_rendah' ? 'selected' : ''}>Nilai Terendah</option>
                        </select>
                        <div class="relative w-full sm:w-64">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="text" id="filterNama" value="${state.searchLaporan || ''}" placeholder="Cari nama peserta..." onkeyup="handleSearchLaporan(this.value)" class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm shadow-sm outline-none font-medium">
                        </div>
                    </div>
                </div>

                <!-- Tab Pemisah Sesi Aktif & Arsip -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-gray-200">
                    <div class="flex items-center gap-2 bg-gray-200 p-1 rounded-xl">
                        <button onclick="gantiTabLaporan('aktif')" class="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${state.tabLaporan === 'aktif' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Sesi Aktif (${currentPeriod.tahunAjaran} Smt ${currentPeriod.semester})
                            <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${state.tabLaporan === 'aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-300 text-gray-700'}">${aktifList.length}</span>
                        </button>
                        <button onclick="gantiTabLaporan('arsip')" class="px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${state.tabLaporan === 'arsip' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}">
                            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                            Arsip Nilai Sebelumnya
                            <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${state.tabLaporan === 'arsip' ? 'bg-amber-100 text-amber-800' : 'bg-gray-300 text-gray-700'}">${arsipList.length}</span>
                        </button>
                    </div>

                    ${state.tabLaporan === 'arsip' && pastPeriods.length > 0 ? `
                        <div class="flex items-center gap-2 w-full sm:w-auto">
                            <span class="text-xs font-semibold text-gray-500 whitespace-nowrap">Filter Sesi Arsip:</span>
                            ${arsipPeriodOptions}
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="hidden md:block overflow-x-auto">
                <table class="w-full text-left" id="tabelLaporan">
                    <thead class="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">No</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Kelas</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Juz</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Nilai</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Catatan</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                            <th class="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${desktopTrs}
                    </tbody>
                </table>
            </div>

            <div class="md:hidden p-4 bg-gray-50 hide-scrollbar">
                ${mobileCards}
            </div>
        </div>
    `);
}

function handleSearchLaporan(val) {
    state.searchLaporan = val;
    filterLaporanDOM();
}

function filterLaporanDOM() {
    const filter = (state.searchLaporan || '').toLowerCase();
    const table = document.getElementById("tabelLaporan");
    if (table) {
        const tr = table.getElementsByTagName("tr");
        for (let i = 1; i < tr.length; i++) {
            let nameEl = tr[i].querySelector(".searchable-name-desktop");
            if (nameEl) tr[i].style.display = nameEl.innerText.toLowerCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
    const cards = document.querySelectorAll(".mobile-card-item");
    cards.forEach(card => {
        let nameEl = card.querySelector(".searchable-name-mobile");
        if (nameEl) card.style.display = nameEl.innerText.toLowerCase().indexOf(filter) > -1 ? "" : "none";
    });
}

function bukaCetak(id) {
    const data = state.db.find(d => d.id === id);
    if (data) navigate('cetak', data);
}

function bukaEdit(id) {
    const data = state.db.find(d => d.id === id);
    if (data) {
        if (state.role === 'penguji' && data.penguji && data.penguji !== state.namaPenguji) {
            showToast('Akses Ditolak: Anda hanya dapat mengedit data peserta yang Anda input sendiri.', 'error');
            return;
        }
        navigate('penilaian', data);
    }
}

function hapusData(id, sourceView = 'laporan') {
    const data = state.db.find(d => d.id === id);
    if (!data) return;
    if (state.role === 'penguji' && data.penguji && data.penguji !== state.namaPenguji) {
        showToast('Akses Ditolak: Anda hanya dapat menghapus data yang Anda input sendiri.', 'error');
        return;
    }
    
    showConfirmDialog(
        'Hapus Data Peserta', 
        `Yakin ingin menghapus data <b>${data.nama}</b> secara permanen? Data yang dihapus tidak dapat dikembalikan.`, 
        () => { server.deleteData(id, sourceView); }
    );
}
