import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  ScrollTrigger.getAll().forEach(st => st.kill());

  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTL
    .fromTo('.hero-badge', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.2)
    .fromTo('.hero-line-1', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.4)
    .fromTo('.hero-line-2', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.5)
    .fromTo('.hero-subtitle', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.7)
    .fromTo('.hero-actions .btn', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }, 0.9)
    .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.3);

  document.querySelectorAll('.section').forEach((section) => {
    gsap.fromTo(section,
      { y: 60, opacity: 0 },
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

  document.querySelectorAll('.artists-grid, .releases-grid, .services-grid, .territory-cards').forEach((grid) => {
    gsap.fromTo(grid.children,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  });

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
