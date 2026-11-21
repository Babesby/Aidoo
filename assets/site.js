const body = document.body;
const toggle = document.querySelector('.mobile-nav-toggle');
const scrollTop = document.querySelector('.scroll-top');

function setMenu(open) {
  body.classList.toggle('mobile-nav-active', open);
  toggle.classList.toggle('bi-list', !open);
  toggle.classList.toggle('bi-x', open);
  toggle.setAttribute('aria-expanded', String(open));
}

toggle.addEventListener('click', () => setMenu(!body.classList.contains('mobile-nav-active')));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('mobile-nav-active')) {
    setMenu(false);
    toggle.focus();
  }
});

function updateScrollState() {
  const scrolled = window.scrollY > 100;
  body.classList.toggle('scrolled', scrolled);
  scrollTop.classList.toggle('active', scrolled);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();
scrollTop.addEventListener('click', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});
