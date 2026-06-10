/**
 * gen-sito-varianti.mjs — 5 varianti post "Nuovo sito ITSound in arrivo"
 * ======================================================================
 * Stile: rosso+nero, cinema/editoriale. Stessa immagine Frame-21.png
 * per tutte le varianti, layout diversi per scegliere il migliore.
 *
 * Usa:  node gen-sito-varianti.mjs
 * Output: design-prove/posts/sito-v1.png ... sito-v5.png
 */

import { readFileSync, mkdirSync } from 'fs';
import { chromium } from 'playwright';

const OUT = 'design-prove/posts';
mkdirSync(OUT, { recursive: true });

const C = {
  black:      '#0A0A0A',
  white:      '#FFFFFF',
  red:        '#DC2626',
  redLight:   '#EF4444',
  redDark:    '#991B1B',
  purple:     '#8B5CF6',
  purpleLight:'#A78BFA',
  gray:       '#6B7280',
};

const BG = 'https://www.itsound.it/wp-content/uploads/2024/11/Frame-21.png';

async function renderPost(filename, html) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}/${filename}`, fullPage: false });
  await browser.close();
  console.log(`  ✓ ${filename}`);
}

// ══════════════════════════════════════════════════════════════════════════════
//  VARIANTE 1 — Cinema Dark (full-bleed, badge rosso, titolo monumentale)
// ══════════════════════════════════════════════════════════════════════════════
async function v1() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${BG}') center/cover;filter:brightness(0.35) contrast(1.3) saturate(0.7)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.95) 100%),
             radial-gradient(ellipse at 80% 20%, rgba(220,38,38,0.2) 0%, transparent 50%),
             radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)}
.vignette{position:absolute;inset:0;box-shadow:inset 0 0 150px rgba(0,0,0,0.8)}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 70px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(220,38,38,0.3);padding:8px 22px;border-radius:50px;
  font-family:Orbitron,monospace;font-size:11px;font-weight:600;color:${C.red};letter-spacing:3px;margin-bottom:32px;background:rgba(220,38,38,0.08)}
.pulse-dot{width:8px;height:8px;background:${C.red};border-radius:50%;box-shadow:0 0 15px rgba(220,38,38,0.6);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.4)}}
.title{font-family:Orbitron,monospace;font-size:68px;font-weight:900;color:${C.white};line-height:1.0;letter-spacing:-3px;text-shadow:0 6px 60px rgba(0,0,0,0.8);margin-bottom:4px}
.title-red{font-family:Orbitron,monospace;font-size:68px;font-weight:900;
  background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  line-height:1.0;letter-spacing:-3px;margin-bottom:16px;text-shadow:0 6px 60px rgba(0,0,0,0.8)}
.divider{width:80px;height:2px;background:linear-gradient(90deg,${C.red},${C.purple});border-radius:1px;margin:0 auto 20px}
.sub{font-size:16px;font-weight:200;color:rgba(255,255,255,0.45);letter-spacing:6px;text-transform:uppercase;margin-bottom:8px;text-shadow:0 4px 30px rgba(0,0,0,0.7)}
.text{font-size:15px;font-weight:300;color:rgba(255,255,255,0.4);line-height:1.8;max-width:480px;margin-bottom:28px;text-shadow:0 4px 20px rgba(0,0,0,0.7)}
.text strong{color:${C.white};font-weight:400}
.footer-info{display:flex;gap:20px;align-items:center}
.footer-item{font-family:Orbitron,monospace;font-size:9px;font-weight:400;color:rgba(255,255,255,0.15);letter-spacing:3px;text-transform:uppercase}
.dot-sep{width:3px;height:3px;border-radius:50%;background:rgba(220,38,38,0.3)}
</style></head><body>
<div class="bg"></div><div class="overlay"></div><div class="vignette"></div>
<div class="content">
  <div class="badge"><span class="pulse-dot"></span>WORK IN PROGRESS</div>
  <div class="title">NUOVO SITO</div>
  <div class="title-red">IN ARRIVO</div>
  <div class="divider"></div>
  <div class="sub">ITSound · Sta per rinascere</div>
  <div class="text">
    Stiamo costruendo il nuovo <strong>ITSound</strong> per voi.<br>
    Design completamente rinnovato, <strong>zero software proprietario</strong>,<br>
    solo tecnologia <strong style="color:${C.purpleLight}">open</strong> e <strong style="color:${C.purpleLight}">libera</strong>.
  </div>
  <div class="footer-info">
    <span class="footer-item">✦ Puglia · Italia ✦</span>
  </div>
</div>
</body></html>`;
  await renderPost('sito-v1-cinema-dark.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  VARIANTE 2 — Split Bold (immagine a sx, contenuto a dx)
// ══════════════════════════════════════════════════════════════════════════════
async function v2() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;font-family:Inter,sans-serif;background:${C.black};display:flex}
.photo{width:55%;height:100%;position:relative;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(0.5) contrast(1.2) saturate(0.7)}
.photo-fade{position:absolute;inset:0;background:linear-gradient(to right, transparent 50%, ${C.black} 100%)}
.content{width:45%;height:100%;background:${C.black};display:flex;flex-direction:column;justify-content:center;padding:50px 36px;position:relative}
.deco-line{position:absolute;left:0;top:12%;bottom:12%;width:3px;background:linear-gradient(to bottom, transparent, ${C.red}, ${C.purple}, transparent)}
.logo{font-family:Orbitron,monospace;font-size:20px;font-weight:900;color:${C.white};letter-spacing:3px;margin-bottom:32px}
.logo span{color:${C.red}}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid ${C.red};padding:6px 16px;border-radius:50px;
  font-family:Orbitron,monospace;font-size:10px;font-weight:600;color:${C.red};letter-spacing:2px;margin-bottom:28px;width:fit-content}
.pulse-dot{width:7px;height:7px;background:${C.red};border-radius:50%;box-shadow:0 0 12px rgba(220,38,38,0.8);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.4)}}
.title{font-family:Orbitron,monospace;font-size:44px;font-weight:900;color:${C.white};line-height:1.05;letter-spacing:-1px;margin-bottom:4px}
.title .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block;margin-top:4px}
.subtitle{font-size:14px;font-weight:200;color:rgba(255,255,255,0.4);letter-spacing:5px;text-transform:uppercase;margin-bottom:24px}
.divider{width:50px;height:2px;background:linear-gradient(90deg,${C.red},${C.purple});margin-bottom:24px}
.text{font-size:13px;font-weight:300;color:rgba(255,255,255,0.45);line-height:1.8;margin-bottom:24px}
.text strong{color:${C.white};font-weight:400}
.features{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.feat{display:flex;align-items:center;gap:10px;font-size:11px;font-weight:300;color:rgba(255,255,255,0.35);letter-spacing:1px}
.feat-icon{width:16px;height:16px;border-radius:50%;border:1px solid rgba(220,38,38,0.3);display:flex;align-items:center;justify-content:center;color:${C.red};font-size:8px;flex-shrink:0}
.cta{font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:3px;text-transform:uppercase;border:1px solid rgba(220,38,38,0.15);padding:8px 20px;border-radius:50px;width:fit-content}
</style></head><body>
<div class="photo">
  <img src="${BG}" alt="ITSound">
  <div class="photo-fade"></div>
</div>
<div class="content">
  <div class="deco-line"></div>
  <div class="logo">ITSound<span>.</span></div>
  <div class="badge"><span class="pulse-dot"></span>WORK IN PROGRESS</div>
  <div class="title">NUOVO<span class="red">SITO</span></div>
  <div class="subtitle">Sta per arrivare</div>
  <div class="divider"></div>
  <div class="text">
    Stiamo costruendo il nuovo <strong>ITSound</strong>.<br>
    <strong>Nessun software proprietario.</strong><br>
    Solo tecnologia <strong style="color:${C.purpleLight}">open</strong> e <strong style="color:${C.purpleLight}">libera</strong>.
  </div>
  <div class="features">
    <div class="feat"><span class="feat-icon">✦</span>Design completamente rinnovato</div>
    <div class="feat"><span class="feat-icon">✦</span>Performance ottimizzate</div>
    <div class="feat"><span class="feat-icon">✦</span>Contenuti in italiano</div>
  </div>
  <div class="cta">🚀 Stay Tuned</div>
</div>
</body></html>`;
  await renderPost('sito-v2-split-bold.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  VARIANTE 3 — Editoriale/Minimal (numero grande, tipografia pulita)
// ══════════════════════════════════════════════════════════════════════════════
async function v3() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${BG}') center/cover;filter:grayscale(0.3) brightness(0.4) contrast(1.3) saturate(0.6)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.7) 100%)}
.big-number{position:absolute;font-family:Orbitron,monospace;font-size:300px;font-weight:900;color:rgba(220,38,38,0.03);right:-40px;top:-40px;letter-spacing:-10px;pointer-events:none;line-height:1}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 80px;text-align:center}
.line-top{width:60px;height:1px;background:rgba(220,38,38,0.2);margin-bottom:32px}
.badge-editoriale{font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:6px;text-transform:uppercase;margin-bottom:20px}
.title-main{font-family:Orbitron,monospace;font-size:60px;font-weight:800;color:${C.white};line-height:1.02;letter-spacing:-1px;text-shadow:0 6px 50px rgba(0,0,0,0.8);margin-bottom:4px}
.title-light{font-family:Orbitron,monospace;font-size:32px;font-weight:200;color:rgba(255,255,255,0.55);letter-spacing:8px;text-transform:uppercase;text-shadow:0 4px 30px rgba(0,0,0,0.7);margin-bottom:16px}
.divider-mini{width:40px;height:1px;background:rgba(220,38,38,0.15);margin:0 auto 20px}
.text-editoriale{font-size:13px;font-weight:200;color:rgba(255,255,255,0.35);line-height:1.9;max-width:420px;margin-bottom:24px;text-shadow:0 4px 20px rgba(0,0,0,0.7)}
.text-editoriale strong{color:rgba(255,255,255,0.7);font-weight:400}
.pill-line{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.pill{font-size:9px;font-weight:300;color:rgba(255,255,255,0.25);padding:6px 18px;border:1px solid rgba(255,255,255,0.04);border-radius:100px;letter-spacing:2px;text-transform:uppercase;background:rgba(0,0,0,0.2)}
.pill.hl{border-color:rgba(220,38,38,0.12);color:${C.redLight}}
</style></head><body>
<div class="bg"></div><div class="overlay"></div>
<div class="big-number">v2</div>
<div class="content">
  <div class="line-top"></div>
  <div class="badge-editoriale">✦ Prossimamente ✦</div>
  <div class="title-main">NUOVO</div>
  <div class="title-light">ITSound</div>
  <div class="divider-mini"></div>
  <div class="text-editoriale">
    Il sito <strong>ITSound</strong> è in fase di rinnovamento.<br>
    Stiamo lavorando a un design completamente nuovo,<br>
    più veloce, più pulito, <strong>totalmente open source</strong>.
  </div>
  <div class="pill-line">
    <span class="pill hl">Design</span>
    <span class="pill">Performance</span>
    <span class="pill hl">Open Source</span>
    <span class="pill">Italiano</span>
  </div>
</div>
</body></html>`;
  await renderPost('sito-v3-editoriale.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  VARIANTE 4 — Futuristico/Geometric (overlay pattern, glow, moderno)
// ══════════════════════════════════════════════════════════════════════════════
async function v4() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${BG}') center/cover;filter:brightness(0.3) contrast(1.3) saturate(0.6)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.6) 100%),
             radial-gradient(ellipse at 50% 30%, rgba(220,38,38,0.12) 0%, transparent 50%),
             radial-gradient(ellipse at 50% 70%, rgba(139,92,246,0.06) 0%, transparent 40%)}
/* Geometric overlay */
.geo-grid{position:absolute;inset:0;opacity:0.15;
  background-image:linear-gradient(rgba(220,38,38,0.08) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(220,38,38,0.08) 1px, transparent 1px);
  background-size:60px 60px;pointer-events:none}
.geo-circle{position:absolute;border-radius:50%;border:1px solid rgba(220,38,38,0.08);pointer-events:none}
.geo-c1{width:400px;height:400px;top:-100px;right:-80px}
.geo-c2{width:280px;height:280px;bottom:-80px;left:-60px;border-color:rgba(139,92,246,0.06)}
/* Corner accents */
.corner{position:absolute;width:40px;height:40px;border-color:rgba(220,38,38,0.15);border-style:solid}
.c-tl{top:32px;left:32px;border-width:1px 0 0 1px}
.c-tr{top:32px;right:32px;border-width:1px 1px 0 0}
.c-bl{bottom:32px;left:32px;border-width:0 0 1px 1px}
.c-br{bottom:32px;right:32px;border-width:0 1px 1px 0}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 70px;text-align:center}
.glow-label{display:inline-flex;align-items:center;gap:10px;background:rgba(220,38,38,0.08);backdrop-filter:blur(10px);border:1px solid rgba(220,38,38,0.12);
  padding:7px 20px;border-radius:50px;font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:3px;text-transform:uppercase;margin-bottom:28px}
.pulse-dot{width:6px;height:6px;background:${C.red};border-radius:50%;box-shadow:0 0 12px rgba(220,38,38,0.6);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.5)}}
.main-title{font-family:Orbitron,monospace;font-size:64px;font-weight:900;color:${C.white};line-height:1.0;letter-spacing:-2px;text-shadow:0 6px 60px rgba(0,0,0,0.8)}
.main-title .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.main-title .light{font-weight:200;color:rgba(255,255,255,0.5);letter-spacing:6px;display:block;font-size:36px;margin-top:8px}
.glow-bar{width:120px;height:2px;background:linear-gradient(90deg,transparent,${C.red},${C.purpleLight},transparent);border-radius:1px;margin:16px auto 20px}
.sub-text{font-size:14px;font-weight:200;color:rgba(255,255,255,0.35);line-height:1.8;max-width:440px;margin-bottom:24px;text-shadow:0 4px 20px rgba(0,0,0,0.7)}
.sub-text strong{color:rgba(255,255,255,0.6);font-weight:400}
.countdown-badge{display:inline-flex;gap:16px;padding:10px 24px;border:1px solid rgba(255,255,255,0.04);border-radius:8px;background:rgba(0,0,0,0.3);backdrop-filter:blur(4px)}
.cd-item{text-align:center}
.cd-num{font-family:Orbitron,monospace;font-size:18px;font-weight:700;color:${C.white};line-height:1}
.cd-label{font-size:7px;font-weight:200;color:rgba(255,255,255,0.15);letter-spacing:2px;text-transform:uppercase;margin-top:2px}
.cd-sep{width:1px;height:24px;background:rgba(255,255,255,0.04);align-self:center}
.soon{font-size:10px;font-weight:300;color:rgba(255,255,255,0.12);letter-spacing:4px;text-transform:uppercase;margin-top:12px}
</style></head><body>
<div class="bg"></div><div class="overlay"></div>
<div class="geo-grid"></div>
<div class="geo-circle geo-c1"></div><div class="geo-circle geo-c2"></div>
<div class="corner c-tl"></div><div class="corner c-tr"></div><div class="corner c-bl"></div><div class="corner c-br"></div>
<div class="content">
  <div class="glow-label"><span class="pulse-dot"></span>In costruzione</div>
  <div class="main-title">STAI <span class="red">TUNED</span></div>
  <div class="main-title"><span class="light">ITSound 2.0</span></div>
  <div class="glow-bar"></div>
  <div class="sub-text">
    Il nuovo sito <strong>ITSound</strong> sta per arrivare.<br>
    Design rinnovato, zero software proprietario,<br>
    solo <strong>open source</strong>.
  </div>
  <div class="soon">✦ Non vediamo l'ora ✦</div>
</div>
</body></html>`;
  await renderPost('sito-v4-futuristico.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  VARIANTE 5 — Card vetro/business (sovrapposizione stile vetro/glassmorphism)
// ══════════════════════════════════════════════════════════════════════════════
async function v5() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${BG}') center/cover;filter:brightness(0.3) contrast(1.2) saturate(0.6) blur(2px);transform:scale(1.02)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.7) 100%),
             radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.05) 0%, transparent 50%)}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 70px}
.glass-card{background:rgba(255,255,255,0.02);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.04);
  border-radius:20px;padding:36px 40px;width:100%;max-width:520px;text-align:center}
.logo-card{font-family:Orbitron,monospace;font-size:26px;font-weight:900;color:${C.white};letter-spacing:4px;margin-bottom:4px}
.logo-card span{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.card-sub{font-size:9px;font-weight:300;color:rgba(255,255,255,0.2);letter-spacing:4px;text-transform:uppercase;margin-bottom:24px}
.card-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(220,38,38,0.08),transparent);margin-bottom:24px}
.card-title{font-family:Orbitron,monospace;font-size:32px;font-weight:800;color:${C.white};letter-spacing:-1px;margin-bottom:4px}
.card-title .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.card-subtitle{font-family:Inter,sans-serif;font-size:13px;font-weight:200;color:rgba(255,255,255,0.35);letter-spacing:4px;text-transform:uppercase;margin-bottom:20px}
.card-text{font-size:13px;font-weight:200;color:rgba(255,255,255,0.3);line-height:1.8;margin-bottom:24px}
.card-text strong{color:rgba(255,255,255,0.55);font-weight:400}
.feature-dots{display:flex;gap:12px;justify-content:center;margin-bottom:24px}
.f-dot{display:flex;flex-direction:column;align-items:center;gap:6px}
.f-dot-circle{width:36px;height:36px;border-radius:50%;border:1px solid rgba(220,38,38,0.1);display:flex;align-items:center;justify-content:center;font-size:12px;color:${C.red};background:rgba(220,38,38,0.03)}
.f-dot-label{font-size:7px;font-weight:200;color:rgba(255,255,255,0.15);letter-spacing:1px;text-transform:uppercase}
.card-footer{font-size:9px;font-weight:200;color:rgba(255,255,255,0.1);letter-spacing:3px;text-transform:uppercase}
.card-footer span{color:${C.red}}
</style></head><body>
<div class="bg"></div><div class="overlay"></div>
<div class="content">
  <div class="glass-card">
    <div class="logo-card">ITSOUND<span>.</span></div>
    <div class="card-sub">Record Label · Martina Franca</div>
    <div class="card-divider"></div>
    <div class="card-title">NUOVO <span class="red">SITO</span></div>
    <div class="card-subtitle">In arrivo</div>
    <div class="card-text">
      Stiamo lavorando al <strong>nuovo ITSound</strong>.<br>
      Design completamente rinnovato, <strong>performance</strong> ottimizzate,<br>
      e tanto <strong style="color:${C.purpleLight}">open source</strong>.
    </div>
    <div class="feature-dots">
      <div class="f-dot"><div class="f-dot-circle">✦</div><div class="f-dot-label">Design</div></div>
      <div class="f-dot"><div class="f-dot-circle">✦</div><div class="f-dot-label">Velocità</div></div>
      <div class="f-dot"><div class="f-dot-circle">✦</div><div class="f-dot-label">Open</div></div>
    </div>
    <div class="card-divider"></div>
    <div class="card-footer"><span>✦</span> Stay Tuned <span>✦</span></div>
  </div>
</div>
</body></html>`;
  await renderPost('sito-v5-glass-card.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  RUN
// ══════════════════════════════════════════════════════════════════════════════
console.log('⚙️  Generazione 5 varianti — Post "Nuovo Sito ITSound"');
console.log('   Stile: Rosso + Nero · 5 layout diversi · Frame-21.png\n');
console.time('Varianti');
await v1();
await v2();
await v3();
await v4();
await v5();
console.timeEnd('Varianti');
console.log(`\n✅ Fatto! Le varianti sono in ${OUT}/`);
console.log('   🎨 sito-v1-cinema-dark.png    — Full-bleed, badge WIP, titolo monumentale');
console.log('   🎨 sito-v2-split-bold.png     — Split 55/45, foto sx, contenuto dx');
console.log('   🎨 sito-v3-editoriale.png     — Numero grande "v2", tipografia minimale');
console.log('   🎨 sito-v4-futuristico.png    — Geometric grid, corner accent, glow');
console.log('   🎨 sito-v5-glass-card.png     — Glassmorphism card, blur, elegante');
