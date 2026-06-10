import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const W = 1080, H = 1080;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#DC2626';
ctx.fillRect(0, 0, W, H);
ctx.fillStyle = '#0A0A0A';
ctx.font = 'bold 60px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillStyle = 'white';
ctx.fillText('ITSOUND.IT - Phantom Grid', W/2, H/2);

const buf = canvas.toBuffer('image/jpeg', {quality: 0.85});
writeFileSync(join(__dirname, 'itsound-small.jpg'), buf);
console.log('Small JPG ready');
