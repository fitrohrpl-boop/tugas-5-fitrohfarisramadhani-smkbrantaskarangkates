// 1. Mode Gelap dengan Penyimpanan Preferensi (localStorage)
const tombolTema = document.querySelector("#tombol-tema");

// Cek tema tersimpan saat halaman dimuat atau setelah refresh
const temaTersimpan = localStorage.getItem("tema");
if (temaTersimpan === "gelap") {
  document.body.classList.add("gelap");
  document.documentElement.classList.add("gelap");
  if (tombolTema) {
    tombolTema.textContent = "Mode Terang";
  }
} else if (temaTersimpan === "terang") {
  document.body.classList.remove("gelap");
  document.documentElement.classList.remove("gelap");
  if (tombolTema) {
    tombolTema.textContent = "Mode Gelap";
  }
}

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("gelap");
    document.documentElement.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
      tombolTema.textContent = "Mode Terang";
      localStorage.setItem("tema", "gelap");
    } else {
      tombolTema.textContent = "Mode Gelap";
      localStorage.setItem("tema", "terang");
    }
  });
}

// 2. Hitung karakter di form kontak
const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}

// 3. Data dan filter proyek
const proyek = [
  {
    judul: "Halaman Profil Pertama",
    kategori: "HTML",
    gambar: "img/proyek-profile.jpeg",
    alt: "Tangkapan layar halaman profil Fitroh Faris",
    deskripsi:
      "Halaman web pertama saya, dibuat dengan HTML dasar di Minggu 01.",
  },
  {
    judul: "Form Kontak",
    kategori: "HTML",
    gambar: "img/proyek-kontak.png",
    alt: "Tangkapan layar form kontak berisi lima isian",
    deskripsi:
      "Form untuk menghubungi saya. Setiap isian memiliki label dan wajib diisi.",
  },
  {
    judul: "Tabel Jadwal Belajar",
    kategori: "HTML",
    gambar: "img/proyek-jadwal.png",
    alt: "Tangkapan layar tabel jadwal belajar mandiri",
    deskripsi:
      "Tabel berisi jadwal belajar mandiri saya, disusun dengan thead dan tbody.",
  },
  {
    judul: "Portofolio Responsif",
    kategori: "CSS",
    deskripsi: "Tampilan rapi di ponsel, tablet, dan laptop dengan Flexbox.",
  },
  {
    judul: "Kalkulator Nilai Rapor",
    kategori: "JavaScript",
    deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript.",
  },
  {
    judul: "Lima Soal Logika",
    kategori: "JavaScript",
    deskripsi: "Lima fungsi logika yang masing-masing diuji tiga masukan.",
  },
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
  const gambarHtml = item.gambar
    ? `<img src="${item.gambar}" alt="${item.alt || item.judul}" width="280">`
    : "";

  return `
    <article class="kartu">
      <span class="label">${item.kategori}</span>
      <h3>${item.judul}</h3>
      ${gambarHtml}
      <p>${item.deskripsi}</p>
    </article>`;
}

function tampilkanProyek(daftar) {
  const semuaKartu = daftar.map((item) => buatKartu(item));
  daftarProyek.innerHTML = semuaKartu.join("");
  jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.querySelector(idTombol);
  if (!tombol) return;

  tombol.addEventListener("click", () => {
    if (kategori === "Semua") {
      tampilkanProyek(proyek);
    } else {
      tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
    }

    const aktif = document.querySelector(".tombol-filter.aktif");
    if (aktif) {
      aktif.classList.remove("aktif");
    }
    tombol.classList.add("aktif");
  });
}

if (daftarProyek) {
  tampilkanProyek(proyek);
  pasangFilter("#filter-semua", "Semua");
  pasangFilter("#filter-html", "HTML");
  pasangFilter("#filter-css", "CSS");
  pasangFilter("#filter-javascript", "JavaScript");
}
