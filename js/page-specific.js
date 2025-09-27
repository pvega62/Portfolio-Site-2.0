
// Copy of the observer/offset logic from index.html so the behavior matches site-wide
window.addEventListener('load', function () {
  const navbar = document.querySelector('.sticky-top');
  // Ensure navbar renders in the dark state on initial load
  if (navbar) navbar.classList.remove('over-tan');
// look for either a dedicated light-section (InnoGear) or the page's tan bands
const lightSection = document.querySelector('.light-section');
const tanBand = document.querySelector('.bg-tan');
  const main = document.getElementById('main-content') || document.querySelector('main');

  function applyNavbarOffset() {
    if (!navbar) return;
    const h = navbar.getBoundingClientRect().height || 0;
    if (main) {
      main.style.paddingTop = h + 'px';
    } else {
      document.body.style.paddingTop = h + 'px';
    }
  }
  applyNavbarOffset();

  function createObserver() {
    const navbarHeight = navbar.getBoundingClientRect().height || 0;
    // only toggle to the tan state if the section intersects AND the user has scrolled
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && window.scrollY > 0) {
          navbar.classList.add('over-tan');
        } else {
          navbar.classList.remove('over-tan');
        }
      });
    }, { root: null, rootMargin: `-${navbarHeight}px 0px 0px 0px`, threshold: 0 });
    return observer;
  }

  // prefer observing an explicit .light-section, otherwise observe the first .bg-tan band
  const observedElement = lightSection || tanBand;
  if (observedElement && navbar) {
    let observer = createObserver();
    // delay attaching the observer just slightly to avoid race on very fast loads
    setTimeout(() => observer.observe(observedElement), 30);

    function checkOverlap() {
      if (!navbar || !observedElement) return;
      const navRect = navbar.getBoundingClientRect();
      const secRect = observedElement.getBoundingClientRect();
      const isOverlapping = secRect.top <= navRect.bottom && secRect.bottom > navRect.top;
      if (isOverlapping) navbar.classList.add('over-tan'); else navbar.classList.remove('over-tan');
    }
    let scrollTimeout;
    window.addEventListener('scroll', () => { clearTimeout(scrollTimeout); scrollTimeout = setTimeout(checkOverlap, 25); }, { passive: true });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        observer.disconnect(); observer = createObserver(); observer.observe(observedElement); applyNavbarOffset();
      }, 120);
    });

    const collapseEl = document.getElementById('navbarNav');
    if (collapseEl) {
      collapseEl.addEventListener('shown.bs.collapse', () => { observer.disconnect(); observer = createObserver(); observer.observe(observedElement); applyNavbarOffset(); });
      collapseEl.addEventListener('hidden.bs.collapse', () => { observer.disconnect(); observer = createObserver(); observer.observe(observedElement); applyNavbarOffset(); });
    }
  }
});
