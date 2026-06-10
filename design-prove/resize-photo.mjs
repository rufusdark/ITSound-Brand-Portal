import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const img = await loadImage(join(__dirname, 'Frame-21.png'));
  const canvas = createCanvas(1080, 1080);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 1080, 1080);
  const buf = canvas.toBuffer('image/jpeg', {quality: 0.8});
  writeFileSync(join(__dirname, 'frame-21-resized.jpg'), buf);
  console.log('✅ Resized photo ready');
}

main().catch(console.error);
