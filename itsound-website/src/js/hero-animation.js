/**
 * ITSound Aurora Fluid — Canvas 2D
 * Organic fluid aurora bands with starfield
 * Inspired by northern lights / nebula aesthetic
 * Zero dependencies, pure Canvas 2D
 */
let canvas, ctx, animationId, time;

export function initHeroAnimation() {
  canvas = document.getElementById('heroWaveform');
  if (!canvas) return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  ctx = canvas.getContext('2d');
  time = 0;

  resize();
  window.addEventListener('resize', resize);
  animate();
}

function resize() {
  if (!canvas) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

// ─── Palette ───
// Deep purple → violet → cyan → dark
const COLORS = [
  { r: 139, g: 92,  b: 246 },  // purple
  { r: 100, g: 60,  b: 200 },  // deep violet
  { r: 60,  g: 120, b: 220 },  // blue-violet
  { r: 30,  g: 160, b: 200 },  // teal
  { r: 6,   g: 214, b: 160 },  // cyan
];

function lerpColor(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function getAuroraColor(t) {
  const len = COLORS.length - 1;
  const pos = t * len;
  const idx = Math.min(Math.floor(pos), len - 1);
  const frac = pos - idx;
  return lerpColor(COLORS[idx], COLORS[idx + 1], frac);
}

// ─── Stars ───
const STARS = [];
function initStars(count) {
  STARS.length = 0;
  const w = canvas.width || 800;
  const h = canvas.height || 600;
  for (let i = 0; i < count; i++) {
    STARS.push({
      x: Math.random() * w * 1.2 - w * 0.1,
      y: Math.random() * h * 0.6,          // top 60%
      size: 0.5 + Math.random() * 1.8,
      alpha: 0.1 + Math.random() * 0.5,
      twinkleSpeed: 0.3 + Math.random() * 0.8,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }
}

function drawStars(ctx, w, h) {
  if (STARS.length === 0) initStars(60);
  // Re-disperse if canvas grew
  if (STARS.length > 0 && STARS[STARS.length-1].x > w * 1.5) {
    initStars(60);
  }

  for (const star of STARS) {
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
    const alpha = star.alpha * twinkle;
    
    const rad = star.size * (0.8 + Math.sin(time * star.twinkleSpeed * 0.5 + star.twinklePhase) * 0.2);
    
    ctx.beginPath();
    ctx.arc(star.x, star.y, rad, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }
}

// ─── Aurora Bands ───
function drawAurora(ctx, w, h) {
  const BANDS = 5;
  const POINTS = 120;

  for (let b = 0; b < BANDS; b++) {
    const bandOffset = b / BANDS;
    const bandAlpha = 0.03 + bandOffset * 0.04;
    const bandSpeed = 0.15 + bandOffset * 0.2;
    const bandAmp = 0.06 + bandOffset * 0.04;

    // Build the band path
    ctx.beginPath();
    ctx.moveTo(-20, h);

    for (let i = 0; i <= POINTS; i++) {
      const t = i / POINTS;
      const x = t * (w + 40) - 20;
      
      // Multiple sine waves for organic motion
      const wave1 = Math.sin(t * Math.PI * 4 + time * bandSpeed * 0.7) * bandAmp;
      const wave2 = Math.sin(t * Math.PI * 8 + time * bandSpeed * 1.1 + 1.3) * bandAmp * 0.5;
      const wave3 = Math.sin(t * Math.PI * 1.5 + time * bandSpeed * 0.3 + 2.7) * bandAmp * 0.3;
      
      // Base y: arcs from bottom-center upward
      const baseY = h * (0.85 - Math.sin(t * Math.PI) * 0.35 - bandOffset * 0.15);
      const y = baseY + (wave1 + wave2 + wave3) * h;

      ctx.lineTo(x, y);
    }

    ctx.lineTo(w + 20, h);
    ctx.closePath();

    // Gradient fill for this band
    const grad = ctx.createLinearGradient(0, h * 0.3, 0, h);
    const c1 = getAuroraColor(bandOffset * 0.6 + 0.1);
    const c2 = getAuroraColor(bandOffset * 0.6 + 0.3);
    const c3 = getAuroraColor(bandOffset * 0.6 + 0.6);

    grad.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${bandAlpha * 0.1})`);
    grad.addColorStop(0.4, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${bandAlpha * 0.6})`);
    grad.addColorStop(0.7, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${bandAlpha * 0.3})`);
    grad.addColorStop(1, `rgba(${c3.r}, ${c3.g}, ${c3.b}, 0)`);

    ctx.fillStyle = grad;
    ctx.fill();
  }
}

// ─── Light Rays ───
function drawLightRays(ctx, w, h) {
  const RAY_COUNT = 4;
  ctx.save();
  
  for (let i = 0; i < RAY_COUNT; i++) {
    const t = (i / RAY_COUNT + time * 0.005) % 1;
    const x = t * w;
    const alpha = 0.008 + Math.sin(t * Math.PI) * 0.012;
    
    const grad = ctx.createLinearGradient(x, 0, x, h);
    grad.addColorStop(0, `rgba(139, 92, 246, ${alpha * 0.3})`);
    grad.addColorStop(0.3, `rgba(139, 92, 246, ${alpha})`);
    grad.addColorStop(0.7, `rgba(6, 214, 160, ${alpha * 0.5})`);
    grad.addColorStop(1, `rgba(6, 214, 160, 0)`);

    ctx.fillStyle = grad;
    ctx.fillRect(x - 40, 0, 80, h);
  }
  
  ctx.restore();
}

// ─── Glow Nodes ───
function drawGlowNodes(ctx, w, h) {
  const NODES = 6;
  const baseX = w * 0.3;
  const baseY = h * 0.35;

  for (let i = 0; i < NODES; i++) {
    const t = i / NODES;
    const angle = t * Math.PI * 2 + time * 0.08;
    const radius = w * (0.15 + Math.sin(time * 0.1 + i) * 0.05);
    
    const x = baseX + Math.cos(angle) * radius;
    const y = baseY + Math.sin(angle * 1.5 + time * 0.05) * radius * 0.4;
    
    const pulse = Math.sin(time * 0.5 + i * 1.2) * 0.3 + 0.7;
    const r = 8 + pulse * 20;
    
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const c = getAuroraColor(t * 0.8);
    grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.08 * pulse})`);
    grad.addColorStop(0.5, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.03 * pulse})`);
    grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

// ─── Main Render Loop ───
function animate() {
  animationId = requestAnimationFrame(animate);
  if (!ctx || !canvas) return;

  const w = canvas.width;
  const h = canvas.height;
  time += 0.016; // ~60fps step

  ctx.clearRect(0, 0, w, h);

  // 1. Aurora bands (background)
  drawAurora(ctx, w, h);

  // 2. Light rays (mid layer)
  drawLightRays(ctx, w, h);

  // 3. Stars (foreground)
  drawStars(ctx, w, h);

  // 4. Glow nodes (accent)
  drawGlowNodes(ctx, w, h);
}

export function destroyHeroAnimation() {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  canvas = null;
  ctx = null;
}
