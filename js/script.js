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

// ==================== SMART MONITORING ====================
const dataPanen = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"],
    data: [48300000, 46220000, 46820000, 46990000, 48160000, 51660000, 49800000]
};

function formatJuta(nilai) {
    return (nilai / 1000000).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function buatGrafik() {

    const svg = document.getElementById("svgLineChart");
    const labels = document.getElementById("chartLabels");

    const width = 1000;
    const height = 220;
    const paddingTop = 30;
    const paddingBottom = 10;
    const maxValue = 60000000;

    const drawHeight = height - paddingTop - paddingBottom;

    const startX = 60;
    const stepX = (width - startX) / (dataPanen.data.length - 1);

    let svgContent = `
        <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(74,222,128,0.4)"/>
                <stop offset="100%" stop-color="rgba(74,222,128,0)"/>
            </linearGradient>
        </defs>
    `;

    // Garis bantu horizontal
    for(let i=0;i<=6;i++){

        const nilai = i * 10000000;
        const y = paddingTop + drawHeight - ((nilai / maxValue) * drawHeight);

        svgContent += `
            <line
                x1="40"
                y1="${y}"
                x2="${width}"
                y2="${y}"
                stroke="rgba(255,255,255,0.05)"
                stroke-width="1"/>
        `;

        svgContent += `
            <text
                x="30"
                y="${y+4}"
                fill="#8E9E9D"
                font-size="12"
                text-anchor="end">
                ${i*10}
            </text>
        `;
    }

    labels.innerHTML = "";

    let pathLine = "";
    let pathArea = `M ${startX} ${height}`;

    dataPanen.data.forEach((nilai,index)=>{

        const x = startX + (index * stepX);
        const y = paddingTop + drawHeight - ((nilai / maxValue) * drawHeight);

        if(index==0){
            pathLine += `M ${x} ${y}`;
            pathArea += ` L ${x} ${y}`;
        }else{
            pathLine += ` L ${x} ${y}`;
            pathArea += ` L ${x} ${y}`;
        }

    });

    pathArea += ` L ${width} ${height} Z`;

    // Area hijau
    svgContent += `
        <path
            class="chart-area"
            d="${pathArea}"
            fill="url(#chartGradient)">
        </path>
    `;

    // Garis grafik
    svgContent += `
        <path
            class="chart-line"
            d="${pathLine}">
        </path>
    `;

    // Titik dan tulisan
    dataPanen.data.forEach((nilai,index)=>{

        const x = startX + (index * stepX);
        const y = paddingTop + drawHeight - ((nilai / maxValue) * drawHeight);

        svgContent += `
            <circle
                class="chart-point"
                cx="${x}"
                cy="${y}"
                r="6">
            </circle>
        `;

        svgContent += `
            <text
                class="chart-point-label"
                x="${x}"
                y="${y-12}">
                ${formatJuta(nilai)}
            </text>
        `;

        const tahun = document.createElement("div");
        tahun.className = "chart-label-text";
        tahun.innerText = dataPanen.labels[index];

        if(index==0){
            tahun.style.marginLeft = "45px";
        }

        labels.appendChild(tahun);

    });

    svg.innerHTML = svgContent;
}

document.addEventListener("DOMContentLoaded", function(){
    buatGrafik();
});