const API_URL =
"https://script.google.com/macros/s/AKfycbzUTYERDxs6xFjF4XSK32FlPaoiItPpyJRjG_DShMoYjk--iE-BnS3AhMogeWfqv-v6/exec";


async function cekPengaduan() {

  const token =
    document.getElementById(
      "token"
    ).value.trim();


  if (!token) {

    alert(
      "Masukkan token terlebih dahulu."
    );

    return;

  }


  const hasil =
    document.getElementById(
      "hasilCek"
    );


  hasil.innerHTML =
    "<p>Memuat data...</p>";


  try {

    const response =
      await fetch(
        API_URL +
        "?action=cekPengaduan&token=" +
        encodeURIComponent(token)
      );


    const result =
      await response.json();


    if (!result.success) {

      hasil.innerHTML = `
        <div class="error">
          ${result.message}
        </div>
      `;

      return;

    }


    const d =
      result.data;


    hasil.innerHTML = `

      <div class="detail-pengaduan">

        <p>
          <strong>ID:</strong>
          ${d.id}
        </p>

        <p>
          <strong>Token:</strong>
          ${d.token}
        </p>

        <p>
          <strong>Tanggal:</strong>
          ${d.tanggal}
        </p>

        <p>
          <strong>Nama:</strong>
          ${d.nama}
        </p>

        <p>
          <strong>Kategori:</strong>
          ${d.kategori}
        </p>

        <p>
          <strong>Pengaduan:</strong>
          ${d.pengaduan}
        </p>

        <p>
          <strong>Status:</strong>
          <span class="status">
            ${d.status}
          </span>
        </p>

        <p>
          <strong>Tanggapan Admin:</strong>
          ${d.tanggapan_admin}
        </p>

        <p>
          <strong>Tanggal Tanggapan:</strong>
          ${d.tanggal_tanggapan}
        </p>

      </div>

    `;


  } catch (error) {

    hasil.innerHTML =
      "<p>Gagal mengambil data.</p>";

    console.error(error);

  }

}