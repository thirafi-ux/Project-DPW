const dataPanen = {
    tahunan: {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"],
        data: [48300000, 46220000, 46820000, 46990000, 48160000, 51660000, 49800000]
    }
};

function formatJuta(val) {
    // Format ke format Juta Ton sesuai gambar, cth: 48,30
    return (val / 1000000).toLocaleString('id-ID', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function updateStatistik() {
    const chartData = dataPanen.tahunan;
    const data = chartData.data;
    
    const total = data.reduce((a, b) => a + b, 0);
    const avg = total / data.length;
    
    const maxVal = Math.max(...data);
    const maxIdx = data.indexOf(maxVal);
    const minVal = Math.min(...data);
    const minIdx = data.indexOf(minVal);
    
    const produksiTerakhir = data[data.length - 1]; // Data 2026
    const produksiHarian = Math.round(produksiTerakhir / 365); // Dibagi 365
    
    // Update KPI Cards Top
    document.getElementById("produksiHarian").innerHTML = produksiHarian.toLocaleString("id-ID") + " <span style='font-size: 1.1rem; color: #fff'>Ton</span>";
    document.getElementById("totalPanen").innerHTML = formatJuta(produksiTerakhir) + " <span style='font-size: 1.1rem; color: #fff'>Juta Ton</span>";
    
    // Update Summary Right Side
    document.getElementById("avgProduksi").innerHTML = formatJuta(avg) + " Juta Ton";
    document.getElementById("maxProduksi").innerHTML = formatJuta(maxVal) + " Juta Ton (" + chartData.labels[maxIdx] + ")";
    document.getElementById("minProduksi").innerHTML = formatJuta(minVal) + " Juta Ton (" + chartData.labels[minIdx] + ")";
    document.getElementById("totalProduksiAll").innerHTML = formatJuta(total) + " Juta Ton";
}

function buatGrafik() {
    const chartData = dataPanen.tahunan;
    const svgChart = document.getElementById('svgLineChart');
    const labelsContainer = document.getElementById('chartLabels');
    
    // Internal Virtual Scale SVG
    const width = 1000;
    const height = 220; // Ditambah agar grafik tidak menempel di atas
    const paddingT = 30; // Jarak atas agar label (cth 51,66) tidak terpotong
    const paddingB = 5; // Jarak bawah
    const drawHeight = height - paddingT - paddingB;
    const maxAxisVal = 60000000; // Skala Y maksimum 60 Juta Ton
    
    let svgContent = `
        <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(74, 222, 128, 0.4)" />
                <stop offset="100%" stop-color="rgba(74, 222, 128, 0.0)" />
            </linearGradient>
        </defs>
    `;
    
    // Gambar Garis Horizontal Latar Belakang (0 - 60)
    for(let i=0; i<=6; i++) {
        const val = i * 10000000; 
        const y = paddingT + drawHeight - ((val / maxAxisVal) * drawHeight);
        
        svgContent += `<line x1="40" y1="${y}" x2="${width}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-width="1" />`;
        // Label Sumbu Y di dalam grafik
        svgContent += `<text x="30" y="${y + 4}" fill="#8E9E9D" font-size="12" text-anchor="end">${i * 10}</text>`;
    }

    labelsContainer.innerHTML = '';
    
    // Perhitungan jarak antar titik
    const startX = 60; // Offset dari label Y
    const stepX = (width - startX) / (chartData.data.length - 1);
    
    let pathAreaD = `M ${startX},${height} `;
    let pathLineD = '';
    
    // Generate Path (Garis dan Area)
    chartData.data.forEach((val, i) => {
        const x = startX + (i * stepX);
        const y = paddingT + drawHeight - ((val / maxAxisVal) * drawHeight);
        
        if (i === 0) {
            pathLineD += `M ${x},${y} `;
            pathAreaD += `L ${x},${y} `;
        } else {
            pathLineD += `L ${x},${y} `;
            pathAreaD += `L ${x},${y} `;
        }
    });
    
    pathAreaD += `L ${width},${height} Z`;
    
    svgContent += `<path class="chart-area" d="${pathAreaD}" fill="url(#chartGradient)" />`;
    svgContent += `<path class="chart-line" d="${pathLineD}" />`;
    
    // Generate Titik dan Label Angka di Atas Titik
    chartData.data.forEach((val, i) => {
        const x = startX + (i * stepX);
        const y = paddingT + drawHeight - ((val / maxAxisVal) * drawHeight);
        
        // Titik
        svgContent += `<circle class="chart-point" cx="${x}" cy="${y}" r="6" />`;
        
        // Angka Value di atas
        svgContent += `<text class="chart-point-label" x="${x}" y="${y - 12}">${formatJuta(val)}</text>`;
        
        // Label Sumbu X (HTML)
        const labelDiv = document.createElement('div');
        labelDiv.className = 'chart-label-text';
        labelDiv.innerText = chartData.labels[i];
        
        if(i === 0) labelDiv.style.marginLeft = "45px"; // Sejajarkan dengan offset
        labelsContainer.appendChild(labelDiv);
    });

    svgChart.innerHTML = svgContent;
    updateStatistik();
}

// Simulasi Waktu Live
function updateDateTime() {
    const now = new Date();
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    const d = now.getDate().toString().padStart(2, '0');
    const m = monthNames[now.getMonth()];
    const y = now.getFullYear();
    const day = dayNames[now.getDay()];
    const h = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    
    document.getElementById('currentDate').innerText = `${d} ${m} ${y}`;
    document.getElementById('currentDayTime').innerText = `${day}, ${h}:${min} WIB`;
}

// Inisialisasi awal saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    buatGrafik();
    updateDateTime();
    // Update jam setiap menit
    setInterval(updateDateTime, 60000);
});