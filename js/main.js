document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  const portfolioLink = document.querySelector('.header-actions .btn-download');
  const headerActions = document.querySelector('.header-actions');

  if (toggle && nav) {
    const syncPortfolioLink = () => {
      if (!portfolioLink || !headerActions) return;

      if (window.innerWidth <= 980 && portfolioLink.parentElement !== nav) {
        nav.append(portfolioLink);
      } else if (window.innerWidth > 980 && portfolioLink.parentElement !== headerActions) {
        headerActions.insertBefore(portfolioLink, headerActions.firstChild);
      }
    };

    syncPortfolioLink();
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    nav.querySelectorAll('.nav-item.has-dropdown').forEach((item) => {
      const link = item.querySelector(':scope > a');
      const menu = item.querySelector('.dropdown-menu');

      if (link && menu) {
        link.setAttribute('aria-expanded', 'false');
        link.addEventListener('click', (event) => {
          if (window.innerWidth <= 980) {
            const isOpen = menu.classList.toggle('open');
            link.setAttribute('aria-expanded', String(isOpen));
            event.preventDefault();
          }
        });
      }
    });

    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && !link.matches('.nav-item.has-dropdown > a') && window.innerWidth <= 980) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      syncPortfolioLink();

      if (window.innerWidth > 980) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        nav.querySelectorAll('.dropdown-menu.open').forEach((menu) => {
          menu.classList.remove('open');
          menu.previousElementSibling.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }
});
