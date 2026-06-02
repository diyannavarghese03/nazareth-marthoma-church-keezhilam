// ============================================================
//  NAZARETH MAR THOMA CHURCH — KEEZHILLAM
//  Main JavaScript
// ============================================================

/* ===== NAVBAR SCROLL BEHAVIOUR ===== */
const navbar = document.getElementById('navbar');
function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== HERO IMAGE SLIDESHOW ===== */
const heroImgs = document.querySelectorAll('.hero-img');
let currentHero = 0;
function rotateHero() {
  heroImgs[currentHero].classList.remove('active');
  currentHero = (currentHero + 1) % heroImgs.length;
  heroImgs[currentHero].classList.add('active');
}
setInterval(rotateHero, 5000);

/* ===== SCROLL REVEAL ===== */
function addRevealClass(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
}

addRevealClass('.verse-inner');
addRevealClass('.about-text-col');
addRevealClass('.about-image-col');
addRevealClass('.banner-verse-content');
addRevealClass('.vicar-card');
addRevealClass('.leader-card');
addRevealClass('.gallery-item');
addRevealClass('.contact-card');
addRevealClass('.leaders-header');
addRevealClass('.gallery-header');
addRevealClass('.leader-group-title');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid items
      const el = entry.target;
      const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${Math.min(idx * 90, 600)}ms`;
      el.classList.add('visible');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== SMOOTH ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let scrollY = window.scrollY + 80;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => {
        a.style.opacity = '0.65';
        a.style.fontWeight = '400';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) {
        activeLink.style.opacity = '1';
        activeLink.style.fontWeight = '600';
      }
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

/* ===== PARALLAX BACKGROUND ===== */
const heroBg = document.querySelector('.hero-image-wrap');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const offset = window.scrollY * 0.3;
    heroBg.style.transform = `translateY(${offset}px)`;
  }
}, { passive: true });
