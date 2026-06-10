function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

function hitungLaba() {

    let luas = Number(document.getElementById("luasLahan").value);
    let produksi = Number(document.getElementById("produksiPerHa").value);
    let harga = Number(document.getElementById("hargaTbs").value);
    let operasional = Number(document.getElementById("biayaOperasional").value);
    let perawatan = Number(document.getElementById("biayaPerawatan").value);
    let tenaga = Number(document.getElementById("biayaTenaga").value);

    if (
        !luas ||
        !produksi ||
        !harga ||
        !operasional ||
        !perawatan ||
        !tenaga
    ) {

        document.getElementById("hasil").innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <h3>Data Belum Lengkap</h3>
                <p>
                    Mohon isi seluruh data terlebih dahulu.
                </p>
            </div>
        `;

        document
            .getElementById("hasilPopup")
            .classList.add("active");

        return;
    }

    let totalProduksiTon = luas * produksi;
    let totalProduksiKg = totalProduksiTon * 1000;
    let pendapatan = totalProduksiKg * harga;
    let totalBiaya =
        operasional +
        perawatan +
        tenaga;
    let laba = pendapatan - totalBiaya;
    let statusLaba =
        laba >= 0
            ? "laba"
            : "rugi";

    let statusText =
        laba >= 0
            ? "UNTUNG"
            : "RUGI";

    document.getElementById("hasil").innerHTML = `

        <div class="item">
            <span>Luas Lahan</span>
            <strong>${luas} Ha</strong>
        </div>

        <div class="item">
            <span>Produksi / Ha</span>
            <strong>${produksi} Ton</strong>
        </div>

        <div class="item">
            <span>Total Produksi</span>
            <strong>
                ${totalProduksiTon.toLocaleString("id-ID")} Ton
            </strong>
        </div>

        <div class="item">
            <span>Harga TBS</span>
            <strong>${rupiah(harga)}</strong>
        </div>

        <div class="item">
            <span>Pendapatan Kotor</span>
            <strong>
                ${rupiah(pendapatan)}
            </strong>
        </div>

        <div class="item">
            <span>Total Biaya</span>
            <strong>
                ${rupiah(totalBiaya)}
            </strong>
        </div>

        <hr style="
            border:none;
            height:1px;
            background:rgba(255,255,255,.08);
            margin:18px 0;
        ">

        <div class="item">
            <span>Status</span>
            <strong class="${statusLaba}">
                ${statusText}
            </strong>
        </div>

        <div class="item">
            <span>Laba Bersih</span>
            <strong class="${statusLaba}">
                ${rupiah(laba)}
            </strong>
        </div>
    `;

    const popup =
        document.getElementById("hasilPopup");

    popup.classList.add("active");
    popup.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function closeHasil() {
    document
        .getElementById("hasilPopup")
        .classList.remove("active");
}

function cetakPDF() {
    const element =
        document.getElementById("hasilPDF");
    const options = {

        margin: 0.5,
        filename:
            "Laporan_Laba_Sawit.pdf",
        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2,
            useCORS: true
        },

        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    };
    html2pdf()
        .set(options)
        .from(element)
        .save();
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const inputs =
            document.querySelectorAll("input");

        inputs.forEach(input => {
            input.addEventListener(
                "keypress",
                function (e) {

                    if (e.key === "Enter") {
                        hitungLaba();
                    }
                }
            );
        });
    }
);

function animateValue(
    element,
    start,
    end,
    duration
) {

    let startTime = null;
    function animation(currentTime) {

        if (!startTime)
            startTime = currentTime;

        const progress =
            Math.min(
                (currentTime - startTime)
                / duration,
                1
            );

        const value =
            Math.floor(
                progress *
                (end - start) +
                start
            );

        element.textContent =
            value.toLocaleString("id-ID");

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    requestAnimationFrame(animation);
}