export function initHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Hero is now purely CSS/HTML with GSAP entrance animations
  // Background image is set via CSS using hero-bg.jpg
  // GSAP handles entrance stagger in animations.js

  // Parallax effect on scroll
  const bg = hero.querySelector('.hero-bg');
  if (!bg) return;

  window.addEventListener('scroll', () => {
    const rect = hero.getBoundingClientRect();
    const progress = -rect.top / rect.height;
    const offset = Math.max(0, Math.min(1, progress));
    bg.style.transform = `translateY(${offset * 60}px) scale(${1 + offset * 0.05})`;
  }, { passive: true });
}
