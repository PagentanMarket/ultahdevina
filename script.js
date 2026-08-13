// ==========================================
// ⚙️ KONFIGURASI WEBSITE
// ==========================================
const CONFIG = {
    nama: "Devina Kumaladewi", // Ganti dengan nama target
    tanggalUlangTahun: "September 2, 2026 00:00:00", 
    durasiGame: 60,
    pesanSurat: [
        "Hari ini bukan hanya tentang bertambahnya usia...",
        "Tetapi tentang semua perjalanan yang sudah kamu lewati.",
        "Semoga semua impianmu satu per satu menjadi kenyataan.",
        "Dan semoga kamu selalu menemukan alasan untuk tersenyum.",
        "Selamat ulang tahun ❤️"
    ],
    pesanFinal: [
        "✨ Bahagia selalu",
        "✨ Sehat selalu",
        "✨ Semua impian tercapai",
        "✨ Selalu dikelilingi orang-orang baik"
    ],
    galeri: [
        { src: "assets/images/foto1.jpeg", caption: "Date Pertama Banjar" },
        { src: "assets/images/foto2.jpeg", caption: "Edisi Hanbis Wisuda" },
        { src: "assets/images/foto3.jpeg", caption: "Ultah 22th Kamu" },        
        { src: "assets/images/foto4.jpeg", caption: "Kondangan Pertama" },
        { src: "assets/images/foto5.jpeg", caption: "Libur Lebaran Jogja" },
        { src: "assets/images/foto6.jpeg", caption: "Muka Kucel Habis Masak" },
        { src: "assets/images/foto7.jpeg", caption: "Naykilla gwehh centilz" },
        { src: "assets/images/foto8.jpeg", caption: "hotttzz babyy" },        
        { src: "assets/images/foto9.jpeg", caption: "bondoll eraa" }  
    ]
};

// ==========================================
// 🎵 MUSIC CONTROLLER (SMART AUTOPLAY)
// ==========================================
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

function initMusic() {
    if(!music) return;
    
    // Ambil status dari memori browser
    const isPlaying = localStorage.getItem('music_playing') === 'true';
    const isInitialized = localStorage.getItem('music_initialized') === 'true';
    const currentTime = localStorage.getItem('music_time') || 0;
    
    music.currentTime = parseFloat(currentTime);
    
    // Fungsi untuk menyalakan musik PERTAMA KALI lewat interaksi bebas
    const firstTimePlay = () => {
        if (music.paused) {
            music.play().then(() => {
                if(musicBtn) musicBtn.innerText = "🎵 Music Playing";
                localStorage.setItem('music_playing', 'true');
                localStorage.setItem('music_initialized', 'true'); // Tandai bahwa trik ini sudah dipakai
                
                // Hapus event listener agar klik/geser selanjutnya tidak memicu play lagi
                ['click', 'scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => {
                    document.removeEventListener(evt, firstTimePlay);
                });
            }).catch((err) => {
                console.log("Menunggu interaksi pengguna untuk play musik...");
            });
        }
    };

    // Jika web baru pertama kali dibuka (belum diinisialisasi)
    if (!isInitialized) {
        firstTimePlay(); // Coba play langsung (berhasil jika browser sangat longgar)
        
        // Pasang jebakan interaksi (sekali pakai)
        ['click', 'scroll', 'mousemove', 'touchstart', 'keydown'].forEach(evt => {
            document.addEventListener(evt, firstTimePlay, { once: true });
        });
    } else {
        // Jika statusnya pindah halaman dan musik sebelumnya nyala, lanjutkan saja
        if (isPlaying) {
            music.play().then(() => {
                if(musicBtn) musicBtn.innerText = "🎵 Music Playing";
            }).catch(() => {
                // Jika browser memblokir play saat pindah halaman
                localStorage.setItem('music_playing', 'false');
                if(musicBtn) musicBtn.innerText = "🎵 PLAY MUSIC";
            });
        }
    }

    // Tombol kontrol play/pause manual (Wajib lewat sini setelah inisialisasi)
    if(musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah bentrok dengan klik sembarang tempat
            if (music.paused) {
                music.play();
                musicBtn.innerText = "🎵 Music Playing";
                localStorage.setItem('music_playing', 'true');
                localStorage.setItem('music_initialized', 'true'); // Pastikan tertandai
            } else {
                music.pause();
                musicBtn.innerText = "🎵 PLAY MUSIC";
                localStorage.setItem('music_playing', 'false');
            }
        });
    }

    // Simpan detik terakhir lagu agar nyambung saat pindah halaman
    setInterval(() => {
        if(!music.paused) {
            localStorage.setItem('music_time', music.currentTime);
        }
    }, 1000);
}

// ==========================================
// 🌟 EFEK CONFETTI UNICORN
// ==========================================
function spawnUnicornConfetti() {
    for (let i = 0; i < 30; i++) {
        let unicorn = document.createElement('img');
        unicorn.className = 'confetti-unicorn';
        unicorn.src = 'assets/photo/uni.png.png'; 
        unicorn.style.position = 'fixed';
        unicorn.style.left = Math.random() * 100 + 'vw';
        unicorn.style.top = -10 + 'vh'; 
        let randomSize = Math.random() * 30 + 40; 
        unicorn.style.width = randomSize + 'px'; 
        unicorn.style.animationDuration = Math.random() * 4 + 3 + 's'; 
        
        document.body.appendChild(unicorn);
        setTimeout(() => unicorn.remove(), 7000); 
    }
}

// ==========================================
// 🔓 FITUR UNLOCK MENU SPESIAL
// ==========================================
function checkAndShowMenu() {
    // Jika status perjalanan sudah tamat (tersimpan di browser)
    if (localStorage.getItem('journey_completed') === 'true') {
        const menu = document.createElement('div');
        menu.id = 'special-nav-menu';
        menu.innerHTML = `
            <div class="nav-menu-btn" id="nav-menu-btn">🌟 Pilih Halaman</div>
            <div class="nav-menu-list hidden" id="nav-menu-list">
                <button onclick="window.location.href='index.html'">⏳ Awal (Countdown)</button>
                <button onclick="window.location.href='selamat.html'">🎉 Kejutan</button>
                <button onclick="window.location.href='gallery.html'">📸 Galeri</button>
                <button onclick="window.location.href='video.html'">🎬 Video</button>
                <button onclick="window.location.href='surat.html'">💌 Surat</button>
                <button onclick="window.location.href='game.html'">🎮 Mini Game</button>
                <button onclick="window.location.href='final.html'">🏆 Hasil Akhir</button>
            </div>
        `;
        document.body.appendChild(menu);

        document.getElementById('nav-menu-btn').addEventListener('click', () => {
            document.getElementById('nav-menu-list').classList.toggle('hidden');
        });
    }
}

// ==========================================
// 📄 LOGIKA HALAMAN COUNTDOWN (index.html)
// ==========================================
if (document.body.getAttribute('data-page') === 'countdown') {
    const targetDate = new Date(CONFIG.tanggalUlangTahun).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0 || isNaN(distance)) {
            window.location.href = 'selamat.html'; 
            return true; 
        }

        document.getElementById('cd-days').innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById('cd-hours').innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById('cd-mins').innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById('cd-secs').innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
        
        return false; 
    }

    const isFinished = updateCountdown();
    if (!isFinished) {
        const timerInterval = setInterval(() => {
            if (updateCountdown()) clearInterval(timerInterval);
        }, 1000);
    }
}

// ==========================================
// 🎉 LOGIKA HALAMAN SELAMAT
// ==========================================
if (document.body.getAttribute('data-page') === 'selamat') {
    document.querySelectorAll('[id^="display-name"]').forEach(el => el.innerText = CONFIG.nama);
    spawnUnicornConfetti();
    
    document.getElementById('btn-to-gallery').addEventListener('click', () => {
        window.location.href = 'gallery.html';
    });
}

// ==========================================
// 📸 LOGIKA HALAMAN GALLERY
// ==========================================
if (document.body.getAttribute('data-page') === 'gallery') {
    const polaroids = document.querySelectorAll('.polaroid');
    const btnToVideo = document.getElementById('btn-to-video');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-caption');
    
    let viewed = [false, false, false];

    polaroids.forEach((card, i) => {
        card.addEventListener('click', () => {
            const imgData = CONFIG.galeri[i] || {src:"", caption:"Foto"};
            if(imgData.src) {
                lightboxImg.src = imgData.src;
            }
            lightboxCap.innerText = imgData.caption;
            lightbox.classList.remove('hidden');
            
            viewed[i] = true;
            card.querySelector('.status').innerText = ' ✓';
            card.style.background = "#ffe4e1";

            if (viewed.every(v => v === true)) {
                btnToVideo.disabled = false;
                btnToVideo.innerText = "LANJUT KE VIDEO →";
            }
        });
    });

    document.querySelector('.close-lightbox').addEventListener('click', () => lightbox.classList.add('hidden'));

    btnToVideo.addEventListener('click', () => window.location.href = 'video.html');
}

// ==========================================
// 🎬 LOGIKA HALAMAN VIDEO
// ==========================================
if (document.body.getAttribute('data-page') === 'video') {
    const video = document.getElementById('birthday-video');
    const btnToNext = document.getElementById('btn-to-next');
    const statusText = document.getElementById('video-status');

    video.addEventListener('play', () => {
        if(music && !music.paused) {
            music.pause();
            localStorage.setItem('music_playing', 'false');
            if(musicBtn) musicBtn.innerText = "🎵 PLAY MUSIC";
        }
    });

    video.addEventListener('ended', () => {
        statusText.innerText = "❤️ Video selesai ditonton";
        btnToNext.disabled = false;
        btnToNext.innerText = "LANJUT KE SURAT";
    });

    btnToNext.addEventListener('click', () => window.location.href = 'surat.html');
}

// ==========================================
// 💌 LOGIKA HALAMAN SURAT
// ==========================================
if (document.body.getAttribute('data-page') === 'surat') {
    document.querySelectorAll('[id^="display-name"]').forEach(el => el.innerText = CONFIG.nama);
    const letterDiv = document.getElementById('letter-content');
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeWriter() {
        if (lineIndex < CONFIG.pesanSurat.length) {
            if (charIndex === 0) letterDiv.innerHTML += `<p id="line-${lineIndex}"></p>`;
            
            if (charIndex < CONFIG.pesanSurat[lineIndex].length) {
                document.getElementById(`line-${lineIndex}`).innerHTML += CONFIG.pesanSurat[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 500);
            }
        } else {
            const btn = document.getElementById('btn-to-game');
            btn.classList.remove('hidden');
            btn.addEventListener('click', () => window.location.href = 'game.html');
        }
    }
    setTimeout(typeWriter, 1000);
}

// ==========================================
// 🎮 LOGIKA HALAMAN GAME
// ==========================================
if (document.body.getAttribute('data-page') === 'game') {
    let score = 0, timeLeft = CONFIG.durasiGame, isPlaying = false;
    let gameInterval, spawnInterval;

    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('game-score');
    const timeDisplay = document.getElementById('game-time');
    
    document.getElementById('btn-start-game').addEventListener('click', () => {
        document.getElementById('game-start-overlay').classList.add('hidden');
        isPlaying = true; score = 0; timeLeft = CONFIG.durasiGame;
        scoreDisplay.innerText = score; timeDisplay.innerText = timeLeft;

        gameInterval = setInterval(() => {
            timeLeft--; timeDisplay.innerText = timeLeft;
            if (timeLeft <= 0) endGame();
        }, 1000);

        let speed = 800; 
        function spawnLoop() {
            if(!isPlaying) return;
            
            // === BAGIAN YANG DIUBAH ===
            const target = document.createElement('img'); // Ubah dari 'div' menjadi 'img'
            target.className = 'game-heart-target';
            
            // Masukkan nama file PNG kamu di sini (pastikan file ada di folder yang sama atau beri path yang benar)
            target.src = 'assets/photo/una.png.png'; 
            
            // Atur ukuran gambar (opsional, bisa juga diatur via CSS .game-heart-target)
            target.style.width = '80px';  
            target.style.height = '80px';
            target.style.position = 'absolute';
            target.style.cursor = 'pointer';
            
            // Sesuaikan pengurangan lebar/tinggi dengan ukuran gambar (misal 50px)
            target.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
            target.style.top = Math.random() * (gameArea.clientHeight - 50) + 'px';
            // ===========================
            
            target.addEventListener('click', () => {
                score++; scoreDisplay.innerText = score; target.remove();
            });
            
            gameArea.appendChild(target);
            setTimeout(() => { if(target.parentElement) target.remove(); }, 1200);

            speed = Math.max(300, speed - 10); 
            spawnInterval = setTimeout(spawnLoop, speed);
        }
        spawnLoop();
    });

    function endGame() {
        isPlaying = false; clearInterval(gameInterval); clearTimeout(spawnInterval);
        document.querySelectorAll('.game-heart-target').forEach(h => h.remove());
        localStorage.setItem('game_score', score);
        
        // Mengubah teks hasil akhir karena ikon love sudah tidak dipakai
        document.getElementById('final-game-score').innerText = score + " Poin"; 
        
        document.getElementById('game-over-overlay').classList.remove('hidden');
    }

    document.getElementById('btn-to-final').addEventListener('click', () => window.location.href = 'final.html');
}

// ==========================================
// 🏆 LOGIKA HALAMAN FINAL
// ==========================================
if (document.body.getAttribute('data-page') === 'final') {
    document.querySelectorAll('[id^="display-name"]').forEach(el => el.innerText = CONFIG.nama);
    const score = localStorage.getItem('game_score') || 0;
    document.getElementById('final-score').innerText = score;
    
    const finalDiv = document.getElementById('final-messages');
    finalDiv.innerHTML = ''; 
    CONFIG.pesanFinal.forEach(msg => {
        finalDiv.innerHTML += `<p>${msg}</p>`;
    });
    
    // Buka kunci fitur menu spesial karena sudah sampai akhir!
    localStorage.setItem('journey_completed', 'true');

    // Tombol ulangi langsung di halaman final
    document.getElementById('btn-restart').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    spawnUnicornConfetti();
    setInterval(spawnUnicornConfetti, 4000);
}

// Eksekusi musik & cek menu spesial tiap halaman dimuat
window.onload = () => {
    initMusic();
    checkAndShowMenu(); 
};