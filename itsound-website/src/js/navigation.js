/**
 * ITSound — Navigation Island
 * Floating glass pill with smart scroll, active tracking, full-screen mobile overlay
 */
let lastScroll = 0;
let ticking = false;

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');
  
  if (!navbar) return;

  // ── Smart scroll: hide/show island ──
  const onScroll = () => {
    const currentScroll = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        // Shrink on scroll
        if (currentScroll > 80) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Hide/show based on direction
        if (currentScroll > lastScroll && currentScroll > 200) {
          navbar.classList.add('nav-hidden');
        } else {
          navbar.classList.remove('nav-hidden');
        }

        // Update active link based on sections
        updateActiveLink(currentScroll);

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Hamburger toggle (mobile) ──
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (overlay) {
        overlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        hamburger.classList.toggle('active');
      }
    });
  }

  // ── Mobile menu: close on link click ──
  if (overlay) {
    overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
        if (hamburger) hamburger.classList.remove('active');
      });
    });
  }

  // ── Close overlay on Escape ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (hamburger) hamburger.classList.remove('active');
    }
  });

  // ── Smooth anchor scroll with offset ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function updateActiveLink(scrollY) {
  const sections = document.querySelectorAll('.section, #hero');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
