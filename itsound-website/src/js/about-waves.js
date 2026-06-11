/**
 * ITSound — Vinyl Wave ambient background
 * Canvas 2D organic sine waves for the About section.
 * ~1.3 KB, no dependencies.
 */

const WAVE_DEFS = [
  {
    color: 'rgba(139, 92, 246, 0.13)',
    amplitude: 20,
    frequency: 0.007,
    speed: 0.25,
    offsetY: 0.2,
    harmonics: [
      { amp: 6, freq: 0.015, phase: 1.2 },
      { amp: 3, freq: 0.025, phase: 2.8 },
    ],
  },
  {
    color: 'rgba(6, 214, 160, 0.09)',
    amplitude: 14,
    frequency: 0.011,
    speed: 0.40,
    offsetY: 0.42,
    harmonics: [
      { amp: 5, freq: 0.020, phase: 0.5 },
    ],
  },
  {
    color: 'rgba(167, 139, 250, 0.07)',
    amplitude: 10,
    frequency: 0.016,
    speed: 0.60,
    offsetY: 0.63,
    harmonics: [
      { amp: 4, freq: 0.030, phase: 1.8 },
      { amp: 2, freq: 0.040, phase: 3.5 },
    ],
  },
  {
    color: 'rgba(139, 92, 246, 0.05)',
    amplitude: 26,
    frequency: 0.004,
    speed: 0.15,
    offsetY: 0.85,
    harmonics: [
      { amp: 8, freq: 0.010, phase: 0.9 },
      { amp: 4, freq: 0.018, phase: 4.2 },
    ],
  },
];

export function initAboutWaves() {
  const canvas = document.getElementById('aboutWaves');
  if (!canvas) return;

  const section = canvas.closest('.about');
  if (!section) return;

  const ctx = canvas.getContext('2d');
  let animId = null;
  let isVisible = false;

  function resize() {
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
  }

  function draw(time) {
    if (!isVisible) return;

    const w = parseFloat(canvas.style.width) || canvas.width;
    const h = parseFloat(canvas.style.height) || canvas.height;

    ctx.clearRect(0, 0, w, h);

    const t = time * 0.001; // seconds

    WAVE_DEFS.forEach((wave) => {
      const cy = h * wave.offsetY;
      ctx.beginPath();
      ctx.moveTo(0, cy);

      for (let x = 0; x <= w; x += 1) {
        // Base sine
        let y = Math.sin(x * wave.frequency + t * wave.speed) * wave.amplitude;

        // Harmonics for organic richness
        wave.harmonics.forEach((h) => {
          y += Math.sin(x * h.freq + t * wave.speed * 1.3 + h.phase) * h.amp;
        });

        ctx.lineTo(x, cy + y);
      }

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    animId = requestAnimationFrame(draw);
  }

  function start() {
    if (animId) return;
    isVisible = true;
    animId = requestAnimationFrame(draw);
  }

  function stop() {
    isVisible = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // IntersectionObserver — only animate when visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(section);

  // Resize
  const ro = new ResizeObserver(() => {
    const wasRunning = isVisible;
    if (wasRunning) stop();
    resize();
    if (wasRunning) start();
  });
  ro.observe(section);

  // Initial setup
  resize();
  start();

  // Cleanup on destroy
  return () => {
    stop();
    observer.disconnect();
    ro.disconnect();
    canvas.remove();
  };
}
