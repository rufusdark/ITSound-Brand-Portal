/**
 * Subtle hero animation — waveform bars
 * Lightweight, no Three.js, just Canvas 2D
 */
let canvas, ctx, bars, animationId;
const BAR_COUNT = 60;

export function initHeroAnimation() {
  canvas = document.getElementById('heroWaveform');
  if (!canvas) return;

  const hero = document.getElementById('hero');
  if (!hero) return;

  ctx = canvas.getContext('2d');
  
  resize();
  window.addEventListener('resize', resize);

  // Generate bar heights with a musical shape
  bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const t = i / BAR_COUNT;
    // Envelope: gentle rise and fall
    const envelope = Math.sin(t * Math.PI);
    // Random base height
    const base = 0.3 + Math.random() * 0.7;
    bars.push({
      target: base * envelope,
      current: base * envelope * 0.5,
      speed: 0.01 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
    });
  }

  animate();
}

function resize() {
  if (!canvas) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  if (!ctx || !canvas) return;

  const w = canvas.width;
  const h = canvas.height;
  
  ctx.clearRect(0, 0, w, h);

  const barW = 2;
  const gap = 4;
  const totalW = BAR_COUNT * (barW + gap);
  const startX = (w - totalW) / 2;
  const maxH = h * 0.15;
  const baseY = h * 0.52;

  const time = Date.now() / 1000;

  for (let i = 0; i < BAR_COUNT; i++) {
    const b = bars[i];
    
    // Subtle sine wave animation
    const wave = Math.sin(time * b.speed + b.phase) * 0.3;
    const height = Math.max(2, (b.target + wave) * maxH);

    const x = startX + i * (barW + gap);
    const y = baseY - height / 2;

    // Gradient from purple to transparent
    const alpha = 0.08 + (b.target * 0.12);
    ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
    ctx.fillRect(x, y, barW, height);
  }
}

export function destroyHeroAnimation() {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  canvas = null;
  ctx = null;
}
