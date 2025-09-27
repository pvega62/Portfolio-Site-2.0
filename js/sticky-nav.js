
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.sticky-top');
  const lightSection = document.querySelector('.light-section');

  if (!navbar || !lightSection) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navbar.classList.add('over-tan');
        } else {
          navbar.classList.remove('over-tan');
        }
      });
    },
    {
      root: null,
      rootMargin: '-70px 0px -70px 0px', // Adjust top and bottom margins to trigger the change when the section is close to the navbar
      threshold: 0,
    }
  );

  observer.observe(lightSection);
});
