
window.addEventListener('load', function () {
      const navbar = document.querySelector('.sticky-top');
      // Ensure navbar renders in the dark state on initial load
      if (navbar) navbar.classList.remove('over-tan');
      const lightSection = document.querySelector('.light-section');

      // Because we made the navbar fixed for robustness, reserve layout space
      // so page content isn't hidden behind it. We set padding-top on <main>.
      const main = document.getElementById('main-content') || document.querySelector('main');
      function applyNavbarOffset() { // fix
        if (!navbar) return;
        const h = navbar.getBoundingClientRect().height || 0;
        if (main) {
          main.style.paddingTop = h + 'px';
        } else {
          // Fallback to body padding if main not found
          document.body.style.paddingTop = h + 'px';
        }
      }
  applyNavbarOffset();

      // Also watch for collapse events so the navbar height changes (mobile)
      const collapseEl = document.getElementById('navbarNav');
      if (collapseEl) {
        collapseEl.addEventListener('shown.bs.collapse', () => {
          applyNavbarOffset();
        });
        collapseEl.addEventListener('hidden.bs.collapse', () => {
          applyNavbarOffset();
        });
      }
    });
