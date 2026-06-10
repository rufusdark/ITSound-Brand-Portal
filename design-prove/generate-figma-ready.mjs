import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(__dirname, 'fonts');

for (const [family, file, weight] of [
  ['Orbitron', 'Orbitron-Black', 900],
  ['Orbitron', 'Orbitron-Bold', 700],
  ['Orbitron', 'Orbitron-Medium', 500],
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

async function main() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.textDrawingMode = 'path';
  ctx.antialias = 'subpixel';

  // Duotone photo background
  try {
    const photo = await loadImage(join(__dirname, 'Frame-21.png'));
    const duotone = applyDuotone(photo, RED, BLACK);
    ctx.drawImage(duotone, 0, 0, W, H);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, W, H);
  } catch (e) {
    const bg = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, 700);
    bg.addColorStop(0, '#141414');
    bg.addColorStop(0.6, '#0A0A0A');
    bg.addColorStop(1, '#050505');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }

  // Grid system
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= W; x += 320) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 320) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  ctx.setLineDash([12, 12]);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, H); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(0, H); ctx.stroke();
  ctx.setLineDash([]);

  // Diagonal composition cuts
  ctx.fillStyle = 'rgba(220, 38, 38, 0.05)';
  ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, 250); ctx.lineTo(W - 350, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(139, 92, 246, 0.04)';
  ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H - 300); ctx.lineTo(400, H); ctx.closePath(); ctx.fill();

  // Red accent strip
  const stripGrad = ctx.createLinearGradient(0, 180, 0, 650);
  stripGrad.addColorStop(0, 'transparent');
  stripGrad.addColorStop(0.15, 'rgba(220, 38, 38, 0.7)');
  stripGrad.addColorStop(0.5, 'rgba(220, 38, 38, 0.9)');
  stripGrad.addColorStop(0.85, 'rgba(220, 38, 38, 0.7)');
  stripGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = stripGrad;
  ctx.fillRect(100, 180, 2.5, 470);
  ctx.fillStyle = 'rgba(139, 92, 246, 0.35)';
  ctx.fillRect(109, 180, 1, 420);

  // Concentric circles
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.08)';
  ctx.lineWidth = 1;
  const cx = 880, cy = 220;
  for (let r = 140; r >= 30; r -= 25) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
  ctx.beginPath(); ctx.arc(cx, cy, 110, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

  // Corner brackets
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(50, 120); ctx.lineTo(50, 50); ctx.lineTo(120, 50); ctx.stroke();
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.5)';
  ctx.beginPath(); ctx.moveTo(1030, 960); ctx.lineTo(1030, 1030); ctx.lineTo(960, 1030); ctx.stroke();
  ctx.fillStyle = RED;
  ctx.beginPath(); ctx.arc(120, 120, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = PURPLE;
  ctx.beginPath(); ctx.arc(960, 960, 3.5, 0, Math.PI * 2); ctx.fill();

  // Accent lines
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(100, 190); ctx.lineTo(280, 190); ctx.stroke();
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(100, 196); ctx.lineTo(220, 196); ctx.stroke();

  // Frequency bars
  for (let i = 0; i < 28; i++) {
    const h = 18 + Math.sin(i * 0.4) * 14 + Math.sin(i * 1.3) * 8 + Math.sin(i * 2.7) * 4 + Math.random() * 6;
    const x = 140 + i * 32;
    ctx.fillStyle = (i % 5 === 0 || i % 7 === 0)
      ? `rgba(220, 38, 38, ${0.15 + Math.sin(i * 0.3) * 0.05})`
      : `rgba(139, 92, 246, ${0.1 + Math.sin(i * 0.4) * 0.03})`;
    ctx.fillRect(x, 740 - h, 10, h);
  }
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.lineWidth = 0.5;
  ctx.beginPath(); ctx.moveTo(140, 740); ctx.lineTo(140 + 27 * 32, 740); ctx.stroke();

  // Typography
  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.3)';
  ctx.shadowBlur = 30;
  ctx.font = '800 56px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', 140, 350);
  ctx.restore();

  ctx.save();
  ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
  ctx.shadowBlur = 40;
  ctx.font = '900 78px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', 140, 445);
  ctx.restore();

  ctx.save();
  ctx.font = '600 24px Orbitron';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = PURPLE;
  ctx.fillText('W O R K   I N   P R O G R E S S', 140, 520);
  ctx.restore();

  const sepGrad = ctx.createLinearGradient(140, 0, 500, 0);
  sepGrad.addColorStop(0, PURPLE);
  sepGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.5)');
  sepGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(140, 545); ctx.lineTo(500, 545); ctx.stroke();

  ctx.save();
  ctx.font = '300 17px Inter';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.fillText('Nessun software proprietario.', 140, 595);
  ctx.fillText('Solo tecnologia open e libera.', 140, 622);
  ctx.restore();

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

  // Noise and vignette
  const noise = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < noise.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 25;
    noise.data[i] += n; noise.data[i+1] += n; noise.data[i+2] += n;
  }
  ctx.putImageData(noise, 0, 0);

  const vg = ctx.createRadialGradient(W/2, H/2, 350, W/2, H/2, 650);
  vg.addColorStop(0, 'transparent');
  vg.addColorStop(0.7, 'transparent');
  vg.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  const buffer = canvas.toBuffer('image/png');
  writeFileSync(join(__dirname, 'itsound-figma-ready.png'), buffer);
  console.log('✅ Ready for Figma import');
}

main().catch(console.error);
