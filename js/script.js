const palmFruit =
document.getElementById("palmFruit");

window.addEventListener("mousemove",(e)=>{

    let x =
    (window.innerWidth/2 - e.clientX)/30;

    let y =
    (window.innerHeight/2 - e.clientY)/30;

    palmFruit.style.transform =
    `rotateY(${x}deg)
     rotateX(${-y}deg)`;

});

// ==================== MOBILE MENU TOGGLE ====================
// Menunggu DOM selesai loading
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Cek apakah elemen ditemukan
    if (menuToggle && navMenu) {
        // Toggle menu saat hamburger diklik
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Tutup menu saat klik link di dalam menu (opsional)
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Tutup menu saat klik di luar menu (untuk user experience lebih baik)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // ==================== SMOOTH SCROLL (Opsional) ====================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});