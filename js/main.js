// 1. Daftar keahlian (halaman Beranda), data dari keahlian.json
const daftarSkill = document.querySelector("#daftar-skill");
const jumlahSkill = document.querySelector("#jumlah-skill");
async function muatKeahlian() {
  try {
    const response = await fetch("keahlian.json");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const skills = await response.json();
    skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.nama} (${skill.level})`;
      daftarSkill.appendChild(item);
    });
    jumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`;
  } catch (error) {
    jumlahSkill.textContent = "Daftar keahlian gagal dimuat.";
    console.error(error);
  }
}
if (daftarSkill) {
  muatKeahlian();
}

// 1b. Mode Gelap dengan Penyimpanan Preferensi (localStorage)
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
const kotakPesan= document.querySelector ("#tombol-kosongkan")


if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/250 karakter`;
  });
}

// 3. Daftar repositori GitHub
const username = "fitrohrpl-boop";

const alamatRepo = `https://api.github.com/users/${username}/repos`;
const pilihan = "?sort=updated&per_page=6";
const daftarRepo = document.querySelector("#daftar-repo");
const statusRepo = document.querySelector("#status-repo");

async function ambilRepo() {
  if (!daftarRepo) return;

  statusRepo.textContent = "Memuat...";

  try {
    const response = await fetch(alamatRepo + pilihan);
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const repos = await response.json();
    daftarRepo.innerHTML = "";

    repos.forEach((repo) => {
      const item = document.createElement("li");
      const tautan = document.createElement("a");
      tautan.href = repo.html_url;
      tautan.target = "_blank";
      tautan.textContent = repo.name;
      item.appendChild(tautan);
      daftarRepo.appendChild(item);
    });

    statusRepo.textContent = `${repos.length} repositori yang terakhir diperbarui:`;
  } catch (error) {
    statusRepo.textContent =
      "Maaf, daftar repositori gagal dimuat. Periksa username atau coba lagi nanti.";
    console.error(error);
  }
}

ambilRepo();

// 4. Data dan filter proyek
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
// 6. Tombol kosongkan pesan (halaman Kontak)
const tombolKosongkan = document.getElementById("tombol-kosongkan");
const kotakPesan = document.getElementById("pesan");

if (tombolKosongkan && kotakPesan) {
  tombolKosongkan.addEventListener("click", function () {
    kotakPesan.value = "";
    kotakPesan.focus();
    kotakPesan.dispatchEvent(new Event("input")); // memperbarui penghitung karakter, jika ada
  });
}