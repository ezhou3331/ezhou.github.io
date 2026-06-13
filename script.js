// ── Force scroll to top on load ──
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ── Navbar: transparent → solid on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('solid', window.scrollY > 60);
});

// ── Hamburger ──
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
burger.addEventListener('click', () => navMenu.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) navMenu.classList.remove('open');
});

// ── Language toggle ──
const langToggle = document.getElementById('langToggle');
let zh = localStorage.getItem('lang') === 'zh';

function applyTranslations(lang) {
  if (typeof TRANSLATIONS === 'undefined') return;
  const t = TRANSLATIONS[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
}

if (langToggle) {
  if (zh) {
    langToggle.textContent = 'EN';
    applyTranslations('zh');
  }
  langToggle.addEventListener('click', () => {
    zh = !zh;
    localStorage.setItem('lang', zh ? 'zh' : 'en');
    langToggle.textContent = zh ? 'EN' : '中文';
    applyTranslations(zh ? 'zh' : 'en');
  });
}

// ── Contact form ──
function submitForm(e) {
  e.preventDefault();
  const msg = document.getElementById('formSuccess');
  msg.style.display = 'block';
  e.target.reset();
  setTimeout(() => msg.style.display = 'none', 5000);
}


// ── Scroll fade in + fade out ──
function initFadeAnimations() {
  const els = document.querySelectorAll('.fade-in, .fade-in-children');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      target.classList.toggle('visible', isIntersecting);
    });
  }, { threshold: 0.08 });

  els.forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFadeAnimations);
} else {
  initFadeAnimations();
}
