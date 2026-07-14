/* ============================================
   SNEHA SINGH – PORTFOLIO JS
   ============================================ */

/* ---------- NAVBAR: scroll shadow + active link ---------- */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 10);

  // Highlight active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});

// Close menu when a link is clicked
navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
  });
});

/* ---------- HERO TYPEWRITER ---------- */
const roles = [
  'BCA Student 🎓',
  'Web Developer 💻',
  'Python Enthusiast 🐍',
  'AI/ML Explorer 🤖',
  'Problem Solver 🧩'
];
const roleEl = document.getElementById('role-text');
let ri = 0, ci = 0, deleting = false;
const TYPE_SPEED   = 80;
const DELETE_SPEED = 45;
const PAUSE        = 1800;

function typeWriter() {
  const current = roles[ri];
  if (!deleting) {
    roleEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(typeWriter, PAUSE);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? DELETE_SPEED : TYPE_SPEED);
}
typeWriter();

/* ---------- SCROLL REVEAL ---------- */
const revealTargets = [
  '.section-header',
  '.about-text',
  '.about-education',
  '.edu-card',
  '.skill-category',
  '.project-card',
  '.ach-col',
  '.cert-card',
  '.contact-info',
  '.contact-form',
  '.about-stats'
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children inside the same parent
      const siblings = Array.from(entry.target.parentElement.children);
      const delay    = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(revealTargets.join(',')).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ---------- CONTACT FORM ---------- */
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled   = true;
  btn.textContent = 'Sending…';

  // Simulate async send (replace with real API call if needed)
  setTimeout(() => {
    form.reset();
    formSuccess.classList.add('show');
    btn.disabled    = false;
    btn.innerHTML   = 'Send Message &nbsp;<i class="fas fa-paper-plane"></i>';
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

/* ---------- SMOOTH SCROLL for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
