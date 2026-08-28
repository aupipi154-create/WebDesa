const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// Menu mobile

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


// Tutup menu setelah memilih halaman

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navMenu.classList.remove("active");

    });

});


// Form kontak

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    alert(
        "Terima kasih! Pesan Anda berhasil dikirim."
    );

    form.reset();

});