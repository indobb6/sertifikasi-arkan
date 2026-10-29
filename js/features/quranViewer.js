// =========================================================================
// FITUR VIEWER AL-QUR'AN MUSHAF PER HALAMAN (604 HALAMAN MUSHAF MADINAH)
// SDIT Arkan Cendekia - Modul Penilaian Hafalan
// =========================================================================

// Data Pemetaan 114 Surat ke Halaman Mushaf Standar Madinah (1 - 604)
const QURAN_SURAHS = [
    { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", startPage: 1, endPage: 1, juz: 1, totalAyat: 7 },
    { number: 2, name: "Al-Baqarah", arabic: "البقرة", startPage: 2, endPage: 49, juz: 1, totalAyat: 286 },
    { number: 3, name: "Ali 'Imran", arabic: "آل عمران", startPage: 50, endPage: 76, juz: 3, totalAyat: 200 },
    { number: 4, name: "An-Nisa'", arabic: "النساء", startPage: 77, endPage: 106, juz: 4, totalAyat: 176 },
    { number: 5, name: "Al-Ma'idah", arabic: "المائدة", startPage: 106, endPage: 127, juz: 6, totalAyat: 120 },
    { number: 6, name: "Al-An'am", arabic: "الأنعام", startPage: 128, endPage: 150, juz: 7, totalAyat: 165 },
    { number: 7, name: "Al-A'raf", arabic: "الأعراف", startPage: 151, endPage: 176, juz: 8, totalAyat: 206 },
    { number: 8, name: "Al-Anfal", arabic: "الأنفال", startPage: 177, endPage: 186, juz: 9, totalAyat: 75 },
    { number: 9, name: "At-Taubah", arabic: "التوبة", startPage: 187, endPage: 207, juz: 10, totalAyat: 129 },
    { number: 10, name: "Yunus", arabic: "يونس", startPage: 208, endPage: 221, juz: 11, totalAyat: 109 },
    { number: 11, name: "Hud", arabic: "هود", startPage: 221, endPage: 235, juz: 11, totalAyat: 123 },
    { number: 12, name: "Yusuf", arabic: "يوسف", startPage: 235, endPage: 248, juz: 12, totalAyat: 111 },
    { number: 13, name: "Ar-Ra'd", arabic: "الرعد", startPage: 249, endPage: 255, juz: 13, totalAyat: 43 },
    { number: 14, name: "Ibrahim", arabic: "إبراهيم", startPage: 255, endPage: 261, juz: 13, totalAyat: 52 },
    { number: 15, name: "Al-Hijr", arabic: "الحجر", startPage: 262, endPage: 267, juz: 14, totalAyat: 99 },
    { number: 16, name: "An-Nahl", arabic: "النحل", startPage: 267, endPage: 281, juz: 14, totalAyat: 128 },
    { number: 17, name: "Al-Isra'", arabic: "الإسراء", startPage: 282, endPage: 293, juz: 15, totalAyat: 111 },
    { number: 18, name: "Al-Kahf", arabic: "الكهف", startPage: 293, endPage: 304, juz: 15, totalAyat: 110 },
    { number: 19, name: "Maryam", arabic: "مريم", startPage: 305, endPage: 312, juz: 16, totalAyat: 98 },
    { number: 20, name: "Ta-Ha", arabic: "طه", startPage: 312, endPage: 321, juz: 16, totalAyat: 135 },
    { number: 21, name: "Al-Anbiya'", arabic: "الأنبياء", startPage: 322, endPage: 331, juz: 17, totalAyat: 112 },
    { number: 22, name: "Al-Hajj", arabic: "الحج", startPage: 332, endPage: 341, juz: 17, totalAyat: 78 },
    { number: 23, name: "Al-Mu'minun", arabic: "المؤمنون", startPage: 342, endPage: 349, juz: 18, totalAyat: 118 },
    { number: 24, name: "An-Nur", arabic: "النور", startPage: 350, endPage: 359, juz: 18, totalAyat: 64 },
    { number: 25, name: "Al-Furqan", arabic: "الفرقان", startPage: 359, endPage: 366, juz: 18, totalAyat: 77 },
    { number: 26, name: "Ash-Shu'ara'", arabic: "الشعراء", startPage: 367, endPage: 376, juz: 19, totalAyat: 227 },
    { number: 27, name: "An-Naml", arabic: "النمل", startPage: 377, endPage: 385, juz: 19, totalAyat: 93 },
    { number: 28, name: "Al-Qasas", arabic: "القصص", startPage: 385, endPage: 396, juz: 20, totalAyat: 88 },
    { number: 29, name: "Al-'Ankabut", arabic: "العنكبوت", startPage: 396, endPage: 404, juz: 20, totalAyat: 69 },
    { number: 30, name: "Ar-Rum", arabic: "الروم", startPage: 404, endPage: 410, juz: 21, totalAyat: 60 },
    { number: 31, name: "Luqman", arabic: "لقمان", startPage: 411, endPage: 414, juz: 21, totalAyat: 34 },
    { number: 32, name: "As-Sajdah", arabic: "السجدة", startPage: 415, endPage: 417, juz: 21, totalAyat: 30 },
    { number: 33, name: "Al-Ahzab", arabic: "الأحزاب", startPage: 418, endPage: 427, juz: 21, totalAyat: 73 },
    { number: 34, name: "Saba'", arabic: "سبإ", startPage: 428, endPage: 434, juz: 22, totalAyat: 54 },
    { number: 35, name: "Fatir", arabic: "فاطر", startPage: 434, endPage: 440, juz: 22, totalAyat: 45 },
    { number: 36, name: "Ya-Sin", arabic: "يس", startPage: 440, endPage: 445, juz: 22, totalAyat: 83 },
    { number: 37, name: "As-Saffat", arabic: "الصافات", startPage: 446, endPage: 452, juz: 23, totalAyat: 182 },
    { number: 38, name: "Sad", arabic: "ص", startPage: 453, endPage: 458, juz: 23, totalAyat: 88 },
    { number: 39, name: "Az-Zumar", arabic: "الزمر", startPage: 458, endPage: 467, juz: 23, totalAyat: 75 },
    { number: 40, name: "Ghafir", arabic: "غافر", startPage: 467, endPage: 476, juz: 24, totalAyat: 85 },
    { number: 41, name: "Fussilat", arabic: "فصلت", startPage: 477, endPage: 482, juz: 24, totalAyat: 54 },
    { number: 42, name: "Ash-Shura", arabic: "الشورى", startPage: 483, endPage: 489, juz: 25, totalAyat: 53 },
    { number: 43, name: "Az-Zukhruf", arabic: "الزخرف", startPage: 489, endPage: 495, juz: 25, totalAyat: 89 },
    { number: 44, name: "Ad-Dukhan", arabic: "الدخان", startPage: 496, endPage: 498, juz: 25, totalAyat: 59 },
    { number: 45, name: "Al-Jathiyah", arabic: "الجاثية", startPage: 499, endPage: 502, juz: 25, totalAyat: 37 },
    { number: 46, name: "Al-Ahqaf", arabic: "الأحقاف", startPage: 502, endPage: 506, juz: 26, totalAyat: 35 },
    { number: 47, name: "Muhammad", arabic: "محمد", startPage: 507, endPage: 510, juz: 26, totalAyat: 38 },
    { number: 48, name: "Al-Fath", arabic: "الفتح", startPage: 511, endPage: 515, juz: 26, totalAyat: 29 },
    { number: 49, name: "Al-Hujurat", arabic: "الحجرات", startPage: 515, endPage: 517, juz: 26, totalAyat: 18 },
    { number: 50, name: "Qaf", arabic: "ق", startPage: 518, endPage: 520, juz: 26, totalAyat: 45 },
    { number: 51, name: "Az-Zariyat", arabic: "الذاريات", startPage: 520, endPage: 523, juz: 26, totalAyat: 60 },
    { number: 52, name: "At-Tur", arabic: "الطور", startPage: 523, endPage: 525, juz: 27, totalAyat: 49 },
    { number: 53, name: "An-Najm", arabic: "النجم", startPage: 526, endPage: 528, juz: 27, totalAyat: 62 },
    { number: 54, name: "Al-Qamar", arabic: "القمر", startPage: 528, endPage: 531, juz: 27, totalAyat: 55 },
    { number: 55, name: "Ar-Rahman", arabic: "الرحمن", startPage: 531, endPage: 534, juz: 27, totalAyat: 78 },
    { number: 56, name: "Al-Waqi'ah", arabic: "الواقعة", startPage: 534, endPage: 537, juz: 27, totalAyat: 96 },
    { number: 57, name: "Al-Hadid", arabic: "الحديد", startPage: 537, endPage: 541, juz: 27, totalAyat: 29 },
    { number: 58, name: "Al-Mujadilah", arabic: "المجادلة", startPage: 542, endPage: 545, juz: 28, totalAyat: 22 },
    { number: 59, name: "Al-Hashr", arabic: "الحشر", startPage: 545, endPage: 548, juz: 28, totalAyat: 24 },
    { number: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", startPage: 549, endPage: 551, juz: 28, totalAyat: 13 },
    { number: 61, name: "As-Saff", arabic: "الصف", startPage: 551, endPage: 552, juz: 28, totalAyat: 14 },
    { number: 62, name: "Al-Jumu'ah", arabic: "الجمعة", startPage: 553, endPage: 554, juz: 28, totalAyat: 11 },
    { number: 63, name: "Al-Munafiqun", arabic: "المنافقون", startPage: 554, endPage: 555, juz: 28, totalAyat: 11 },
    { number: 64, name: "At-Taghabun", arabic: "التغابن", startPage: 556, endPage: 557, juz: 28, totalAyat: 18 },
    { number: 65, name: "At-Talaq", arabic: "الطلاق", startPage: 558, endPage: 559, juz: 28, totalAyat: 12 },
    { number: 66, name: "At-Tahrim", arabic: "التحريم", startPage: 560, endPage: 561, juz: 28, totalAyat: 12 },
    { number: 67, name: "Al-Mulk", arabic: "الملك", startPage: 562, endPage: 564, juz: 29, totalAyat: 30 },
    { number: 68, name: "Al-Qalam", arabic: "القلم", startPage: 564, endPage: 566, juz: 29, totalAyat: 52 },
    { number: 69, name: "Al-Haqqah", arabic: "الحاقة", startPage: 566, endPage: 568, juz: 29, totalAyat: 52 },
    { number: 70, name: "Al-Ma'arij", arabic: "المعارج", startPage: 568, endPage: 570, juz: 29, totalAyat: 44 },
    { number: 71, name: "Nuh", arabic: "نوح", startPage: 570, endPage: 571, juz: 29, totalAyat: 28 },
    { number: 72, name: "Al-Jinn", arabic: "الجن", startPage: 572, endPage: 573, juz: 29, totalAyat: 28 },
    { number: 73, name: "Al-Muzzammil", arabic: "المزمل", startPage: 574, endPage: 575, juz: 29, totalAyat: 20 },
    { number: 74, name: "Al-Muddaththir", arabic: "المدثر", startPage: 575, endPage: 577, juz: 29, totalAyat: 56 },
    { number: 75, name: "Al-Qiyamah", arabic: "القيامة", startPage: 577, endPage: 578, juz: 29, totalAyat: 40 },
    { number: 76, name: "Al-Insan", arabic: "الإنسان", startPage: 578, endPage: 580, juz: 29, totalAyat: 31 },
    { number: 77, name: "Al-Mursalat", arabic: "المرسلات", startPage: 580, endPage: 581, juz: 29, totalAyat: 50 },
    { number: 78, name: "An-Naba", arabic: "النبإ", startPage: 582, endPage: 583, juz: 30, totalAyat: 40 },
    { number: 79, name: "An-Nazi'at", arabic: "النازعات", startPage: 583, endPage: 584, juz: 30, totalAyat: 46 },
    { number: 80, name: "'Abasa", arabic: "عبس", startPage: 585, endPage: 586, juz: 30, totalAyat: 42 },
    { number: 81, name: "At-Takwir", arabic: "التكوير", startPage: 586, endPage: 586, juz: 30, totalAyat: 29 },
    { number: 82, name: "Al-Infitar", arabic: "الانفطار", startPage: 587, endPage: 587, juz: 30, totalAyat: 19 },
    { number: 83, name: "Al-Mutaffifin", arabic: "المطففين", startPage: 587, endPage: 589, juz: 30, totalAyat: 36 },
    { number: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", startPage: 589, endPage: 590, juz: 30, totalAyat: 25 },
    { number: 85, name: "Al-Buruj", arabic: "البروج", startPage: 590, endPage: 590, juz: 30, totalAyat: 22 },
    { number: 86, name: "At-Tariq", arabic: "الطارق", startPage: 591, endPage: 591, juz: 30, totalAyat: 17 },
    { number: 87, name: "Al-A'la", arabic: "الأعلى", startPage: 591, endPage: 592, juz: 30, totalAyat: 19 },
    { number: 88, name: "Al-Ghashiyah", arabic: "الغاشية", startPage: 592, endPage: 593, juz: 30, totalAyat: 26 },
    { number: 89, name: "Al-Fajr", arabic: "الفجر", startPage: 593, endPage: 594, juz: 30, totalAyat: 30 },
    { number: 90, name: "Al-Balad", arabic: "البلد", startPage: 594, endPage: 595, juz: 30, totalAyat: 20 },
    { number: 91, name: "Ash-Shams", arabic: "الشمس", startPage: 595, endPage: 595, juz: 30, totalAyat: 15 },
    { number: 92, name: "Al-Lail", arabic: "الليل", startPage: 595, endPage: 596, juz: 30, totalAyat: 21 },
    { number: 93, name: "Ad-Duha", arabic: "الضحى", startPage: 596, endPage: 596, juz: 30, totalAyat: 11 },
    { number: 94, name: "Ash-Sharh", arabic: "الشرح", startPage: 596, endPage: 596, juz: 30, totalAyat: 8 },
    { number: 95, name: "At-Tin", arabic: "التين", startPage: 597, endPage: 597, juz: 30, totalAyat: 8 },
    { number: 96, name: "Al-'Alaq", arabic: "العلق", startPage: 597, endPage: 598, juz: 30, totalAyat: 19 },
    { number: 97, name: "Al-Qadr", arabic: "القدر", startPage: 598, endPage: 598, juz: 30, totalAyat: 5 },
    { number: 98, name: "Al-Bayyinah", arabic: "البينة", startPage: 598, endPage: 599, juz: 30, totalAyat: 8 },
    { number: 99, name: "Az-Zalzalah", arabic: "الزلزلة", startPage: 599, endPage: 599, juz: 30, totalAyat: 8 },
    { number: 100, name: "Al-'Adiyat", arabic: "العاديات", startPage: 599, endPage: 600, juz: 30, totalAyat: 11 },
    { number: 101, name: "Al-Qari'ah", arabic: "القارعة", startPage: 600, endPage: 600, juz: 30, totalAyat: 11 },
    { number: 102, name: "At-Takathur", arabic: "التكاثر", startPage: 600, endPage: 600, juz: 30, totalAyat: 8 },
    { number: 103, name: "Al-'Asr", arabic: "العصر", startPage: 601, endPage: 601, juz: 30, totalAyat: 3 },
    { number: 104, name: "Al-Humazah", arabic: "الهمزة", startPage: 601, endPage: 601, juz: 30, totalAyat: 9 },
    { number: 105, name: "Al-Fil", arabic: "الفيل", startPage: 601, endPage: 601, juz: 30, totalAyat: 5 },
    { number: 106, name: "Quraish", arabic: "قريش", startPage: 602, endPage: 602, juz: 30, totalAyat: 4 },
    { number: 107, name: "Al-Ma'un", arabic: "الماعون", startPage: 602, endPage: 602, juz: 30, totalAyat: 7 },
    { number: 108, name: "Al-Kauthar", arabic: "الكوثر", startPage: 602, endPage: 602, juz: 30, totalAyat: 3 },
    { number: 109, name: "Al-Kafirun", arabic: "الكافرون", startPage: 603, endPage: 603, juz: 30, totalAyat: 6 },
    { number: 110, name: "An-Nasr", arabic: "النصر", startPage: 603, endPage: 603, juz: 30, totalAyat: 3 },
    { number: 111, name: "Al-Masad", arabic: "المسد", startPage: 603, endPage: 603, juz: 30, totalAyat: 5 },
    { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", startPage: 604, endPage: 604, juz: 30, totalAyat: 4 },
    { number: 113, name: "Al-Falaq", arabic: "الفلق", startPage: 604, endPage: 604, juz: 30, totalAyat: 5 },
    { number: 114, name: "An-Nas", arabic: "الناس", startPage: 604, endPage: 604, juz: 30, totalAyat: 6 }
];

// State Viewer Mushaf
let quranModalState = {
    isOpen: false,
    currentPage: 582,
    currentSurah: null,
    zoomLevel: 100, // 100% or 130%
    viewMode: 'image', // 'image' or 'api_text'
    pageCacheText: {}
};

// Fungsi Normalisasi Nama Surat untuk Pencocokan Fleksibel
function normalizeSurahName(name) {
    if (!name) return '';
    return name.toLowerCase()
        .replace(/['`’‘“"”\^_\-\s\.\,]/g, '')
        .replace(/^al|^ash|^adh|^ath|^an|^az|^ar|^as|^at|^ad|^aj/g, '');
}

// Cari metadata surat berdasarkan nama (misal: "An-Naba", "Al-Baqarah", "'Abasa")
function cariSurahInfo(namaSurah) {
    if (!namaSurah) return null;
    const cleanInput = namaSurah.toLowerCase().replace(/['`’‘“"”\^_\-\s\.\,]/g, '');
    
    // 1. Coba match langsung
    let match = QURAN_SURAHS.find(s => s.name.toLowerCase().replace(/['`’‘“"”\^_\-\s\.\,]/g, '') === cleanInput);
    if (match) return match;

    // 2. Coba match partial
    const coreInput = normalizeSurahName(namaSurah);
    match = QURAN_SURAHS.find(s => normalizeSurahName(s.name) === coreInput);
    if (match) return match;

    // 3. Fallback pencocokan inklusif
    return QURAN_SURAHS.find(s => {
        const sCore = normalizeSurahName(s.name);
        return cleanInput.includes(sCore) || sCore.includes(cleanInput) || coreInput.includes(sCore) || sCore.includes(coreInput);
    }) || null;
}

// Buka Modal Mushaf untuk Surat yang Diklik
function bukaMushafSurat(namaSurah) {
    const surah = cariSurahInfo(namaSurah);
    if (!surah) {
        showToast(`Data mushaf untuk surat ${namaSurah} tidak ditemukan.`, 'error');
        return;
    }

    quranModalState.currentSurah = surah;
    quranModalState.currentPage = surah.startPage;
    quranModalState.zoomLevel = 100;
    quranModalState.isOpen = true;

    renderQuranModal();
}

// Buka Langsung ke Nomor Halaman Tertentu
function bukaMushafHalaman(pageNumber) {
    const p = Math.max(1, Math.min(604, parseInt(pageNumber) || 1));
    quranModalState.currentPage = p;
    
    // Update current surah berdasarkan halaman
    const matchedSurah = QURAN_SURAHS.find(s => p >= s.startPage && p <= s.endPage) || quranModalState.currentSurah;
    if (matchedSurah) quranModalState.currentSurah = matchedSurah;

    updateMushafPageContent();
}

// Pindah Halaman (+1 atau -1)
function gantiHalamanMushaf(direction) {
    const newPage = quranModalState.currentPage + direction;
    if (newPage >= 1 && newPage <= 604) {
        bukaMushafHalaman(newPage);
    }
}

// Toggle Zoom Level
function toggleMushafZoom() {
    quranModalState.zoomLevel = quranModalState.zoomLevel === 100 ? 135 : 100;
    const imgEl = document.getElementById('mushafPageImage');
    const textEl = document.getElementById('mushafPageText');
    if (imgEl) imgEl.style.transform = `scale(${quranModalState.zoomLevel / 100})`;
    if (textEl) textEl.style.fontSize = quranModalState.zoomLevel === 100 ? '1.5rem' : '1.95rem';

    const zoomBtn = document.getElementById('btnMushafZoom');
    if (zoomBtn) {
        zoomBtn.innerText = quranModalState.zoomLevel === 100 ? '🔍 Perbesar' : '🔍 Normal';
    }
}

// Toggle View Mode (Image Mushaf vs API Teks Utsmani)
function toggleMushafViewMode() {
    quranModalState.viewMode = quranModalState.viewMode === 'image' ? 'api_text' : 'image';
    updateMushafPageContent();
}

// Tutup Modal Mushaf
function tutupMushafModal() {
    quranModalState.isOpen = false;
    const modalEl = document.getElementById('quranMushafModal');
    if (modalEl) {
        modalEl.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => modalEl.remove(), 250);
    }
    // Hapus listener keyboard
    document.removeEventListener('keydown', handleQuranModalKeydown);
}

// Listener Tombol Keyboard (Panah Kiri/Kanan & ESC)
function handleQuranModalKeydown(e) {
    if (!quranModalState.isOpen) return;
    if (e.key === 'Escape') {
        tutupMushafModal();
    } else if (e.key === 'ArrowLeft') {
        // Pada mushaf Arab, panah kiri = halaman berikutnya (maju)
        gantiHalamanMushaf(1);
    } else if (e.key === 'ArrowRight') {
        // Panah kanan = halaman sebelumnya (mundur)
        gantiHalamanMushaf(-1);
    }
}

// Render Kerangka Modal Utama
function renderQuranModal() {
    // Hapus jika sudah ada
    const existing = document.getElementById('quranMushafModal');
    if (existing) existing.remove();

    const surah = quranModalState.currentSurah;
    const modal = document.createElement('div');
    modal.id = 'quranMushafModal';
    modal.className = 'fixed inset-0 z-[120] bg-gray-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 transition-all duration-300 opacity-0';

    modal.innerHTML = `
        <div class="bg-gray-900 border border-gray-700/80 rounded-2xl shadow-2xl w-full max-w-4xl h-[94vh] max-h-[960px] flex flex-col overflow-hidden text-gray-100">
            <!-- Header Navigasi -->
            <div class="px-4 py-3 sm:px-6 sm:py-3.5 bg-gray-900/95 border-b border-gray-800 flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
                <!-- Info Surat -->
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-base flex-shrink-0">
                        📖
                    </div>
                    <div class="truncate">
                        <div class="flex items-center gap-2">
                            <h3 id="mushafSurahTitle" class="font-bold text-white text-sm sm:text-base tracking-wide truncate">
                                ${surah.name} <span class="text-xs sm:text-sm font-normal text-emerald-400 font-serif mr-1">(${surah.arabic})</span>
                            </h3>
                            <span class="text-[10px] uppercase font-bold bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 hidden sm:inline-block">
                                Juz ${surah.juz}
                            </span>
                        </div>
                        <div class="text-[11px] text-gray-400 flex items-center gap-2">
                            <span>Surat ke-${surah.number} &bull; ${surah.totalAyat} Ayat</span>
                            <span class="text-gray-600">&bull;</span>
                            <span id="mushafPageBadge" class="text-amber-400 font-semibold">Hal. ${quranModalState.currentPage} dari 604</span>
                        </div>
                    </div>
                </div>

                <!-- Kontrol Navigasi & Aksi -->
                <div class="flex items-center gap-1.5 sm:gap-2 ml-auto">
                    <!-- Zoom Button -->
                    <button type="button" id="btnMushafZoom" onclick="toggleMushafZoom()" class="px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-xs font-semibold text-gray-300 transition" title="Perbesar / Perkecil Teks Mushaf">
                        🔍 Perbesar
                    </button>

                    <!-- Toggle Mode (Gambar vs API Teks) -->
                    <button type="button" id="btnMushafMode" onclick="toggleMushafViewMode()" class="px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-xs font-semibold text-gray-300 transition hidden sm:inline-flex items-center gap-1" title="Ganti antara mode Gambar Mushaf asli atau Teks Utsmani API">
                        Mode Teks
                    </button>

                    <!-- Tombol Tutup -->
                    <button type="button" onclick="tutupMushafModal()" class="w-8 h-8 rounded-lg bg-gray-800 hover:bg-red-900/60 hover:text-red-400 border border-gray-700 text-gray-400 flex items-center justify-center font-bold transition ml-1" title="Tutup (ESC)">
                        ✕
                    </button>
                </div>
            </div>

            <!-- Toolbar Halaman & Tombol Panah -->
            <div class="px-4 py-2 bg-gray-850 border-b border-gray-800 flex items-center justify-between text-xs text-gray-300 gap-2">
                <!-- Tombol Sebelumnya -->
                <button type="button" onclick="gantiHalamanMushaf(-1)" class="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 font-semibold flex items-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed" id="btnPrevPage">
                    <span>◀ Hal Sebelumnya</span>
                </button>

                <!-- Input / Dropdown Lompat Halaman -->
                <div class="flex items-center gap-2">
                    <span class="text-gray-400 hidden sm:inline">Halaman:</span>
                    <select id="selectMushafPage" onchange="bukaMushafHalaman(this.value)" class="bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500">
                        ${Array.from({ length: 604 }, (_, i) => i + 1).map(p => `
                            <option value="${p}" ${p === quranModalState.currentPage ? 'selected' : ''}>
                                Hal. ${p} ${getSurahNameForPage(p) ? `(${getSurahNameForPage(p)})` : ''}
                            </option>
                        `).join('')}
                    </select>
                    <span class="text-gray-500 text-[11px]">/ 604</span>
                </div>

                <!-- Tombol Selanjutnya -->
                <button type="button" onclick="gantiHalamanMushaf(1)" class="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 font-semibold flex items-center gap-1 transition disabled:opacity-40 disabled:cursor-not-allowed" id="btnNextPage">
                    <span>Hal Selanjutnya ▶</span>
                </button>
            </div>

            <!-- Area Display Mushaf (Per Halaman) -->
            <div class="flex-1 overflow-auto bg-[#f8f6f0] flex items-center justify-center p-2 sm:p-4 relative" id="mushafScrollArea">
                <!-- Loader Overlay -->
                <div id="mushafLoader" class="absolute inset-0 bg-[#f8f6f0]/90 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 transition-opacity">
                    <div class="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
                    <span class="text-xs font-bold text-gray-700">Memuat Halaman Mushaf...</span>
                </div>

                <!-- Kontainer Gambar Mushaf Asli (Default) -->
                <div id="mushafImageContainer" class="w-full max-w-[680px] bg-white rounded-xl shadow-md border border-amber-200/60 p-2 sm:p-4 min-h-[500px] flex items-center justify-center transition-transform origin-top">
                    <img id="mushafPageImage" src="" alt="Mushaf Al-Qur'an" class="max-w-full h-auto object-contain select-none transition-transform duration-200" onload="mushafImageLoaded()" onerror="mushafImageError()">
                </div>

                <!-- Kontainer Teks Utsmani API (Mode Cadangan / Teks) -->
                <div id="mushafTextContainer" class="w-full max-w-[720px] bg-[#fffef9] rounded-2xl shadow-md border-2 border-amber-300/70 p-6 sm:p-8 min-h-[520px] hidden flex-col justify-between">
                    <div class="text-center pb-4 border-b border-amber-200/70 mb-4">
                        <div id="textModeHeader" class="text-xs font-bold text-amber-800 uppercase tracking-widest">MUSHAF MADINAH UTSMANI</div>
                        <div id="textModeBismillah" class="font-serif text-2xl text-gray-900 mt-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                    </div>
                    <div id="mushafPageText" class="font-quran leading-[2.6] text-right text-gray-900 text-2xl tracking-wide selection:bg-amber-200" dir="rtl">
                        <!-- Teks per ayat yang mengalir penuh per halaman -->
                    </div>
                    <div class="pt-4 border-t border-amber-200/70 text-center text-xs font-bold text-amber-900/70 mt-6" id="textModeFooter">
                        - Halaman ${quranModalState.currentPage} -
                    </div>
                </div>
            </div>

            <!-- Footer Modal & Pintasan Keyboard -->
            <div class="px-4 py-2.5 bg-gray-900 border-t border-gray-800 flex items-center justify-between text-[11px] text-gray-400 flex-wrap gap-2">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    <span>Mushaf Standar Madinah (Rasm Utsmani) &bull; 15 Baris / Hal</span>
                </div>
                <div class="hidden sm:flex items-center gap-3 text-gray-500">
                    <span>💡 <b>Tips:</b> Gunakan tombol <b>◀</b> dan <b>▶</b> pada keyboard untuk membalik halaman</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animasi Muncul
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);

    // Daftarkan Keyboard Listener
    document.addEventListener('keydown', handleQuranModalKeydown);

    // Muat Halaman Awal
    updateMushafPageContent();
}

// Dapatkan nama surat yang dimulai pada halaman tertentu (untuk dropdown selector)
function getSurahNameForPage(page) {
    const surah = QURAN_SURAHS.find(s => s.startPage === page);
    return surah ? surah.name : '';
}

// Update Konten Halaman Mushaf (URL Gambar atau API)
function updateMushafPageContent() {
    const page = quranModalState.currentPage;
    const page3Digit = String(page).padStart(3, '0');

    // Update Header & Badge
    const titleEl = document.getElementById('mushafSurahTitle');
    const badgeEl = document.getElementById('mushafPageBadge');
    const selectEl = document.getElementById('selectMushafPage');
    const prevBtn = document.getElementById('btnPrevPage');
    const nextBtn = document.getElementById('btnNextPage');
    const loaderEl = document.getElementById('mushafLoader');

    if (loaderEl) loaderEl.classList.remove('hidden', 'opacity-0');

    const matchedSurah = QURAN_SURAHS.find(s => page >= s.startPage && page <= s.endPage) || quranModalState.currentSurah;
    if (matchedSurah) {
        quranModalState.currentSurah = matchedSurah;
        if (titleEl) {
            titleEl.innerHTML = `${matchedSurah.name} <span class="text-xs sm:text-sm font-normal text-emerald-400 font-serif mr-1">(${matchedSurah.arabic})</span>`;
        }
    }

    if (badgeEl) badgeEl.innerText = `Hal. ${page} dari 604`;
    if (selectEl) selectEl.value = page;

    if (prevBtn) prevBtn.disabled = page <= 1;
    if (nextBtn) nextBtn.disabled = page >= 604;

    const imgContainer = document.getElementById('mushafImageContainer');
    const textContainer = document.getElementById('mushafTextContainer');
    const modeBtn = document.getElementById('btnMushafMode');

    if (quranModalState.viewMode === 'image') {
        if (imgContainer) imgContainer.classList.remove('hidden');
        if (textContainer) textContainer.classList.add('hidden');
        if (modeBtn) modeBtn.innerText = 'Mode Teks';

        const imgEl = document.getElementById('mushafPageImage');
        if (imgEl) {
            // Gunakan SVG berkualitas tinggi dari CDN resmi Quran-WS / jsDelivr (tajam di semua resolusi layar)
            // Format 3 digit: 001.svg s/d 604.svg
            const primarySvgUrl = `https://cdn.jsdelivr.net/gh/quran-ws/quran-svg@main/mushafs/hafs/kfqc/svg/${page3Digit}.svg`;
            
            // Simpan backup PNG jika SVG gagal
            imgEl.setAttribute('data-fallback-png', `https://cdn.jsdelivr.net/gh/GovarJabbar/Quran-PNG@master/${page3Digit}.png`);
            imgEl.setAttribute('data-fallback-svg', `https://cdn.quran.ws/svg/pages/latest/hafs-kfqc/${page3Digit}.svg`);
            imgEl.src = primarySvgUrl;
        }
    } else {
        // Mode Teks API Utsmani
        if (imgContainer) imgContainer.classList.add('hidden');
        if (textContainer) textContainer.classList.remove('hidden');
        if (modeBtn) modeBtn.innerText = 'Mode Mushaf Asli';

        loadMushafPageFromApi(page);
    }
}

// Callback saat Gambar Mushaf Berhasil Dimuat
function mushafImageLoaded() {
    const loaderEl = document.getElementById('mushafLoader');
    if (loaderEl) {
        loaderEl.classList.add('opacity-0');
        setTimeout(() => loaderEl.classList.add('hidden'), 200);
    }
}

// Fallback saat Gambar Gagal Dimuat
function mushafImageError() {
    const imgEl = document.getElementById('mushafPageImage');
    if (!imgEl) return;

    const fallbackPng = imgEl.getAttribute('data-fallback-png');
    const fallbackSvg = imgEl.getAttribute('data-fallback-svg');

    if (imgEl.src !== fallbackPng && fallbackPng) {
        imgEl.src = fallbackPng;
    } else if (imgEl.src !== fallbackSvg && fallbackSvg) {
        imgEl.src = fallbackSvg;
    } else {
        // Jika semua gambar CDN offline, otomatis beralih ke Mode API Teks Al-Qur'an Cloud
        console.warn('Gagal memuat gambar Mushaf, beralih ke API Al-Qur\'an Cloud Teks...');
        quranModalState.viewMode = 'api_text';
        updateMushafPageContent();
    }
}

// Muat Halaman dari REST API Al-Qur'an Cloud (Per Halaman Uthmani)
async function loadMushafPageFromApi(pageNumber) {
    const textEl = document.getElementById('mushafPageText');
    const footerEl = document.getElementById('textModeFooter');
    const bismillahEl = document.getElementById('textModeBismillah');
    const loaderEl = document.getElementById('mushafLoader');

    if (footerEl) footerEl.innerText = `- Halaman ${pageNumber} dari 604 -`;

    // Cek Cache Lokal
    if (quranModalState.pageCacheText[pageNumber]) {
        renderTextPage(quranModalState.pageCacheText[pageNumber]);
        if (loaderEl) {
            loaderEl.classList.add('opacity-0');
            setTimeout(() => loaderEl.classList.add('hidden'), 150);
        }
        return;
    }

    try {
        const response = await fetch(`https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`);
        const result = await response.json();

        if (result && result.code === 200 && result.data && result.data.ayahs) {
            quranModalState.pageCacheText[pageNumber] = result.data.ayahs;
            renderTextPage(result.data.ayahs);
        } else {
            throw new Error('Data halaman tidak valid');
        }
    } catch (err) {
        console.error('Error fetching Quran page:', err);
        if (textEl) {
            textEl.innerHTML = `
                <div class="text-center py-10 text-red-600 font-sans text-sm">
                    Gagal memuat data ayat halaman ${pageNumber}. Pastikan perangkat terhubung ke internet.
                    <br><br>
                    <button onclick="updateMushafPageContent()" class="px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-xs">Coba Lagi</button>
                </div>
            `;
        }
    } finally {
        if (loaderEl) {
            loaderEl.classList.add('opacity-0');
            setTimeout(() => loaderEl.classList.add('hidden'), 200);
        }
    }
}

// Render Teks Ayat Mengalir dengan Ornamen Nomor Ayat
function renderTextPage(ayahs) {
    const textEl = document.getElementById('mushafPageText');
    const bismillahEl = document.getElementById('textModeBismillah');
    if (!textEl) return;

    // Bersihkan teks
    let html = '';
    let currentSurahName = '';

    ayahs.forEach((ayah, idx) => {
        // Cek jika awal surat baru di dalam halaman
        if (ayah.surah && ayah.surah.name !== currentSurahName) {
            currentSurahName = ayah.surah.name;
            if (ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayah.surah.number !== 9) {
                html += `
                    <div class="w-full text-center my-6 py-2 bg-amber-100/70 border-y border-amber-300 font-bold text-amber-900 text-sm font-sans tracking-widest rounded">
                        سُورَةُ ${ayah.surah.name}
                    </div>
                    <div class="text-center my-4 font-serif text-xl text-gray-800">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                `;
            }
        }

        // Tampilkan teks ayat + simbol nomor ayat (Arabic Ayah End Ornament ۝)
        let ayahText = ayah.text;
        // Hapus bismillah redundan jika sudah ada di header surat
        if (ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayahText.startsWith('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')) {
            ayahText = ayahText.replace('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', '').trim();
        }

        html += `
            <span class="ayah-inline" data-surah="${ayah.surah ? ayah.surah.number : ''}" data-ayah="${ayah.numberInSurah}">
                ${ayahText} 
                <span class="inline-flex items-center justify-center w-7 h-7 mx-1 text-xs font-sans text-amber-800 bg-amber-100/80 border border-amber-300 rounded-full font-bold select-none align-middle" title="Ayat ${ayah.numberInSurah}">
                    ${toArabicNumber(ayah.numberInSurah)}
                </span>
            </span> 
        `;
    });

    textEl.innerHTML = html;
}

// Ubah angka Latin ke Angka Arab (1 -> ١)
function toArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).split('').map(d => arabicDigits[parseInt(d)] || d).join('');
}
