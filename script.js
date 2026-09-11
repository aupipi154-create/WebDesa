document.addEventListener("DOMContentLoaded", function () {

  /* Tahun otomatis */

  document.querySelectorAll(".current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* Animasi saat scroll */

  const elements = document.querySelectorAll(
    ".card, .budaya-box, .galeri-item, .info-box, .contact-box"
  );

  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  elements.forEach(function (element) {
    observer.observe(element);
  });


  /* Galeri popup */

  const images = document.querySelectorAll(".galeri-item img");

  images.forEach(function (image) {

    image.addEventListener("click", function () {

      const popup = document.createElement("div");

      popup.className = "image-popup";

      popup.innerHTML = `
        <div class="popup-content">

          <button class="close-popup">
            ×
          </button>

          <img
            src="${image.src}"
            alt="${image.alt}"
          >

          <p>${image.alt}</p>

        </div>
      `;

      document.body.appendChild(popup);


      /* Tombol tutup */

      popup
        .querySelector(".close-popup")
        .addEventListener("click", function () {

          popup.remove();

        });


      /* Klik luar gambar */

      popup.addEventListener("click", function (event) {

        if (event.target === popup) {
          popup.remove();
        }

      });

    });

  });


  /* Tombol kembali ke atas */

  const topButton = document.createElement("button");

  topButton.id = "topButton";

  topButton.innerHTML = "↑";

  topButton.title = "Kembali ke atas";

  document.body.appendChild(topButton);


  window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

      topButton.classList.add("visible");

    } else {

      topButton.classList.remove("visible");

    }

  });


  topButton.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDgf75H1pYPl9-Xqay6yXZ_D9NJwpXk1FTOBzcKO5pUSUERxKxdzKdUOMd4KZf3zTO/exec";

const guestForm = document.getElementById("guestForm");

if (guestForm) {
  guestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    const status = document.getElementById("statusPesan");

    status.textContent = "Mengirim pesan...";

    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        nama: nama,
        email: email,
        pesan: pesan
      })
    })
    .then(function() {
      status.textContent = "Pesan berhasil dikirim. Terima kasih!";
      guestForm.reset();
    })
    .catch(function(error) {
      console.error(error);
      status.textContent = "Pesan gagal dikirim. Silakan coba lagi.";
    });
  });
}
/* ============================= */
/* MENAMPILKAN DATA PESAN DI WEB */
/* ============================= */

const DATA_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzDgf75H1pYPl9-Xqay6yXZ_D9NJwpXk1FTOBzcKO5pUSUERxKxdzKdUOMd4KZf3zTO/exec";

function loadVisitorMessages() {

  const container =
    document.getElementById("visitorMessages");

  if (!container) return;

  fetch(DATA_SCRIPT_URL)

    .then(function(response) {
      return response.json();
    })

    .then(function(data) {

      container.innerHTML = "";

      if (!data || data.length === 0) {

        container.innerHTML =
          "<p>Belum ada pesan pengunjung.</p>";

        return;
      }

      data.reverse();

      data.forEach(function(item) {

        const card =
          document.createElement("div");

        card.className = "visitor-card";

        card.innerHTML = `
          <div class="visitor-time">
            🕒 ${item.waktu || ""}
          </div>

          <h3>
            👤 ${item.nama || "Pengunjung"}
          </h3>

          <p>
            ${item.pesan || ""}
          </p>
        `;

        container.appendChild(card);

      });

    })

    .catch(function(error) {

      console.error(error);

      container.innerHTML =
        "<p>Gagal memuat data.</p>";

    });
}


document.addEventListener(
  "DOMContentLoaded",
  function() {
    loadVisitorMessages();
  }
);