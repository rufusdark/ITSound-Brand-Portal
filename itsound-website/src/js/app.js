import { gsap } from 'gsap';
import { initCursor } from './cursor.js';
import { initHero } from './hero.js';
import { initHeroAnimation } from './hero-animation.js';
import { initHeroParticles } from './hero-particles.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initSmoothScroll } from './scroll.js';
import { initPlayer } from './player.js';

function init() {
  // Bootstrap non-loader modules immediately
  initNavigation();

  // ── Cinematic Preloader ──  
  const loader = document.getElementById('pageLoader');
  if (loader) {
    const tl = gsap.timeline({
      onComplete: () => {
        // Reveal the page
        gsap.to(loader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.classList.add('hidden');
            loader.style.display = 'none';

            // Now init everything else
            initCursor();
            initSmoothScroll();
            initHero();
            initHeroAnimation();
            initHeroParticles();
            initPlayer();
            setTimeout(initAnimations, 200);
          }
        });
      }
    });

    const textGroup = loader.querySelector('.loader-text-group');
    const subtitle = loader.querySelector('.loader-subtitle');
    const progressWrap = loader.querySelector('.loader-progress-wrap');
    const progressBar = document.getElementById('loaderProgressBar');
    const progressPct = document.getElementById('loaderProgressPct');
    const ringProgress = document.getElementById('loaderRingProgress');
    const ringTrack = loader.querySelector('.loader-ring-track');

    const DURATION = 2.8; // total loading time in seconds
    const circumference = 339.3; // 2 * PI * 54

    // Phase 1: Logo fades in
    tl.to(textGroup, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
    });

    // Phase 2: Subtitle fades in
    tl.to(subtitle, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');

    // Phase 3: Progress bar appears and fills
    tl.to(progressWrap, {
      opacity: 1,
      duration: 0.3,
    }, '-=0.1');

    tl.to(progressPct, {
      opacity: 1,
      duration: 0.3,
    }, '-=0.1');

    // Animate progress from 0 to 100%
    tl.to({ val: 0 }, {
      val: 100,
      duration: DURATION - 1.2,
      ease: 'power2.inOut',
      onUpdate: function() {
        const pct = Math.round(this.targets()[0].val);
        if (progressBar) progressBar.style.width = pct + '%';
        if (progressPct) progressPct.textContent = pct + '%';
        // Ring progress
        if (ringProgress) {
          const offset = circumference * (1 - pct / 100);
          ringProgress.style.strokeDashoffset = offset;
        }
      },
    }, 0.8);

    // Phase 4: Brief pause then exit
    tl.to({}, { duration: 0.4 });

  } else {
    // No loader, init everything now
    initCursor();
    initSmoothScroll();
    initHero();
    initHeroAnimation();
    initHeroParticles();
    initPlayer();
    setTimeout(initAnimations, 200);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
