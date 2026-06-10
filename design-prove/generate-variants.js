const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 1080;
const H = 1080;
const OUT = '/home/rufusdark/ITSOUND.IT/design-prove';

// Fonts
const FONTS = '/home/rufusdark/ITSOUND.IT/design-prove/fonts';
registerFont(`${FONTS}/Orbitron-900.ttf`, { family: 'Orbitron', weight: '900' });
registerFont(`${FONTS}/Orbitron-700.ttf`, { family: 'Orbitron', weight: '700' });
registerFont(`${FONTS}/Orbitron-600.ttf`, { family: 'Orbitron', weight: '600' });
registerFont(`${FONTS}/Orbitron-400.ttf`, { family: 'Orbitron', weight: '400' });
registerFont(`${FONTS}/Inter-800.ttf`, { family: 'Inter', weight: '800' });
registerFont(`${FONTS}/Inter-700.ttf`, { family: 'Inter', weight: '700' });
registerFont(`${FONTS}/Inter-600.ttf`, { family: 'Inter', weight: '600' });
registerFont(`${FONTS}/Inter-400.ttf`, { family: 'Inter', weight: '400' });
registerFont(`${FONTS}/Inter-300.ttf`, { family: 'Inter', weight: '300' });

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// =========================================================
// VARIANT 1: DUOTONE EDITORIAL
// Magazine-style with photo duotone overlay
// =========================================================
async function variant1_duotone_editorial() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Load photo
  let img;
  try { img = await loadImage(`${OUT}/frame-21-resized.jpg`); } catch(e) { img = null; }

  // Background - dark with subtle gradient
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#0a0a0a');
  bgGrad.addColorStop(0.5, '#1a0000');
  bgGrad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Photo with duotone overlay
  if (img) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.drawImage(img, -60, -60, W + 120, H + 120);
    ctx.restore();

    // Duotone red overlay (multiply)
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#8B0000';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // Purple tint right side
    ctx.save();
    const purpleGrad = ctx.createLinearGradient(W * 0.5, 0, W, 0);
    purpleGrad.addColorStop(0, 'rgba(139,92,246,0)');
    purpleGrad.addColorStop(1, 'rgba(139,92,246,0.4)');
    ctx.fillStyle = purpleGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // Vignette
  const vigGrad = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.8);
  vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
  vigGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vigGrad;
  ctx.fillRect(0, 0, W, H);

  // Vertical red bar on left
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(40, 0, 4, H);

  // Top red stripe
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(0, 0, W, 3);

  // Bottom info bar
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, H - 80, W, 80);
  ctx.fillStyle = 'rgba(220,38,38,0.3)';
  ctx.fillRect(0, H - 80, W, 2);

  // Grid overlay (subtle)
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 60) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Main headline
  ctx.textAlign = 'left';
  
  // "NUOVO SITO" label
  ctx.font = '600 22px Inter';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('NUOVO SITO', 80, 280);

  // Large title
  ctx.font = '900 110px Orbitron';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(220,38,38,0.3)';
  ctx.shadowBlur = 20;
  ctx.fillText('IN ARRIVO', 80, 390);
  ctx.shadowBlur = 0;

  // Subtitle
  ctx.font = '700 28px Orbitron';
  ctx.fillStyle = '#8B5CF6';
  ctx.fillText('WORK IN PROGRESS', 80, 445);

  // Separator
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(80, 475, 60, 3);

  // Description
  ctx.font = '400 16px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia', 80, 520);
  ctx.fillText('open e libera, per un suono indipendente.', 80, 542);

  // Bottom left branding
  ctx.font = '700 12px Orbitron';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('OPEN SOURCE', 60, H - 45);
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('MUSICA · EVENTI · CULTURA', 60, H - 25);

  // Bottom right handle
  ctx.textAlign = 'right';
  ctx.font = '700 14px Orbitron';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('@ ITSOUND.IT', W - 60, H - 45);
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('musica · eventi · cultura', W - 60, H - 25);

  // Decorative elements
  // Top right corner bracket
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 60, 50); ctx.lineTo(W - 60, 90);
  ctx.moveTo(W - 60, 50); ctx.lineTo(W - 100, 50);
  ctx.stroke();

  // Small frequency bars decoration at bottom
  const barColors = ['#DC2626', '#8B5CF6'];
  const barH = [30, 45, 55, 40, 60, 35, 50, 42, 48, 38, 55, 40];
  for (let i = 0; i < barH.length; i++) {
    const bx = 80 + i * 22;
    const bh = barH[i];
    ctx.fillStyle = barColors[i % 2];
    ctx.globalAlpha = 0.3;
    ctx.fillRect(bx, H - 140 - bh, 10, bh);
  }
  ctx.globalAlpha = 1;

  // Baseline for bars
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(80, H - 140, 22 * barH.length, 1);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`${OUT}/itsound-v3-01-duotone-editorial.png`, buffer);
  console.log('✓ Variant 1: Duotone Editorial');
}

// =========================================================
// VARIANT 2: CYBERPUNK GRID
// Neon grid + glitch effects + bold tech aesthetic
// =========================================================
async function variant2_cyberpunk_grid() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Deep dark background
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, W, H);

  // Neon grid (perspective)
  ctx.strokeStyle = 'rgba(139,92,246,0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const x = i * 30;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let i = 0; i < 40; i++) {
    const y = i * 30;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Grid with brighter lines at 120px intervals
  ctx.strokeStyle = 'rgba(139,92,246,0.25)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 120) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 120) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Glow circles (tech rings)
  for (let r = 350; r >= 100; r -= 50) {
    ctx.beginPath();
    ctx.arc(W - 200, 200, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(220,38,38,${0.06 + (350 - r) * 0.0003})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Large "PHANTOM" background watermark
  ctx.save();
  ctx.textAlign = 'center';
  ctx.font = '900 180px Orbitron';
  ctx.fillStyle = 'rgba(139,92,246,0.03)';
  ctx.fillText('PHANTOM', W / 2, H / 2 + 20);
  ctx.restore();

  // Glitch strips
  for (let i = 0; i < 5; i++) {
    const gy = 100 + i * 180 + Math.sin(i * 2) * 30;
    ctx.fillStyle = `rgba(220,38,38,${0.03 + Math.random() * 0.03})`;
    ctx.fillRect(0, gy, W, 8 + Math.random() * 10);
  }

  // Main content area - dark glass panel
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  roundedRect(ctx, 60, 220, 500, 320, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(220,38,38,0.3)';
  ctx.lineWidth = 1;
  roundedRect(ctx, 60, 220, 500, 320, 8);
  ctx.stroke();

  // Left accent bar
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(60, 220, 4, 320);

  // Typography
  ctx.textAlign = 'left';

  // Tag label
  ctx.font = '600 14px Inter';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('// SITO WEB', 90, 270);

  // Main title with neon glow
  ctx.shadowColor = 'rgba(220,38,38,0.5)';
  ctx.shadowBlur = 30;
  ctx.font = '900 72px Orbitron';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('IN ARRIVO', 90, 350);
  ctx.shadowBlur = 0;

  // Purple accent subtitle
  ctx.shadowColor = 'rgba(139,92,246,0.4)';
  ctx.shadowBlur = 20;
  ctx.font = '700 24px Orbitron';
  ctx.fillStyle = '#8B5CF6';
  ctx.fillText('WORK IN PROGRESS', 90, 400);
  ctx.shadowBlur = 0;

  // Separator with glow
  const sepGrad = ctx.createLinearGradient(90, 0, 300, 0);
  sepGrad.addColorStop(0, '#DC2626');
  sepGrad.addColorStop(0.5, '#8B5CF6');
  sepGrad.addColorStop(1, 'rgba(139,92,246,0)');
  ctx.fillStyle = sepGrad;
  ctx.shadowColor = 'rgba(220,38,38,0.3)';
  ctx.shadowBlur = 10;
  ctx.fillRect(90, 420, 210, 2);
  ctx.shadowBlur = 0;

  // Description
  ctx.font = '400 14px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia', 90, 465);
  ctx.fillText('open e libera, per un suono indipendente.', 90, 485);

  // Right side graphic - vertical frequency bars
  const cybHeights = [25, 55, 70, 45, 80, 50, 65, 40, 75, 55, 60, 35, 70, 45, 50, 60, 40, 55, 65, 45];
  for (let i = 0; i < cybHeights.length; i++) {
    const bx = 700 + i * 18;
    const bh = cybHeights[i];
    const gradient = ctx.createLinearGradient(0, H - 200 - bh, 0, H - 200);
    gradient.addColorStop(0, '#DC2626');
    gradient.addColorStop(0.5, '#8B5CF6');
    gradient.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(220,38,38,0.4)';
    ctx.shadowBlur = 15;
    ctx.fillRect(bx, H - 200 - bh, 8, bh);
  }
  ctx.shadowBlur = 0;

  // Baseline for bars
  ctx.fillStyle = 'rgba(139,92,246,0.3)';
  ctx.fillRect(700, H - 200, 18 * cybHeights.length, 1);

  // Bottom bar
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, H - 70, W, 70);
  ctx.fillStyle = 'rgba(220,38,38,0.4)';
  ctx.fillRect(0, H - 70, W, 1);

  // Bottom text
  ctx.textAlign = 'left';
  ctx.font = '700 12px Orbitron';
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fillText('OPEN SOURCE', 60, H - 38);
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillText('MUSICA · EVENTI · CULTURA', 60, H - 20);

  ctx.textAlign = 'right';
  ctx.font = '700 14px Orbitron';
  ctx.fillStyle = '#8B5CF6';
  ctx.shadowColor = 'rgba(139,92,246,0.3)';
  ctx.shadowBlur = 10;
  ctx.fillText('@ ITSOUND.IT', W - 60, H - 38);
  ctx.shadowBlur = 0;
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('musica · eventi · cultura', W - 60, H - 20);

  // Decorative corner elements
  ctx.strokeStyle = 'rgba(220,38,38,0.4)';
  ctx.lineWidth = 2;
  // TL
  ctx.beginPath();
  ctx.moveTo(30, 30); ctx.lineTo(80, 30);
  ctx.moveTo(30, 30); ctx.lineTo(30, 80);
  ctx.stroke();
  // BR
  ctx.beginPath();
  ctx.moveTo(W - 30, H - 30); ctx.lineTo(W - 80, H - 30);
  ctx.moveTo(W - 30, H - 30); ctx.lineTo(W - 30, H - 80);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`${OUT}/itsound-v3-02-cyberpunk-grid.png`, buffer);
  console.log('✓ Variant 2: Cyberpunk Grid');
}

// =========================================================
// VARIANT 3: MINIMAL TECHNO  
// Clean, monochrome, extreme negative space
// =========================================================
async function variant3_minimal_techno() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Pure dark background
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, W, H);

  // Subtle texture (noise approximation)
  for (let i = 0; i < 3000; i++) {
    const nx = Math.random() * W;
    const ny = Math.random() * H;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.02})`;
    ctx.fillRect(nx, ny, 1, 1);
  }

  // Very subtle horizontal line
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, H * 0.35, W, 1);
  ctx.fillRect(0, H * 0.65, W, 1);

  // Large centered circle (extremely subtle)
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 400, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(220,38,38,0.06)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 320, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Small red dot accent
  ctx.beginPath();
  ctx.arc(100, 160, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#DC2626';
  ctx.fill();

  // Horizontal line through center-right
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(600, H / 2, 200, 1);

  // Main content - minimal positioning
  ctx.textAlign = 'left';

  // Small label
  ctx.font = '400 11px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillText('NUOVO SITO IN ARRIVO', 100, 400);

  // Large main text - very spaced out
  ctx.font = '300 90px Inter';
  ctx.fillStyle = '#FFFFFF';
  ctx.letterSpacing = '15px';
  ctx.fillText('IN ARRIVO', 100, 510);

  // Thin separator
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(100, 545, 80, 1);

  // Subtitle
  ctx.font = '400 14px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('WORK IN PROGRESS', 100, 585);

  // Description in very light text
  ctx.font = '300 13px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia', 100, 635);
  ctx.fillText('open e libera, per un suono indipendente.', 100, 655);

  // Right side - vertical typography (rotated)
  ctx.save();
  ctx.translate(W - 60, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillText('MUSICA · EVENTI · CULTURA', 0, 0);
  ctx.restore();

  // Bottom info - extremely minimal
  ctx.textAlign = 'left';
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillText('OPEN SOURCE', 100, H - 50);

  ctx.textAlign = 'right';
  ctx.font = '600 11px Inter';
  ctx.fillStyle = 'rgba(220,38,38,0.5)';
  ctx.fillText('@ ITSOUND.IT', W - 100, H - 50);

  // Corner marks
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 50); ctx.lineTo(100, 50);
  ctx.moveTo(50, 50); ctx.lineTo(50, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W - 50, H - 50); ctx.lineTo(W - 100, H - 50);
  ctx.moveTo(W - 50, H - 50); ctx.lineTo(W - 50, H - 100);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`${OUT}/itsound-v3-03-minimal-techno.png`, buffer);
  console.log('✓ Variant 3: Minimal Techno');
}

// =========================================================
// VARIANT 4: WAVEFORM DYNAMIC
// Audio waveform + gradient + energetic composition
// =========================================================
async function variant4_waveform_dynamic() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Gradient dark background
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#0D0D1A');
  bgGrad.addColorStop(0.3, '#1A0A0A');
  bgGrad.addColorStop(0.7, '#0D0D2E');
  bgGrad.addColorStop(1, '#0A0A0A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Load photo as subtle background
  try {
    const photo = await loadImage(`${OUT}/frame-21-resized.jpg`);
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.drawImage(photo, 0, 0, W, H);
    ctx.restore();
  } catch(e) {}

  // Diagonal split - red accent triangle
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(W, 0);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fillStyle = 'rgba(220,38,38,0.05)';
  ctx.fill();
  ctx.restore();

  // Purple diagonal from bottom right
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(W, H);
  ctx.lineTo(0, H);
  ctx.lineTo(W, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(139,92,246,0.04)';
  ctx.fill();
  ctx.restore();

  // Large waveform across the middle
  const waveformPoints = 80;
  const waveBase = H * 0.55;
  const waveAmp = 120;
  const waveStart = 40;
  const waveWidth = W - 80;
  const step = waveWidth / waveformPoints;

  ctx.beginPath();
  ctx.moveTo(waveStart, H);
  for (let i = 0; i <= waveformPoints; i++) {
    const wx = waveStart + i * step;
    const t = i / waveformPoints;
    // Create music waveform shape
    const envelope = Math.sin(t * Math.PI); // rise and fall
    const freq = Math.sin(t * 30) * 0.5 + Math.sin(t * 50) * 0.3 + Math.sin(t * 70) * 0.2;
    const wy = waveBase - freq * waveAmp * envelope;
    ctx.lineTo(wx, wy);
  }
  ctx.lineTo(waveStart + waveWidth, H);
  ctx.closePath();

  // Fill waveform with gradient
  const waveGrad = ctx.createLinearGradient(0, waveBase - waveAmp, 0, H);
  waveGrad.addColorStop(0, 'rgba(220,38,38,0.6)');
  waveGrad.addColorStop(0.3, 'rgba(139,92,246,0.4)');
  waveGrad.addColorStop(0.7, 'rgba(220,38,38,0.15)');
  waveGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = waveGrad;
  ctx.fill();

  // Waveform outline
  ctx.beginPath();
  ctx.moveTo(waveStart, waveBase);
  for (let i = 0; i <= waveformPoints; i++) {
    const wx = waveStart + i * step;
    const t = i / waveformPoints;
    const envelope = Math.sin(t * Math.PI);
    const freq = Math.sin(t * 30) * 0.5 + Math.sin(t * 50) * 0.3 + Math.sin(t * 70) * 0.2;
    const wy = waveBase - freq * waveAmp * envelope;
    ctx.lineTo(wx, wy);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Glow dots on waveform peaks
  for (let i = 0; i <= waveformPoints; i += 4) {
    const wx = waveStart + i * step;
    const t = i / waveformPoints;
    const envelope = Math.sin(t * Math.PI);
    const freq = Math.sin(t * 30) * 0.5 + Math.sin(t * 50) * 0.3 + Math.sin(t * 70) * 0.2;
    const wy = waveBase - freq * waveAmp * envelope;
    if (Math.abs(freq) > 0.3) {
      ctx.beginPath();
      ctx.arc(wx, wy, 2, 0, Math.PI * 2);
      ctx.fillStyle = freq > 0 ? 'rgba(220,38,38,0.6)' : 'rgba(139,92,246,0.6)';
      ctx.fill();
    }
  }

  // Main text over waveform
  ctx.textAlign = 'left';

  // Label
  ctx.font = '700 16px Orbitron';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('NUOVO SITO', 80, 240);

  // Large title with shadow
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 30;
  ctx.font = '900 96px Orbitron';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('IN ARRIVO', 80, 350);
  ctx.shadowBlur = 0;

  // PURPLE subtitle  
  ctx.font = '700 26px Orbitron';
  ctx.fillStyle = '#8B5CF6';
  ctx.fillText('WORK IN PROGRESS', 80, 408);

  // Separator line
  const sepGrad = ctx.createLinearGradient(80, 0, 350, 0);
  sepGrad.addColorStop(0, '#DC2626');
  sepGrad.addColorStop(1, 'rgba(220,38,38,0)');
  ctx.fillStyle = sepGrad;
  ctx.fillRect(80, 428, 270, 2);

  // Description
  ctx.font = '400 14px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia', 80, 468);
  ctx.fillText('open e libera, per un suono indipendente.', 80, 488);

  // Small decorative elements
  // Top right corner bracket
  ctx.strokeStyle = 'rgba(220,38,38,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 50, 40); ctx.lineTo(W - 90, 40);
  ctx.moveTo(W - 50, 40); ctx.lineTo(W - 50, 80);
  ctx.stroke();

  // Frequency bars in bottom-left
  const fbHeights = [25, 40, 55, 35, 60, 30, 45, 38, 50, 28];
  for (let i = 0; i < fbHeights.length; i++) {
    const bx = 80 + i * 18;
    const bh = fbHeights[i];
    ctx.fillStyle = i % 2 === 0 ? '#DC2626' : '#8B5CF6';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(bx, H - 170 - bh, 8, bh);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(80, H - 170, 180, 1);

  // Bottom text
  ctx.textAlign = 'left';
  ctx.font = '700 12px Orbitron';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('OPEN SOURCE', 80, H - 40);
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillText('MUSICA · EVENTI · CULTURA', 80, H - 22);

  ctx.textAlign = 'right';
  ctx.font = '700 14px Orbitron';
  ctx.fillStyle = '#DC2626';
  ctx.fillText('@ ITSOUND.IT', W - 80, H - 40);
  ctx.font = '400 10px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('musica · eventi · cultura', W - 80, H - 22);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`${OUT}/itsound-v3-04-waveform-dynamic.png`, buffer);
  console.log('✓ Variant 4: Waveform Dynamic');
}

// Run all variants
async function main() {
  console.log('Generating 4 design variants...\n');
  await variant1_duotone_editorial();
  await variant2_cyberpunk_grid();
  await variant3_minimal_techno();
  await variant4_waveform_dynamic();
  console.log('\n✅ All 4 variants generated!');
  console.log(`Location: ${OUT}/`);
}

main().catch(console.error);
