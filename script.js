// Scroll-reveal for each section block
const blocks = document.querySelectorAll('.block');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  blocks.forEach((b) => b.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  blocks.forEach((b) => observer.observe(b));
}

// Highlight active nav link based on scroll position
const navLinks = document.querySelectorAll('.tab-nav a');
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveLink() {
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top < 120) {
      current = section;
    }
  }
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current.id}` ? 'var(--accent-2)' : '';
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

function setIcon(theme) {
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
}

setIcon(document.documentElement.getAttribute('data-theme') || 'dark');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  setIcon(next);
});
