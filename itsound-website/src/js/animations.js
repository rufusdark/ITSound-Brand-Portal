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

  // Hero title — logo reveal with scale + blur
  heroTL
    .fromTo('.hero-logo-img', {
      y: 60,
      opacity: 0,
      scale: 0.85,
      filter: 'blur(6px)',
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power4.out',
    }, 0.35)

    .set('.hero-line-2', { opacity: 1, y: 0, x: 0 }, 0.79)
    .fromTo('.char', {
      y: 50,
      opacity: 0,
      rotateZ: -15,
    }, {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      stagger: 0.04,
      duration: 0.55,
      ease: 'power3.out',
    }, 0.8);

  // Subtitle — split line reveal (yPercent + fade)
  heroTL
    .fromTo('.subtitle-line-inner', {
      yPercent: 100,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power4.out',
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

  // Hero meta / social proof: fade up
  heroTL
    .fromTo('.hero-meta', {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
    }, 1.3);

  // Hero counters: animate numbers (0→15, 0→50)
  document.querySelectorAll('.hero-meta .counter').forEach((el) => {
    const target = parseInt(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const baseText = el.nextSibling ? el.nextSibling.textContent : '';
    heroTL
      .fromTo(el, { textContent: 0 }, {
        textContent: target,
        duration: 1.8,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          const val = Math.round(gsap.getProperty(this.targets()[0], 'textContent'));
          el.textContent = val + suffix;
        },
      }, 1.5);
  });

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

  // ── About text line reveal ──
  gsap.fromTo('.about-line-inner', {
    yPercent: 100,
    opacity: 0,
  }, {
    yPercent: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
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

  // ── Enhanced "By the Numbers" Counters ──
  const statsRow = document.getElementById('statsRow');
  if (statsRow) {
    const statCards = statsRow.querySelectorAll('.stat-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRow,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });

    // Stagger card entrance
    tl.fromTo(statCards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out' }
    );

    // Animate each counter + bar
    statCards.forEach((card, i) => {
      const numEl = card.querySelector('.counter');
      const barFill = card.querySelector('.stat-bar-fill');
      const target = parseInt(numEl.dataset.target) || 0;
      const suffix = numEl.dataset.suffix || '';

      // Bar fill: map target to percentage (cap at 100)
      const pct = Math.min(target, 100);

      tl.to(barFill, { width: pct + '%', duration: 0.8, ease: 'power2.out' }, `>-0.3`);
      tl.to(numEl, {
        textContent: target,
        duration: 1.6,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          const val = Math.round(gsap.getProperty(this.targets()[0], 'textContent'));
          numEl.textContent = val + suffix;
        },
      }, `>-0.6`);
    });
  }

  // ── Parallax Wrap ──
  document.querySelectorAll('.parallax-wrap').forEach((el) => {
    gsap.fromTo(el.querySelector('.about-bg'),
      {
        y: 0,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -30,
        scale: 1.04,
        ease: 'none',
      }
    );
  });

  // ── Stat Card Expand on Click (accordion) ──
  initStatCards();

  ScrollTrigger.refresh();
}

export function refreshAnimations() {
  ScrollTrigger.refresh();
}

function initStatCards() {
  const cards = document.querySelectorAll('.stat-card[data-expandable]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const header = card.querySelector('.stat-card-header');
    const expand = card.querySelector('.stat-expand');
    const inner = card.querySelector('.stat-expand-inner');
    if (!header || !expand || !inner) return;

    header.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = card.classList.contains('is-open');

      // Close all cards first
      cards.forEach((other) => {
        if (other !== card && other.classList.contains('is-open')) {
          const otherExpand = other.querySelector('.stat-expand');
          other.classList.remove('is-open');
          gsap.to(otherExpand, {
            maxHeight: 0,
            duration: 0.4,
            ease: 'power3.inOut',
          });
        }
      });

      if (isOpen) {
        // Close this card
        card.classList.remove('is-open');
        gsap.to(expand, {
          maxHeight: 0,
          duration: 0.4,
          ease: 'power3.inOut',
        });
      } else {
        // Open this card
        card.classList.add('is-open');
        // Get scrollHeight of the inner content
        const h = inner.scrollHeight;
        gsap.to(expand, {
          maxHeight: h + 2,
          duration: 0.5,
          ease: 'power3.inOut',
        });
      }
    });
  });
}
