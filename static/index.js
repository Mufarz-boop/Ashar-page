        // ============================================
        // COUNTDOWN FUNCTIONALITY - PALING AWAL
        // ============================================
        
        let countdownInterval;
        let isUnlocked = false;

        function createCountdownStars() {
            const starsContainer = document.getElementById('countdown-stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'countdown-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        function updateCountdown() {
            // Target: 27 April 2026, 02:15:00
            const targetDate = new Date('2026-04-27T02:15:00').getTime();
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(countdownInterval);
                showUnlockScreen();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
            document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
        }

        function showUnlockScreen() {
            document.getElementById('countdown-boxes').style.display = 'none';
            document.querySelector('.countdown-date').style.display = 'none';
            document.querySelector('.countdown-subtitle').style.display = 'none';
            document.getElementById('countdown-complete').style.display = 'block';
            
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFB6C1', '#E6E6FA', '#98FF98', '#FFDAB9', '#FF6B9D', '#FFF']
            });
        }

        function unlockWebsite() {
            if (isUnlocked) return;
            isUnlocked = true;
            
            const countdownScreen = document.getElementById('countdown-screen');
            const introScreen = document.getElementById('intro-screen');
            
            countdownScreen.style.transition = 'opacity 0.8s ease';
            countdownScreen.style.opacity = '0';
            
            setTimeout(() => {
                countdownScreen.style.display = 'none';
                introScreen.style.display = 'flex';
                
                createStars();
                createBalloons();
                startLoading();
            }, 800);
        }

        // ============================================
        // CLOCK FUNCTIONALITY
        // ============================================
        
        function updateClock() {
            const now = new Date();
            
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
            
            const dayName = days[now.getDay()];
            const date = now.getDate();
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            document.getElementById('sidebar-day').textContent = dayName;
            document.getElementById('sidebar-date').textContent = `${date} ${month} ${year}`;
            document.getElementById('sidebar-hours').textContent = hours;
            document.getElementById('sidebar-minutes').textContent = minutes;
            document.getElementById('sidebar-seconds').textContent = `:${seconds}`;
        }

        setInterval(updateClock, 1000);
        updateClock();

        // ============================================
        // SIDEBAR NAVIGATION
        // ============================================

        let currentPage = 'home';
        let sidebarOpen = false;

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay-mobile');
            const toggleBtn = document.getElementById('menu-toggle');
            const icon = document.getElementById('toggle-icon');
            
            sidebarOpen = !sidebarOpen;
            
            if (sidebarOpen) {
                sidebar.classList.add('open');
                overlay.classList.add('show');
                toggleBtn.classList.add('sidebar-open');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
                toggleBtn.classList.remove('sidebar-open');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        function navigateTo(page) {
            document.querySelectorAll('.page').forEach(p => {
                p.classList.remove('active');
            });
            
            document.getElementById(`page-${page}`).classList.add('active');
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.page === page) {
                    item.classList.add('active');
                }
            });
            
            currentPage = page;
            
            if (window.innerWidth <= 768 && sidebarOpen) {
                toggleSidebar();
            }
            
            if (page === 'home') {
                setTimeout(() => shootConfetti(), 300);
            }
        }

        // ============================================
        // INTRO ANIMATION
        // ============================================

        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        function createBalloons() {
            const balloonsContainer = document.getElementById('balloons');
            const balloonEmojis = ['🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍', '🤍'];
            
            for (let i = 0; i < 10; i++) {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.innerHTML = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
                balloon.style.left = Math.random() * 100 + '%';
                balloon.style.animationDelay = Math.random() * 8 + 's';
                balloon.style.animationDuration = (Math.random() * 4 + 6) + 's';
                balloonsContainer.appendChild(balloon);
            }
        }

        function startLoading() {
            let progress = 0;
            const progressBar = document.getElementById('progress-bar');
            const percentage = document.getElementById('percentage');
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        showIntro();
                    }, 500);
                }
                
                progressBar.style.width = progress + '%';
                percentage.textContent = Math.floor(progress) + '%';
            }, 200);
        }

        function typeWriter(text, element, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        function showIntro() {
            document.getElementById('loading-container').style.display = 'none';
            document.getElementById('intro-content').style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('intro-title').classList.add('show');
            }, 100);
            
            setTimeout(() => {
                const texts = [
                    "Hai Rinrin! 👋",
                    "Aku mau nunjukin sesuatu ke kamu...",
                    "Sebenarnya ini udah aku siapin dari lama.",
                    "Mungkin sederhana sih...",
                    "Tapi aku harap kamu suka.",
                    "Mau lihat? klik tombol di bawah kalo berani."
                ];
                let currentText = 0;
                
                function showNextText() {
                    if (currentText < texts.length) {
                        typeWriter(texts[currentText], document.getElementById('type-text'), 50);
                        currentText++;
                        setTimeout(showNextText, 2500);
                    } else {
                        setTimeout(() => {
                            document.getElementById('enter-btn').classList.add('show');
                        }, 500);
                    }
                }
                
                showNextText();
            }, 800);
        }

        function enterSite() {
            const overlay = document.getElementById('transition-overlay');
            const introScreen = document.getElementById('intro-screen');
            const app = document.getElementById('app');
            
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFB6C1', '#E6E6FA', '#98FF98', '#FFDAB9', '#FF6B9D', '#FFF']
            });
            
            overlay.classList.add('active');
            
            setTimeout(() => {
                introScreen.style.display = 'none';
                app.style.display = 'flex';
                app.classList.add('visible');
                overlay.style.transformOrigin = 'top';
                overlay.style.transform = 'scaleY(0)';
                
                initApp();
            }, 800);
        }

        // ============================================
        // APP INITIALIZATION
        // ============================================

        let currentAudio = null;
        let isPlaying = false;
        let currentSongIndex = 0;
        let giftOpened = false;

        // BOOK FRAGMENTS DATA
        const BOOKS = [
            {
                title: 'Her Smile',
                icon: '🌸',
                color: 'color-1',
                photos: [
                    { src: 'static/images/folder1/rinrin 1.jpeg', caption: 'That day' },
                    { src: 'static/images/folder1/rinrin 2.jpeg', caption: 'Beautiful' },
                    { src: 'static/images/folder1/rinrin 3.jpeg', caption: 'Moment' },
                    { src: 'static/images/folder1/rinrin 4.jpeg', caption: 'Captured' },
                    { src: 'static/images/folder1/rinrin 5.jpeg', caption: 'Forever' },
                    { src: 'static/images/folder1/rinrin 6.jpeg', caption: 'In heart' }
                ]
            },
            {
                title: 'Dreams',
                icon: '✨',
                color: 'color-2',
                photos: [
                    { src: 'static/images/folder2/dream 1.jpeg', caption: 'Ambition' },
                    { src: 'static/images/folder2/dream 2.jpeg', caption: 'Future' },
                    { src: 'static/images/folder2/dream 3.jpeg', caption: 'Together' },
                    { src: 'static/images/folder2/dream 4.jpeg', caption: 'Maybe' }
                ]
            },
            {
                title: 'Far Away',
                icon: '🌍',
                color: 'color-3',
                photos: [
                    { src: 'static/images/folder3/russia 1.jpeg', caption: 'Someday' },
                    { src: 'static/images/folder3/russia 2.jpeg', caption: 'We will' },
                    { src: 'static/images/folder3/swiss 1.jpeg', caption: 'Be there' }
                ]
            },
            {
                title: 'Letters',
                icon: '💌',
                color: 'color-4',
                photos: [
                    { src: 'static/images/letters/letter1.jpg', caption: 'Unsent' },
                    { src: 'static/images/letters/letter2.jpg', caption: 'Words' }
                ]
            },
            {
                title: 'Random',
                icon: '🎲',
                color: 'color-5',
                photos: [
                    { src: 'static/images/random/pic1.jpg', caption: 'Us' },
                    { src: 'static/images/random/pic2.jpg', caption: 'Chaos' }
                ]
            },
            {
                title: 'Secrets',
                icon: '🔒',
                color: 'color-6',
                photos: [
                    { src: 'static/images/secret/hidden1.jpg', caption: 'Shh..' }
                ]
            }
        ];

        const STATIC_SONGS = [
            { path: 'static/audio/An Art Gallery Could Never Be As Unique As You.mp3', title: 'An Art Gallery Could Never Be As Unique As You', artist: '' },
            { path: 'static/audio/Ill Never Love Again from A Star Is Born Official Music Video.mp3', title: 'Ill Never Love Again from A Star Is Born', artist: '' },
            { path: 'static/audio/Kesayanganku.mp3', title: 'Kesayanganku', artist: '' },
            { path: 'static/audio/Surat Cinta Untuk Starla.mp3' , title: 'Surat Cinta Untuk Starla', artist: ''},
            { path: 'static/audio/Youll Be in My Heart.mp3', title: 'Youll be in My Heart', artist: ''}
        ];

        function initApp() {
            renderBooks();
            renderSongs();
            setTimeout(() => shootConfetti(), 500);
        }

        // ============================================
        // BOOK FRAGMENTS FUNCTIONS
        // ============================================

        function renderBooks() {
            const shelf = document.getElementById('bookShelf');
            shelf.innerHTML = '';
            
            const rows = [BOOKS.slice(0, 3), BOOKS.slice(3, 6)];
            
            rows.forEach((rowBooks) => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'shelf-row';
                
                rowBooks.forEach((book) => {
                    const spine = document.createElement('div');
                    spine.className = `book-spine ${book.color}`;
                    spine.onclick = () => openBook(book);
                    
                    spine.innerHTML = `
                        <div class="book-spine-icon">${book.icon}</div>
                        <div class="book-spine-title">${book.title}</div>
                    `;
                    
                    rowDiv.appendChild(spine);
                });
                
                shelf.appendChild(rowDiv);
            });
        }

        function openBook(book) {
            const bookOpen = document.getElementById('bookOpen');
            const shelf = document.getElementById('bookShelf');
            
            shelf.style.display = 'none';
            bookOpen.classList.add('show');
            
            document.getElementById('bookTitleLeft').textContent = book.title;
            document.getElementById('bookTitleRight').textContent = 'Pages of Us';
            
            const mid = Math.ceil(book.photos.length / 2);
            const leftPhotos = book.photos.slice(0, mid);
            const rightPhotos = book.photos.slice(mid);
            
            renderBookPage('bookGridLeft', leftPhotos);
            renderBookPage('bookGridRight', rightPhotos);
            
            showToast(`Opening: ${book.title} ${book.icon}`);
            
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.5 },
                colors: ['#8B4513', '#D4A574', '#FFF8DC']
            });
        }

        function renderBookPage(gridId, photos) {
            const grid = document.getElementById(gridId);
            grid.innerHTML = '';
            
            photos.forEach(photo => {
                const div = document.createElement('div');
                div.className = 'book-photo';
                
                const img = new Image();
                img.onload = () => {
                    div.innerHTML = `<img src="${photo.src}" alt="${photo.caption}">`;
                };
                img.onerror = () => {
                    div.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#8B4513;">📷</div>`;
                };
                img.src = photo.src;
                
                div.onclick = () => openLightbox(photo.src, photo.caption);
                grid.appendChild(div);
            });
        }

        function closeBook() {
            const bookOpen = document.getElementById('bookOpen');
            const shelf = document.getElementById('bookShelf');
            
            bookOpen.classList.remove('show');
            shelf.style.display = 'block';
            
            setTimeout(() => {
                shelf.style.animation = 'none';
                shelf.offsetHeight;
                shelf.style.animation = 'fadeIn 0.5s ease';
            }, 100);
        }

        // ============================================
        // LIGHTBOX FUNCTIONS
        // ============================================

        function openLightbox(src, caption) {
            document.getElementById('lightboxImg').src = src;
            document.getElementById('lightbox').classList.add('show');
        }

        function closeLightbox(e) {
            if (!e || e.target.id === 'lightbox' || e.target.closest('.lightbox-close')) {
                document.getElementById('lightbox').classList.remove('show');
            }
        }

        // ============================================
        // MUSIC FUNCTIONS
        // ============================================

        function renderSongs() {
            const songList = document.getElementById('songList');
            songList.innerHTML = '';
            
            STATIC_SONGS.forEach((song, index) => {
                const item = document.createElement('div');
                item.className = 'song-item';
                item.onclick = () => selectSong(index);
                item.innerHTML = `
                    <i class="fas fa-music"></i>
                    <div class="song-info">
                        <span class="song-name">${song.title}</span>
                        <span class="song-artist">${song.artist}</span>
                    </div>
                `;
                songList.appendChild(item);
            });
        }

        function selectSong(index) {
            currentSongIndex = index;
            
            document.querySelectorAll('.song-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });

            if(currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }

            const song = STATIC_SONGS[index];
            currentAudio = new Audio(song.path);
            currentAudio.loop = false;
            
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i> Play';
            isPlaying = false;
            
            currentAudio.ontimeupdate = function() {
                if(currentAudio.duration) {
                    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
                    document.getElementById('progress').style.width = progress + '%';
                }
            };
            
            currentAudio.onended = function() {
                isPlaying = false;
                document.getElementById('vinyl').classList.remove('playing');
                document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i> Play';
                document.getElementById('progress').style.width = '0%';
            };

            showToast(`${song.title}`);
        }

        function togglePlay() {
            if(!currentAudio) {
                selectSong(0);
                return;
            }

            if(isPlaying) {
                currentAudio.pause();
                document.getElementById('vinyl').classList.remove('playing');
                document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i> Play';
                isPlaying = false;
            } else {
                currentAudio.play().catch(e => {
                    showToast('File not found 🎵');
                });
                document.getElementById('vinyl').classList.add('playing');
                document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';
                isPlaying = true;
            }
        }

        function seek(e) {
            if(currentAudio && currentAudio.duration) {
                const rect = e.target.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                currentAudio.currentTime = pos * currentAudio.duration;
            }
        }

        // ============================================
        // UTILITY FUNCTIONS
        // ============================================

        function shootConfetti() {
            const colors = ['#FFB6C1', '#E6E6FA', '#98FF98', '#FFDAB9', '#FF6B9D'];
            
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: colors
            });

            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'heart';
                    heart.innerHTML = '🤍';
                    heart.style.left = Math.random() * 100 + 'vw';
                    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
                    document.body.appendChild(heart);
                    setTimeout(() => heart.remove(), 6000);
                }, i * 300);
            }
        }

        function toggleLetter(envelope) {
            if(!envelope.classList.contains('open')) {
                envelope.classList.add('open');
                setTimeout(() => shootConfetti(), 300);
            }
        }

        function openGift(box) {
            if(!box.classList.contains('opened') && !giftOpened) {
                box.classList.add('opened');
                giftOpened = true;
                
                const end = Date.now() + 3000;
                const frame = () => {
                    confetti({
                        particleCount: 8,
                        spread: 120,
                        origin: { y: 0.6 },
                        colors: ['#FFB6C1', '#E6E6FA', '#98FF98', '#FFDAB9', '#FF6B9D', '#FFF']
                    });
                    
                    if(Date.now() < end) requestAnimationFrame(frame);
                };
                frame();

                setTimeout(() => {
                    document.getElementById('surprise').classList.add('show');
                    box.style.display = 'none';
                }, 600);
                
                showToast('Opened! 🎁');
            }
        }

        function resetGift() {
            const box = document.getElementById('main-gift-box');
            const surprise = document.getElementById('surprise');
            
            surprise.classList.remove('show');
            box.style.display = 'flex';
            box.classList.remove('opened');
            giftOpened = false;
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // ============================================
        // PASSWORD FUNCTIONALITY
        // ============================================
        
        const CORRECT_PASSWORD = "You are mine until the end";
        const BYPASS_PASSWORD = "My Adorable Girl";
        
        let passwordVerified = false;

        function createPasswordStars() {
            const starsContainer = document.getElementById('password-stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'password-star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        function togglePasswordVisibility() {
            const input = document.getElementById('password-input');
            const icon = document.getElementById('toggle-icon-pass');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        function checkPassword() {
            const input = document.getElementById('password-input');
            const error = document.getElementById('password-error');
            const btn = document.getElementById('password-btn');
            const password = input.value.trim();

            if (password === CORRECT_PASSWORD) {
                passwordVerified = true;
                btn.innerHTML = '<i class="fas fa-check"></i> Success!';
                btn.style.background = 'linear-gradient(135deg, #98FF98, #90EE90)';
                
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#98FF98', '#FFB6C1', '#E6E6FA', '#FFDAB9', '#FFF']
                });

                setTimeout(() => {
                    const passwordScreen = document.getElementById('password-screen');
                    passwordScreen.style.transition = 'opacity 0.8s ease';
                    passwordScreen.style.opacity = '0';
                    
                    setTimeout(() => {
                        passwordScreen.style.display = 'none';
                        initCountdown();
                    }, 800);
                }, 1000);
                
            } else if (password === BYPASS_PASSWORD) {
                passwordVerified = true;
                btn.innerHTML = '<i class="fas fa-bolt"></i> VIP Access!';
                btn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
                
                confetti({
                    particleCount: 200,
                    spread: 120,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500', '#FFB6C1', '#FFF']
                });

                setTimeout(() => {
                    const passwordScreen = document.getElementById('password-screen');
                    const countdownScreen = document.getElementById('countdown-screen');
                    const introScreen = document.getElementById('intro-screen');
                    
                    passwordScreen.style.transition = 'opacity 0.8s ease';
                    passwordScreen.style.opacity = '0';
                    
                    setTimeout(() => {
                        passwordScreen.style.display = 'none';
                        countdownScreen.style.display = 'none';
                        introScreen.style.display = 'flex';
                        
                        createStars();
                        createBalloons();
                        startLoading();
                    }, 800);
                }, 1000);
                
            } else {
                input.classList.add('shake');
                error.classList.add('show');
                input.value = '';
                input.focus();
                
                confetti({
                    particleCount: 30,
                    spread: 50,
                    origin: { y: 0.6 },
                    colors: ['#ff6b6b', '#ff8e8e']
                });
                
                setTimeout(() => {
                    input.classList.remove('shake');
                    error.classList.remove('show');
                }, 2000);
            }
        }

        document.getElementById('password-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });

        function initCountdown() {
            createCountdownStars();
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }

        window.onload = function() {
            createPasswordStars();
        };

        document.addEventListener('click', function(e) {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('menu-toggle');
            
            if (window.innerWidth <= 768 && sidebarOpen) {
                if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                    toggleSidebar();
                }
            }
        });