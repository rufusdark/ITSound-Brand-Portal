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

gsap.registerPlugin(ScrollTrigger);

function init() {
  initNavigation();

  const loader = document.getElementById('pageLoader');

  if (loader) {
    const textGroup = loader.querySelector('.loader-text-group');
    const subtitle = loader.querySelector('.loader-subtitle');
    const progressWrap = loader.querySelector('.loader-progress-wrap');
    const progressBar = document.getElementById('loaderProgressBar');
    const progressPct = document.getElementById('loaderProgressPct');
    const ringProgress = document.getElementById('loaderRingProgress');
    const circumference = 339.3;

    // ── Phase 1: Animate loader content ──
    const preTL = gsap.timeline();
    preTL
      .to(textGroup, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .to(subtitle, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .to(progressWrap, { opacity: 1, duration: 0.3 }, '-=0.1')
      .to(progressPct, { opacity: 1, duration: 0.3 }, '-=0.1');

    // ── Phase 2: Progress bar fills ──
    preTL
      .to({ val: 0 }, {
        val: 100,
        duration: 2.0,
        ease: 'power2.inOut',
        onUpdate: function () {
          const pct = Math.round(this.targets()[0].val);
          if (progressBar) progressBar.style.width = pct + '%';
          if (progressPct) progressPct.textContent = pct + '%';
          if (ringProgress) {
            ringProgress.style.strokeDashoffset = circumference * (1 - pct / 100);
          }
        },
      }, 0.8);

    // ── Phase 3: Seamless loader exit + hero reveal ──
    preTL.to({}, {
      duration: 0.4,
      onStart: () => {
        // 1️⃣ Init background modules
        initSmoothScroll();
        initHero();
        initHeroAnimation();
        initHeroParticles();

        // 2️⃣ Start hero entrance GSAP + ScrollTrigger sections NOW
        //    (hero elements start at opacity:0 in CSS → animati in su mentre il loader svanisce)
        initAnimations();

        // 3️⃣ Fade out loader in parallel
        gsap.to(loader, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.05,
          onComplete: () => {
            loader.classList.add('hidden');
            loader.style.display = 'none';

            // Visual overlay init (cursor, player)
            initCursor();
            initPlayer();

            // Refresh per ScrollTrigger layouts a posto
            ScrollTrigger.refresh();
          }
        });
      }
    });
  } else {
    initSmoothScroll();
    initCursor();
    initHero();
    initHeroAnimation();
    initHeroParticles();
    initPlayer();
    initAnimations();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
