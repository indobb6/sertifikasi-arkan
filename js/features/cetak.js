// --- FITUR CETAK SERTIFIKAT INDIVIDU & REKAP KELAS ---

function updateFilterCetak() {
    state.filterCetak = {
        tahunAjaran: document.getElementById('printFilterTahun').value,
        semester: document.getElementById('printFilterSemester').value
    };
    render();
}

function exportExcelIndividu() {
    const d = state.currentStudent;
    if(!d) return;

    const listSurah = surahData[d.juz] || [];
    const catatanSurah = (d.nilai && typeof d.nilai._catatan === 'object' && d.nilai._catatan !== null)
        ? d.nilai._catatan
        : {};

    let ws_data = [
        ["LAPORAN HASIL SERTIFIKASI AL-QUR'AN"],
        ["Tahun Ajaran", d.tahunAjaran, "Semester", d.semester],
        ["Nama Lengkap", d.nama, "Kelas", d.kelas],
        ["Juz", d.juz, "Pengampu", d.penguji || d.pengampu || ''],
        ["Keterangan", d.keterangan || 'Belum Dinilai', "Rata-rata", d.rataRata],
        ["Catatan Umum", d.catatan || ''],
        [],
        ["No", "Nama Surat", "Nilai", "Catatan"]
    ];

    listSurah.forEach((surah, index) => {
        const nilai = (d.nilai && d.nilai[surah] !== undefined && surah !== '_catatan') ? d.nilai[surah] : 0;
        const note = catatanSurah[surah] || '';
        ws_data.push([index + 1, surah, nilai, note]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Nilai Individu");
    XLSX.writeFile(wb, `Nilai_Sertifikasi_${d.nama.replace(/ /g, '_')}_Juz${d.juz}.xlsx`);
}

function viewCetak() {
    const d = state.currentStudent;
    if(!d) return navigate('dashboard');

    const listSurah = surahData[d.juz] || [];
    const catatanSurah = (d.nilai && typeof d.nilai._catatan === 'object' && d.nilai._catatan !== null)
        ? d.nilai._catatan
        : {};

    const renderSurahRow = (surah, index) => {
        const nilai = (d.nilai && d.nilai[surah] !== undefined && surah !== '_catatan') ? d.nilai[surah] : 0;
        const note = catatanSurah[surah] || '';
        const isRemedial = d.keterangan === 'Remedial' && nilai < 78;
        return `
            <tr class="${isRemedial ? 'bg-amber-50 print:bg-transparent' : ''}">
                <td class="border border-black px-2 sm:px-4 py-1.5 print:py-1 text-center w-10 sm:w-12 text-xs print:text-[11px]">${index + 1}</td>
                <td class="border border-black px-3 sm:px-4 py-1.5 print:py-1 text-xs print:text-[11px] ${isRemedial ? 'font-bold text-amber-700 print:text-black' : ''}">
                    ${surah} ${isRemedial ? '<span class="text-[9px] ml-1 no-print text-amber-600">(Rem)</span>' : ''}
                </td>
                <td class="border border-black px-2 sm:px-4 py-1.5 print:py-1 text-center w-16 sm:w-20 font-bold text-xs print:text-[11px] ${isRemedial ? 'text-red-600 print:text-black' : ''}">${nilai}</td>
                <td class="border border-black px-3 py-1.5 print:py-1 text-xs print:text-[11px] text-gray-700 print:text-black">${note ? note : '<span class="text-gray-400 print:text-gray-500 italic">-</span>'}</td>
            </tr>
        `;
    };

    const tableLayoutHtml = `
        <div class="overflow-x-auto hide-scrollbar mb-4 print:mb-3">
            <table class="w-full border-collapse border-2 border-black">
                <thead>
                    <tr class="bg-gray-100 print:bg-gray-200">
                        <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center w-10 text-[11px] print:text-[10px] uppercase font-bold">No</th>
                        <th class="border-2 border-black px-3 py-2 print:py-1.5 text-center text-[11px] print:text-[10px] uppercase font-bold">Nama Surat</th>
                        <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center w-20 text-[11px] print:text-[10px] uppercase font-bold">Nilai</th>
                        <th class="border-2 border-black px-3 py-2 print:py-1.5 text-center text-[11px] print:text-[10px] uppercase font-bold">Catatan / Evaluasi</th>
                    </tr>
                </thead>
                <tbody>
                    ${listSurah.map((s, idx) => renderSurahRow(s, idx)).join('')}
                </tbody>
                <tfoot>
                    <tr class="bg-gray-50 print:bg-gray-100 print-avoid-break">
                        <th colspan="2" class="border-2 border-black px-3 py-2 print:py-1.5 text-right uppercase font-bold text-xs print:text-[11px]">Rata-Rata Nilai Akhir</th>
                        <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center text-lg print:text-base font-black">${d.rataRata}</th>
                        <th class="border-2 border-black px-3 py-2 print:py-1.5"></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;

    let textColorKeterangan = d.keterangan === 'Lulus' ? 'text-green-700' : d.keterangan === 'Remedial' ? 'text-amber-600' : d.keterangan === 'Belum Lulus' ? 'text-red-600' : 'text-gray-800';

    return `
        <style>
            @page {
                size: portrait;
                margin: 7mm 9mm;
            }
        </style>
        <div class="no-print bg-gray-900 sticky top-0 z-50 shadow-lg pt-[env(safe-area-inset-top)]">
            <div class="p-3 sm:p-5 flex flex-col sm:flex-row justify-between items-center text-white gap-4">
                <button onclick="navigate('${state.role === 'pengunjung' ? 'dashboard' : 'laporan'}')" class="w-full sm:w-auto px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-bold transition flex justify-center items-center gap-2 border border-gray-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> 
                    ${state.role === 'pengunjung' ? 'Kembali' : 'Ke Laporan'}
                </button>
                <div class="font-bold text-sm hidden sm:block tracking-widest uppercase text-gray-400">Mode Pratinjau Cetak</div>
                <div class="flex gap-2 w-full sm:w-auto">
                    <button onclick="exportExcelIndividu()" class="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-sm shadow transition flex justify-center items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Excel
                    </button>
                    <button onclick="window.print()" class="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-sm shadow transition flex justify-center items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg> Cetak PDF
                    </button>
                </div>
            </div>
        </div>

        <div class="print-container max-w-4xl mx-auto bg-white p-6 sm:p-10 print:p-0 shadow-lg print:shadow-none">
            <div class="text-center mb-5 sm:mb-8 print:mb-2 border-b-2 border-black pb-3 print:pb-2">
                <h1 class="text-xl sm:text-2xl print:text-lg font-black uppercase tracking-tight">Laporan Hasil Sertifikasi</h1>
                <h2 class="text-lg sm:text-xl print:text-base font-bold uppercase mt-1">Juz ${d.juz}</h2>
                <h3 class="text-base sm:text-lg print:text-sm mt-0.5 font-semibold text-gray-700 print:text-black">SDIT Arkan Cendekia</h3>
                <p class="text-xs sm:text-sm print:text-[11px] mt-1 font-medium">Tahun Ajaran ${d.tahunAjaran} - Semester ${d.semester}</p>
            </div>

            <div class="mb-5 sm:mb-6 print:mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-sm print:text-xs">
                <div class="space-y-1.5 print:space-y-1">
                    <div class="flex items-baseline gap-2">
                        <span class="w-28 text-gray-600 print:text-black uppercase tracking-wider text-[11px] print:text-[10px] font-bold">Nama Lengkap</span>
                        <span class="font-bold text-base print:text-sm text-gray-900 print:text-black">: ${d.nama}</span>
                    </div>
                    <div class="flex items-baseline gap-2">
                        <span class="w-28 text-gray-600 print:text-black uppercase tracking-wider text-[11px] print:text-[10px] font-bold">Kelas</span>
                        <span class="font-bold text-base print:text-sm text-gray-900 print:text-black">: ${d.kelas}</span>
                    </div>
                </div>
                <div class="sm:text-right flex flex-col sm:items-end">
                    <div class="border-2 border-black px-4 py-1.5 inline-block rounded-xl text-center min-w-[140px] bg-gray-50 print:bg-transparent">
                        <div class="text-[9px] print:text-[8.5px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Keterangan</div>
                        <div class="font-black text-lg print:text-base ${textColorKeterangan} print:text-black uppercase tracking-wide">${d.keterangan || 'Belum Dinilai'}</div>
                    </div>
                </div>
            </div>

            ${tableLayoutHtml}

            ${d.catatan ? `
            <div class="mb-4 print:mb-2 text-xs border-2 border-black p-3 print:p-2 rounded-xl bg-gray-50 print:bg-transparent relative print-avoid-break">
                <div class="absolute -top-2.5 left-3 bg-white px-1.5 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1">
                   Catatan Penguji
                </div>
                <p class="whitespace-pre-wrap font-medium print:text-[10px]">${d.catatan}</p>
            </div>` : ''}

            <div class="mt-6 print:mt-3 flex justify-end text-sm print:text-xs print-avoid-break">
                <div class="text-center w-52 sm:w-56">
                    <p class="font-medium print:text-[11px]">Bekasi, ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p class="mb-14 print:mb-8 mt-0.5 font-semibold text-gray-600 print:text-black print:text-[10px]">Penguji / Guru Tahfiz</p>
                    <p class="font-bold underline text-sm print:text-xs">( ${d.penguji || state.namaPenguji || '........................................'} )</p>
                </div>
            </div>
        </div>
    `;
}

function getCatatanGabungan(d) {
    let parts = [];
    if (d.catatan && d.catatan.trim()) {
        parts.push(d.catatan.trim());
    }
    if (d.nilai && typeof d.nilai._catatan === 'object' && d.nilai._catatan !== null) {
        Object.entries(d.nilai._catatan).forEach(([surah, note]) => {
            if (note && String(note).trim()) {
                parts.push(`${surah}: ${String(note).trim()}`);
            }
        });
    }
    return parts.join('; ');
}

function exportExcelSemua() {
    if (!state.filterCetak) {
        if (state.db.length > 0) {
            const dataTerakhir = state.db[state.db.length - 1];
            state.filterCetak = { tahunAjaran: dataTerakhir.tahunAjaran || tahunAjaranList[0], semester: dataTerakhir.semester || '1' };
        } else {
            state.filterCetak = { tahunAjaran: tahunAjaranList[0], semester: '1' };
        }
    }

    const { tahunAjaran, semester } = state.filterCetak;
    let filteredDb = state.db.filter(d => d.tahunAjaran === tahunAjaran && d.semester === semester);

    if (state.sortLaporan === 'nama_az') filteredDb.sort((a, b) => String(a.nama || '').localeCompare(String(a.nama || '')));
    else if (state.sortLaporan === 'nama_za') filteredDb.sort((a, b) => String(b.nama || '').localeCompare(String(a.nama || '')));
    else if (state.sortLaporan === 'kelas') filteredDb.sort((a, b) => String(a.kelas || '').localeCompare(String(b.kelas || ''), undefined, {numeric: true}));
    else if (state.sortLaporan === 'nilai_tinggi') filteredDb.sort((a, b) => (b.rataRata || 0) - (a.rataRata || 0));
    else if (state.sortLaporan === 'nilai_rendah') filteredDb.sort((a, b) => (a.rataRata || 0) - (b.rataRata || 0));

    const ws_data = filteredDb.map((d, i) => ({
        "No": i + 1,
        "Nama Lengkap": d.nama,
        "Kelas": d.kelas,
        "Juz": d.juz,
        "Nilai": d.rataRata,
        "Catatan": getCatatanGabungan(d),
        "Keterangan": d.keterangan || 'Belum Dinilai',
        "Pengampu": d.penguji || d.pengampu || ''
    }));

    const ws = XLSX.utils.json_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap Nilai");
    XLSX.writeFile(wb, `Rekap_Nilai_Sertifikasi_${tahunAjaran.replace(/ /g, '_')}_Smt${semester}.xlsx`);
}

function viewCetakSemua() {
    if (!state.filterCetak) {
        if (state.filterLaporan && state.filterLaporan.tahunAjaran) {
            state.filterCetak = {
                tahunAjaran: state.filterLaporan.tahunAjaran === 'semua' ? tahunAjaranList[0] : state.filterLaporan.tahunAjaran,
                semester: state.filterLaporan.semester === 'semua' ? '1' : state.filterLaporan.semester
            };
        } else {
            const period = getCurrentPeriod();
            state.filterCetak = { tahunAjaran: period.tahunAjaran, semester: period.semester };
        }
    }

    const { tahunAjaran, semester } = state.filterCetak;
    let filteredDb = state.db.filter(d => d.tahunAjaran === tahunAjaran && d.semester === semester);

    if (state.sortLaporan === 'nama_az') filteredDb.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || '')));
    else if (state.sortLaporan === 'nama_za') filteredDb.sort((a, b) => String(b.nama || '').localeCompare(String(a.nama || '')));
    else if (state.sortLaporan === 'kelas') filteredDb.sort((a, b) => String(a.kelas || '').localeCompare(String(b.kelas || ''), undefined, {numeric: true}));
    else if (state.sortLaporan === 'nilai_tinggi') filteredDb.sort((a, b) => (b.rataRata || 0) - (a.rataRata || 0));
    else if (state.sortLaporan === 'nilai_rendah') filteredDb.sort((a, b) => (a.rataRata || 0) - (b.rataRata || 0));

    let trs = filteredDb.map((d, index) => {
        const cat = getCatatanGabungan(d);
        return `
        <tr>
            <td class="border border-black px-2 py-2 print:py-1 text-center w-10 text-xs">${index + 1}</td>
            <td class="border border-black px-3 py-2 print:py-1 font-semibold text-xs">${d.nama}</td>
            <td class="border border-black px-2 py-2 print:py-1 text-center text-xs">${d.kelas}</td>
            <td class="border border-black px-2 py-2 print:py-1 text-center text-xs">Juz ${d.juz}</td>
            <td class="border border-black px-2 py-2 print:py-1 text-center font-black text-xs">${d.rataRata}</td>
            <td class="border border-black px-3 py-2 print:py-1 text-xs text-gray-700 print:text-black">${cat || '-'}</td>
            <td class="border border-black px-2 py-2 print:py-1 text-center font-bold text-xs ${d.keterangan === 'Lulus' ? 'text-green-700' : d.keterangan === 'Remedial' ? 'text-amber-600' : 'text-red-600'} print:text-black">${d.keterangan || 'Belum Dinilai'}</td>
        </tr>
    `;
    }).join('');

    if(filteredDb.length === 0) trs = `<tr><td colspan="7" class="border border-black px-4 py-8 text-center text-gray-500 font-medium italic text-xs">Belum ada data sertifikasi untuk periode ini.</td></tr>`;

    let optionsTahun = tahunAjaranList.map(t => `<option value="${t}" ${tahunAjaran === t ? 'selected' : ''}>${t}</option>`).join('');

    return `
        <style>
            @page {
                size: landscape;
                margin: 7mm 9mm;
            }
        </style>
        <div class="no-print bg-gray-900 sticky top-0 z-50 shadow-lg pt-[env(safe-area-inset-top)]">
            <div class="p-3 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-4">
                <button onclick="navigate('laporan'); state.filterCetak = null;" class="w-full md:w-auto px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-bold transition border border-gray-700 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Kembali
                </button>
                
                <div class="flex items-center gap-2 w-full md:w-auto justify-center">
                    <span class="text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden md:inline">Filter Data:</span>
                    <select id="printFilterTahun" onchange="updateFilterCetak()" class="bg-gray-800 border border-gray-700 text-white text-sm font-medium rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-white outline-none w-1/2 sm:w-auto">
                        ${optionsTahun}
                    </select>
                    <select id="printFilterSemester" onchange="updateFilterCetak()" class="bg-gray-800 border border-gray-700 text-white text-sm font-medium rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-white outline-none w-1/2 sm:w-auto">
                        <option value="1" ${semester == '1' ? 'selected' : ''}>Semester 1</option>
                        <option value="2" ${semester == '2' ? 'selected' : ''}>Semester 2</option>
                    </select>
                </div>

                <div class="flex gap-2 w-full md:w-auto">
                    <button onclick="exportExcelSemua()" class="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-sm shadow transition flex justify-center items-center gap-2">
                        <svg class="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Excel
                    </button>
                    <button onclick="window.print()" class="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-sm shadow transition flex justify-center items-center gap-2">
                        <svg class="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg> Cetak PDF
                    </button>
                </div>
            </div>
        </div>

        <div class="print-container max-w-5xl mx-auto bg-white p-6 sm:p-10 print:p-0 shadow-lg print:shadow-none">
            <div class="text-center mb-5 sm:mb-8 print:mb-2 border-b-2 border-black pb-3 print:pb-2">
                <h1 class="text-xl sm:text-2xl print:text-lg font-black uppercase tracking-tight">Rekapitulasi Hasil Sertifikasi</h1>
                <h2 class="text-base sm:text-lg print:text-sm font-bold uppercase mt-1 text-gray-700 print:text-black">SDIT Arkan Cendekia</h2>
                <p class="text-xs sm:text-sm mt-1.5 font-medium bg-gray-100 inline-block px-3 py-1 rounded-full print:bg-transparent print:border print:border-black">Tahun Ajaran ${tahunAjaran} - Semester ${semester}</p>
            </div>

            <div class="overflow-x-auto hide-scrollbar">
                <table class="w-full mb-4 print:mb-2 border-collapse border-2 border-black min-w-[600px]">
                    <thead>
                        <tr class="bg-gray-100 print:bg-gray-200">
                            <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center w-10 text-[10px] font-bold uppercase tracking-widest">No</th>
                            <th class="border-2 border-black px-3 py-2 print:py-1.5 text-[10px] font-bold uppercase tracking-widest">Nama Lengkap</th>
                            <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center text-[10px] font-bold uppercase tracking-widest">Kelas</th>
                            <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center text-[10px] font-bold uppercase tracking-widest">Juz</th>
                            <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center text-[10px] font-bold uppercase tracking-widest">Nilai</th>
                            <th class="border-2 border-black px-3 py-2 print:py-1.5 text-[10px] font-bold uppercase tracking-widest">Catatan</th>
                            <th class="border-2 border-black px-2 py-2 print:py-1.5 text-center text-[10px] font-bold uppercase tracking-widest">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${trs}
                    </tbody>
                </table>
            </div>

            <div class="mt-6 print:mt-3 flex justify-end text-sm print:text-xs print-avoid-break">
                <div class="text-center w-48 sm:w-56">
                    <p class="font-medium print:text-[11px]">Bekasi, ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p class="mb-14 print:mb-8 mt-0.5 font-semibold text-gray-600 print:text-black print:text-[10px]">Koordinator QL</p>
                    <p class="font-bold underline text-sm print:text-xs">( Rifki Ihsanul Hakim, S.Pd )</p>
                </div>
            </div>
        </div>
    `;
}
