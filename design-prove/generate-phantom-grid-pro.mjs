import { createCanvas, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(__dirname, 'fonts');

// Register fonts
for (const [family, file, weight] of [
  ['Orbitron', 'Orbitron-Black', 900],
  ['Orbitron', 'Orbitron-ExtraBold', 800],
  ['Orbitron', 'Orbitron-Bold', 700],
  ['Orbitron', 'Orbitron-SemiBold', 600],
  ['Orbitron', 'Orbitron-Medium', 500],
  ['Orbitron', 'Orbitron-Regular', 400],
  ['Inter', 'Inter-Bold', 700],
  ['Inter', 'Inter-Light', 300],
]) {
  try { registerFont(join(FONTS_DIR, `${file}.ttf`), { family, weight }); } catch (e) {}
}

const W = 1080, H = 1080;
const RED = '#DC2626', PURPLE = '#8B5CF6', BLACK = '#0A0A0A', WHITE = '#FFFFFF';

// ================================================================
// NOISE TEXTURE
// ================================================================
function generateNoise(ctx, intensity = 25) {
  const imgData = ctx.getImageData(0, 0, W, H);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * intensity;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  ctx.putImageData(imgData, 0, 0);
}

// ================================================================
// MAIN DESIGN: PHANTOM GRID PROFESSIONAL
// ================================================================
function renderPhantomGrid(ctx) {
  // =================================================================
  // 1. BACKGROUND
  // =================================================================
  const bg = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 700);
  bg.addColorStop(0, '#141414');
  bg.addColorStop(0.3, '#0E0E0E');
  bg.addColorStop(0.6, '#0A0A0A');
  bg.addColorStop(1, '#050505');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle light from top-right (red cast)
  const rg = ctx.createRadialGradient(W, 0, 0, W, 0, 600);
  rg.addColorStop(0, 'rgba(220, 38, 38, 0.08)');
  rg.addColorStop(0.5, 'rgba(220, 38, 38, 0.02)');
  rg.addColorStop(1, 'transparent');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, W, H);

  // Subtle light from bottom-left (purple cast)
  const pg = ctx.createRadialGradient(0, H, 0, 0, H, 500);
  pg.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
  pg.addColorStop(0.5, 'rgba(139, 92, 246, 0.015)');
  pg.addColorStop(1, 'transparent');
  ctx.fillStyle = pg;
  ctx.fillRect(0, 0, W, H);

  // =================================================================
  // 2. GRID SYSTEM — multi-layer, architectural
  // =================================================================
  // Fine grid (every 20px)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= W; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Medium grid (every 80px)
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 80) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Major grid (every 320px) — PURPLE accent
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= W; x += 320) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 320) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // =================================================================
  // 3. DIAGONAL CUT — architectural division
  // =================================================================
  ctx.save();
  ctx.fillStyle = 'rgba(220, 38, 38, 0.04)';
  ctx.beginPath();
  ctx.moveTo(W, 0);
  ctx.lineTo(W, 250);
  ctx.lineTo(W - 350, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'rgba(139, 92, 246, 0.03)';
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, H - 300);
  ctx.lineTo(400, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // =================================================================
  // 4. RED ACCENT STRIP — vertical, architectural
  // =================================================================
  const redStrip = ctx.createLinearGradient(0, 180, 0, 650);
  redStrip.addColorStop(0, 'transparent');
  redStrip.addColorStop(0.15, 'rgba(220, 38, 38, 0.6)');
  redStrip.addColorStop(0.5, 'rgba(220, 38, 38, 0.8)');
  redStrip.addColorStop(0.85, 'rgba(220, 38, 38, 0.6)');
  redStrip.addColorStop(1, 'transparent');
  ctx.fillStyle = redStrip;
  ctx.fillRect(100, 180, 2, 470);

  // Thinner secondary strip
  ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
  ctx.fillRect(108, 180, 1, 420);

  // =================================================================
  // 5. CIRCLE GEOMETRY — concentric, precise
  // =================================================================
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.06)';
  ctx.lineWidth = 1;
  const cx = 880, cy = 220;
  for (let r = 140; r >= 30; r -= 25) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  }

  // Dashed circle
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.beginPath(); ctx.arc(cx, cy, 110, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // Small red dot at center
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

  // =================================================================
  // 6. SOUND FREQUENCY VISUALIZATION
  // =================================================================
  const barColors = [RED, PURPLE];
  for (let i = 0; i < 24; i++) {
    const x = 160 + i * 34;
    const h = 25 + Math.sin(i * 0.35) * 18 + Math.sin(i * 1.1) * 10 + Math.sin(i * 2.3) * 5;
    const alpha = 0.04 + Math.sin(i * 0.3) * 0.025;
    const isAccent = i % 5 === 0 || i % 7 === 0;

    ctx.fillStyle = isAccent
      ? `rgba(220, 38, 38, ${alpha + 0.03})`
      : `rgba(139, 92, 246, ${alpha})`;
    ctx.fillRect(x, 730 - h, 14, h);

    // Mirror (bottom)
    ctx.fillRect(x, 740, 14, h * 0.4);
  }

  // Frequency baseline
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(160, 730); ctx.lineTo(960, 730); ctx.stroke();

  // =================================================================
  // 7. CORNER BRACKETS — architectural detail
  // =================================================================
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
  ctx.lineWidth = 2;

  // Top-left
  ctx.beginPath(); ctx.moveTo(50, 120); ctx.lineTo(50, 50); ctx.lineTo(120, 50); ctx.stroke();
  // Bottom-right
  ctx.beginPath(); ctx.moveTo(1030, 960); ctx.lineTo(1030, 1030); ctx.lineTo(960, 1030); ctx.stroke();

  // Small marker dots
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(120, 120, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = PURPLE;
  ctx.beginPath(); ctx.arc(960, 960, 3.5, 0, Math.PI * 2); ctx.fill();

  // =================================================================
  // 8. TOP ACCENT LINE
  // =================================================================
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(100, 190); ctx.lineTo(280, 190); ctx.stroke();
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(100, 196); ctx.lineTo(220, 196); ctx.stroke();

  // =================================================================
  // 9. TYPOGRAPHY — LAYER 1: "NUOVO SITO"
  // =================================================================
  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.3)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = '800 54px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', 140, 350);
  ctx.restore();

  // =================================================================
  // TYPOGRAPHY — LAYER 2: "IN ARRIVO" (RED, dominant)
  // =================================================================
  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
  ctx.shadowBlur = 35;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = '900 74px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', 140, 445);
  ctx.restore();

  // =================================================================
  // TYPOGRAPHY — LAYER 3: "WORK IN PROGRESS" subtitle
  // =================================================================
  ctx.save();
  ctx.font = '600 24px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('W O R K   I N   P R O G R E S S', 140, 520);
  ctx.restore();

  // =================================================================
  // SEPARATOR LINE
  // =================================================================
  ctx.save();
  const sepGrad = ctx.createLinearGradient(140, 0, 500, 0);
  sepGrad.addColorStop(0, PURPLE);
  sepGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.5)');
  sepGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, 545);
  ctx.lineTo(500, 545);
  ctx.stroke();
  ctx.restore();

  // =================================================================
  // BODY TEXT
  // =================================================================
  ctx.save();
  ctx.font = '300 17px Inter';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('Nessun software proprietario.', 140, 595);
  ctx.fillText('Solo tecnologia open e libera.', 140, 622);
  ctx.restore();

  // =================================================================
  // FOOTER
  // =================================================================
  ctx.save();
  ctx.font = '700 24px Orbitron';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('@ ITSOUND.IT', W - 100, 975);
  ctx.font = '300 12px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillText('musica · eventi · cultura', W - 100, 1005);
  ctx.restore();

  // =================================================================
  // 10. NOISE TEXTURE OVERLAY
  // =================================================================
  generateNoise(ctx, 20);

  // Light second pass noise for analog feel
  generateNoise(ctx, 10);

  // =================================================================
  // 11. VIGNETTE
  // =================================================================
  const vg = ctx.createRadialGradient(W / 2, H / 2, 350, W / 2, H / 2, 650);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(0.7, 'transparent');
  vg.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

// ================================================================
// EXPORT
// ================================================================
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');
ctx.textDrawingMode = 'path';
ctx.antialias = 'subpixel';
ctx.patternQuality = 'good';
ctx.quality = 'good';

renderPhantomGrid(ctx);

const buffer = canvas.toBuffer('image/png');
const outPath = join(__dirname, 'itsound-phantom-grid-pro.png');
writeFileSync(outPath, buffer);

const { statSync } = await import('fs');
const s = statSync(outPath);
console.log(`✅ Phantom Grid PRO: ${outPath}`);
console.log(`   Size: ${(s.size / 1024).toFixed(0)} KB × ${W}×${H}px`);
