/**
 * ITSound Ambient Particles — Canvas 2D
 * Floating particles in the hero that react to mouse
 * Lightweight, no Three.js
 */
let canvas, ctx, particles, animationId, mouseX, mouseY, mouseActive;

export function initHeroParticles() {
  canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  ctx = canvas.getContext('2d');
  mouseX = -9999;
  mouseY = -9999;
  mouseActive = false;

  resize();
  window.addEventListener('resize', resize);
  hero.addEventListener('mousemove', onMouseMove);
  hero.addEventListener('mouseleave', onMouseLeave);

  const COUNT = 45;
  particles = [];
  for (let i = 0; i < COUNT; i++) {
    particles.push(createParticle());
  }

  animate();
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.1 + Math.random() * 0.3),
    size: 1 + Math.random() * 3,
    alpha: 0.02 + Math.random() * 0.15,
    pulseSpeed: 0.2 + Math.random() * 0.5,
    pulsePhase: Math.random() * Math.PI * 2,
    // Color: mostly purple, some cyan, occasional white
    color: Math.random() < 0.6 ? 'purple' : Math.random() < 0.8 ? 'cyan' : 'white',
  };
}

function onMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  mouseActive = true;
}

function onMouseLeave() {
  mouseActive = false;
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
  const time = Date.now() / 1000;

  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    // Pulse alpha
    const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
    const alpha = p.alpha * pulse;

    // Mouse interaction: gentle repulsion
    if (mouseActive) {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && dist > 0) {
        const force = (150 - dist) / 150 * 0.5;
        p.vx += (dx / dist) * force * 0.02;
        p.vy += (dy / dist) * force * 0.02;
      }
    }

    // Damping
    p.vx *= 0.98;
    p.vy *= 0.98;

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;

    // Draw
    let color;
    switch (p.color) {
      case 'purple': color = `rgba(139, 92, 246, ${alpha})`; break;
      case 'cyan': color = `rgba(6, 214, 160, ${alpha})`; break;
      case 'white': color = `rgba(255, 255, 255, ${alpha * 0.5})`; break;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Glow for larger particles
    if (p.size > 2) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

export function destroyHeroParticles() {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resize);
  const hero = document.getElementById('hero');
  if (hero) {
    hero.removeEventListener('mousemove', onMouseMove);
    hero.removeEventListener('mouseleave', onMouseLeave);
  }
  canvas = null;
  ctx = null;
}
