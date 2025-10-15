// ================================
// BINTI NUR LATIF - PORTFOLIO ANIMATIONS
// JavaScript untuk animasi dan interaktivitas
// ================================

// Konfigurasi animasi
const ANIMATION_CONFIG = {
    duration: 600,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 100
};

// State management
let currentTheme = 'default';
let isAnimating = false;

// ================================
// 1. INITIALIZATION & DOM READY
// ================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    startTypingAnimation();
    initializeScrollAnimations();
    setupThemeToggle();
    setupProjectInteractions();
    setupFormHandling();
    setupCopyToClipboard();
    addFloatingAnimations();
});

// ================================
// 2. SMOOTH SCROLLING NAVIGATION
// ================================
function initializeAnimations() {
    // Smooth scrolling untuk semua anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight navigation
                highlightActiveNav(this.getAttribute('href'));
            }
        });
    });
}

function highlightActiveNav(targetId) {
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav a[href="${targetId}"]`)?.classList.add('active');
}

// ================================
// 3. TYPING ANIMATION UNTUK HERO
// ================================
function startTypingAnimation() {
    const heroTitle = document.querySelector('.hero-card h2');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const nameSpan = heroTitle.querySelector('.accent');
    
    if (nameSpan) {
        const beforeText = "Halo!! Saya ";
        const nameText = nameSpan.textContent;
        
        heroTitle.innerHTML = beforeText + '<span class="accent typing-cursor"></span>';
        
        typeText(heroTitle.querySelector('.accent'), nameText, 100, () => {
            // Tambahkan efek berkedip cursor
            setTimeout(() => {
                heroTitle.querySelector('.typing-cursor')?.classList.add('blink');
            }, 500);
        });
    }
}

function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// ================================
// 4. SCROLL ANIMATIONS
// ================================
function initializeScrollAnimations() {
    // Intersection Observer untuk scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements yang akan dianimasi
    const animatedElements = document.querySelectorAll(`
        .hero-card, .hero-photo, .section h3, .about-text p,
        .vm-grid > div, .skill-card, .projects-table,
        .contact-grid > div, .project-detail
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.easing}`;
        el.style.transitionDelay = `${index * 50}ms`;
        observer.observe(el);
    });
}

function animateElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

// ================================
// 5. THEME TOGGLE FUNCTIONALITY
// ================================
function setupThemeToggle() {
    const themeBtn = document.getElementById('toggleTheme');
    if (!themeBtn) return;
    
    themeBtn.addEventListener('click', function() {
        toggleTheme();
        
        // Animasi button
        this.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
}

function toggleTheme() {
    document.body.classList.toggle('alt-theme');
    currentTheme = document.body.classList.contains('alt-theme') ? 'alt' : 'default';
    
    // Simpan preference
    localStorage.setItem('theme', currentTheme);
    
    // Update theme button
    const themeBtn = document.getElementById('toggleTheme');
    if (themeBtn) {
        themeBtn.setAttribute('aria-pressed', currentTheme === 'alt');
        themeBtn.title = currentTheme === 'alt' ? 'Switch to light theme' : 'Switch to dark theme';
    }
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'alt') {
        document.body.classList.add('alt-theme');
        currentTheme = 'alt';
    }
}

// ================================
// 6. PROJECT TABLE INTERACTIONS
// ================================
function setupProjectInteractions() {
    const projectRows = document.querySelectorAll('.projects-table tbody tr');
    const projectDetail = document.getElementById('projectDetail');
    const closeBtn = document.getElementById('closeDetail');
    
    if (!projectDetail) return;
    
    // Data proyek (bisa dipindah ke file terpisah)
    const projectsData = {
        0: {
            title: "Kalkulator IP Subnet",
            desc: "Aplikasi web untuk menghitung subnet mask, jumlah host, network address, dan broadcast address. Berguna untuk konfigurasi jaringan komputer.",
            tech: "HTML, CSS, JavaScript, Bootstrap"
        },
        1: {
            title: "To-Do List / Catatan Harian",
            desc: "Aplikasi pencatat tugas dan kegiatan harian dengan fitur tambah, edit, hapus, dan mark as completed. Data tersimpan di localStorage.",
            tech: "HTML, CSS, JavaScript, Local Storage"
        },
        2: {
            title: "Kalkulator BMI",
            desc: "Menghitung Body Mass Index dengan kategori hasil (underweight, normal, overweight, obese) dan rekomendasi kesehatan.",
            tech: "HTML, CSS, JavaScript, Chart.js"
        },
        3: {
            title: "Catatan Keuangan Dan Target Tabungan",
            desc: "Aplikasi untuk mencatat pemasukan dan pengeluaran harian, menghitung saldo, dan estimasi waktu untuk mencapai target tabungan.",
            tech: "HTML, CSS, JavaScript, Chart.js, Local Storage"
        }
    };
    
    projectRows.forEach((row, index) => {
        row.addEventListener('click', function() {
            showProjectDetail(index, projectsData[index]);
            
            // Highlight row
            projectRows.forEach(r => r.classList.remove('selected'));
            this.classList.add('selected');
        });
        
        // Hover effects
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 15px rgba(255,77,137,0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideProjectDetail);
    }
}

function showProjectDetail(index, data) {
    const projectDetail = document.getElementById('projectDetail');
    const title = document.getElementById('pd-title');
    const desc = document.getElementById('pd-desc');
    const tech = document.getElementById('pd-tech');
    
    if (!projectDetail || !data) return;
    
    title.textContent = data.title;
    desc.textContent = data.desc;
    tech.textContent = data.tech;
    
    projectDetail.hidden = false;
    projectDetail.style.opacity = '0';
    projectDetail.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        projectDetail.style.opacity = '1';
        projectDetail.style.transform = 'translateY(0)';
    }, 10);
}

function hideProjectDetail() {
    const projectDetail = document.getElementById('projectDetail');
    if (!projectDetail) return;
    
    projectDetail.style.opacity = '0';
    projectDetail.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        projectDetail.hidden = true;
    }, 300);
    
    // Remove selection
    document.querySelectorAll('.projects-table tbody tr').forEach(row => {
        row.classList.remove('selected');
        row.style.transform = 'translateX(0)';
        row.style.boxShadow = 'none';
    });
}

// ================================
// 7. FORM HANDLING
// ================================
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this);
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            this.classList.remove('error');
        });
    });
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Validasi
    if (!validateForm(data)) {
        showNotification('Mohon lengkapi semua field dengan benar!', 'error');
        return;
    }
    
    // Simulasi pengiriman
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    
    setTimeout(() => {
        showNotification('Pesan berhasil dikirim! Terima kasih.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 2000);
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return data.name.trim().length >= 2 &&
           emailRegex.test(data.email) &&
           data.message.trim().length >= 10;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.name === 'name' && value.length < 2) {
        isValid = false;
    } else if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
    } else if (field.name === 'message' && value.length < 10) {
        isValid = false;
    }
    
    field.classList.toggle('error', !isValid);
    return isValid;
}

// ================================
// 8. COPY TO CLIPBOARD
// ================================
function setupCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy, this);
        });
    });
}

async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        
        const originalText = button.textContent;
        button.textContent = 'Disalin!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
        
        showNotification(`${text} berhasil disalin!`, 'success');
    } catch (err) {
        // Fallback untuk browser lama
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification(`${text} berhasil disalin!`, 'success');
    }
}

// ================================
// 9. FLOATING ANIMATIONS
// ================================
function addFloatingAnimations() {
    // Floating animation untuk hero photo
    const heroPhoto = document.querySelector('.hero-photo');
    if (heroPhoto) {
        heroPhoto.style.animation = 'float 6s ease-in-out infinite';
    }
    
    // Parallax effect untuk skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('float-subtle');
    });
}

// ================================
// 10. SCROLL EFFECTS & NAVIGATION HIGHLIGHT
// ================================
function setupEventListeners() {
    window.addEventListener('scroll', throttle(handleScroll, 100));
    window.addEventListener('resize', throttle(handleResize, 250));
    
    // Load saved theme
    loadSavedTheme();
}

function handleScroll() {
    updateNavigation();
    addScrollEffects();
}

function updateNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            highlightActiveNav(`#${sectionId}`);
        }
    });
}

function addScrollEffects() {
    const scrolled = window.scrollY;
    const header = document.querySelector('.site-header');
    
    if (header) {
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

function handleResize() {
    // Handle responsive adjustments if needed
    console.log('Window resized');
}

// ================================
// 11. NOTIFICATION SYSTEM
// ================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles untuk notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ================================
// 12. UTILITY FUNCTIONS
// ================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================
// 13. CSS ANIMATIONS (Injected)
// ================================
function injectAdditionalCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Additional animations */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .typing-cursor::after {
            content: '|';
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .float-subtle {
            animation: float 8s ease-in-out infinite;
        }
        
        .notification {
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .projects-table tbody tr.selected {
            background: linear-gradient(90deg, rgba(255,77,137,0.1), rgba(255,77,137,0.05));
            transform: translateX(5px);
            box-shadow: 0 4px 15px rgba(255,77,137,0.1);
        }
        
        .contact-form input.error,
        .contact-form textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .link-like.copied {
            background: var(--accent);
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
        }
        
        .site-header.scrolled {
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(255,77,137,0.12);
        }
        
        .nav a.active {
            color: var(--accent);
            position: relative;
        }
        
        .nav a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--accent);
            border-radius: 1px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional CSS
injectAdditionalCSS();

// ================================
// 14. EXPORT FUNCTIONS (Optional)
// ================================
window.PortfolioAnimations = {
    showNotification,
    toggleTheme,
    copyToClipboard,
    showProjectDetail,
    hideProjectDetail
};

console.log('🎉 Portfolio animations loaded successfully!');
