// =========================================
// KONFIGURASI FIREBASE REALTIME DATABASE
// =========================================
const firebaseConfig = {
  apiKey: "PASTE_API_KEY_ANDA_DI_SINI",
  authDomain: "PASTE_AUTH_DOMAIN_DI_SINI",
  databaseURL: "PASTE_DATABASE_URL_DI_SINI",
  projectId: "PASTE_PROJECT_ID_DI_SINI",
  storageBucket: "PASTE_STORAGE_BUCKET_DI_SINI",
  messagingSenderId: "PASTE_SENDER_ID_DI_SINI",
  appId: "PASTE_APP_ID_DI_SINI"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = typeof firebase !== 'undefined' ? firebase.database() : null;

// DEFAULT / SEED DATA AWAL
const DEFAULT_STUDENTS = [
  { nis: "21221001", name: "Budi Santoso", gender: "L", username: "budi", role: "siswa" },
  { nis: "21221002", name: "Siti Maemunah", gender: "P", username: "siti", role: "siswa" },
  { nis: "21221003", name: "Ahmad Fauzi", gender: "L", username: "fauzi", role: "siswa" },
  { nis: "21221004", name: "Dewi Lestari", gender: "P", username: "dewi", role: "siswa" },
  { nis: "21221005", name: "Rizky Pratama", gender: "L", username: "rizky", role: "siswa" },
  { nis: "21221006", name: "Doni Setiawan", gender: "L", username: "doni", role: "siswa" },
  { nis: "21221007", name: "Nur Hidayah", gender: "P", username: "nur", role: "siswa" },
  { nis: "21221008", name: "Eko Prasetyo", gender: "L", username: "eko", role: "siswa" }
];

const DEFAULT_STRUKTUR = {
  walikelas: "Lasta Heksamana Putra (Guru)",
  ketua: "Budi Santoso",
  wakil: "Siti Maemunah",
  sekretaris: "Ahmad Fauzi",
  bendahara: "Dewi Lestari",
  photos: { walikelas: "", ketua: "", wakil: "", sekretaris: "", bendahara: "" },
  seksiList: [
    { title: "KEBERSIHAN", name: "Rizky Pratama" },
    { title: "KEAMANAN", name: "Doni Setiawan" },
    { title: "KEROHANIAN", name: "Nur Hidayah" },
    { title: "OLAH RAGA", name: "Eko Prasetyo" }
  ]
};

const DEFAULT_SCHEDULE = [
  { id: 1, day: "Senin", subject: "Upacara & Wali Kelas", start: "07:00", end: "08:00", teacher: "Lasta Heksamana P.", room: "Lap. Utama" },
  { id: 2, day: "Senin", subject: "Jaringan Dasar", start: "08:00", end: "10:00", teacher: "Lasta Heksamana P.", room: "Lab TJKT" },
  { id: 3, day: "Senin", subject: "Administrasi Server", start: "10:15", end: "11:45", teacher: "Ir. Handoko", room: "Lab Komputer" },
  { id: 4, day: "Selasa", subject: "Keamanan Jaringan", start: "07:30", end: "09:30", teacher: "Susi Susanti, S.Pd", room: "Lab TJKT" },
  { id: 5, day: "Selasa", subject: "Teknologi Layanan Jaringan", start: "10:00", end: "12:00", teacher: "Drs. Mulyadi", room: "R.101" },
  { id: 6, day: "Rabu", subject: "Bahasa Indonesia", start: "07:30", end: "09:30", teacher: "Endang, M.Pd", room: "R.101" },
  { id: 7, day: "Rabu", subject: "Bahasa Inggris Lanjut", start: "10:00", end: "11:30", teacher: "Mr. John Doe", room: "R.101" },
  { id: 8, day: "Kamis", subject: "Pendidikan Agama", start: "07:30", end: "09:00", teacher: "Ust. Abdullah", room: "Masjid / R.101" },
  { id: 9, day: "Kamis", subject: "Penjaskes & Olahraga", start: "09:15", end: "11:30", teacher: "Coach Suharto", room: "Lapangan" },
  { id: 10, day: "Jumat", subject: "Prakarya & Kewirausahaan", start: "07:30", end: "09:00", teacher: "Dwi Astuti, S.E", room: "R.101" },
  { id: 11, day: "Jumat", subject: "Sejarah Indonesia", start: "09:15", end: "10:45", teacher: "Drs. Yudi", room: "R.101" }
];

const DEFAULT_PIKET = {
  Senin: ["Budi Santoso", "Dewi Lestari", "Rizky Pratama"],
  Selasa: ["Siti Maemunah", "Ahmad Fauzi", "Doni Setiawan"],
  Rabu: ["Nur Hidayah", "Eko Prasetyo", "Budi Santoso"],
  Kamis: ["Dewi Lestari", "Siti Maemunah", "Ahmad Fauzi"],
  Jumat: ["Rizky Pratama", "Doni Setiawan", "Nur Hidayah"]
};

const DEFAULT_TASKS = [
  { id: 101, subject: "Jaringan Dasar", title: "Konfigurasi Subnetting IPv4", deadline: "2026-10-20", desc: "Kerjakan soal latihan subnetting kelas C di buku tugas.", doneBy: ["21221002", "21221001"] },
  { id: 102, subject: "Administrasi Server", title: "Laporan Instalasi Debian Server", deadline: "2026-10-22", desc: "Dikumpulkan dalam bentuk softfile PDF.", doneBy: ["21221002"] },
  { id: 103, subject: "Keamanan Jaringan", title: "Analisis Firewall iptables", deadline: "2026-10-25", desc: "Buat rangkuman cara kerja filtering port.", doneBy: [] }
];

const DEFAULT_ATTENDANCE = {};

const DEFAULT_MARQUEE_ITEMS = [
  "CLASSROOM OVERLOAD V2.0 - SISTEM MANAJEMEN KELAS XI TJKT 2!",
  "INFO: TUGAS JARINGAN DASAR DIKUMPULKAN BESOK JAM 07:00 WIB!",
  "PIKET HARI INI: TIM SITI MAEMUNAH & BUDI SANTOSO",
  "ABSENSI DIBUKA HINGGA PUKUL 08:00 WIB"
];

let currentUser = JSON.parse(localStorage.getItem('co_user')) || null;
let students = JSON.parse(localStorage.getItem('co_students')) || DEFAULT_STUDENTS;
let struktur = JSON.parse(localStorage.getItem('co_struktur')) || DEFAULT_STRUKTUR;
let schedule = JSON.parse(localStorage.getItem('co_schedule')) || DEFAULT_SCHEDULE;
let piket = JSON.parse(localStorage.getItem('co_piket')) || DEFAULT_PIKET;
let tasks = JSON.parse(localStorage.getItem('co_tasks')) || DEFAULT_TASKS;
let attendanceRecords = JSON.parse(localStorage.getItem('co_attendance')) || DEFAULT_ATTENDANCE;
let marqueeItems = JSON.parse(localStorage.getItem('co_marquee')) || DEFAULT_MARQUEE_ITEMS;

let currentSelectedDay = "Senin";
let html5QrCodeScanner = null;

// INISIALISASI & REAL-TIME SYNC FIREBASE
window.onload = function() {
  const todayStr = new Date().toISOString().split('T')[0];
  document.getElementById('attendance-date-picker').value = todayStr;

  if (db) {
    db.ref('classroom_overload_data').on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        students = data.students || [];
        struktur = data.struktur || struktur;
        schedule = data.schedule || [];
        piket = data.piket || piket;
        tasks = data.tasks || [];
        attendanceRecords = data.attendanceRecords || {};
        marqueeItems = data.marqueeItems || DEFAULT_MARQUEE_ITEMS;
      } else {
        saveState();
      }
      refreshUI();
    });
  } else {
    refreshUI();
  }
};

function refreshUI() {
  updateUserUI();
  renderMarquee();
  renderDashboard();
  renderStruktur();
  loadAttendanceForDate();
  renderSchedule();
  renderPiket();
  renderTasks();
  renderAdminPanel();
  populateSiswaLoginSelect();
  lucide.createIcons();
}

function saveState() {
  localStorage.setItem('co_students', JSON.stringify(students));
  localStorage.setItem('co_struktur', JSON.stringify(struktur));
  localStorage.setItem('co_schedule', JSON.stringify(schedule));
  localStorage.setItem('co_piket', JSON.stringify(piket));
  localStorage.setItem('co_tasks', JSON.stringify(tasks));
  localStorage.setItem('co_attendance', JSON.stringify(attendanceRecords));
  localStorage.setItem('co_marquee', JSON.stringify(marqueeItems));

  if (db) {
    db.ref('classroom_overload_data').set({
      students,
      struktur,
      schedule,
      piket,
      tasks,
      attendanceRecords,
      marqueeItems
    });
  }
}

// =========================================
// FITUR EKSPORT & IMPOR DATA KELAS
// =========================================
function exportClassroomData() {
  const allData = {
    students,
    struktur,
    schedule,
    piket,
    tasks,
    attendanceRecords,
    marqueeItems
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `classroom_overload_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importClassroomData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const importedData = JSON.parse(evt.target.result);
      
      if (importedData.students && importedData.struktur) {
        students = importedData.students;
        struktur = importedData.struktur;
        schedule = importedData.schedule || DEFAULT_SCHEDULE;
        piket = importedData.piket || DEFAULT_PIKET;
        tasks = importedData.tasks || DEFAULT_TASKS;
        attendanceRecords = importedData.attendanceRecords || DEFAULT_ATTENDANCE;
        marqueeItems = importedData.marqueeItems || DEFAULT_MARQUEE_ITEMS;

        saveState();
        refreshUI();
        alert("Data kelas berhasil diimpor dan dipulihkan sepenuhnya!");
      } else {
        alert("Format file cadangan tidak valid!");
      }
    } catch (err) {
      console.error("Gagal memparsing file JSON:", err);
      alert("Terjadi kesalahan saat membaca file JSON.");
    } finally {
      e.target.value = "";
    }
  };
  reader.readAsText(file);
}

// RENDER RUNNING TEXT (MARQUEE)
function renderMarquee() {
  const container = document.getElementById('marquee-container');
  if(!container) return;
  
  let htmlContent = '';
  for(let i=0; i<2; i++) {
    marqueeItems.forEach(text => {
      htmlContent += `<span class="flex items-center gap-2"><i data-lucide="zap" class="w-4 h-4 fill-black"></i> ${text}</span>`;
    });
  }
  container.innerHTML = htmlContent;
  
  const marqueeInput = document.getElementById('admin-marquee-input');
  if(marqueeInput) {
    marqueeInput.value = marqueeItems.join('\n');
  }
}

function handleSaveMarquee(e) {
  e.preventDefault();
  const rawText = document.getElementById('admin-marquee-input').value;
  marqueeItems = rawText.split('\n').map(s => s.trim()).filter(s => s.length > 0);
  saveState();
  refreshUI();
  alert("Running text berhasil diperbarui!");
}

// FUNGSI CETAK LAPORAN PRESENSI
function printAttendanceReport() {
  const selectedDate = document.getElementById('attendance-date-picker').value;
  document.getElementById('print-date-heading').textContent = selectedDate;
  
  document.body.classList.add('printing-attendance');
  window.print();
  document.body.classList.remove('printing-attendance');
}

// FUNGSI CETAK REKAP TOTAL LOG ABSENSI DI PANEL GURU
function printAdminAttendanceLogs() {
  document.body.classList.add('printing-admin-logs');
  window.print();
  document.body.classList.remove('printing-admin-logs');
}

// FUNGSI CETAK KARTU QR KHUSUS SISWA
function printSpecificQRCard() {
  document.body.classList.add('printing-qr');
  window.print();
  document.body.classList.remove('printing-qr');
}

// FUNGSI BUKA KARTU BARCODE QR SISWA
function openStudentQRModal(nis) {
  let studentObj = null;
  if(nis) {
    studentObj = students.find(s => s.nis === nis);
  } else if(currentUser && currentUser.role === 'siswa') {
    studentObj = currentUser;
  }

  if(!studentObj) {
    alert("Data siswa tidak ditemukan.");
    return;
  }

  document.getElementById('qr-student-name').textContent = studentObj.name;
  document.getElementById('qr-student-nis').textContent = `NIS: ${studentObj.nis}`;

  const container = document.getElementById('qrcode-display-container');
  container.innerHTML = '';
  new QRCode(container, {
    text: studentObj.nis,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  document.getElementById('student-qr-modal').classList.remove('hidden');
}

function closeStudentQRModal() {
  document.getElementById('student-qr-modal').classList.add('hidden');
}

// FUNGSI MODAL SCANNER QR (PANEL GURU)
function openQRScannerModal() {
  document.getElementById('qr-scanner-modal').classList.remove('hidden');
  const resultMsg = document.getElementById('scanner-result-msg');
  resultMsg.textContent = "MENUNGGU QR CODE DIPINDAI / DIUPLOAD...";
  resultMsg.className = "p-3 bg-[#C4B5FD] neo-border-sm text-center font-black text-xs uppercase flex items-center justify-center";

  if (!html5QrCodeScanner) {
    html5QrCodeScanner = new Html5Qrcode("qr-reader");
  }

  html5QrCodeScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 220, height: 220 } },
    onScanSuccess
  ).catch(err => {
    console.warn("Kamera tidak dapat diakses atau diblokir:", err);
    resultMsg.textContent = "KAMERA TIDAK AKTIF. SILAKAN UPLOAD FILE GAMBAR QR DI BAWAH.";
    resultMsg.className = "p-3 bg-[#FFD93D] text-black neo-border-sm text-center font-black text-xs uppercase flex items-center justify-center";
  });
}

function closeQRScannerModal() {
  if (html5QrCodeScanner && html5QrCodeScanner.isScanning) {
    html5QrCodeScanner.stop().then(() => {
      document.getElementById('qr-scanner-modal').classList.add('hidden');
    }).catch(() => {
      document.getElementById('qr-scanner-modal').classList.add('hidden');
    });
  } else {
    document.getElementById('qr-scanner-modal').classList.add('hidden');
  }
}

// FUNGSI SCAN QR DARI FILE GAMBAR YANG DI-UPLOAD
async function scanQRFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const resultMsg = document.getElementById('scanner-result-msg');
  resultMsg.textContent = "MEMPROSES FILE QR CODE...";
  resultMsg.className = "p-3 bg-[#FFD93D] text-black neo-border-sm text-center font-black text-xs uppercase flex items-center justify-center";

  const fileScanner = new Html5Qrcode("qr-reader");

  try {
    const decodedText = await fileScanner.scanFile(file, true);
    onScanSuccess(decodedText);
  } catch (err) {
    console.error("Gagal membaca QR dari file:", err);
    resultMsg.textContent = "GAGAL MEMBACA QR! PASTIKAN GAMBAR QR JELAS & BENAR.";
    resultMsg.className = "p-3 bg-[#FF6B6B] text-white neo-border-sm text-center font-black text-xs uppercase flex items-center justify-center";
  } finally {
    e.target.value = "";
  }
}

function onScanSuccess(decodedText) {
  const resultMsg = document.getElementById('scanner-result-msg');
  const scannedNis = decodedText.trim();
  const foundStudent = students.find(s => s.nis === scannedNis);

  if (foundStudent) {
    const todayStr = new Date().toISOString().split('T')[0];
    if (!attendanceRecords[todayStr]) {
      attendanceRecords[todayStr] = {};
    }

    attendanceRecords[todayStr][scannedNis] = 'H';
    saveState();
    refreshUI();

    resultMsg.textContent = `BERHASIL! ${foundStudent.name} (${scannedNis}) TERCATAT HADIR!`;
    resultMsg.className = "p-3 bg-emerald-400 text-black neo-border-sm text-center font-black text-xs uppercase flex items-center justify-center";
  } else {
    resultMsg.textContent = `QR TIDAK VALID! NIS "${scannedNis}" TIDAK TERDAFTAR.`;
    resultMsg.className = "p-3 bg-[#FF6B6B] text-white neo-border-sm text-center font-black text-xs uppercase flex items-center justify-center";
  }
}

// FUNGSI RESET DATA TOTAL
function resetDataToDefault() {
  if (confirm("Apakah Anda yakin ingin MENGOSONGKAN SELURUH DATA? Semua absensi, struktur, jadwal, piket, dan daftar siswa akan dihapus bersih!")) {
    students = [];
    tasks = [];
    attendanceRecords = {};
    schedule = [];
    piket = { Senin: [], Selasa: [], Rabu: [], Kamis: [], Jumat: [] };
    marqueeItems = DEFAULT_MARQUEE_ITEMS;
    struktur = {
      walikelas: "Lasta Heksamana Putra (Guru)",
      ketua: "-",
      wakil: "-",
      sekretaris: "-",
      bendahara: "-",
      photos: { walikelas: "", ketua: "", wakil: "", sekretaris: "", bendahara: "" },
      seksiList: []
    };

    saveState();
    refreshUI();
    alert("Seluruh data kelas berhasil dikosongkan total!");
  }
}

// EFEK KLIK UNIVERSAL
const themeColors = [
  'rgba(255, 217, 61, 0.8)',
  'rgba(255, 107, 107, 0.8)',
  'rgba(196, 181, 253, 0.8)',
  'rgba(52, 211, 153, 0.8)'
];
let colorIndex = 0;

document.addEventListener('pointerdown', function (e) {
  const circle = document.createElement('span');
  const size = 28;
  
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${e.clientX - size / 2}px`;
  circle.style.top = `${e.clientY - size / 2}px`;
  
  circle.style.backgroundColor = themeColors[colorIndex];
  colorIndex = (colorIndex + 1) % themeColors.length;

  circle.className = 'ripple-effect';
  document.body.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 400);
});

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`tab-${tabId}`).classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-[#FFD93D]', 'neo-border-sm');
  });
  const activeNav = document.getElementById(`nav-${tabId}`);
  if(activeNav) {
    activeNav.classList.add('bg-[#FFD93D]', 'neo-border-sm');
  }
  document.getElementById('mobile-menu').classList.add('hidden');
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

function updateUserUI() {
  const userBadge = document.getElementById('user-badge');
  const roleBadge = document.getElementById('user-role-badge');
  const displayName = document.getElementById('user-display-name');
  const authBtnText = document.getElementById('auth-btn-text');
  const adminNavBtn = document.getElementById('nav-admin');
  const mobileAdminBtn = document.getElementById('mobile-admin-btn');
  const brandSubtitle = document.getElementById('brand-subtitle');
  
  const adminEditStrukturBtn = document.getElementById('admin-edit-struktur-btn');
  const adminAddStudentAbsensiBtn = document.getElementById('admin-add-student-absensi-btn');
  const saveAttendanceBtn = document.getElementById('save-attendance-btn');
  const adminPrintAttendanceBtn = document.getElementById('admin-print-attendance-btn');
  const adminAddSubjectBtn = document.getElementById('admin-add-subject-btn');
  const adminAddTaskBtn = document.getElementById('admin-add-task-btn');
  const adminAddPiketBtn = document.getElementById('admin-add-piket-btn');
  const attendanceActionHeader = document.getElementById('attendance-action-header');
  const studentQrBtn = document.getElementById('student-qr-btn');

  if(currentUser) {
    userBadge.classList.remove('hidden');
    displayName.textContent = currentUser.name;
    roleBadge.textContent = currentUser.role === 'admin' ? 'GURU / WALI KELAS' : 'SISWA';
    authBtnText.textContent = "KELUAR";

    if(currentUser.role === 'admin') {
      roleBadge.className = "bg-[#FF6B6B] text-white font-black text-xs px-2 py-0.5 neo-border-sm uppercase";
      brandSubtitle.textContent = "Portal Guru Pengajar (Admin)";
      adminNavBtn.classList.remove('hidden');
      mobileAdminBtn.classList.remove('hidden');
      if(adminEditStrukturBtn) adminEditStrukturBtn.classList.remove('hidden');
      if(adminAddStudentAbsensiBtn) adminAddStudentAbsensiBtn.classList.remove('hidden');
      if(saveAttendanceBtn) saveAttendanceBtn.classList.remove('hidden');
      if(adminPrintAttendanceBtn) adminPrintAttendanceBtn.classList.remove('hidden');
      if(adminAddSubjectBtn) adminAddSubjectBtn.classList.remove('hidden');
      if(adminAddTaskBtn) adminAddTaskBtn.classList.remove('hidden');
      if(adminAddPiketBtn) adminAddPiketBtn.classList.remove('hidden');
      if(attendanceActionHeader) attendanceActionHeader.classList.remove('hidden');
      if(studentQrBtn) studentQrBtn.classList.add('hidden');
    } else {
      roleBadge.className = "bg-[#FFD93D] text-black font-black text-xs px-2 py-0.5 neo-border-sm uppercase";
      brandSubtitle.textContent = `Siswa: XI TJKT 2`;
      adminNavBtn.classList.add('hidden');
      mobileAdminBtn.classList.add('hidden');
      if(adminEditStrukturBtn) adminEditStrukturBtn.classList.add('hidden');
      if(adminAddStudentAbsensiBtn) adminAddStudentAbsensiBtn.classList.add('hidden');
      if(saveAttendanceBtn) saveAttendanceBtn.classList.add('hidden');
      if(adminPrintAttendanceBtn) adminPrintAttendanceBtn.classList.add('hidden');
      if(adminAddSubjectBtn) adminAddSubjectBtn.classList.add('hidden');
      if(adminAddTaskBtn) adminAddTaskBtn.classList.add('hidden');
      if(adminAddPiketBtn) adminAddPiketBtn.classList.add('hidden');
      if(attendanceActionHeader) attendanceActionHeader.classList.add('hidden');
      if(studentQrBtn) studentQrBtn.classList.remove('hidden');
    }
  } else {
    userBadge.classList.add('hidden');
    authBtnText.textContent = "MASUK";
    brandSubtitle.textContent = "Portal Kelas XI TJKT 2";
    adminNavBtn.classList.add('hidden');
    mobileAdminBtn.classList.add('hidden');
    if(adminEditStrukturBtn) adminEditStrukturBtn.classList.add('hidden');
    if(adminAddStudentAbsensiBtn) adminAddStudentAbsensiBtn.classList.add('hidden');
    if(saveAttendanceBtn) saveAttendanceBtn.classList.add('hidden');
    if(adminPrintAttendanceBtn) adminPrintAttendanceBtn.classList.add('hidden');
    if(adminAddSubjectBtn) adminAddSubjectBtn.classList.add('hidden');
    if(adminAddTaskBtn) adminAddTaskBtn.classList.add('hidden');
    if(adminAddPiketBtn) adminAddPiketBtn.classList.add('hidden');
    if(attendanceActionHeader) attendanceActionHeader.classList.add('hidden');
    if(studentQrBtn) studentQrBtn.classList.add('hidden');
  }
}

function openLoginModal() {
  if(currentUser) {
    currentUser = null;
    localStorage.removeItem('co_user');
    refreshUI();
    switchTab('dashboard');
  } else {
    document.getElementById('login-modal').classList.remove('hidden');
    populateSiswaLoginSelect();
    switchLoginTab('guru');
  }
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.add('hidden');
}

function switchLoginTab(type) {
  const guruForm = document.getElementById('login-guru-form');
  const siswaForm = document.getElementById('login-siswa-form');
  const guruBtn = document.getElementById('login-tab-guru-btn');
  const siswaBtn = document.getElementById('login-tab-siswa-btn');

  if(type === 'guru') {
    guruForm.classList.remove('hidden');
    siswaForm.classList.add('hidden');
    guruBtn.className = "neo-btn bg-black text-white font-black text-xs uppercase p-3 neo-border neo-shadow-sm";
    siswaBtn.className = "neo-btn bg-white text-black font-black text-xs uppercase p-3 neo-border neo-shadow-sm";
  } else {
    guruForm.classList.add('hidden');
    siswaForm.classList.remove('hidden');
    guruBtn.className = "neo-btn bg-white text-black font-black text-xs uppercase p-3 neo-border neo-shadow-sm";
    siswaBtn.className = "neo-btn bg-[#FFD93D] text-black font-black text-xs uppercase p-3 neo-border neo-shadow-sm";
  }
}

function populateSiswaLoginSelect() {
  const select = document.getElementById('login-siswa-select');
  if(!select) return;
  select.innerHTML = '';
  students.forEach(s => {
    select.innerHTML += `<option value="${s.nis}">${s.name} (NIS: ${s.nis})</option>`;
  });
}

function handleGuruLogin(e) {
  e.preventDefault();
  const pass = document.getElementById('guru-password').value.trim();
  if(pass === 'admin' || pass === '123456' || pass === 'guru') {
    currentUser = { username: 'admin', name: 'Lasta Heksamana Putra (Guru)', role: 'admin', nis: '000000' };
    localStorage.setItem('co_user', JSON.stringify(currentUser));
    closeLoginModal();
    refreshUI();
    switchTab('admin');
  } else {
    alert("Password guru salah! Gunakan 'admin' atau '123456'.");
  }
}

function handleSiswaLogin(e) {
  e.preventDefault();
  const selectedNis = document.getElementById('login-siswa-select').value;
  const found = students.find(s => s.nis === selectedNis);
  if(found) {
    currentUser = { ...found, role: 'siswa' };
    localStorage.setItem('co_user', JSON.stringify(currentUser));
    closeLoginModal();
    refreshUI();
    switchTab('dashboard');
  } else {
    alert("Siswa tidak ditemukan.");
  }
}

function renderDashboard() {
  const totalCount = students.length;
  document.getElementById('stat-total-siswa').textContent = totalCount;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRec = attendanceRecords[todayStr] || {};
  const presentCount = Object.values(todayRec).filter(v => v === 'H').length;
  
  let attRate = 0;
  if (totalCount > 0) {
    const rawRate = (presentCount / totalCount) * 100;
    attRate = Math.min(rawRate, 100).toFixed(1);
  }
  document.getElementById('stat-attendance-rate').textContent = `${attRate}%`;

  const todayDayName = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
  const dayMap = { 'Senin': 'Senin', 'Selasa': 'Selasa', 'Rabu': 'Rabu', 'Kamis': 'Kamis', 'Jumat': "Jum'at" };
  const normalizedDay = dayMap[todayDayName] || 'Senin';
  document.getElementById('current-day-badge').textContent = normalizedDay.toUpperCase();

  const todaySubjects = schedule.filter(s => s.day === normalizedDay);
  const container = document.getElementById('dashboard-today-schedule');
  container.innerHTML = '';

  if(todaySubjects.length === 0) {
    container.innerHTML = `<p class="font-bold text-sm text-center py-4 bg-gray-100 neo-border-sm">Tidak ada jadwal pelajaran hari ini!</p>`;
  } else {
    todaySubjects.forEach(sub => {
      container.innerHTML += `
        <div class="flex items-center justify-between p-3 bg-white neo-border-sm hover:bg-[#FFD93D] transition-colors">
          <div>
            <span class="text-xs font-black bg-black text-white px-2 py-0.5">${sub.start} - ${sub.end}</span>
            <h4 class="font-black text-base uppercase mt-1">${sub.subject}</h4>
            <p class="text-xs font-bold text-black/70">${sub.teacher} • ${sub.room}</p>
          </div>
          <i data-lucide="chevron-right" class="w-5 h-5 stroke-[3]"></i>
        </div>
      `;
    });
  }

  const todayPiketList = piket[normalizedDay] || [];
  const piketContainer = document.getElementById('dashboard-today-piket');
  piketContainer.innerHTML = '';
  if(todayPiketList.length === 0) {
    piketContainer.innerHTML = `<p class="font-bold text-xs uppercase text-black/70">Belum ada petugas piket hari ini.</p>`;
  } else {
    todayPiketList.forEach(name => {
      piketContainer.innerHTML += `
        <div class="flex items-center gap-3 p-2.5 bg-white neo-border-sm">
          <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 stroke-[3]"></i>
          <span class="font-black text-sm uppercase">${name}</span>
        </div>
      `;
    });
  }

  const pendingCount = tasks.filter(t => !currentUser || !t.doneBy.includes(currentUser.nis)).length;
  document.getElementById('stat-pending-tasks').textContent = `${pendingCount} PR`;
}

function renderStruktur() {
  document.getElementById('role-walikelas').textContent = struktur.walikelas || '-';
  document.getElementById('role-ketua').textContent = struktur.ketua || '-';
  document.getElementById('role-wakil').textContent = struktur.wakil || '-';
  document.getElementById('role-sekretaris').textContent = struktur.sekretaris || '-';
  document.getElementById('role-bendahara').textContent = struktur.bendahara || '-';

  const p = struktur.photos || {};
  renderAvatar('avatar-container-walikelas', p.walikelas, 'user-check', 'w-10 h-10');
  renderAvatar('avatar-container-ketua', p.ketua, 'crown', 'w-8 h-8');
  renderAvatar('avatar-container-wakil', p.wakil, 'shield', 'w-8 h-8');
  renderAvatar('avatar-container-sekretaris', p.sekretaris, 'file-text', 'w-7 h-7');
  renderAvatar('avatar-container-bendahara', p.bendahara, 'wallet', 'w-7 h-7');

  const seksiContainer = document.getElementById('seksi-grid-container');
  seksiContainer.innerHTML = '';
  const colors = ['bg-[#FF6B6B] text-white', 'bg-[#FFD93D] text-black', 'bg-[#C4B5FD] text-black', 'bg-black text-white'];

  if(struktur.seksiList && struktur.seksiList.length > 0) {
    struktur.seksiList.forEach((seksi, index) => {
      const colorClass = colors[index % colors.length];
      seksiContainer.innerHTML += `
        <div class="bg-white neo-border p-4 neo-shadow text-center struktur-popup-card">
          <span class="${colorClass} text-xs font-black px-2 py-0.5 neo-border-sm uppercase">${seksi.title}</span>
          <h5 class="text-base font-black uppercase mt-2">${seksi.name}</h5>
        </div>
      `;
    });
  } else {
    seksiContainer.innerHTML = `<p class="col-span-4 font-bold text-center text-sm uppercase py-4">Belum ada seksi departemen.</p>`;
  }
  lucide.createIcons();
}

function renderAvatar(containerId, photoUrl, defaultIcon, iconSize) {
  const container = document.getElementById(containerId);
  if(!container) return;
  if(photoUrl && photoUrl.trim() !== '') {
    container.innerHTML = `<img src="${photoUrl}" alt="Foto Profil" class="w-full h-full object-cover">`;
  } else {
    container.innerHTML = `<i data-lucide="${defaultIcon}" class="${iconSize} stroke-[2.5]"></i>`;
  }
}

function openEditStrukturModal() {
  document.getElementById('edit-walikelas').value = struktur.walikelas || '';
  document.getElementById('edit-ketua').value = struktur.ketua || '';
  document.getElementById('edit-wakil').value = struktur.wakil || '';
  document.getElementById('edit-sekretaris').value = struktur.sekretaris || '';
  document.getElementById('edit-bendahara').value = struktur.bendahara || '';

  const container = document.getElementById('edit-seksi-container');
  container.innerHTML = '';
  if(struktur.seksiList) {
    struktur.seksiList.forEach((s) => {
      container.innerHTML += `
        <div class="flex items-center gap-2 seksi-row">
          <input type="text" value="${s.title}" class="w-1/2 p-2 neo-border seksi-title-input uppercase" required>
          <input type="text" value="${s.name}" class="w-1/2 p-2 neo-border seksi-name-input uppercase" required>
          <button type="button" onclick="this.parentElement.remove()" class="neo-btn bg-[#FF6B6B] text-white p-2 neo-border-sm"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      `;
    });
  }

  document.getElementById('struktur-modal').classList.remove('hidden');
  lucide.createIcons();
}

function addSeksiField() {
  const container = document.getElementById('edit-seksi-container');
  const div = document.createElement('div');
  div.className = "flex items-center gap-2 seksi-row";
  div.innerHTML = `
    <input type="text" placeholder="Departemen" class="w-1/2 p-2 neo-border seksi-title-input uppercase" required>
    <input type="text" placeholder="Nama Penanggung Jawab" class="w-1/2 p-2 neo-border seksi-name-input uppercase" required>
    <button type="button" onclick="this.parentElement.remove()" class="neo-btn bg-[#FF6B6B] text-white p-2 neo-border-sm"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
  `;
  container.appendChild(div);
  lucide.createIcons();
}

function closeEditStrukturModal() {
  document.getElementById('struktur-modal').classList.add('hidden');
}

function handleSaveStruktur(e) {
  e.preventDefault();
  struktur.walikelas = document.getElementById('edit-walikelas').value;
  struktur.ketua = document.getElementById('edit-ketua').value;
  struktur.wakil = document.getElementById('edit-wakil').value;
  struktur.sekretaris = document.getElementById('edit-sekretaris').value;
  struktur.bendahara = document.getElementById('edit-bendahara').value;

  if(!struktur.photos) struktur.photos = {};

  const files = {
    walikelas: document.getElementById('edit-photo-walikelas').files[0],
    ketua: document.getElementById('edit-photo-ketua').files[0],
    wakil: document.getElementById('edit-photo-wakil').files[0],
    sekretaris: document.getElementById('edit-photo-sekretaris').files[0],
    bendahara: document.getElementById('edit-photo-bendahara').files[0]
  };

  let pendingKeys = Object.keys(files).filter(k => files[k]);
  if(pendingKeys.length === 0) {
    finalizeStrukturSave();
    return;
  }

  pendingKeys.forEach(key => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      struktur.photos[key] = evt.target.result;
      pendingKeys = pendingKeys.filter(k => k !== key);
      if(pendingKeys.length === 0) finalizeStrukturSave();
    };
    reader.readAsDataURL(files[key]);
  });
}

function finalizeStrukturSave() {
  const titles = document.querySelectorAll('.seksi-title-input');
  const names = document.querySelectorAll('.seksi-name-input');
  let newSeksiList = [];
  for(let i=0; i<titles.length; i++) {
    newSeksiList.push({ title: titles[i].value, name: names[i].value });
  }
  struktur.seksiList = newSeksiList;

  saveState();
  refreshUI();
  closeEditStrukturModal();
  alert("Struktur kelas berhasil diperbarui!");
}

function loadAttendanceForDate() {
  const selectedDate = document.getElementById('attendance-date-picker').value;
  const rec = attendanceRecords[selectedDate] || {}; 
  const tbody = document.getElementById('attendance-table-body');
  tbody.innerHTML = '';

  let cH = 0, cI = 0, cS = 0, cA = 0;
  const isAdmin = currentUser && currentUser.role === 'admin';

  if(students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-6 text-center font-black uppercase">Belum ada data siswa terdaftar.</td></tr>`;
  } else {
    students.forEach((s, idx) => {
      const status = rec[s.nis] || ''; 
      
      if(status === 'H') cH++;
      if(status === 'I') cI++;
      if(status === 'S') cS++;
      if(status === 'A') cA++;

      tbody.innerHTML += `
        <tr class="hover:bg-[#FFFDF5]">
          <td class="p-4 border-r-2 border-black">${idx + 1}</td>
          <td class="p-4 border-r-2 border-black">${s.nis}</td>
          <td class="p-4 border-r-2 border-black">${s.name}</td>
          <td class="p-4 text-center border-r-2 border-black">
            ${isAdmin ? `
              <select onchange="updateAttendanceState('${s.nis}', this.value)" class="p-1.5 font-black text-xs uppercase neo-border bg-white outline-none">
                <option value="" ${status === '' ? 'selected' : ''}>-- Belum Diabsen --</option>
                <option value="H" ${status === 'H' ? 'selected' : ''}>Hadir (H)</option>
                <option value="I" ${status === 'I' ? 'selected' : ''}>Izin (I)</option>
                <option value="S" ${status === 'S' ? 'selected' : ''}>Sakit (S)</option>
                <option value="A" ${status === 'A' ? 'selected' : ''}>Alpa (A)</option>
              </select>
            ` : `
              <span class="px-3 py-1 neo-border-sm text-xs font-black uppercase ${ status === 'H' ? 'bg-emerald-400' : status === 'I' ? 'bg-[#FFD93D]' : status === 'S' ? 'bg-[#C4B5FD]' : status === 'A' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-black' }">${status === 'H' ? 'HADIR' : status === 'I' ? 'IZIN' : status === 'S' ? 'SAKIT' : status === 'A' ? 'ALPA' : 'BELUM ABSEN'}</span>
            `}
          </td>
          ${isAdmin ? `
            <td class="p-4 text-center print:hidden">
              <div class="flex items-center justify-center gap-2">
                <button onclick="openStudentQRModal('${s.nis}')" title="Lihat & Cetak QR Code Siswa" class="neo-btn bg-[#C4B5FD] text-black p-1.5 neo-border-sm"><i data-lucide="qr-code" class="w-4 h-4"></i></button>
                <button onclick="editStudentFromAttendance('${s.nis}')" title="Edit Siswa" class="neo-btn bg-[#FFD93D] text-black p-1.5 neo-border-sm"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
                <button onclick="deleteStudentFromAttendance('${s.nis}')" title="Hapus Siswa" class="neo-btn bg-[#FF6B6B] text-white p-1.5 neo-border-sm"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
              </div>
            </td>
          ` : ''}
        </tr>
      `;
    });
  }

  document.getElementById('count-hadir').textContent = cH;
  document.getElementById('count-izin').textContent = cI;
  document.getElementById('count-sakit').textContent = cS;
  document.getElementById('count-alpa').textContent = cA;
  lucide.createIcons();
}

function updateAttendanceState(nis, status) {
  const selectedDate = document.getElementById('attendance-date-picker').value;
  if(!attendanceRecords[selectedDate]) attendanceRecords[selectedDate] = {};
  attendanceRecords[selectedDate][nis] = status;
}

function saveAttendance() {
  saveState();
  alert("Data absensi berhasil disimpan ke database!");
  refreshUI();
}

function openAddStudentModal() { document.getElementById('student-modal').classList.remove('hidden'); }
function closeAddStudentModal() { document.getElementById('student-modal').classList.add('hidden'); }

function handleSaveStudentFromAbsensi(e) {
  e.preventDefault();
  const name = document.getElementById('modal-student-name').value.trim();
  const nis = document.getElementById('modal-student-nis').value.trim();
  const username = document.getElementById('modal-student-username').value.trim();
  const gender = document.getElementById('modal-student-gender').value;

  if (students.some(s => s.nis === nis)) {
    alert("NIS sudah terdaftar!");
    return;
  }

  students.push({ name, nis, username, gender, role: "siswa" });

  saveState();
  refreshUI();
  closeAddStudentModal();
  document.getElementById('student-form').reset();
  alert(`Siswa ${name} berhasil ditambahkan!`);
}

function editStudentFromAttendance(nis) {
  const s = students.find(item => item.nis === nis);
  if(!s) return;
  const newName = prompt("Edit Nama Lengkap Siswa:", s.name);
  if(newName !== null && newName.trim() !== "") {
    s.name = newName.trim();
    saveState();
    refreshUI();
  }
}

function deleteStudentFromAttendance(nis) {
  if(confirm("Hapus siswa ini dari kelas?")) {
    students = students.filter(item => item.nis !== nis);
    saveState();
    refreshUI();
  }
}

function filterScheduleDay(dayName) {
  currentSelectedDay = dayName;
  document.querySelectorAll('.schedule-day-btn').forEach(btn => {
    btn.classList.remove('bg-[#FF6B6B]', 'text-white');
    btn.classList.add('bg-white');
  });
  const activeBtn = document.getElementById(`day-tab-${dayName}`);
  if(activeBtn) {
    activeBtn.classList.remove('bg-white');
    activeBtn.classList.add('bg-[#FF6B6B]', 'text-white');
  }
  renderSchedule();
}

function renderSchedule() {
  const filtered = schedule.filter(s => s.day === currentSelectedDay);
  const container = document.getElementById('schedule-list-container');
  container.innerHTML = '';

  if(filtered.length === 0) {
    container.innerHTML = `<div class="p-8 text-center bg-white neo-border font-black uppercase">TIDAK ADA JADWAL PELAJARAN</div>`;
    return;
  }

  filtered.forEach(sub => {
    container.innerHTML += `
      <div class="bg-white neo-border p-5 neo-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 neo-card-lift">
        <div class="flex items-start gap-4">
          <div class="bg-[#FFD93D] neo-border p-3 text-center min-w-[100px]">
            <span class="block font-black text-xs uppercase text-black/70">Waktu</span>
            <span class="font-black text-sm">${sub.start} - ${sub.end}</span>
          </div>
          <div>
            <span class="bg-[#C4B5FD] text-black text-xs font-black px-2 py-0.5 neo-border-sm uppercase">${sub.room}</span>
            <h3 class="text-2xl font-black uppercase mt-1">${sub.subject}</h3>
            <p class="font-bold text-sm text-black/70">Pengajar: ${sub.teacher}</p>
          </div>
        </div>
        ${currentUser && currentUser.role === 'admin' ? `
          <button onclick="deleteSubject(${sub.id})" class="neo-btn bg-[#FF6B6B] text-white p-2.5 neo-border neo-shadow-sm self-end md:self-center">
            <i data-lucide="trash-2" class="w-5 h-5 stroke-[3]"></i>
          </button>
        ` : ''}
      </div>
    `;
  });
  lucide.createIcons();
}

function openAddSubjectModal() { document.getElementById('subject-modal').classList.remove('hidden'); }
function closeSubjectModal() { document.getElementById('subject-modal').classList.add('hidden'); }

function handleSaveSubject(e) {
  e.preventDefault();
  const newSub = {
    id: Date.now(),
    day: document.getElementById('subject-day').value,
    subject: document.getElementById('subject-name').value,
    start: document.getElementById('subject-start').value,
    end: document.getElementById('subject-end').value,
    teacher: document.getElementById('subject-teacher').value,
    room: document.getElementById('subject-room').value
  };
  schedule.push(newSub);
  saveState();
  filterScheduleDay(newSub.day);
  closeSubjectModal();
  refreshUI();
}

function deleteSubject(id) {
  if(confirm("Hapus jadwal ini?")) {
    schedule = schedule.filter(s => s.id !== id);
    saveState();
    refreshUI();
  }
}

function renderPiket() {
  const container = document.getElementById('piket-grid-container');
  container.innerHTML = '';
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  days.forEach(day => {
    const studentList = piket[day] || [];
    container.innerHTML += `
      <div class="bg-white neo-border p-5 neo-shadow space-y-4 relative">
        <div class="flex items-center justify-between border-b-4 border-black pb-2">
          <h3 class="text-2xl font-black uppercase">${day}</h3>
          <span class="bg-[#FFD93D] text-xs font-black px-2 py-0.5 neo-border-sm uppercase">${studentList.length} SISWA</span>
        </div>
        <ul class="space-y-2">
          ${studentList.length > 0 ? studentList.map(name => `<li class="p-2.5 bg-[#FFFDF5] neo-border-sm font-bold text-sm flex items-center justify-between"><span>${name}</span><i data-lucide="sparkle" class="w-4 h-4 text-amber-500"></i></li>`).join('') : '<p class="text-xs font-bold text-gray-500 italic py-2">Belum ada petugas.</p>'}
        </ul>
        ${currentUser && currentUser.role === 'admin' ? `
          <div class="flex items-center gap-2 pt-2 border-t-2 border-black">
            <button onclick="editPiketDay('${day}')" class="flex-1 neo-btn bg-[#C4B5FD] text-black font-black text-xs uppercase p-2 neo-border neo-shadow-sm flex items-center justify-center gap-1"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Edit</button>
            <button onclick="clearPiketDay('${day}')" class="neo-btn bg-[#FF6B6B] text-white p-2 neo-border neo-shadow-sm"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
          </div>
        ` : ''}
      </div>
    `;
  });
  lucide.createIcons();
}

function openAddPiketModal() { document.getElementById('piket-modal').classList.remove('hidden'); }
function closePiketModal() { document.getElementById('piket-modal').classList.add('hidden'); }

function handleSavePiket(e) {
  e.preventDefault();
  const day = document.getElementById('piket-day').value;
  const membersStr = document.getElementById('piket-members').value;
  piket[day] = membersStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
  saveState();
  refreshUI();
  closePiketModal();
}

function editPiketDay(day) {
  const currentList = piket[day] ? piket[day].join(', ') : '';
  const input = prompt(`Edit petugas piket hari ${day} (pisahkan dengan koma):`, currentList);
  if(input !== null) {
    piket[day] = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
    saveState();
    refreshUI();
  }
}

function clearPiketDay(day) {
  if(confirm(`Kosongkan piket hari ${day}?`)) {
    piket[day] = [];
    saveState();
    refreshUI();
  }
}

function renderTasks() {
  const filter = document.getElementById('task-filter-status').value;
  const container = document.getElementById('tasks-list-container');
  container.innerHTML = '';

  const currentNis = currentUser ? currentUser.nis : null;
  let filtered = tasks;
  if(filter === 'PENDING') {
    filtered = tasks.filter(t => !currentNis || !t.doneBy.includes(currentNis));
  } else if(filter === 'DONE') {
    filtered = tasks.filter(t => currentNis && t.doneBy.includes(currentNis));
  }

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => currentNis && t.doneBy.includes(currentNis)).length;
  const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  
  document.getElementById('task-progress-text').textContent = `${completedCount}/${totalTasks} Selesai`;
  document.getElementById('task-progress-bar').style.width = `${pct}%`;

  if(filtered.length === 0) {
    container.innerHTML = `<div class="p-8 text-center bg-white neo-border font-black uppercase">TIDAK ADA TUGAS</div>`;
    return;
  }

  filtered.forEach(task => {
    const isDone = currentNis ? task.doneBy.includes(currentNis) : false;
    const completedStudentsNames = task.doneBy.map(nis => {
      const st = students.find(s => s.nis === nis);
      return st ? st.name : nis;
    });

    container.innerHTML += `
      <div class="bg-white neo-border p-5 neo-shadow neo-card-lift flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDone ? 'opacity-90 bg-emerald-50/50' : ''}">
        <div class="space-y-2 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="bg-[#FF6B6B] text-white text-xs font-black px-2 py-0.5 neo-border-sm uppercase">${task.subject}</span>
            <span class="bg-[#FFD93D] text-black text-xs font-black px-2 py-0.5 neo-border-sm uppercase">DEADLINE: ${task.deadline}</span>
            ${isDone ? `<span class="bg-emerald-400 text-black text-xs font-black px-2 py-0.5 neo-border-sm uppercase">SELESAI ANDA KERJAKAN</span>` : ''}
          </div>
          <h3 class="text-2xl font-black uppercase">${task.title}</h3>
          <p class="font-bold text-sm text-black/80">${task.desc}</p>
          <div class="bg-[#FFFDF5] p-2 neo-border-sm text-xs font-bold">
            <span class="font-black">Log Siswa Beres (${task.doneBy.length}/${students.length}):</span> 
            ${completedStudentsNames.length > 0 ? completedStudentsNames.join(', ') : '<span class="text-gray-500 italic">Belum ada yang mengumpulkan</span>'}
          </div>
        </div>
        <div class="flex items-center gap-3">
          ${currentUser ? `
            <button onclick="toggleTaskStatus(${task.id})" class="neo-btn ${isDone ? 'bg-emerald-400 text-black' : 'bg-black text-white'} px-4 py-2.5 font-black text-xs uppercase neo-border neo-shadow-sm flex items-center gap-2">
              <i data-lucide="${isDone ? 'check-square' : 'square'}" class="w-4 h-4 stroke-[3]"></i>
              ${isDone ? 'BATALKAN' : 'TANDAI SELESAI'}
            </button>
          ` : `<span class="text-xs font-black text-red-500 uppercase">LOGIN SISWA UNTUK TANDAI</span>`}
          ${currentUser && currentUser.role === 'admin' ? `
            <button onclick="deleteTask(${task.id})" class="neo-btn bg-[#FF6B6B] text-white p-2.5 neo-border neo-shadow-sm">
              <i data-lucide="trash-2" class="w-4 h-4 stroke-[3]"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  });
  lucide.createIcons();
}

function toggleTaskStatus(taskId) {
  if(!currentUser || currentUser.role === 'admin') {
    alert("Silakan login sebagai siswa terlebih dahulu untuk menandai tugas selesai!");
    openLoginModal();
    return;
  }
  const task = tasks.find(t => t.id === taskId);
  if(task) {
    const nis = currentUser.nis;
    if(task.doneBy.includes(nis)) {
      task.doneBy = task.doneBy.filter(id => id !== nis);
    } else {
      task.doneBy.push(nis);
    }
    saveState();
    refreshUI();
  }
}

function openAddTaskModal() { document.getElementById('task-modal').classList.remove('hidden'); }
function closeAddTaskModal() { document.getElementById('task-modal').classList.add('hidden'); }

function handleSaveTask(e) {
  e.preventDefault();
  tasks.push({
    id: Date.now(),
    subject: document.getElementById('task-subject').value,
    title: document.getElementById('task-title').value,
    deadline: document.getElementById('task-deadline').value,
    desc: document.getElementById('task-desc').value,
    doneBy: []
  });
  saveState();
  refreshUI();
  closeAddTaskModal();
}

function deleteTask(id) {
  if(confirm("Hapus tugas ini?")) {
    tasks = tasks.filter(t => t.id !== id);
    saveState();
    refreshUI();
  }
}

function renderAdminPanel() {
  const tbody = document.getElementById('admin-student-accounts-body');
  if(!tbody) return;
  tbody.innerHTML = '';
  
  if(students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center font-bold">Belum ada akun siswa.</td></tr>`;
  } else {
    students.forEach(s => {
      tbody.innerHTML += `
        <tr class="hover:bg-[#FFFDF5]">
          <td class="p-2 border-r-2 border-black">${s.nis}</td>
          <td class="p-2 border-r-2 border-black">${s.name}</td>
          <td class="p-2 border-r-2 border-black">${s.username}</td>
          <td class="p-2 border-r-2 border-black uppercase">${s.role}</td>
          <td class="p-2 text-center">
            <div class="flex items-center justify-center gap-1">
              <button onclick="openStudentQRModal('${s.nis}')" title="Lihat & Cetak QR Code Siswa" class="neo-btn bg-[#C4B5FD] text-black p-1 neo-border-sm"><i data-lucide="qr-code" class="w-3.5 h-3.5"></i></button>
              <button onclick="deleteStudent('${s.nis}')" title="Hapus Siswa" class="neo-btn bg-[#FF6B6B] text-white p-1 neo-border-sm"><i data-lucide="trash" class="w-3.5 h-3.5"></i></button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  const attLogsContainer = document.getElementById('admin-attendance-logs-container');
  attLogsContainer.innerHTML = '';
  const dates = Object.keys(attendanceRecords).sort().reverse();

  if(dates.length === 0) {
    attLogsContainer.innerHTML = `<p class="font-bold text-xs uppercase text-gray-500">Belum ada log absensi tersimpan.</p>`;
  } else {
    dates.forEach(date => {
      const dayRec = attendanceRecords[date];
      const dateObj = new Date(date);
      const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      let hadirCount = 0, izinCount = 0, sakitCount = 0, alpaCount = 0;
      let detailHtml = '';

      students.forEach(s => {
        const status = dayRec[s.nis] || '';
        if(status === 'H') hadirCount++;
        else if(status === 'I') izinCount++;
        else if(status === 'S') sakitCount++;
        else if(status === 'A') alpaCount++;

        if(status !== '') {
          detailHtml += `<span class="inline-block px-2 py-0.5 m-0.5 neo-border-sm text-xs font-bold ${status === 'H' ? 'bg-emerald-200' : status === 'I' ? 'bg-yellow-200' : status === 'S' ? 'bg-purple-200' : 'bg-red-200'}">${s.name}: ${status}</span>`;
        }
      });

      attLogsContainer.innerHTML += `
        <div class="bg-[#FFFDF5] neo-border p-4 space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2">
            <div>
              <span class="bg-[#FFD93D] px-2 py-0.5 font-black text-xs uppercase neo-border-sm">${dayName}</span>
              <span class="text-xs font-bold ml-2">Tanggal: ${date}</span>
            </div>
            <div class="text-xs font-black uppercase space-x-2">
              <span class="text-emerald-700">H: ${hadirCount}</span>
              <span class="text-yellow-700">I: ${izinCount}</span>
              <span class="text-purple-700">S: ${sakitCount}</span>
              <span class="text-red-700">A: ${alpaCount}</span>
            </div>
          </div>
          <div class="pt-1 flex flex-wrap gap-1">${detailHtml || '<span class="text-xs italic text-gray-500">Belum ada data diabsen di tanggal ini.</span>'}</div>
        </div>
      `;
    });
  }

  const taskLogsContainer = document.getElementById('admin-task-logs-container');
  taskLogsContainer.innerHTML = '';
  tasks.forEach(t => {
    const doneStudents = t.doneBy.map(nis => {
      const s = students.find(item => item.nis === nis);
      return s ? s.name : nis;
    });

    taskLogsContainer.innerHTML += `
      <div class="bg-[#FFFDF5] neo-border p-4 space-y-2">
        <div class="flex items-center justify-between border-b-2 border-black pb-2">
          <h4 class="font-black uppercase text-sm">${t.subject} - ${t.title}</h4>
          <span class="bg-[#C4B5FD] text-black text-xs font-black px-2 py-0.5 neo-border-sm">Selesai: ${doneStudents.length}/${students.length} Siswa</span>
        </div>
        <p class="text-xs font-bold text-black/70">Deadline: ${t.deadline}</p>
        <div class="pt-1 flex flex-wrap gap-1">
          ${doneStudents.length > 0 ? doneStudents.map(n => `<span class="bg-emerald-300 text-black px-2 py-0.5 font-bold text-xs neo-border-sm uppercase">${n}</span>`).join('') : '<span class="text-xs font-bold italic text-gray-500">Belum ada siswa yang menyelesaikan tugas ini.</span>'}
        </div>
      </div>
    `;
  });

  lucide.createIcons();
}

function handleCreateStudent(e) {
  e.preventDefault();
  const name = document.getElementById('new-student-name').value.trim();
  const nis = document.getElementById('new-student-nis').value.trim();
  const username = document.getElementById('new-student-username').value.trim();
  const gender = document.getElementById('new-student-gender').value;

  if (students.some(s => s.nis === nis)) {
    alert("NIS sudah terdaftar!");
    return;
  }

  students.push({ name, nis, username, gender, role: "siswa" });

  saveState();
  refreshUI();
  document.getElementById('add-student-form').reset();
  alert(`Akun siswa ${name} berhasil ditambahkan!`);
}

function deleteStudent(nis) {
  if(confirm("Hapus akun siswa ini?")) {
    students = students.filter(s => s.nis !== nis);
    saveState();
    refreshUI();
  }
}