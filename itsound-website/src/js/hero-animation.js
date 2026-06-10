/**
 * ITSound EQ Visualizer — Canvas 2D
 * Full-height EQ-style waveform with neon glow
 * Lightweight, no Three.js
 */
let canvas, ctx, bars, animationId;

export function initHeroAnimation() {
  canvas = document.getElementById('heroWaveform');
  if (!canvas) return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);

  const BAR_COUNT = 80;
  bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const t = i / BAR_COUNT;
    // Logarithmic-ish distribution: more bars in low frequencies
    const freq = Math.pow(t, 0.6);
    // Random base amplitude per band
    const base = 0.15 + Math.random() * 0.85;
    bars.push({
      target: base * (1 - Math.abs(freq - 0.5) * 0.3),
      current: 0,
      speed: 0.02 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      // Some bars "pulse" harder
      energy: 0.3 + Math.random() * 0.7,
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

  const time = Date.now() / 1000;
  const BAR_COUNT = bars.length;
  const barW = Math.max(2, Math.min(4, w / BAR_COUNT * 0.6));
  const gap = Math.max(2, barW * 0.5);
  const totalW = BAR_COUNT * (barW + gap);
  const startX = (w - totalW) / 2;

  // Draw bars from bottom-up
  for (let i = 0; i < BAR_COUNT; i++) {
    const b = bars[i];
    const freq = i / BAR_COUNT;

    // Multi-sine wave motion
    const wave1 = Math.sin(time * b.speed * 1.2 + b.phase);
    const wave2 = Math.sin(time * b.speed * 2.4 + b.phase * 1.7) * 0.3;
    const wave3 = Math.sin(time * b.speed * 0.6 + b.phase * 0.5) * 0.15;
    const motion = (wave1 + wave2 + wave3) / 1.45;

    // Smooth current toward target
    b.current += (b.target * (0.5 + (motion + 1) * 0.25) - b.current) * 0.05;

    const barHeight = Math.max(4, b.current * h * 0.55);
    const x = startX + i * (barW + gap);
    const y = h - barHeight - 2;

    // --- Neon glow effect ---
    // Layer 1: outer glow
    ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
    ctx.shadowBlur = 12;

    // Layer 2: the bar itself with gradient
    const alpha = 0.3 + b.current * 1.2;

    // Color shifts from purple (low) → cyan (mid) → purple-light (high)
    let r, g, bl;
    if (freq < 0.3) {
      // Low: deep purple → purple
      const t = freq / 0.3;
      r = 139; g = 92 + t * 54; bl = 246;
    } else if (freq < 0.6) {
      // Mid: purple → cyan
      const t = (freq - 0.3) / 0.3;
      r = 139 - t * 100; g = 146 + t * 20; bl = 246 - t * 100;
    } else {
      // High: cyan → purple-light
      const t = (freq - 0.6) / 0.4;
      r = 39 + t * 128; g = 166 - t * 62; bl = 146 + t * 20;
    }

    ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(bl)}, ${Math.min(1, alpha)})`;
    ctx.fillRect(x, y, barW, barHeight);

    // Layer 3: bright core (smaller, brighter)
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.15})`;
    const coreW = Math.max(1, barW * 0.4);
    const coreX = x + (barW - coreW) / 2;
    ctx.fillRect(coreX, y + 2, coreW, Math.max(2, barHeight - 4));
  }

  // Reset shadow for next frame
  ctx.shadowBlur = 0;
}

export function destroyHeroAnimation() {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  canvas = null;
  ctx = null;
}
