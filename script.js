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