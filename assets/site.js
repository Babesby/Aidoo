const body = document.body;
const toggle = document.querySelector('.mobile-nav-toggle');
const menu = document.querySelector('#navmenu');
const menuIcon = toggle.querySelector('i');
const desktopNav = window.matchMedia('(min-width: 1200px)');
const scrollTop = document.querySelector('.scroll-top');

function setMenu(open) {
  body.classList.toggle('mobile-nav-active', open);
  menuIcon.classList.toggle('bi-list', !open);
  menuIcon.classList.toggle('bi-x', open);
  toggle.setAttribute('aria-expanded', String(open));
}

toggle.addEventListener('click', () => setMenu(!body.classList.contains('mobile-nav-active')));
document.addEventListener('click', (event) => {
  if (body.classList.contains('mobile-nav-active') && !menu.contains(event.target)) setMenu(false);
});
desktopNav.addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});
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
