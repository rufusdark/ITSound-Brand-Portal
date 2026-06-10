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

const W = 1080, H = 1920;
const RED = '#DC2626', PURPLE = '#8B5CF6', BLACK = '#0A0A0A', WHITE = '#FFFFFF';

function hexToRgb(hex) {
  if (hex.startsWith('#')) hex = hex.slice(1);
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function applyDuotone(img, color1, color2) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
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
    const noise = (Math.random() - 0.5) * 25;
    d[i] += noise; d[i+1] += noise; d[i+2] += noise;
  }
  ctx.putImageData(imgData, 0, 0);
}

function drawGrid(ctx) {
  // Fine grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // Medium grid
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // Major grid
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= W; x += 320) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 320) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // Diagonal
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  ctx.setLineDash([15, 15]);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, H); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(0, H); ctx.stroke();
  ctx.setLineDash([]);
}

function drawFrequencyBars(ctx) {
  const numBars = 28;
  const barWidth = 10;
  const spacing = 34;
  const startX = 140;
  const baseY = 1300;
  for (let i = 0; i < numBars; i++) {
    const h = 20 + Math.sin(i * 0.4) * 16 + Math.sin(i * 1.3) * 10 + Math.random() * 8;
    const x = startX + i * spacing;
    const isAccent = i % 5 === 0 || i % 7 === 0;
    ctx.fillStyle = isAccent
      ? `rgba(220, 38, 38, ${0.15 + Math.sin(i * 0.3) * 0.05})`
      : `rgba(139, 92, 246, ${0.1 + Math.sin(i * 0.4) * 0.03})`;
    ctx.fillRect(x, baseY - h, barWidth, h);
    ctx.fillStyle = i % 5 === 0
      ? `rgba(220, 38, 38, ${0.06 + Math.sin(i * 0.3) * 0.02})`
      : `rgba(139, 92, 246, ${0.04 + Math.sin(i * 0.4) * 0.01})`;
    ctx.fillRect(x, baseY + 5, barWidth, h * 0.35);
  }
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(startX, baseY); ctx.lineTo(startX + numBars * spacing, baseY); ctx.stroke();
}

async function main() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.textDrawingMode = 'path';
  ctx.antialias = 'subpixel';

  // Background with duotone photo
  try {
    const photo = await loadImage(join(__dirname, 'Frame-21.png'));
    const duotone = applyDuotone(photo, RED, BLACK);
    ctx.drawImage(duotone, 0, 0, W, H);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, W, H);
  } catch (e) {
    const bg = ctx.createRadialGradient(W/2, H/2, 200, W/2, H/2, 1000);
    bg.addColorStop(0, '#141414');
    bg.addColorStop(0.6, '#0A0A0A');
    bg.addColorStop(1, '#050505');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }

  drawGrid(ctx);

  // Red accent strip (vertical, full height)
  const redStrip = ctx.createLinearGradient(0, 200, 0, 1700);
  redStrip.addColorStop(0, 'transparent');
  redStrip.addColorStop(0.1, 'rgba(220, 38, 38, 0.6)');
  redStrip.addColorStop(0.5, 'rgba(220, 38, 38, 0.85)');
  redStrip.addColorStop(0.9, 'rgba(220, 38, 38, 0.6)');
  redStrip.addColorStop(1, 'transparent');
  ctx.fillStyle = redStrip;
  ctx.fillRect(80, 200, 2.5, 1500);
  ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
  ctx.fillRect(88, 200, 1, 1300);

  // Concentric circles
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.08)';
  ctx.lineWidth = 1;
  const cx = 900, cy = 350;
  for (let r = 200; r >= 40; r -= 35) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.beginPath(); ctx.arc(cx, cy, 160, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();

  drawFrequencyBars(ctx);

  // === TYPOGRAPHY ===
  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.3)';
  ctx.shadowBlur = 30;
  ctx.font = '800 64px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', W/2, 550);
  ctx.restore();

  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
  ctx.shadowBlur = 45;
  ctx.font = '900 90px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', W/2, 670);
  ctx.restore();

  // Separator
  const sepGrad = ctx.createLinearGradient(W/2-200, 0, W/2+200, 0);
  sepGrad.addColorStop(0, 'transparent');
  sepGrad.addColorStop(0.5, PURPLE);
  sepGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(W/2-200, 720); ctx.lineTo(W/2+200, 720); ctx.stroke();

  ctx.save();
  ctx.font = '600 28px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('W O R K   I N   P R O G R E S S', W/2, 790);
  ctx.restore();

  ctx.save();
  ctx.font = '300 20px Inter';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('Nessun software proprietario. Solo tecnologia open e libera.', W/2, 870);
  ctx.restore();

  // Footer
  ctx.save();
  ctx.font = '700 28px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('@ ITSOUND.IT', W/2, 1750);
  ctx.font = '300 14px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillText('musica · eventi · cultura', W/2, 1800);
  ctx.restore();

  // Corner brackets (larger for story format)
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(60, 130); ctx.lineTo(60, 60); ctx.lineTo(130, 60); ctx.stroke();
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.45)';
  ctx.beginPath(); ctx.moveTo(1020, 1860); ctx.lineTo(1020, 1020); // partial, will close below
  ctx.lineTo(1020, 1860);
  ctx.stroke();

  drawNoise(ctx);

  const vg = ctx.createRadialGradient(W/2, H/2, 400, W/2, H/2, 900);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(0.6, 'transparent');
  vg.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  const buffer = canvas.toBuffer('image/png');
  const outPath = join(__dirname, 'itsound-gemini-story.png');
  writeFileSync(outPath, buffer);
  const s = statSync(outPath);
  console.log(`✅ Gemini Story: ${outPath}`);
  console.log(`   Size: ${(s.size / 1024).toFixed(0)} KB × ${W}×${H}px`);
}

main().catch(console.error);
