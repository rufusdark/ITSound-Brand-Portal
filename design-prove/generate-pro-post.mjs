import { createCanvas, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = join(__dirname, 'fonts');

// Register fonts - try multiple weight variants
const fontVariants = [
  { name: 'Orbitron', file: 'Orbitron-Black', weight: 900 },
  { name: 'Orbitron', file: 'Orbitron-ExtraBold', weight: 800 },
  { name: 'Orbitron', file: 'Orbitron-Bold', weight: 700 },
  { name: 'Orbitron', file: 'Orbitron-SemiBold', weight: 600 },
  { name: 'Orbitron', file: 'Orbitron-Medium', weight: 500 },
  { name: 'Orbitron', file: 'Orbitron-Regular', weight: 400 },
  { name: 'Inter', file: 'Inter-Bold', weight: 700 },
  { name: 'Inter', file: 'Inter-SemiBold', weight: 600 },
  { name: 'Inter', file: 'Inter-Medium', weight: 500 },
  { name: 'Inter', file: 'Inter-Regular', weight: 400 },
  { name: 'Inter', file: 'Inter-Light', weight: 300 },
];

for (const f of fontVariants) {
  try {
    registerFont(join(FONTS_DIR, `${f.file}.ttf`), { family: f.name, weight: f.weight });
  } catch (e) {
    // try other extensions
    try {
      registerFont(join(FONTS_DIR, `${f.file}.otf`), { family: f.name, weight: f.weight });
    } catch (e2) {}
  }
}

// ============================================================
// BRAND COLORS
// ============================================================
const RED = '#DC2626';
const PURPLE = '#8B5CF6';
const BLACK = '#0A0A0A';
const WHITE = '#FFFFFF';

const W = 1080;
const H = 1080;

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ============================================================
// DESIGN FUNCTIONS
// ============================================================
function drawBackground(ctx) {
  // Dark base gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0A0A0A');
  bg.addColorStop(0.35, '#1a0a2e');
  bg.addColorStop(0.65, '#2d0a3a');
  bg.addColorStop(1, '#0A0A0A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Red glow - top right
  const rg = ctx.createRadialGradient(W, 0, 0, W, 0, 550);
  rg.addColorStop(0, 'rgba(220, 38, 38, 0.3)');
  rg.addColorStop(0.4, 'rgba(220, 38, 38, 0.1)');
  rg.addColorStop(1, 'rgba(220, 38, 38, 0)');
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, W, H);

  // Purple glow - bottom left
  const pg = ctx.createRadialGradient(0, H, 0, 0, H, 500);
  pg.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
  pg.addColorStop(0.4, 'rgba(139, 92, 246, 0.08)');
  pg.addColorStop(1, 'rgba(139, 92, 246, 0)');
  ctx.fillStyle = pg;
  ctx.fillRect(0, 0, W, H);

  // Subtle center light
  const cg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 400);
  cg.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
  cg.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, W, H);
}

function drawGrid(ctx) {
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
}

function drawGeometricElements(ctx) {
  // Horizontal accent lines
  ctx.strokeStyle = RED;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 200);
  ctx.lineTo(280, 200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(80, 206);
  ctx.lineTo(200, 206);
  ctx.stroke();

  // Vertical accent bar
  const vg = ctx.createLinearGradient(0, 200, 0, 500);
  vg.addColorStop(0, PURPLE);
  vg.addColorStop(0.6, 'rgba(139, 92, 246, 0.3)');
  vg.addColorStop(1, 'transparent');
  ctx.fillStyle = vg;
  ctx.fillRect(80, 200, 3, 280);

  // Circles - top right
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(920, 180, 130, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(920, 180, 110, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(920, 180, 90, 0, Math.PI * 2);
  ctx.stroke();

  // Small decorative dots
  ctx.fillStyle = 'rgba(220, 38, 38, 0.4)';
  ctx.beginPath();
  ctx.arc(860, 155, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(980, 200, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(830, 190, 3, 0, Math.PI * 2);
  ctx.fill();

  // Sound wave visualization
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    const baseY = 800 + i * 22;
    ctx.beginPath();
    ctx.moveTo(100, baseY);
    for (let x = 100; x < 980; x += 8) {
      const wave = Math.sin(x * 0.025 + i * 1.3) * (10 + i * 2);
      ctx.lineTo(x, baseY + wave);
    }
    ctx.stroke();
  }

  // Additional geometric - diagonal lines
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.05)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(400, 400);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(W, 0);
  ctx.lineTo(W - 300, 300);
  ctx.stroke();
}

function drawCornerAccents(ctx) {
  // Top-left bracket
  ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 80);
  ctx.lineTo(40, 40);
  ctx.lineTo(80, 40);
  ctx.stroke();

  // Bottom-right bracket
  ctx.beginPath();
  ctx.moveTo(1040, 1000);
  ctx.lineTo(1040, 1040);
  ctx.lineTo(1000, 1040);
  ctx.stroke();

  // Red dot accent
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(80, 80, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = PURPLE;
  ctx.beginPath();
  ctx.arc(1000, 1000, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawTitle(ctx) {
  // "NUOVO SITO" with subtle glow
  ctx.save();

  // Glow layer
  ctx.shadowColor = 'rgba(220, 38, 38, 0.4)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '700 56px Orbitron';
  ctx.fillStyle = WHITE;
  ctx.fillText('NUOVO SITO', W / 2, 340);

  ctx.restore();

  ctx.save();

  // "IN ARRIVO" with red glow
  ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
  ctx.shadowBlur = 50;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.font = '900 72px Orbitron';
  ctx.fillStyle = RED;
  ctx.fillText('IN ARRIVO', W / 2, 430);

  ctx.restore();

  ctx.save();

  // "WORK IN PROGRESS"
  ctx.font = '500 26px Orbitron';
  ctx.fillStyle = PURPLE;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WORK IN PROGRESS', W / 2, 505);

  ctx.restore();

  // Separator line
  ctx.save();
  const sepGrad = ctx.createLinearGradient(W / 2 - 150, 0, W / 2 + 150, 0);
  sepGrad.addColorStop(0, 'transparent');
  sepGrad.addColorStop(0.3, PURPLE);
  sepGrad.addColorStop(0.7, PURPLE);
  sepGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 150, 535);
  ctx.lineTo(W / 2 + 150, 535);
  ctx.stroke();
  ctx.restore();
}

function drawBodyText(ctx) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '300 19px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.fillText('Nessun software proprietario.', W / 2, 585);
  ctx.fillText('Solo tecnologia open e libera.', W / 2, 615);
  ctx.restore();
}

function drawFooter(ctx) {
  ctx.save();

  // Accent bar
  const bg = ctx.createLinearGradient(W / 2 - 250, 0, W / 2 + 250, 0);
  bg.addColorStop(0, 'transparent');
  bg.addColorStop(0.3, 'rgba(139, 92, 246, 0.5)');
  bg.addColorStop(0.7, 'rgba(139, 92, 246, 0.5)');
  bg.addColorStop(1, 'transparent');
  ctx.fillStyle = bg;
  ctx.fillRect(W / 2 - 250, 945, 500, 1.5);

  // @ ITSOUND.IT
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '700 24px Orbitron';
  ctx.fillStyle = RED;
  ctx.fillText('@ ITSOUND.IT', W / 2, 985);

  // Tagline
  ctx.font = '300 13px Inter';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillText('musica · eventi · cultura', W / 2, 1015);

  ctx.restore();
}

// ============================================================
// VARIANT 2: PHOTO-BASED DESIGN (with placeholder)
// ============================================================
function generateDesign1(ctx) {
  drawBackground(ctx);
  drawGrid(ctx);
  drawGeometricElements(ctx);
  drawCornerAccents(ctx);
  drawTitle(ctx);
  drawBodyText(ctx);
  drawFooter(ctx);
}

// ============================================================
// RENDER & EXPORT
// ============================================================
console.log('Rendering Instagram post 1080×1080...');

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Enable text rendering optimizations
ctx.textDrawingMode = 'path';
ctx.antialias = 'subpixel';
ctx.patternQuality = 'good';
ctx.quality = 'good';

// Render the design
generateDesign1(ctx);

// Export as PNG
const buffer = canvas.toBuffer('image/png');
const outPath = join(__dirname, 'itsound-professional-post.png');
writeFileSync(outPath, buffer);

const stats = await import('fs').then(fs => fs.statSync(outPath));
console.log(`✅ Post salvato: ${outPath}`);
console.log(`   Dimensioni: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Risoluzione: 1080×1080 px`);

// Also create a Story variant 1080×1920
console.log('\nRendering Instagram Story 1080×1920...');
const canvas2 = createCanvas(1080, 1920);
const ctx2 = canvas2.getContext('2d');
ctx2.textDrawingMode = 'path';
ctx2.antialias = 'subpixel';
ctx2.patternQuality = 'good';
ctx2.quality = 'good';

// ... story variant could be added
