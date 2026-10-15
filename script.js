// Dynamic navbar logic for eye-catching UX
document.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.style.height = '75px';
    header.style.boxShadow = '0 10px 30px rgba(13, 43, 36, 0.05)';
  } else {
    header.style.height = '90px';
    header.style.boxShadow = 'none';
  }
});

// Menu Toggle Action with Animations
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  
  const bars = menuToggle.querySelectorAll('.bar');
  if (isOpen) {
    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});
