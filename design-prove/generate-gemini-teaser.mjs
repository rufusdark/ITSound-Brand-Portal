import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(__dirname, 'fonts');

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

function hexToRgb(hex) {
  if (hex.startsWith('#')) hex = hex.slice(1);
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function applyDuotone(img, color1, color2) {
  const c1 = hexToRgb(color1), c2 = hexToRgb(color2);
  const tempCanvas = createCanvas(img.width, img.height);
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(img, 0, 0);
  const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.2126 * d[i] + 0.7152 * d[i+1] + 0.0722 * d[i+2];
    const t = gray / 255;
    d[i]   = Math.round(c2[0] * (1 - t) + c1[0] * t);
    d[i+1] = Math.round(c2[1] * (1 - t) + c1[1] * t);
    d[i+2] = Math.round(c2[2] * (1 - t) + c1[2] * t);
  }
  tempCtx.putImageData(imgData, 0, 0);
  return tempCanvas;
}

function drawNoise(ctx) {
  const imgData = ctx.getImageData(0, 0, W, H);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    d[i] += noise; d[i+1] += noise; d[i+2] += noise;
  }
  ctx.putImageData(imgData, 0, 0);
}

async function main() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.textDrawingMode = 'path';
  ctx.antialias = 'subpixel';

  // === FULL DUOTONE PHOTO BACKGROUND ===
  try {
    const photo = await loadImage(join(__dirname, 'Frame-21.png'));
    const duotone = applyDuotone(photo, PURPLE, BLACK);
    ctx.drawImage(duotone, 0, 0, W, H);
  } catch (e) {
    const bg = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, 700);
    bg.addColorStop(0, '#141414');
    bg.addColorStop(0.6, '#0A0A0A');
    bg.addColorStop(1, '#050505');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }

  // Dark overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, W, H);

  // === BOLD GRID ===
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= W; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  ctx.strokeStyle = 'rgba(220, 38, 38, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 120) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // === BIG DIAGONAL SPLIT ===
  ctx.save();
  ctx.fillStyle = 'rgba(220, 38, 38, 0.06)';
  ctx.beginPath();
  ctx.moveTo(W, 0); ctx.lineTo(W, 400); ctx.lineTo(0, H); ctx.lineTo(0, H - 400); ctx.closePath();
  ctx.fill();
  ctx.restore();

  // === CENTER RED VERTICAL BAR (slim, architectural) ===
  const vStrip = ctx.createLinearGradient(W/2, 0, W/2, H);
  vStrip.addColorStop(0, 'transparent');
  vStrip.addColorStop(0.2, 'rgba(220, 38, 38, 0.5)');
  vStrip.addColorStop(0.5, 'rgba(220, 38, 38, 0.8)');
  vStrip.addColorStop(0.8, 'rgba(220, 38, 38, 0.5)');
  vStrip.addColorStop(1, 'transparent');
  ctx.fillStyle = vStrip;
  ctx.fillRect(W/2 - 1, 0, 2, H);

  // === FREQUENCY BARS (bottom area) ===
  const numBars = 30;
  const barWidth = 12, spacing = 32;
  const startX = (W - (numBars * spacing)) / 2;
  const baseY = 850;
  for (let i = 0; i < numBars; i++) {
    const h = 15 + Math.sin(i * 0.5) * 12 + Math.sin(i * 1.7) * 7 + Math.random() * 5;
    const x = startX + i * spacing;
    ctx.fillStyle = `rgba(139, 92, 246, ${0.08 + Math.sin(i * 0.4) * 0.04})`;
    ctx.fillRect(x, baseY - h, barWidth, h);
  }

  // === TYPOGRAPHY — centered, bold ===
  // Semi-transparent text block behind main text
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(200, 200, 680, 400);

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 20;
  ctx.font = '900 70px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', W/2, 320);
  ctx.restore();

  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
  ctx.shadowBlur = 50;
  ctx.font = '900 82px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', W/2, 425);
  ctx.restore();

  // Separator - full width
  ctx.save();
  const sepGrad = ctx.createLinearGradient(100, 0, W-100, 0);
  sepGrad.addColorStop(0, 'transparent');
  sepGrad.addColorStop(0.3, RED);
  sepGrad.addColorStop(0.5, PURPLE);
  sepGrad.addColorStop(0.7, RED);
  sepGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(100, 490); ctx.lineTo(W-100, 490); ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.font = '700 36px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('W O R K   I N   P R O G R E S S', W/2, 560);
  ctx.restore();

  // Body
  ctx.save();
  ctx.font = '300 18px Inter';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia open e libera.', W/2, 630);
  ctx.restore();

  // Footer
  ctx.save();
  ctx.font = '700 22px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('@ ITSOUND.IT', W/2, 980);
  ctx.font = '300 12px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillText('musica · eventi · cultura', W/2, 1010);
  ctx.restore();

  drawNoise(ctx);

  // Vignette
  const vg = ctx.createRadialGradient(W/2, H/2, 300, W/2, H/2, 650);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(0.6, 'transparent');
  vg.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  const buffer = canvas.toBuffer('image/png');
  const outPath = join(__dirname, 'itsound-gemini-teaser.png');
  writeFileSync(outPath, buffer);
  const s = statSync(outPath);
  console.log(`✅ Gemini Teaser: ${outPath}`);
  console.log(`   Size: ${(s.size / 1024).toFixed(0)} KB × ${W}×${H}px`);
}

main().catch(console.error);
