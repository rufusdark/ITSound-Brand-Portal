import { createCanvas, registerFont, loadImage } from 'canvas';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(__dirname, 'fonts');

// Register fonts
const fontFiles = [
  ['Orbitron', 'Orbitron-Black', 900],
  ['Orbitron', 'Orbitron-ExtraBold', 800],
  ['Orbitron', 'Orbitron-Bold', 700],
  ['Orbitron', 'Orbitron-SemiBold', 600],
  ['Orbitron', 'Orbitron-Medium', 500],
  ['Orbitron', 'Orbitron-Regular', 400],
  ['Inter', 'Inter-Bold', 700],
  ['Inter', 'Inter-SemiBold', 600],
  ['Inter', 'Inter-Medium', 500],
  ['Inter', 'Inter-Regular', 400],
  ['Inter', 'Inter-Light', 300],
];

for (const [family, file, weight] of fontFiles) {
  try {
    registerFont(join(FONTS_DIR, `${file}.ttf`), { family, weight });
  } catch (e) {
    // skip
  }
}

// ============================================================
// BRAND
// ============================================================
const RED = '#DC2626';
const PURPLE = '#8B5CF6';
const BLACK = '#0A0A0A';
const WHITE = '#FFFFFF';
const DARK_RED = '#991B1B';
const WARM_GOLD = '#F59E0B';
const MEDITERRANEAN_BLUE = '#1E40AF';
const W = 1080;
const H = 1080;

// ============================================================
// UTILITY: Perlin-like noise generator
// ============================================================
function addNoise(ctx, opacity = 0.04) {
  const imageData = ctx.getImageData(0, 0, W, H);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 50;
    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyOpacity(ctx, opacity) {
  ctx.save();
  ctx.fillStyle = `rgba(0,0,0,${1 - opacity})`;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
}

// ============================================================
// VARIANT 1: "SPELLBOUND" — Collage style, modular, textured
// ============================================================
function variantSpellbound(ctx) {
  // Warm dark background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0A0A0A');
  bg.addColorStop(0.3, '#1a0a0a');
  bg.addColorStop(0.6, '#2d0a1a');
  bg.addColorStop(0.85, '#1a0a2e');
  bg.addColorStop(1, '#0A0A0A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Central light burst
  const cb = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 600);
  cb.addColorStop(0, 'rgba(220, 38, 38, 0.05)');
  cb.addColorStop(0.3, 'rgba(139, 92, 246, 0.08)');
  cb.addColorStop(0.7, 'rgba(220, 38, 38, 0.03)');
  cb.addColorStop(1, 'transparent');
  ctx.fillStyle = cb;
  ctx.fillRect(0, 0, W, H);

  // === COLLAGE ELEMENTS ===

  // Large diagonal shape - geometric
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-0.3);
  ctx.fillStyle = 'rgba(139, 92, 246, 0.06)';
  ctx.beginPath();
  ctx.moveTo(-300, -400);
  ctx.lineTo(200, -400);
  ctx.lineTo(0, 400);
  ctx.lineTo(-500, 400);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Second shape - rotated opposite
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(0.2);
  ctx.fillStyle = 'rgba(220, 38, 38, 0.04)';
  ctx.beginPath();
  ctx.moveTo(100, -500);
  ctx.lineTo(500, -300);
  ctx.lineTo(300, 300);
  ctx.lineTo(-100, 100);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Sound wave bands - bottom
  for (let i = 0; i < 20; i++) {
    const x = 60 + i * 48;
    const height = 20 + Math.sin(i * 0.8) * 15 + Math.sin(i * 1.7) * 8;
    const alpha = 0.04 + Math.sin(i * 0.5) * 0.03;
    ctx.fillStyle = i % 3 === 0
      ? `rgba(220, 38, 38, ${alpha + 0.02})`
      : `rgba(139, 92, 246, ${alpha})`;
    ctx.fillRect(x, H - 120 - height, 20, height);
    ctx.fillRect(x, H - 120 - height - 50, 20, height * 0.4);
  }

  // === BRACKET CORNERS ===
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
  ctx.lineWidth = 2;
  // Top-left
  ctx.beginPath(); ctx.moveTo(40, 100); ctx.lineTo(40, 40); ctx.lineTo(100, 40); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(1040, 980); ctx.lineTo(1040, 1040); ctx.lineTo(980, 1040); ctx.stroke();

  // Accent dots
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(100, 100, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = PURPLE;
  ctx.beginPath(); ctx.arc(980, 980, 5, 0, Math.PI * 2); ctx.fill();

  // === TYPOGRAPHY ===
  ctx.save();
  // "NUOVO SITO" - massive, bold, with slight red glow
  ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.font = '900 64px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', W / 2, 340);
  ctx.restore();

  ctx.save();
  // "IN ARRIVO" - even larger, red
  ctx.shadowColor = 'rgba(220, 38, 38, 0.8)';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = '900 80px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', W / 2, 440);
  ctx.restore();

  ctx.save();
  // "WORK IN PROGRESS"
  ctx.font = '600 28px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('W O R K   I N   P R O G R E S S', W / 2, 520);
  ctx.restore();

  // === BODY TEXT ===
  ctx.save();
  ctx.font = '300 18px Inter';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia open e libera.', W / 2, 580);
  ctx.restore();

  // === FOOTER ===
  ctx.save();
  ctx.font = '700 24px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('@ ITSOUND.IT', W / 2, 950);
  ctx.font = '300 12px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillText('musica · eventi · cultura', W / 2, 980);
  ctx.restore();

  // === NOISE TEXTURE ===
  addNoise(ctx, 0.03);

  // Subtle vignette
  const vg = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 700);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

// ============================================================
// VARIANT 2: "DOOF" — Bold, vibrant, kinetic, spray-paint energy
// ============================================================
function variantDoof(ctx) {
  // Bright dark background with energy
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0A0A0A');
  bg.addColorStop(0.2, '#1a0a2e');
  bg.addColorStop(0.5, '#DC2626');
  bg.addColorStop(0.8, '#8B5CF6');
  bg.addColorStop(1, '#0A0A0A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // === SPRAY/SPLATTER EFFECTS (mock spray paint) ===
  const splatterColors = ['rgba(220,38,38,0.08)', 'rgba(139,92,246,0.06)', 'rgba(245,158,11,0.04)'];
  for (let s = 0; s < 30; s++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = 10 + Math.random() * 60;
    ctx.fillStyle = splatterColors[s % 3];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // secondary smaller splatters
    for (let d = 0; d < 3; d++) {
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * r * 2, y + (Math.random() - 0.5) * r * 2, r * 0.1 + Math.random() * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // === KINETIC LINES (movement) ===
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    const x1 = Math.random() * W;
    const y1 = Math.random() * H;
    const angle = Math.random() * Math.PI * 2;
    const len = 50 + Math.random() * 200;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
    ctx.stroke();
  }

  // === WAVE BANDS ===
  for (let i = 0; i < 30; i++) {
    const x = 40 + i * 34;
    const h = 30 + Math.sin(i * 0.6) * 20 + Math.sin(i * 1.3) * 10;
    const a = 0.05 + Math.sin(i * 0.4) * 0.03;
    ctx.fillStyle = i % 2 === 0 ? `rgba(220,38,38,${a})` : `rgba(139,92,246,${a})`;
    ctx.fillRect(x, 780 - h, 14, h);
    // mirrored
    ctx.fillRect(x, 790, 14, h * 0.5);
  }

  // === BIG BRACKET ===
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(30, 120); ctx.lineTo(30, 30); ctx.lineTo(120, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(1050, 960); ctx.lineTo(1050, 1050); ctx.lineTo(960, 1050); ctx.stroke();

  // === TYPOGRAPHY ===
  ctx.save();
  ctx.font = '900 72px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(220, 38, 38, 0.7)';
  ctx.shadowBlur = 50;
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', W / 2, 320);
  ctx.restore();

  ctx.save();
  ctx.font = '900 84px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(220, 38, 38, 0.9)';
  ctx.shadowBlur = 60;
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', W / 2, 430);
  ctx.restore();

  ctx.save();
  ctx.font = '700 30px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WARM_GOLD;
  ctx.fillText('▸ WORK IN PROGRESS ◂', W / 2, 510);
  ctx.restore();

  ctx.save();
  ctx.font = '300 18px Inter';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia open e libera.', W / 2, 580);
  ctx.restore();

  ctx.save();
  ctx.font = '700 26px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WARM_GOLD;
  ctx.fillText('@ ITSOUND.IT', W / 2, 970);
  ctx.restore();

  // NOISE
  addNoise(ctx, 0.04);

  // Vignette
  const vg = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 700);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(1, 'rgba(0,0,0,0.4)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

// ============================================================
// VARIANT 3: "PHANTOM GRID" — Grid-based, precise, architectural
// ============================================================
function variantPhantomGrid(ctx) {
  // Dark base
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, W, H);

  // GRID overlay - visible, architectural
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.07)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Thicker grid lines every 4
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= W; x += 160) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 160) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // === DIAGONAL CUT ===
  ctx.save();
  ctx.fillStyle = 'rgba(220, 38, 38, 0.05)';
  ctx.beginPath();
  ctx.moveTo(W, 0);
  ctx.lineTo(W, 300);
  ctx.lineTo(W - 400, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'rgba(139, 92, 246, 0.04)';
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, H - 300);
  ctx.lineTo(500, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // === CIRCLE GEOMETRY ===
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(850, 200, 150, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(850, 200, 130, 0, Math.PI * 2); ctx.stroke();

  // === RED ACCENT STRIP ===
  ctx.fillStyle = RED;
  ctx.fillRect(80, 200, 3, 350);

  // === FREQUENCY BARS (aligned to grid) ===
  const barColors = [RED, PURPLE, RED, PURPLE];
  for (let i = 0; i < 16; i++) {
    const x = 120 + i * 56;
    const h = 40 + Math.sin(i * 0.4) * 25 + Math.sin(i * 1.1) * 15;
    const alpha = 0.03 + Math.sin(i * 0.3) * 0.02;
    ctx.fillStyle = i % 3 === 0 ? `rgba(220,38,38,${alpha + 0.02})` : `rgba(139,92,246,${alpha})`;
    ctx.fillRect(x, 760 - h, 22, h);
    ctx.fillRect(x, 770, 22, h * 0.3);
  }

  // === TYPOGRAPHY (precise, aligned to grid) ===
  ctx.save();
  ctx.font = '700 54px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', 120, 340);
  ctx.restore();

  ctx.save();
  ctx.font = '900 72px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
  ctx.shadowBlur = 40;
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', 120, 430);
  ctx.restore();

  ctx.save();
  ctx.font = '500 22px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('WORK IN PROGRESS', 120, 505);
  ctx.restore();

  ctx.save();
  ctx.font = '300 16px Inter';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fillText('Nessun software proprietario.', 120, 570);
  ctx.fillText('Solo tecnologia open e libera.', 120, 598);
  ctx.restore();

  ctx.save();
  ctx.font = '700 22px Orbitron';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('@ ITSOUND.IT', W - 80, 980);
  ctx.restore();

  // NOISE
  addNoise(ctx, 0.02);
}

// ============================================================
// VARIANT 4: "TERRITORIO" — Mediterranean/Italian reference
// ============================================================
function variantTerritorio(ctx) {
  // Warm Mediterranean-inspired gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0A0A0A');
  bg.addColorStop(0.3, '#1a1a2e');
  bg.addColorStop(0.6, '#2d1a0a');
  bg.addColorStop(1, '#0A0A0A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Warm light from bottom right (sun)
  const sg = ctx.createRadialGradient(W, H, 0, W, H, 600);
  sg.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
  sg.addColorStop(0.3, 'rgba(245, 158, 11, 0.05)');
  sg.addColorStop(0.6, 'rgba(220, 38, 38, 0.04)');
  sg.addColorStop(1, 'transparent');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H);

  // === GEOMETRIC SUN/MEDITERRANEAN MOTIF ===
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(900, 150, 80, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(900, 150, 65, 0, Math.PI * 2); ctx.stroke();

  // Sun rays
  for (let a = 0; a < 12; a++) {
    const angle = (a / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(900 + Math.cos(angle) * 90, 150 + Math.sin(angle) * 90);
    ctx.lineTo(900 + Math.cos(angle) * 120, 150 + Math.sin(angle) * 120);
    ctx.stroke();
  }

  // === WAVE LINES (sea/Mediterranean) ===
  ctx.strokeStyle = 'rgba(30, 64, 175, 0.08)';
  ctx.lineWidth = 1.5;
  for (let w = 0; w < 3; w++) {
    const baseY = 780 + w * 25;
    ctx.beginPath();
    ctx.moveTo(60, baseY);
    for (let x = 60; x < 1020; x += 5) {
      ctx.lineTo(x, baseY + Math.sin(x * 0.02 + w * 2) * 8);
    }
    ctx.stroke();
  }

  // === RED STRIP (Italian flag reference) ===
  const flagGrad = ctx.createLinearGradient(0, 60, 0, 180);
  flagGrad.addColorStop(0, 'transparent');
  flagGrad.addColorStop(0.5, 'rgba(220, 38, 38, 0.15)');
  flagGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = flagGrad;
  ctx.fillRect(40, 60, 3, 120);

  // === LINES ===
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 200); ctx.lineTo(280, 200); ctx.stroke();

  // === TYPOGRAPHY ===
  ctx.save();
  ctx.font = '800 60px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
  ctx.shadowBlur = 35;
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', W / 2, 330);
  ctx.restore();

  ctx.save();
  ctx.font = '900 76px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(220, 38, 38, 0.7)';
  ctx.shadowBlur = 45;
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', W / 2, 430);
  ctx.restore();

  ctx.save();
  ctx.font = '600 26px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WARM_GOLD;
  ctx.fillText('WORK IN PROGRESS', W / 2, 505);
  ctx.restore();

  ctx.save();
  ctx.font = '300 18px Inter';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia open e libera.', W / 2, 575);
  ctx.restore();

  ctx.save();
  ctx.font = '700 24px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('@ ITSOUND.IT', W / 2, 970);
  ctx.restore();

  // NOISE
  addNoise(ctx, 0.03);
}

// ============================================================
// RENDER ALL VARIANTS
// ============================================================
const variants = [
  { name: '01-spellbound', fn: variantSpellbound },
  { name: '02-doof', fn: variantDoof },
  { name: '03-phantom-grid', fn: variantPhantomGrid },
  { name: '04-territorio', fn: variantTerritorio },
];

for (const v of variants) {
  console.log(`Rendering ${v.name}...`);
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.textDrawingMode = 'path';
  ctx.antialias = 'subpixel';
  ctx.patternQuality = 'good';
  ctx.quality = 'good';

  v.fn(ctx);

  const buffer = canvas.toBuffer('image/png');
  const outPath = join(__dirname, `itsound-v2-${v.name}.png`);
  writeFileSync(outPath, buffer);
  const stats = await import('fs').then(fs => fs.statSync(outPath));
  console.log(`  ✅ ${outPath} (${(stats.size / 1024).toFixed(0)} KB)`);
}

console.log('\n✅ All variants generated!');
