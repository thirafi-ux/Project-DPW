document.addEventListener("DOMContentLoaded", () => {

    // ================= MOBILE MENU =================
    const menuToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        document.addEventListener("click", (e) => {

            const insideNav =
                navMenu.contains(e.target) ||
                menuToggle.contains(e.target);

            if (!insideNav) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }

        });
    }

    const navbar = document.querySelector("nav");

        window.addEventListener("scroll",()=>{

            if(window.scrollY > 80){
                navbar.classList.add("scrolled");
            }else{
                navbar.classList.remove("scrolled");
            }

        });

    // ================= SCROLL ANIMATION =================
    const animatedItems =
        document.querySelectorAll(
        ".animate-on-scroll,.fade-left,.fade-right,.scale-up"
        );

        const animationObserver =
        new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                    animationObserver.unobserve(entry.target);

                }

            });

        },{
            threshold:0.15
        });

        animatedItems.forEach(item=>{
            animationObserver.observe(item);
        });

    const revealItems = () => {

        animatedItems.forEach(item => {

            const rect =
                item.getBoundingClientRect();

            if (rect.top < window.innerHeight - 100) {
                item.classList.add("visible");
            }

        });

    };

    revealItems();

    window.addEventListener("scroll", revealItems);

    // ================= WASTE CARD ANIMATION =================
    const cards =
        document.querySelectorAll(".waste-card");

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        }, {
            threshold: 0.2
        });

    cards.forEach(card => observer.observe(card));

    // ================= CHART TOOLTIP =================
    const tooltip =
        document.getElementById("chartTooltip");

    const points =
        document.querySelectorAll(".chart-point");

    points.forEach(point => {

        point.addEventListener("mousemove", (e) => {

            tooltip.innerHTML = `
                <strong>${point.dataset.year}</strong>
                <br>
                Produksi:
                ${point.dataset.ton}
            `;

            tooltip.style.opacity = "1";
            tooltip.style.left = `${e.pageX + 15}px`;
            tooltip.style.top = `${e.pageY - 55}px`;

        });

        point.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
        });

    });

});