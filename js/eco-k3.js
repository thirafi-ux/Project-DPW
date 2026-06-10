// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
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
    
    // ==================== SCROLL TO CONTENT ====================
    const scrollBtn = document.getElementById('scrollToContent');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            document.querySelector('.features-grid-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // ==================== MODAL SYSTEM ====================
    const modals = document.querySelectorAll('.modal');
    const learnMoreBtns = document.querySelectorAll('.card-learn-more');
    const closeBtns = document.querySelectorAll('.modal-close');
    
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {

            const modalId = btn.dataset.modal;

            if (!modalId) return;

            e.preventDefault();

            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
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
    
    // ==================== PARTICLE BACKGROUND (SEDERHANA) ====================
    const createParticles = () => {
        const container = document.getElementById('particles');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = '#00ff99';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${Math.random() * 10 + 5}s linear infinite`;
            particle.style.pointerEvents = 'none';
            container.appendChild(particle);
        }
    };
    
    // Add keyframe style for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    createParticles();
});