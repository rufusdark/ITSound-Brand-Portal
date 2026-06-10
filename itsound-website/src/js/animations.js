import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  ScrollTrigger.getAll().forEach(st => st.kill());

  // ── Hero Dramatic Entrance ──
  const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Badge: slide + fade
  heroTL
    .fromTo('.hero-badge', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3);

  // Hero title: split reveal with scale
  heroTL
    .fromTo('.hero-line-1', {
      y: 100,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(8px)',
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
    }, 0.5)

    .fromTo('.hero-line-2', {
      y: 80,
      opacity: 0,
      x: -30,
    }, {
      y: 0,
      opacity: 1,
      x: 0,
      duration: 1,
    }, 0.7);

  // Subtitle
  heroTL
    .fromTo('.hero-subtitle', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
    }, 0.9);

  // Buttons: stagger in
  heroTL
    .fromTo('.hero-actions .btn', {
      y: 40,
      opacity: 0,
      scale: 0.95,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.15,
      duration: 0.7,
    }, 1.1);

  // Player card: slide in from right
  heroTL
    .fromTo('.its-player', {
      x: 80,
      opacity: 0,
      scale: 0.9,
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
    }, 1.0);

  // Scroll indicator: fade in last
  heroTL
    .fromTo('.scroll-indicator', {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, 1.6);

  // ── Section Reveals ──
  document.querySelectorAll('.section').forEach((section) => {
    gsap.fromTo(section,
      { y: 80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );
  });

  // ── Grid Card Staggers ──
  document.querySelectorAll('.artists-grid, .releases-grid, .services-grid, .territory-cards').forEach((grid) => {
    gsap.fromTo(grid.children,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  });

  // ── Counters ──
  document.querySelectorAll('.counter').forEach((el) => {
    const target = parseInt(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    gsap.fromTo(el,
      { textContent: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          const val = Math.round(gsap.getProperty(this.targets()[0], 'textContent'));
          el.textContent = val + suffix;
        },
      }
    );
  });

  // ── Parallax Wrap ──
  document.querySelectorAll('.parallax-wrap').forEach((el) => {
    gsap.to(el.querySelector('.about-bg-text'), {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -40,
      ease: 'none',
    });
  });

  ScrollTrigger.refresh();
}

export function refreshAnimations() {
  ScrollTrigger.refresh();
}
