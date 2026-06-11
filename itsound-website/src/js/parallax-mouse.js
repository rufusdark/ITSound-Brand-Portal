/**
 * Mouse parallax — subtle depth effect on hero elements
 * Each layer moves at a different speed for a 3D feel.
 */

const LAYERS = [
  { selector: '.hero-badge',         mul: 0.06 },
  { selector: '.hero-line-1',        mul: 0.04 },
  { selector: '.hero-line-2',        mul: 0.03 },
  { selector: '.hero-subtitle',      mul: 0.02 },
  { selector: '.hero-player-col',    mul: 0.015 },
  { selector: '.hero-decor',         mul: -0.04 },
];

let ticking = false;
let mouseX = 0;
let mouseY = 0;

export function initMouseParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Normalize mouse position relative to hero center (-1 to +1)
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });

  // Reset on mouse leave
  hero.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
}

function update() {
  ticking = false;

  LAYERS.forEach(({ selector, mul }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const x = mouseX * mul * 40;  // max shift in px
    const y = mouseY * mul * 25;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}
