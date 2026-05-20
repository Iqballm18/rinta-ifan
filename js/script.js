// ===== GUEST NAME FROM URL =====
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if (guestName) {
    document.getElementById('guestName').textContent = guestName;
}

// ===== AUDIO =====
const audio = new Audio('media/Christina Perri - A Thousand Years.m4a');
audio.loop = true;
audio.volume = 0.5;

// ===== OPEN INVITATION =====
document.getElementById('btnOpen').addEventListener('click', function () {
    const cover = document.getElementById('cover');
    cover.classList.add('opening');

    // Setelah animasi cover selesai
    setTimeout(() => {
        cover.classList.add('hidden');
        document.getElementById('mainContent').classList.add('visible');
        document.getElementById('musicBtn').style.display = 'flex';
        createParticles();
        showNavbar();
    }, 800);

    // Auto-play music
    audio.play().then(() => {
        document.getElementById('musicBtn').classList.add('playing');
        isPlaying = true;
    }).catch(() => {
        // Autoplay blocked by browser, user can click music btn
    });

    // Scroll ke atas (section intro)
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
});

// ===== COUNTDOWN =====
function updateCountdown() {
    const wedding = new Date('2026-06-03T10:00:00').getTime();
    const now = new Date().getTime();
    const diff = wedding - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        animateNumber('days', days);
        animateNumber('hours', hours);
        animateNumber('minutes', minutes);
        animateNumber('seconds', seconds);
    }
}

function animateNumber(id, value) {
    const el = document.getElementById(id);
    if (el && el.textContent !== String(value)) {
        el.style.transform = 'scale(1.2)';
        el.textContent = value;
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== DYNAMIC PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const types = ['gold', 'maroon', 'heart'];

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const type = types[Math.floor(Math.random() * types.length)];
        particle.classList.add('particle', type);

        if (type === 'heart') {
            particle.textContent = '♥';
        }

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (8 + Math.random() * 6) + 's';
        container.appendChild(particle);
    }
}

// ===== WISHES FORM =====
// Attendance buttons
const attendanceBtns = document.querySelectorAll('.attendance-btn');
const attendanceInput = document.getElementById('wishAttendance');

attendanceBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        attendanceBtns.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        attendanceInput.value = this.getAttribute('data-value');
    });
});

document.getElementById('wishForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('wishName');
    const messageInput = document.getElementById('wishMessage');
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const attendance = attendanceInput.value;

    if (name && message) {
        const wishItem = document.createElement('div');
        wishItem.classList.add('wish-item');
        wishItem.style.opacity = '0';
        wishItem.style.transform = 'translateX(-20px)';

        let badgeHtml = '';
        if (attendance === 'hadir') {
            badgeHtml = ' <span class="wish-badge hadir">Hadir</span>';
        } else if (attendance === 'tidak') {
            badgeHtml = ' <span class="wish-badge tidak">Tidak Hadir</span>';
        } else if (attendance === 'ragu') {
            badgeHtml = ' <span class="wish-badge ragu">Ragu</span>';
        }

        wishItem.innerHTML = '<p class="wish-name">' + escapeHtml(name) + badgeHtml + '</p><p class="wish-message">' + escapeHtml(message) + '</p>';
        document.getElementById('wishesList').prepend(wishItem);

        // Animate in
        requestAnimationFrame(() => {
            wishItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            wishItem.style.opacity = '1';
            wishItem.style.transform = 'translateX(0)';
        });

        nameInput.value = '';
        messageInput.value = '';
        attendanceInput.value = '';
        attendanceBtns.forEach(b => b.classList.remove('selected'));

        // Scroll to new wish
        wishItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== MUSIC TOGGLE =====
let isPlaying = false;
document.getElementById('musicBtn').addEventListener('click', function () {
    isPlaying = !isPlaying;
    this.classList.toggle('playing', isPlaying);

    if (isPlaying) {
        audio.play();
    } else {
        audio.pause();
    }
});

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function showCopyFeedback(btn) {
    if (!btn) return;
    const originalText = btn.textContent;
    btn.textContent = '✓ Tersalin!';
    btn.style.background = '#28a745';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// ===== COPY REKENING =====
function copyText(text) {
    const btn = document.querySelectorAll('.gift-copy-btn')[0];
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(btn);
    }).catch(() => {
        fallbackCopy(text);
        showCopyFeedback(btn);
    });
}

// ===== COPY ALAMAT =====
function copyAddress() {
    const address = 'Mojosongo, Balongbesuk, Diwek, Jombang (Gang Masjid Mustawa) - a.n Rinta Nuriya';
    const btn = document.querySelectorAll('.gift-copy-btn')[1];
    navigator.clipboard.writeText(address).then(() => {
        showCopyFeedback(btn);
    }).catch(() => {
        fallbackCopy(address);
        showCopyFeedback(btn);
    });
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// ===== GOOGLE CALENDAR =====
function generateGoogleCalendarUrl() {
    const title = encodeURIComponent('Pernikahan Rinta & Ifan');
    const startDate = '20260603T030000Z'; // 3 Jun 2026 10:00 WIB = 03:00 UTC
    const endDate = '20260603T090000Z';   // 3 Jun 2026 16:00 WIB = 09:00 UTC
    const location = encodeURIComponent('Mojosongo, Balongbesuk, Diwek, Jombang');
    const details = encodeURIComponent('Akad Nikah: 10:00 - 12:00 WIB di Masjid Mustawa\nResepsi: 12:00 - Selesai di Gedung BLK\n\nMojosongo, Balongbesuk, Diwek, Jombang');

    return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + title +
        '&dates=' + startDate + '/' + endDate +
        '&location=' + location +
        '&details=' + details;
}

const calendarBtn = document.getElementById('googleCalendarBtn');
if (calendarBtn) {
    calendarBtn.href = generateGoogleCalendarUrl();
}

// ===== NAVIGATION BAR =====
const navbar = document.getElementById('navbar');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

// Show navbar after opening invitation
function showNavbar() {
    if (navbar) {
        navbar.classList.add('visible');
        if (window.innerWidth <= 768) {
            // Mobile: start with navbar open (not collapsed)
            navbar.classList.remove('collapsed');
            const collapsedBtn = document.getElementById('navCollapsedBtn');
            if (collapsedBtn) {
                collapsedBtn.classList.add('visible');
                collapsedBtn.classList.add('hidden');
            }
        }
    }
}

// Toggle navbar on mobile
const navCollapsedBtn = document.getElementById('navCollapsedBtn');
const navArrow = document.getElementById('navArrow');

// Collapsed button (arrow left) → open navbar
if (navCollapsedBtn) {
    navCollapsedBtn.addEventListener('click', function () {
        navbar.classList.remove('collapsed');
        this.classList.add('hidden');
    });
}

// Arrow inside navbar (arrow right) → close navbar
if (navArrow) {
    navArrow.addEventListener('click', function () {
        if (window.innerWidth > 768) return;
        navbar.classList.add('collapsed');
        if (navCollapsedBtn) {
            navCollapsedBtn.classList.remove('hidden');
        }
    });
}

// Close navbar on mobile after clicking a nav item
// --> Navbar tetap terbuka, hanya ditutup dari tombol arrow

// Auto-hide collapsed button on scroll, show when scroll stops
let scrollTimeout;
window.addEventListener('scroll', function () {
    if (window.innerWidth > 768) return;
    if (!navCollapsedBtn || !navCollapsedBtn.classList.contains('visible')) return;

    // Only hide the collapsed button while scrolling (not the open navbar)
    if (navbar && navbar.classList.contains('collapsed')) {
        navCollapsedBtn.classList.add('scrolling');

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            navCollapsedBtn.classList.remove('scrolling');
        }, 800);
    }
});

// Track active section on scroll
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('data-section') === id);
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

sections.forEach(section => navObserver.observe(section));

// Smooth scroll on nav click
navItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-section');
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
