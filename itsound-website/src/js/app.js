import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCursor } from './cursor.js';
import { initHero } from './hero.js';
import { initHeroAnimation } from './hero-animation.js';
import { initHeroParticles } from './hero-particles.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initSmoothScroll } from './scroll.js';
import { initPlayer } from './player.js';
import { initMouseParallax } from './parallax-mouse.js';
import { initMagnetic } from './magnetic.js';
import { initFloatingPlayer } from './floating-player.js';

gsap.registerPlugin(ScrollTrigger);

function init() {
  // Bootstrap non-loader modules immediately
  initNavigation();

  // ── Cinematic Preloader ──  
  const loader = document.getElementById('pageLoader');
  if (loader) {
    const textGroup = loader.querySelector('.loader-text-group');
    const subtitle = loader.querySelector('.loader-subtitle');
    const progressWrap = loader.querySelector('.loader-progress-wrap');
    const progressBar = document.getElementById('loaderProgressBar');
    const progressPct = document.getElementById('loaderProgressPct');
    const ringProgress = document.getElementById('loaderRingProgress');

    const DURATION = 2.8;
    const circumference = 339.3;

    // 1) Animate loader content
    const tl = gsap.timeline({
      onComplete: () => {
        // 2) Fade out loader AND simultaneously init Lenis + visual modules
        const reveal = gsap.timeline();

        // Start Lenis at the same time as the fade-out begins
        initSmoothScroll();
        initHero();
        initHeroAnimation();
        initHeroParticles();

        // Fade out the loader
        reveal.to(loader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.classList.add('hidden');
            loader.style.display = 'none';

            // These can wait until loader is fully gone
            initCursor();
            initPlayer();
            initMagnetic();
            initFloatingPlayer();
            // Mouse parallax dopo l'entrata GSAP (evita conflitto transform)
            setTimeout(initMouseParallax, 2000);

            // Give Lenis + ScrollTrigger a frame to settle
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              initAnimations();
            });
          }
        });
      }
    });

    tl.to(textGroup, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .to(subtitle, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .to(progressWrap, { opacity: 1, duration: 0.3 }, '-=0.1')
      .to(progressPct, { opacity: 1, duration: 0.3 }, '-=0.1')
      .to({ val: 0 }, {
        val: 100,
        duration: DURATION - 1.2,
        ease: 'power2.inOut',
        onUpdate: function() {
          const pct = Math.round(this.targets()[0].val);
          if (progressBar) progressBar.style.width = pct + '%';
          if (progressPct) progressPct.textContent = pct + '%';
          if (ringProgress) {
            ringProgress.style.strokeDashoffset = circumference * (1 - pct / 100);
          }
        },
      }, 0.8)
      .to({}, { duration: 0.4 });

  } else {
    // No loader, init everything now
    initSmoothScroll();
    initCursor();
    initHero();
    initHeroAnimation();
    initHeroParticles();
    initPlayer();
    initFloatingPlayer();
    initMagnetic();
    setTimeout(initMouseParallax, 2000);
    setTimeout(initAnimations, 200);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
