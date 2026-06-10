import { initCursor } from './cursor.js';
import { initHero } from './hero.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initSmoothScroll } from './scroll.js';

function init() {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 500);
  }

  initNavigation();
  initCursor();
  initSmoothScroll();
  initHero();
  
  setTimeout(initAnimations, 200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
