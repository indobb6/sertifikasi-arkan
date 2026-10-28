// --- FITUR DATA PENDAFTAR ---

function updateFilterPendaftar() {
    state.filterPendaftar = {
        tahunAjaran: document.getElementById('filterTahunPendaftar').value,
        semester: document.getElementById('filterSemesterPendaftar').value
    };
    render();
}

function exportExcelPendaftar() {
    const { tahunAjaran, semester } = state.filterPendaftar || getCurrentPeriod();
    const filteredDb = state.db.filter(d => d.tahunAjaran === tahunAjaran && d.semester === semester);

    const ws_data = filteredDb.map((d, i) => ({
        "No": i + 1,
        "Nama Lengkap": d.nama,
        "Kelas": d.kelas,
        "Juz": d.juz,
        "Tahun Ajaran": d.tahunAjaran,
        "Semester": d.semester,
        "Tanggal Lahir": formatDateToYYYYMMDD(d.tanggalLahir),
        "Umur": d.umur,
        "Cita-Cita": d.citaCita,
        "Nama Ayah": d.namaAyah,
        "Nama Ibu": d.namaIbu,
        "Pengampu Halaqoh": d.pengampu
    }));
    
    const ws = XLSX.utils.json_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pendaftar");
    XLSX.writeFile(wb, `Data_Pendaftar_Sertifikasi_${tahunAjaran.replace('/','-')}_Smt${semester}.xlsx`);
}

function viewDataPendaftar() {
    if (state.role !== 'admin' && state.role !== 'penguji') return navigate('dashboard');

    if (!state.filterPendaftar) {
        const period = getCurrentPeriod();
        state.filterPendaftar = { tahunAjaran: period.tahunAjaran, semester: period.semester };
    }
    const { tahunAjaran, semester } = state.filterPendaftar;
    let filteredDb = state.db.filter(d => d.tahunAjaran === tahunAjaran && d.semester === semester);

    let optionsTahun = tahunAjaranList.map(t => `<option value="${t}" ${tahunAjaran === t ? 'selected' : ''}>${t}</option>`).join('');

    let trs = '';
    if(filteredDb.length === 0) {
        trs = `<tr><td colspan="7" class="px-4 py-8 text-center text-gray-500 font-medium italic text-sm">Belum ada data pendaftar untuk periode ini.</td></tr>`;
    } else {
        filteredDb.forEach((d, index) => {
            trs += `
                <tr class="hover:bg-gray-50 border-b border-gray-100 transition">
                    <td class="px-4 py-3.5 text-sm text-gray-500 text-center border-r print:border-black">${index + 1}</td>
                    <td class="px-4 py-3.5 text-sm font-bold text-gray-900 border-r print:border-black">${d.nama}</td>
                    <td class="px-4 py-3.5 text-sm text-gray-600 text-center border-r print:border-black">${d.kelas}</td>
                    <td class="px-4 py-3.5 text-sm text-gray-500 text-center border-r print:border-black">${formatDateToYYYYMMDD(d.tanggalLahir)}</td>
                    <td class="px-4 py-3.5 text-sm text-gray-500 text-center border-r print:border-black">${d.umur}</td>
                    <td class="px-4 py-3.5 text-sm text-gray-600 border-r print:border-black font-medium">${d.pengampu}</td>
                    <td class="px-4 py-3.5 text-sm text-center no-print">
                        ${(state.role === 'admin' || d.pengampu === state.namaPenguji || d.penguji === state.namaPenguji) ? `
                            <button onclick="navigate('pendaftaran', state.db.find(x => x.id === '${d.id}'))" class="bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-900 hover:text-white px-3 py-1.5 rounded-lg font-bold text-xs transition mb-1 sm:mb-0">Edit</button>
                            <button onclick="hapusData('${d.id}', 'dataPendaftar')" class="bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg font-bold text-xs transition mt-1 sm:mt-0 sm:ml-1">Hapus</button>
                        ` : '-'}
                    </td>
                </tr>
            `;
        });
    }

    return renderLayout(`
        <div class="no-print flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Daftar Peserta</h2>
            
            <div class="flex items-center gap-2 w-full sm:w-auto justify-center mb-2 sm:mb-0">
                <select id="filterTahunPendaftar" onchange="updateFilterPendaftar()" class="bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm rounded-lg px-3 py-2 focus:ring-gray-900 outline-none w-1/2 sm:w-auto shadow-sm font-semibold">
                    ${optionsTahun}
                </select>
                <select id="filterSemesterPendaftar" onchange="updateFilterPendaftar()" class="bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm rounded-lg px-3 py-2 focus:ring-gray-900 outline-none w-1/2 sm:w-auto shadow-sm font-semibold">
                    <option value="1" ${semester == '1' ? 'selected' : ''}>Semester 1</option>
                    <option value="2" ${semester == '2' ? 'selected' : ''}>Semester 2</option>
                </select>
            </div>

            <div class="flex gap-2 w-full md:w-auto">
                <button onclick="navigate('pendaftaran')" class="flex-1 md:flex-none bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition flex justify-center items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Baru
                </button>
                <button onclick="exportExcelPendaftar()" class="flex-1 md:flex-none bg-white border border-gray-200 hover:border-gray-900 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition flex justify-center items-center gap-1.5">
                    Excel
                </button>
                <button onclick="window.print()" class="flex-1 md:flex-none bg-white border border-gray-200 hover:border-gray-900 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition flex justify-center items-center gap-1.5">
                    Cetak
                </button>
            </div>
        </div>

        <div class="bg-white p-0 sm:p-6 rounded-2xl shadow-sm border border-gray-100 print-container overflow-hidden">
            <h1 class="print-only text-2xl font-bold text-center mt-4 mb-2">Data Pendaftar Sertifikasi Al-Qur'an</h1>
            <h3 class="print-only text-md text-center mb-6">Tahun Ajaran ${tahunAjaran} - Semester ${semester}</h3>
            <div class="overflow-x-auto hide-scrollbar">
                <table class="w-full text-left border-collapse border-t border-gray-100">
                    <thead class="bg-gray-50 print:bg-gray-200">
                        <tr>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center border-r border-b">No</th>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-r border-b">Nama Lengkap</th>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center border-r border-b">Kelas</th>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center border-r border-b">Tgl Lahir</th>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center border-r border-b">Umur</th>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-r border-b">Pengampu</th>
                            <th class="px-4 py-3.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center border-b no-print">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${trs}
                    </tbody>
                </table>
            </div>
        </div>
    `);
}
