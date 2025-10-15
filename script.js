// Animasi Scroll Reveal
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150; // Jarak dari bawah layar sebelum animasi muncul

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      // Uncomment baris di bawah jika ingin animasi berulang setiap kali scroll
      // reveals[i].classList.remove("active");
    }
  }
}

// Menjalankan fungsi saat scroll
window.addEventListener("scroll", reveal);

// Menjalankan fungsi saat pertama kali load
reveal();
// Menjalankan fungsi saat scroll
window.addEventListener("scroll", reveal);

// Menjalankan fungsi saat pertama kali load
reveal();

const scrollUpBtn = document.getElementById('scrollUpBtn');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollUpBtn.style.display = 'block';
    } else {
        scrollUpBtn.style.display = 'none';
    }
});
scrollUpBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
