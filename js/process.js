// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Tutup menu saat klik link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // ==================== SCROLL ANIMATION ====================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const checkVisibility = () => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    
    // ==================== ANIMASI COUNTER STATS ====================
    const counters = document.querySelectorAll('.stats-number');
    const heroNumbers = document.querySelectorAll('.hero-stats .stat-number');
    const allNumbers = [...counters, ...heroNumbers];
    
    const animateNumbers = () => {
        allNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            const rect = counter.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                let current = 0;
                const increment = target / 50;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                updateCounter();
            }
        });
    };
    
    // Panggil saat load dan scroll
    setTimeout(animateNumbers, 500);
    window.addEventListener('scroll', animateNumbers);
    
    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.padding = '8px 28px';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.padding = '10px 28px';
        }
    });
});