import Lenis from 'lenis';

let lenis = null;

export function initSmoothScroll() {
  if (lenis) {
    lenis.destroy();
  }
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    autoRaf: true,
  });

  lenis.on('scroll', (e) => {
    const progress = document.getElementById('scrollProgress');
    if (progress) {
      const scrollPercent = (e.scroll / (e.limit || 1)) * 100;
      progress.style.width = scrollPercent + '%';
    }
  });
}

export function destroySmoothScroll() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
