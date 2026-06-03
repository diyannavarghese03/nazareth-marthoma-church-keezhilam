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
addRevealClass('.contact-map-wrap');
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


/* ===== DARK MODE & LIGHT MODE ===== */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.title = isDark ? 'Toggle Light Theme' : 'Toggle Dark Theme';
  });
}

/* ===== LANGUAGE TRANSLATION SYSTEM ===== */
const translations = {
  ml: {
    "nav-title": "കീഴില്ലം നസ്രേത്ത് മാർത്തോമ്മ ചർച്ച്",
    "nav-home": "ആമുഖം",
    "nav-about": "ഞങ്ങളെ കുറിച്ച്",
    "nav-verse": "വചനം",
    "nav-leaders": "നേതൃത്വം",
    "nav-gallery": "ദൃശ്യങ്ങൾ",
    "nav-contact": "ബന്ധപ്പെടുക",
    "hero-sub": "മലങ്കര മാർത്തോമ്മ സുറിയാനി സഭ",
    "hero-title": "കീഴില്ലം നസ്രേത്ത്<br/>മാർത്തോമ്മ ചർച്ച്",
    "hero-tagline": "ആരാധന &bull; ഐക്യം &bull; സേവനം",
    "hero-worship": "ഞായറാഴ്ച വി. കുർബാന — രാവിലെ 8:30",
    "hero-btn": "കൂടുതൽ അറിയുക",
    "verse-1-text": '"ഇതാ, സഹോദരന്മാർ ഒന്നിച്ചു വസിക്കുന്നത് എത്ര നല്ലതും മനോഹരവും!"',
    "verse-1-ref": "— സങ്കീർത്തനം 133:1",
    "about-label": "ഞങ്ങളെ കുറിച്ച്",
    "about-title": "ദൈവ സ്നേഹത്തിൽ<br/>ഒന്നുചേർന്ന ഇടവക",
    "about-p1": "കീഴില്ലം നസ്രേത്ത് മാർത്തോമ്മ ഇടവക, മലങ്കര മാർത്തോമ്മ സുറിയാനി സഭയുടെ കോട്ടയം-കൊച്ചി ഭദ്രാസനത്തിൽ ഉൾപ്പെടുന്ന ഒരു ജീവൽ ദൈവ സമൂഹമാണ്. ഇടവകാംഗങ്ങൾ ആരാധനയിലും, ഐക്യത്തിലും, ദൈവ സേവനത്തിലും ഒന്നിച്ചു ജീവിക്കുന്നു.",
    "about-p2": "ഞായറാഴ്ച ആരാധന, സൺഡേ സ്കൂൾ, യുവജനസഖ്യം, സേവികാ സംഘം എന്നിവ ഇടവകയുടെ ഊർജ്ജ സ്രോതസ്സുകൾ ആണ്.",
    "stat-worship": "ഞായറാഴ്ച<br/>ആരാധന",
    "stat-youth": "യുവജന<br/>സഖ്യം",
    "stat-sevika": "സേവികാ<br/>സംഘം",
    "verse-2-text": '"നാം അന്യോന്യം സ്നേഹിക്കാം — കൂടിവരുന്നത് ഉപേക്ഷിക്കാതെ, ആ ദിവസം അടുക്കുന്തോറും ഒന്നിച്ചു പ്രോത്സാഹിപ്പിച്ചുകൊണ്ടിരിക്കാം."',
    "verse-2-ref": "— എബ്രായർ 10:24-25",
    "leaders-label": "നേതൃത്വം",
    "leaders-title": "ഞങ്ങളുടെ ഭാരവാഹികൾ",
    "leaders-intro": "ദൈവ സ്നേഹത്തോടെ ഇടവകയെ നയിക്കുന്ന നേതൃനിര",
    "vicar-name": "റവ. അലക്സാണ്ടർ ജോർജ്",
    "vicar-role": "ഇടവക വികാരി",
    "vicar-desc": "കീഴില്ലം നസ്രേത്ത് ഇടവകയുടെ ഇപ്പോഴത്തെ ഇടവക വികാരി. ആരാധന, ദൈവ വചന ശുശ്രൂഷ, ഇടവക ഐക്യം എന്നിവ ഒരുക്കുന്ന ഇടവകയുടെ ആത്മീയ നേതൃത്വം.",
    "group-committee": "കൈസ്ഥാന സമിതി അംഗങ്ങൾ (2026 – 27)",
    "group-youth": "യുവജനസഖ്യം",
    "group-sevika": "സേവികാ സംഘം",
    "role-secretary": "സെക്രട്ടറി",
    "role-trustee": "ട്രസ്റ്റി",
    "role-rep": "ഇടവക പ്രതിനിധി",
    "role-senior": "സീനിയർ സിറ്റിസൺ ഫോറം",
    "role-ss": "സൺഡേ സ്കൂൾ സെക്രട്ടറി",
    "role-sevika-sec": "സേവികാ സംഘം സെക്രട്ടറി",
    "role-vp": "വൈസ് പ്രസിഡന്റ്",
    "role-js": "ജോയിൻ്റ് സെക്രട്ടറി",
    "role-treasurer": "ട്രഷറർ",
    "role-auditor": "കണക്ക് പരിശോധകൻ",
    "role-dio": "ഭദ്രാസന പ്രതിനിധി",
    "role-assembly": "കൈസ്ഥാന സമിതി പ്രതിനിധി",
    "role-member": "അംഗം",
    
    // 2026-27 Executive Committee Roles & Names
    "role-trustee-m": "ട്രസ്റ്റി (മുതൽ ചുമതല)",
    "role-trustee-k": "ട്രസ്റ്റി (കണക്ക് ചുമതല)",
    "role-lay-ministrant": "ആത്മായ ശുശ്രൂഷകൻ",
    "role-mandalam-rep": "മണ്ഡലം പ്രതിനിധി",
    "role-assembly-rep": "അസംബ്ലി പ്രതിനിധി",
    "role-edavaka-mission": "ഇടവക മിഷൻ പ്രതിനിധി",
    "role-sevika-rep": "സേവികാ സംഘം പ്രതിനിധി",
    "role-youth-rep": "യുവജനസഖ്യം പ്രതിനിധി",
    "role-ss-rep": "സൺഡേ സ്കൂൾ പ്രതിനിധി",
    "role-dev-rep": "വികസന സമിതി പ്രതിനിധി",
    "role-senior-rep": "സീനിയർ സിറ്റിസൺ പ്രതിനിധി",
    
    "leader-saju-name": "ശ്രീ. സാജു കെ. മാത്യു",
    "leader-joseph-name": "ശ്രീ. ജോസഫ് ദാനിയേൽ",
    "leader-thomas-name": "ശ്രീ. തോമസ് കെ. പോൾ",
    "leader-paul-name": "പോൾ കെ. ചെറിയാൻ",
    "leader-thampi-name": "ശ്രീ. എ. തമ്പി പോൾ",
    "leader-ebil-name": "ശ്രീ. എബിൽ ജോൺ സാം",
    "leader-jancy-name": "ശ്രീമതി. എം. കെ. ജാൻസി",
    "leader-thejus-name": "ശ്രീ. തേജസ് തോമസ് കാറ്റാടി",
    "leader-shibu-name": "ശ്രീ. ഷിബു കെ. വർഗീസ്",
    "leader-daisy-name": "ശ്രീമതി. ഡെയ്സി സാലു",
    "leader-jojo-name": "ശ്രീ. ജോജോ എസ്. വർഗീസ്",
    "leader-kunjumon-name": "ശ്രീ. വൈ. ഡി. കുഞ്ഞുമോൻ",
    "leader-jose-name": "ശ്രീ. ജോസ് കെ. ചാക്കോ",
    "leader-daniel-name": "ശ്രീ. എ. സി. ദാനിയേൽ",
    "leader-anoop-name": "ശ്രീ. അനൂപ് എബ്രഹാം",
    "leader-jolly-name": "ശ്രീമതി ജോളി തമ്പി",

    // 2026-27 Youth Committee Roles & Names
    "role-centre-rep": "സെൻ്റർ പ്രതിനിധി",
    "youth-vp-name": "ശ്രീ. ബോബൻ തോമസ്",
    "youth-sec-name": "ശ്രീ. കെവിൻ പോൾ തമ്പി",
    "youth-js-name": "ശ്രീമതി. നോറ എം. അലക്സ്",
    "youth-treasurer-name": "ശ്രീ. വരുൺ പി. വർഗീസ്",
    "youth-auditor-name": "ശ്രീമതി. പാവന മറിയം തോമസ്",
    "youth-centre-rep-1": "ശ്രീ. അബേൽ ജോൺ സാം",
    "youth-centre-rep-2": "ശ്രീമതി. തോഷ്മ മാത്യൂസ്",
    "youth-centre-rep-3": "ശ്രീ. സെഫാൻ തോമസ്",
    "youth-committee-rep": "ശ്രീ. ജോജോ എസ്. വർഗീസ്",
    "youth-dio-rep-1": "ശ്രീ. തേജസ് തോമസ്",
    "youth-dio-rep-2": "ശ്രീമതി. ദിയ ആൻ വർഗീസ്",

    "gallery-label": "ദൃശ്യങ്ങൾ",
    "gallery-title": "ഞങ്ങളുടെ ഇടവക",
    "cap-gate": "ഗേറ്റ് ദൃശ്യം",
    "cap-front": "ദേവാലയ മുൻഭാഗം",
    "cap-church": "ചർച്ച്",
    "cap-dist": "ദൂര ദൃശ്യം",
    "cap-night": "രാത്രി ദൃശ്യം",
    "verse-3-text": '"ഇവ എല്ലാറ്റിന്റെയും മുകളിൽ സ്നേഹം ധരിക്കുവിൻ; അത് ഐക്യത്തിന്റെ തികഞ്ഞ ബന്ധമാകുന്നു."',
    "verse-3-ref": "— കൊലൊസ്സ്യർ 3:14",
    "contact-label": "ബന്ധപ്പെടുക",
    "contact-title": "ഞങ്ങളിലേക്ക്<br/>എത്തിച്ചേരൂ",
    "card-church-title": "ദേവാലയം",
    "card-church-body": "കീഴില്ലം നസ്രേത്ത്<br/>മാർത്തോമ്മ ചർച്ച്<br/>കീഴില്ലം, കേരളം",
    "card-worship-title": "ആരാധനാ സമയം",
    "card-worship-body": "ഞായറാഴ്ച<br/>രാവിലെ 8:30<br/>വിശുദ്ധ കുർബാന",
    "card-vicar-title": "വികാരി",
    "card-vicar-body": "റവ. അലക്സാണ്ടർ<br/>ജോർജ് അച്ചൻ<br/>കീഴില്ലം നസ്രേത്ത്",
    "footer-church-name": "കീഴില്ലം നസ്രേത്ത് മാർത്തോമ്മ ചർച്ച്",
    "footer-denomination": "മലങ്കര മാർത്തോമ്മ സുറിയാനി സഭ",
    "footer-verse": '"ദൈവം സ്നേഹം ആകുന്നു" — 1 യോഹ. 4:8',
    "footer-copy": "© 2026 കീഴില്ലം നസ്രേത്ത് മാർത്തോമ്മ ചർച്ച്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം."
  },
  en: {
    "nav-title": "Keezhillam Nazareth Mar Thoma Church",
    "nav-home": "Home",
    "nav-about": "About Us",
    "nav-verse": "Verse",
    "nav-leaders": "Leaders",
    "nav-gallery": "Gallery",
    "nav-contact": "Contact",
    "hero-sub": "Malankara Mar Thoma Syrian Church",
    "hero-title": "Keezhillam Nazareth<br/>Mar Thoma Church",
    "hero-tagline": "Worship &bull; Unity &bull; Service",
    "hero-worship": "Sunday Holy Communion — 8:30 AM",
    "hero-btn": "Learn More",
    "verse-1-text": '"Behold, how good and pleasant it is when brothers dwell in unity!"',
    "verse-1-ref": "— Psalm 133:1",
    "about-label": "About Us",
    "about-title": "A Parish United<br/>in God\'s Love",
    "about-p1": "Keezhillam Nazareth Mar Thoma Parish is a vibrant, living faith community under the Kottayam-Kochi Diocese of the Malankara Mar Thoma Syrian Church. Our members live together in active worship, fellowship, and service.",
    "about-p2": "Sunday Worship, Sunday School, Youth Union, and Sevika Sangham are the pillars and sources of strength of our parish.",
    "stat-worship": "Sunday<br/>Worship",
    "stat-youth": "Youth<br/>Fellowship",
    "stat-sevika": "Sevika<br/>Sangham",
    "verse-2-text": '"Let us consider how to stir up one another to love and good works, not neglecting to meet together, but encouraging one another."',
    "verse-2-ref": "— Hebrews 10:24-25",
    "leaders-label": "Leaders",
    "leaders-title": "Our Leaders & Committee",
    "leaders-intro": "Leading our parish with God\'s love and wisdom",
    "vicar-name": "Rev. Alexander George",
    "vicar-role": "Parish Vicar",
    "vicar-desc": "The current Vicar of Keezhillam Nazareth Parish, providing spiritual leadership in worship, word, and building unity within the community.",
    "group-committee": "Executive Committee Members (2026 – 27)",
    "group-youth": "Youth Fellowship",
    "group-sevika": "Sevika Sangham",
    "role-secretary": "Secretary",
    "role-trustee": "Trustee",
    "role-rep": "Parish Representative",
    "role-senior": "Senior Citizen Forum",
    "role-ss": "Sunday School Secretary",
    "role-sevika-sec": "Sevika Sangham Secretary",
    "role-vp": "Vice President",
    "role-js": "Joint Secretary",
    "role-treasurer": "Treasurer",
    "role-auditor": "Auditor",
    "role-dio": "Diocesan Representative",
    "role-assembly": "Assembly Representative",
    "role-member": "Member",

    // 2026-27 Executive Committee Roles & Names
    "role-trustee-m": "Trustee (Assets)",
    "role-trustee-k": "Trustee (Accounts)",
    "role-lay-ministrant": "Lay Ministrant",
    "role-mandalam-rep": "Diocesan Mandalam Rep",
    "role-assembly-rep": "Sabha Mandalam Rep",
    "role-edavaka-mission": "Edavaka Mission Rep",
    "role-sevika-rep": "Sevika Sangham Rep",
    "role-youth-rep": "Youth Fellowship Rep",
    "role-ss-rep": "Sunday School Rep",
    "role-dev-rep": "Development Committee Rep",
    "role-senior-rep": "Senior Citizen Rep",

    "leader-saju-name": "Sri. Saju K. Mathew",
    "leader-joseph-name": "Sri. Joseph Daniel",
    "leader-thomas-name": "Sri. Thomas K. Paul",
    "leader-paul-name": "Paul K. Cherian",
    "leader-thampi-name": "Sri. A. Thampi Paul",
    "leader-ebil-name": "Sri. Ebil John Sam",
    "leader-jancy-name": "Smt. M. K. Jancy",
    "leader-thejus-name": "Sri. Thejus Thomas Kattady",
    "leader-shibu-name": "Sri. Shibu K. Varghese",
    "leader-daisy-name": "Smt. Daisy Salu",
    "leader-jojo-name": "Sri. Jojo S. Varghese",
    "leader-kunjumon-name": "Sri. Y. D. Kunjumon",
    "leader-jose-name": "Sri. Jose K. Chacko",
    "leader-daniel-name": "Sri. A. C. Daniel",
    "leader-anoop-name": "Sri. Anoop Abraham",
    "leader-jolly-name": "Smt. Jolly Thampi",

    // 2026-27 Youth Committee Roles & Names
    "role-centre-rep": "Centre Representative",
    "youth-vp-name": "Boban Thomas",
    "youth-sec-name": "Kevin Paul Thampy",
    "youth-js-name": "Nora M Alex",
    "youth-treasurer-name": "Varun P Varghese",
    "youth-auditor-name": "Pavana Mariam Thomas",
    "youth-centre-rep-1": "Abel John Sam",
    "youth-centre-rep-2": "Toshma Mathews",
    "youth-centre-rep-3": "Zephan Thomas",
    "youth-committee-rep": "Jojo S Varghese",
    "youth-dio-rep-1": "Thejus Thomas",
    "youth-dio-rep-2": "Diya Ann Varghese",

    "gallery-label": "Gallery",
    "gallery-title": "Our Parish Gallery",
    "cap-gate": "Gate View",
    "cap-front": "Church Front View",
    "cap-church": "Church",
    "cap-dist": "Long Distance View",
    "cap-night": "Night View",
    "verse-3-text": '"And above all these put on love, which binds everything together in perfect harmony."',
    "verse-3-ref": "— Colossians 3:14",
    "contact-label": "Contact Us",
    "contact-title": "Reach Out<br/>to Us",
    "card-church-title": "Church Office",
    "card-church-body": "Keezhillam Nazareth<br/>Mar Thoma Church<br/>Keezhillam, Kerala",
    "card-worship-title": "Worship Timings",
    "card-worship-body": "Sunday<br/>8:30 AM<br/>Holy Communion",
    "card-vicar-title": "Parish Priest",
    "card-vicar-body": "Rev. Alexander<br/>George (Vicar)<br/>Keezhillam Nazareth",
    "footer-church-name": "Keezhillam Nazareth Mar Thoma Church",
    "footer-denomination": "Malankara Mar Thoma Syrian Church",
    "footer-verse": '"God is love" — 1 John 4:8',
    "footer-copy": "© 2026 Keezhillam Nazareth Mar Thoma Church. All Rights Reserved."
  }
};

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  let currentLang = 'ml'; // Default is Malayalam
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ml' ? 'en' : 'ml';
    langToggle.textContent = currentLang === 'ml' ? 'EN' : 'ML';
    langToggle.title = currentLang === 'ml' ? 'Switch to English' : 'Switch to Malayalam';
    
    // Switch all translatable contents
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[currentLang] && translations[currentLang][key]) {
        el.innerHTML = translations[currentLang][key];
      }
    });
  });
}

