// =========================================================================
// SISTEM NAVIGASI & ROUTER UTAMA APLIKASI
// =========================================================================

const app = document.getElementById('app');

// Sistem Navigasi Pintar yang Mengingat Halaman
function navigate(view, data = null) {
    state.view = view;
    
    // Set current student if provided, otherwise clear if not in forms
    if (data !== null) {
        state.currentStudent = data;
    } else if (view !== 'penilaian' && view !== 'pendaftaran') {
        state.currentStudent = null;
    }

    // Simpan posisi layar terakhir untuk auto-resume saat direfresh
    if (state.role) {
        const session = JSON.parse(localStorage.getItem('userSession_Arkan') || '{}');
        session.lastView = view;
        localStorage.setItem('userSession_Arkan', JSON.stringify(session));
    }

    render();
    window.scrollTo(0, 0); 
}

function render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let html = '';
    if (state.role === 'pengunjung' && state.view !== 'login' && state.view !== 'cetak') {
        html = viewDashboardPengunjung();
    } else {
        switch (state.view) {
            case 'login': html = viewLogin(); break;
            case 'dashboard': html = viewDashboard(); break;
            case 'pendaftaran': html = viewPendaftaran(); break;
            case 'dataPendaftar': html = viewDataPendaftar(); break;
            case 'penilaian': html = viewPenilaian(); break;
            case 'laporan': html = viewLaporan(); break;
            case 'haflah': html = viewHaflah(); break; 
            case 'cetak': html = viewCetak(); break;
            case 'cetakSemua': html = viewCetakSemua(); break;
            case 'profil': html = viewProfil(); break;
            default: html = viewLogin();
        }
    }
    appEl.innerHTML = html;

    if (state.view === 'penilaian') generateSurahInputs();
    if (state.view === 'dashboard' && state.role !== 'pengunjung') initDashboardChart();
    if (state.view === 'laporan' && state.searchLaporan) filterLaporanDOM();
}

// Inisialisasi aplikasi
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => server.init());
} else {
    server.init();
}
