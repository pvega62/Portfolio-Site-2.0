
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

      // We'll observe the lightSection itself instead of using an extra sentinel element.

      // We want to know when the top edge of the light section enters the viewport
      // at the same vertical position as the navbar. Because the navbar is sticky
      // at the top, we observe the sentinel with a rootMargin equal to the navbar height
      // so the intersection threshold aligns with the navbar bottom.
      function createObserver() {
        const navbarHeight = navbar.getBoundingClientRect().height || 0;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            // Only switch to the tan state if the sentinel intersects AND the user has scrolled
            if (entry.isIntersecting) {
              navbar.classList.add('over-tan');
            } else {
              navbar.classList.remove('over-tan');
            }
          });
        }, {
          root: null,
          rootMargin: `-${navbarHeight}px 0px 0px 0px`,
          threshold: 0
        });

        return observer;
      }

  let observer = createObserver();
  // small delay to avoid race on very fast loads
  setTimeout(() => observer.observe(lightSection), 30);



      // Recreate observer when the navbar height may change (resize, toggler open/close)
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // Recreate observer so the rootMargin uses the updated navbar height
          observer.disconnect();
          observer = createObserver();
          observer.observe(lightSection);
          // Also update reserved layout space for the fixed navbar
          applyNavbarOffset();
        }, 120);
      });

      // Also watch for collapse events so the navbar height changes (mobile)
      const collapseEl = document.getElementById('navbarNav');
      if (collapseEl) {
        collapseEl.addEventListener('shown.bs.collapse', () => {
          observer.disconnect();
          observer = createObserver();
          observer.observe(lightSection);
          applyNavbarOffset();
        });
        collapseEl.addEventListener('hidden.bs.collapse', () => {
          observer.disconnect();
          observer = createObserver();
          observer.observe(lightSection);
          applyNavbarOffset();
        });
      }
    });
