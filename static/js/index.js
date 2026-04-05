// ============================================
// CONFIGURATION
// ============================================

const CORRECT_PASSWORD = "You are mine until the end";
const BYPASS_PASSWORD = "My Adorable Girl";

// ============================================
// DATA - THE GREAT BOOK PAGES
// ============================================

const BOOK_PAGES = [
    // Spread 1: Opening
    {
        left: {
            type: 'text',
            title: 'Prologue',
            content: `<p class="page-text poetry">
                "In the beginning,<br>
                there was you,<br>
                and there was me,<br>
                and somehow,<br>
                that was everything<br>
                I ever needed."
            </p>`
        },
        right: {
            type: 'photo-large',
            src: 'static/images/folder1/rinrin 1.jpeg',
            caption: 'The first chapter'
        }
    },
    // Spread 2: Her Smile
    {
        left: {
            type: 'photo-grid',
            photos: [
                { src: 'static/images/folder1/rinrin 2.jpeg', caption: 'Smile' },
                { src: 'static/images/folder1/rinrin 3.jpeg', caption: 'Laugh' },
                { src: 'static/images/folder1/rinrin 4.jpeg', caption: 'Joy' },
                { src: 'static/images/folder1/rinrin 5.jpeg', caption: 'Happy' }
            ]
        },
        right: {
            type: 'text',
            title: 'Her Smile',
            content: `<p class="page-text">
                There are many things in this world that can make me smile. 
                But nothing—absolutely nothing—compares to the way your eyes 
                crinkle when you laugh, or how your whole face lights up 
                when you're genuinely happy.
            </p>
            <p class="page-text" style="margin-top: 15px; font-style: italic; color: var(--soft-pink);">
                "Your smile is my favorite notification."
            </p>`
        }
    },
    // Spread 3: Voice Note
    {
        left: {
            type: 'audio',
            title: 'A Voice Note',
            src: 'static/audio/voice-note.mp3',
            caption: 'Recorded on a rainy night'
        },
        right: {
            type: 'text',
            title: 'Midnight Thoughts',
            content: `<p class="page-text poetry">
                "Sometimes I stay up late,<br>
                not because I can't sleep,<br>
                but because I'm afraid<br>
                tomorrow might come<br>
                without you in it."
            </p>`
        }
    },
    // Spread 4: Dreams
    {
        left: {
            type: 'photo-large',
            src: 'static/images/folder2/dream 1.jpeg',
            caption: 'Dreams we share'
        },
        right: {
            type: 'text',
            title: 'Dreams',
            content: `<p class="page-text">
                I used to dream alone. Now I dream with you in them. 
                And somehow, that makes every dream worth having, 
                every goal worth pursuing.
            </p>
            <p class="page-text" style="margin-top: 15px;">
                Someday, we'll look back at these pages and smile, 
                knowing we turned every dream into reality—together.
            </p>`
        }
    },
    // Spread 5: Video Memory
    {
        left: {
            type: 'video',
            title: 'A Moment Captured',
            src: 'static/video/memory.mp4',
            poster: 'static/images/video-thumb.jpg'
        },
        right: {
            type: 'photo-grid',
            photos: [
                { src: 'static/images/folder3/russia 1.jpeg', caption: 'Someday' },
                { src: 'static/images/folder3/swiss 1.jpeg', caption: 'Together' }
            ]
        }
    },
    // Spread 6: Letters
    {
        left: {
            type: 'text',
            title: 'Unsent Letters',
            content: `<p class="page-text" style="font-family: 'Caveat', cursive; font-size: 1.2rem;">
                Dear Rinrin,<br><br>
                I write this knowing you might never read it. 
                But that's okay. Some words are meant to be written, 
                not spoken. Some feelings are meant to be felt, 
                not explained.
            </p>`
        },
        right: {
            type: 'photo-large',
            src: 'static/images/letters/letter1.jpg',
            caption: 'Words left unspoken'
        }
    },
    // Spread 7: Final
    {
        left: {
            type: 'text',
            title: 'To Be Continued...',
            content: `<p class="page-text poetry">
                "This is not the end.<br>
                This is just the beginning<br>
                of a story that will take<br>
                a lifetime to tell."
            </p>`
        },
        right: {
            type: 'text',
            title: 'From Me',
            content: `<p class="page-text" style="text-align: center; margin-top: 50px;">
                <span style="font-size: 3rem;">🖤</span><br><br>
                Thank you for being<br>
                my favorite person.<br><br>
                — Ashar
            </p>`
        }
    }
];

const STATIC_SONGS = [
    { path: 'static/audio/An Art Gallery Could Never Be As Unique As You.mp3', title: 'An Art Gallery Could Never Be As Unique As You', artist: '' },
    { path: 'static/audio/Ill Never Love Again from A Star Is Born Official Music Video.mp3', title: 'Ill Never Love Again from A Star Is Born', artist: '' },
    { path: 'static/audio/Kesayanganku.mp3', title: 'Kesayanganku', artist: '' },
    { path: 'static/audio/Surat Cinta Untuk Starla.mp3', title: 'Surat Cinta Untuk Starla', artist: '' },
    { path: 'static/audio/Youll Be in My Heart.mp3', title: 'Youll be in My Heart', artist: '' }
];

// ============================================
// STATE VARIABLES
// ============================================

let countdownInterval;
let isUnlocked = false;
let passwordVerified = false;
let currentPage = 'home';
let sidebarOpen = false;
let currentAudio = null;
let isPlaying = false;
let currentSongIndex = 0;
let giftOpened = false;
let currentSpread = 0;
let isBookOpen = false;
let currentAudioElement = null;

// ============================================
// PASSWORD FUNCTIONS
// ============================================

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

// ============================================
// COUNTDOWN FUNCTIONS
// ============================================

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

function initCountdown() {
    createCountdownStars();
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ============================================
// CLOCK FUNCTIONS
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

// ============================================
// SIDEBAR NAVIGATION
// ============================================

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

function initApp() {
    initBook();
    renderSongs();
    updateClock();
    setTimeout(() => shootConfetti(), 500);
}

// ============================================
// THE GREAT BOOK - SINGLE BOOK EXPERIENCE
// ============================================

function initBook() {
    renderPages();
    renderTOC();
    updateNav();
}

function renderPages() {
    const container = document.getElementById('pagesContainer');
    container.innerHTML = '';
    
    BOOK_PAGES.forEach((spread, index) => {
        const spreadDiv = document.createElement('div');
        spreadDiv.className = 'page-spread';
        spreadDiv.id = `spread-${index}`;
        
        // Left page
        const leftPage = document.createElement('div');
        leftPage.className = 'page-left';
        leftPage.innerHTML = renderPageContent(spread.left, index * 2 + 1);
        
        // Right page
        const rightPage = document.createElement('div');
        rightPage.className = 'page-right';
        rightPage.innerHTML = renderPageContent(spread.right, index * 2 + 2);
        
        spreadDiv.appendChild(leftPage);
        spreadDiv.appendChild(rightPage);
        container.appendChild(spreadDiv);
    });
}

function renderPageContent(content, pageNum) {
    let html = '';
    
    if (content.title) {
        html += `<h3 class="page-title">${content.title}</h3>`;
    }
    
    switch(content.type) {
        case 'text':
            html += content.content;
            break;
            
        case 'photo-large':
            html += `
                <div class="page-photo-large" onclick="openLightbox('${content.src}', '${content.caption}')">
                    <img src="${content.src}" alt="${content.caption}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#8B4513;\\'>📷 ${content.caption}</div>'">
                </div>
                <p style="text-align: center; color: var(--text-light); font-size: 0.9rem; margin-top: 10px;">${content.caption}</p>
            `;
            break;
            
        case 'photo-grid':
            html += '<div class="page-photo-grid">';
            content.photos.forEach(photo => {
                html += `
                    <div class="page-photo" onclick="openLightbox('${photo.src}', '${photo.caption}')">
                        <img src="${photo.src}" alt="${photo.caption}" onerror="this.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;\\'>📷</div>'">
                    </div>
                `;
            });
            html += '</div>';
            break;
            
        case 'audio':
            html += `
                <div class="audio-player-custom" id="audio-player-${pageNum}">
                    <button class="audio-btn" onclick="toggleAudio(${pageNum}, '${content.src}')">
                        <i class="fas fa-play" id="audio-icon-${pageNum}"></i>
                    </button>
                    <div class="audio-wave">
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                    </div>
                    <span style="font-size: 0.9rem;">${content.caption}</span>
                </div>
            `;
            break;
            
        case 'video':
            html += `
                <video class="page-video" controls poster="${content.poster || ''}">
                    <source src="${content.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p style="text-align: center; color: var(--text-light); font-size: 0.9rem;">${content.title}</p>
            `;
            break;
    }
    
    html += `<span class="page-number">— ${pageNum} —</span>`;
    return html;
}

function renderTOC() {
    const tocList = document.getElementById('tocList');
    tocList.innerHTML = '';
    
    const tocItems = [
        { icon: '📖', title: 'Prologue', page: 0 },
        { icon: '🌸', title: 'Her Smile', page: 1 },
        { icon: '🎙️', title: 'Midnight Thoughts', page: 2 },
        { icon: '✨', title: 'Dreams', page: 3 },
        { icon: '🎬', title: 'A Moment Captured', page: 4 },
        { icon: '💌', title: 'Unsent Letters', page: 5 },
        { icon: '🖤', title: 'To Be Continued', page: 6 }
    ];
    
    tocItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'toc-item';
        div.onclick = () => goToSpread(item.page);
        div.innerHTML = `
            <span class="toc-item-icon">${item.icon}</span>
            <div class="toc-item-text">
                <div class="toc-item-title">${item.title}</div>
                <div class="toc-item-page">Page ${item.page * 2 + 1}-${item.page * 2 + 2}</div>
            </div>
        `;
        tocList.appendChild(div);
    });
}

function openBook() {
    if (isBookOpen) return;
    isBookOpen = true;
    
    document.getElementById('bookCover').classList.add('open');
    
    setTimeout(() => {
        document.getElementById('spread-0').classList.add('active');
        updateNav();
    }, 400);
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#8B4513', '#D4A574', '#FFD700', '#FFF8DC']
    });
}

function closeBook() {
    isBookOpen = false;
    
    // Stop any playing audio
    if (currentAudioElement) {
        currentAudioElement.pause();
        currentAudioElement = null;
    }
    
    document.querySelectorAll('.page-spread').forEach(spread => {
        spread.classList.remove('active');
    });
    
    document.getElementById('bookCover').classList.remove('open');
    
    setTimeout(() => {
        currentSpread = 0;
        updateNav();
    }, 400);
}

function nextPage() {
    if (currentSpread < BOOK_PAGES.length - 1) {
        document.getElementById(`spread-${currentSpread}`).classList.remove('active');
        currentSpread++;
        document.getElementById(`spread-${currentSpread}`).classList.add('active');
        updateNav();
    }
}

function prevPage() {
    if (currentSpread > 0) {
        document.getElementById(`spread-${currentSpread}`).classList.remove('active');
        currentSpread--;
        document.getElementById(`spread-${currentSpread}`).classList.add('active');
        updateNav();
    }
}

function goToSpread(index) {
    document.getElementById(`spread-${currentSpread}`).classList.remove('active');
    currentSpread = index;
    document.getElementById(`spread-${currentSpread}`).classList.add('active');
    updateNav();
    closeTOC();
}

function updateNav() {
    document.getElementById('prevBtn').disabled = currentSpread === 0;
    document.getElementById('nextBtn').disabled = currentSpread === BOOK_PAGES.length - 1;
    document.getElementById('pageIndicator').textContent = 
        `${currentSpread * 2 + 1} - ${currentSpread * 2 + 2}`;
}

function toggleAudio(pageNum, src) {
    const player = document.getElementById(`audio-player-${pageNum}`);
    const icon = document.getElementById(`audio-icon-${pageNum}`);
    
    // Stop other audio
    if (currentAudioElement && currentAudioElement !== player) {
        document.querySelectorAll('.audio-player-custom').forEach(p => p.classList.add('paused'));
        document.querySelectorAll('.audio-player-custom .fa-pause').forEach(i => {
            i.classList.remove('fa-pause');
            i.classList.add('fa-play');
        });
    }
    
    if (player.classList.contains('playing')) {
        // Pause
        player.classList.remove('playing');
        player.classList.add('paused');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        currentAudioElement = null;
    } else {
        // Play
        player.classList.add('playing');
        player.classList.remove('paused');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        currentAudioElement = player;
        
        // Auto pause after 30s simulation
        setTimeout(() => {
            if (currentAudioElement === player) {
                player.classList.remove('playing');
                player.classList.add('paused');
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                currentAudioElement = null;
            }
        }, 30000);
    }
}

function showTOC() {
    if (!isBookOpen) {
        openBook();
        setTimeout(() => document.getElementById('tocOverlay').classList.add('show'), 500);
    } else {
        document.getElementById('tocOverlay').classList.add('show');
    }
}

function closeTOC(e) {
    if (!e || e.target.id === 'tocOverlay') {
        document.getElementById('tocOverlay').classList.remove('show');
    }
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
// EVENT LISTENERS
// ============================================

document.getElementById('password-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menu-toggle');
    
    if (window.innerWidth <= 768 && sidebarOpen) {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            toggleSidebar();
        }
    }
});

// ============================================
// INITIALIZATION
// ============================================

window.onload = function() {
    createPasswordStars();
};