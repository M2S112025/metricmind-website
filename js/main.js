document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-item.has-dropdown').forEach((item) => {
    item.addEventListener('click', (event) => {
      if (window.innerWidth <= 980) {
        const menu = item.querySelector('.dropdown-menu');
        if (menu) {
          event.preventDefault();
          menu.classList.toggle('open');
          menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });
});
