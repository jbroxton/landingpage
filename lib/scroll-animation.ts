// This utility will be used to activate CSS animations when elements come into view

export function setupScrollAnimation() {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    root: null, // observing viewport
    threshold: 0.1, // trigger when at least 10% of the element is visible
    rootMargin: '-100px 0px' // trigger a bit after element enters viewport
  });

  // Select all elements with the 'reveal' class
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(element => {
    observer.observe(element);
  });

  return () => {
    revealElements.forEach(element => {
      observer.unobserve(element);
    });
  };
}