/**
 * gen-ig-posts.mjs — Genera post Instagram per ITSound
 * ==========================================================
 * Stile: rosso+nero futuristico, ispirazione cinema/editoriale.
 * Palette: #DC2626 (rosso), #8B5CF6 (viola accento), #0A0A0A (nero)
 * Font: Orbitron (titoli), Inter (testi)
 *
 * Usa:  node gen-ig-posts.mjs
 *
 * I post vengono salvati in design-prove/posts/
 */

import { readFileSync, mkdirSync } from 'fs';
import { chromium } from 'playwright';

const OUT = 'design-prove/posts';
mkdirSync(OUT, { recursive: true });

// ── Palette ITSound (rossa, come da design originali) ──
const C = {
  black:      '#0A0A0A',
  white:      '#FFFFFF',
  red:        '#DC2626',
  redLight:   '#EF4444',
  redDark:    '#991B1B',
  purple:     '#8B5CF6',
  purpleLight:'#A78BFA',
  gray:       '#6B7280',
  grayLight:  '#9CA3AF',
};

// ── Logo in base64 ──
const LOGO = () => {
  const p = 'site/img/logo.png';
  return `data:image/png;base64,${readFileSync(p).toString('base64')}`;
};

// ── Immagini di background (URL pubbliche) ──
const IMG = {
  marco:    'https://www.itsound.it/wp-content/uploads/2024/11/image00001.jpeg',
  frame21:  'https://www.itsound.it/wp-content/uploads/2024/11/Frame-21.png',
  console:  'https://images.unsplash.com/photo-1776785941024-bee8e93e93ce?q=80&w=1080&auto=format&fit=crop',
  studio:   'https://images.unsplash.com/photo-1760780567530-389d8a3fba75?q=80&w=1080&auto=format&fit=crop',
};

// ── Render con Playwright ──
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
//  POST 1 — "Chi siamo" (Lancio)
//  Layout full-bleed con foto Marco + overlay rosso
// ══════════════════════════════════════════════════════════════════════════════
async function post1() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${IMG.marco}') center 30%/cover;filter:brightness(0.45) contrast(1.2) saturate(0.8)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.95) 100%),
             radial-gradient(ellipse at 80% 20%, rgba(220,38,38,0.2) 0%, transparent 50%),
             radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)}
.vignette{position:absolute;inset:0;box-shadow:inset 0 0 150px rgba(0,0,0,0.8)}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 70px;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(220,38,38,0.3);padding:8px 20px;border-radius:50px;
  font-family:Orbitron,monospace;font-size:11px;font-weight:600;color:${C.red};letter-spacing:3px;margin-bottom:28px;background:rgba(220,38,38,0.08)}
.title{font-family:Orbitron,monospace;font-size:56px;font-weight:900;color:${C.white};text-align:center;line-height:1.0;letter-spacing:-2px;margin-bottom:4px;text-shadow:0 4px 40px rgba(0,0,0,0.8)}
.title-red{font-family:Orbitron,monospace;font-size:56px;font-weight:900;
  background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  text-align:center;line-height:1.0;letter-spacing:-2px;margin-bottom:8px;text-shadow:0 4px 40px rgba(0,0,0,0.8)}
.sub{font-size:18px;font-weight:200;color:rgba(255,255,255,0.5);letter-spacing:6px;text-transform:uppercase;margin-bottom:12px;text-shadow:0 4px 30px rgba(0,0,0,0.7)}
.divider{width:80px;height:2px;background:linear-gradient(90deg,${C.red},${C.purple});border-radius:1px;margin:8px auto 24px}
.slogan{font-size:16px;font-weight:300;color:rgba(255,255,255,0.45);letter-spacing:2px;max-width:480px;line-height:1.6;margin-bottom:24px;text-shadow:0 4px 20px rgba(0,0,0,0.7)}
.slogan strong{color:${C.red};font-weight:600}
.serv-list{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px}
.serv-item{font-size:10px;font-weight:300;color:rgba(255,255,255,0.5);padding:6px 16px;border:1px solid rgba(255,255,255,0.06);border-radius:100px;letter-spacing:1.5px;text-transform:uppercase;background:rgba(0,0,0,0.3)}
.serv-item.hl{border-color:rgba(220,38,38,0.2);color:${C.redLight}}
.footer{font-size:11px;font-weight:200;color:rgba(255,255,255,0.2);letter-spacing:4px;text-transform:uppercase;margin-top:8px}
.footer span{color:${C.red}}
</style></head><body>
<div class="bg"></div><div class="overlay"></div><div class="vignette"></div>
<div class="content">
  <div class="badge">✦ Record Label · Martina Franca ✦</div>
  <div class="title">FINALMENTE CI</div>
  <div class="title-red">PRESENTIAMO</div>
  <div class="sub">ITSound</div>
  <div class="divider"></div>
  <div class="slogan">
    Siamo <strong>Marco e Andrea</strong>, due ragazzi che credono<br>
    che la musica possa unire persone e creare <strong>connessioni</strong>.
  </div>
  <div class="serv-list">
    <span class="serv-item hl">Mixing & Mastering</span>
    <span class="serv-item">Ghost Production</span>
    <span class="serv-item hl">Track Placement</span>
    <span class="serv-item">Social Management</span>
    <span class="serv-item hl">Graphic Design</span>
    <span class="serv-item">Consulting</span>
  </div>
  <div class="footer"><span>✦</span> Da Martina Franca al mondo <span>✦</span></div>
</div>
</body></html>`;
  await renderPost('01-chi-siamo.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  POST 2 — "Il nostro territorio"
//  Layout: split con foto Marco a sinistra, contenuto a destra
// ══════════════════════════════════════════════════════════════════════════════
async function post2() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;font-family:Inter,sans-serif;background:${C.black};display:flex}
/* Left — photo */
.photo{width:55%;height:100%;position:relative;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:brightness(0.65) contrast(1.1) saturate(0.85)}
.photo-fade{position:absolute;inset:0;background:linear-gradient(to right, transparent 50%, ${C.black} 100%)}
/* Right — content */
.content{width:45%;height:100%;background:${C.black};display:flex;flex-direction:column;justify-content:center;padding:50px 40px;position:relative}
.deco{position:absolute;left:0;top:12%;bottom:12%;width:3px;
  background:linear-gradient(to bottom, transparent, ${C.red}, ${C.purple}, transparent)}
.logo-text{font-family:Orbitron,monospace;font-size:22px;font-weight:900;color:${C.white};letter-spacing:3px;margin-bottom:32px}
.logo-text span{color:${C.red}}
.badge{display:inline-flex;align-items:center;gap:8px;border:1px solid ${C.red};padding:7px 16px;border-radius:50px;
  font-family:Orbitron,monospace;font-size:11px;font-weight:600;color:${C.red};letter-spacing:2px;margin-bottom:28px;width:fit-content}
.title{font-family:Orbitron,monospace;font-size:46px;font-weight:900;color:${C.white};line-height:1.05;letter-spacing:-1px;margin-bottom:6px}
.title .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block}
.subtitle{font-size:16px;font-weight:200;color:rgba(255,255,255,0.45);letter-spacing:5px;text-transform:uppercase;margin-bottom:28px}
.divider{width:50px;height:2px;background:linear-gradient(90deg,${C.red},${C.purple});margin-bottom:24px}
.text{font-size:13px;font-weight:300;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:28px}
.text strong{color:${C.white};font-weight:500}
.loc-line{display:flex;gap:12px;align-items:center;margin-bottom:24px}
.loc-item{font-family:Orbitron,monospace;font-size:9px;font-weight:400;color:rgba(255,255,255,0.2);letter-spacing:2px;text-transform:uppercase}
.loc-dot{width:4px;height:4px;border-radius:50%;background:${C.red}}
.cta{font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:3px;text-transform:uppercase;border:1px solid rgba(220,38,38,0.15);padding:8px 20px;border-radius:50px;width:fit-content}
</style></head><body>
<div class="photo">
  <img src="${IMG.marco}" alt="ITSound - Marco">
  <div class="photo-fade"></div>
</div>
<div class="content">
  <div class="deco"></div>
  <div class="logo-text">ITSOUND<span>.</span></div>
  <div class="badge">📍 Territorio</div>
  <div class="title">MARTINA<span class="red">FRANCA</span></div>
  <div class="subtitle">Il cuore pulsante</div>
  <div class="divider"></div>
  <div class="text">
    Siamo orgogliosi di essere una label nata <strong>qui</strong>,<br>
    in <strong>Valle d'Itria</strong>. La nostra musica parte<br>
    da queste strade e vuole arrivare <strong>ovunque</strong>.
  </div>
  <div class="loc-line">
    <span class="loc-item">Valle d'Itria</span><span class="loc-dot"></span>
    <span class="loc-item">Puglia</span><span class="loc-dot"></span>
    <span class="loc-item">Italia</span>
  </div>
  <div class="cta">✧ Sei della zona? Scrivici ✧</div>
</div>
</body></html>`;
  await renderPost('02-territorio.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  POST 3 — "I nostri servizi"
//  Layout: full-bleed with Frame-21, servizi in griglia
// ══════════════════════════════════════════════════════════════════════════════
async function post3() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${IMG.frame21}') center/cover;filter:brightness(0.35) contrast(1.3) saturate(0.7)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.4) 100%),
             radial-gradient(ellipse at 50% 100%, rgba(220,38,38,0.15) 0%, transparent 60%),
             radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 50%)}
.frame{position:absolute;inset:28px;border:1px solid rgba(220,38,38,0.12);pointer-events:none;border-radius:4px}
.frame-top{position:absolute;top:-1px;left:50%;transform:translateX(-50%);width:180px;height:2px;background:linear-gradient(90deg,transparent,${C.red},transparent)}
.frame-bot{position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:180px;height:2px;background:linear-gradient(90deg,transparent,${C.purple},transparent)}
.content{position:absolute;inset:0;display:flex;flex-direction:column;padding:60px 60px}
.top-area{text-align:center;margin-bottom:20px}
.pre{font-family:Orbitron,monospace;font-size:10px;font-weight:500;color:${C.red};letter-spacing:6px;text-transform:uppercase;margin-bottom:8px}
.h-title{font-family:Orbitron,monospace;font-size:38px;font-weight:900;color:${C.white};line-height:1.05;letter-spacing:-1px}
.h-title .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.h-sub{font-size:12px;font-weight:200;color:rgba(255,255,255,0.35);letter-spacing:3px;margin-top:6px;text-transform:uppercase}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1;align-content:center}
.svc{display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid rgba(255,255,255,0.04);background:rgba(0,0,0,0.35);border-radius:8px;backdrop-filter:blur(4px)}
.svc-num{font-family:Orbitron,monospace;font-size:11px;font-weight:600;color:rgba(220,38,38,0.3);letter-spacing:1px;min-width:22px}
.svc-text{font-size:11px;font-weight:300;color:rgba(255,255,255,0.55);letter-spacing:0.3px}
.svc-text strong{color:${C.white};font-weight:600}
.cta-bar{text-align:center;margin-top:16px;font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:4px;text-transform:uppercase;padding:8px 0;border-top:1px solid rgba(220,38,38,0.08)}
</style></head><body>
<div class="bg"></div><div class="overlay"></div>
<div class="frame"></div><div class="frame-top"></div><div class="frame-bot"></div>
<div class="content">
  <div class="top-area">
    <div class="pre">🎚 I NOSTRI SERVIZI</div>
    <div class="h-title">COSA POSSIAMO <span class="red">FARE PER TE</span></div>
    <div class="h-sub">Dalla produzione alla promozione</div>
  </div>
  <div class="grid">
    <div class="svc"><span class="svc-num">01</span><span class="svc-text"><strong>Mixing</strong> & Mastering</span></div>
    <div class="svc"><span class="svc-num">02</span><span class="svc-text"><strong>Ghost</strong> Production</span></div>
    <div class="svc"><span class="svc-num">03</span><span class="svc-text"><strong>Track</strong> Placement</span></div>
    <div class="svc"><span class="svc-num">04</span><span class="svc-text"><strong>Track</strong> Promotion</span></div>
    <div class="svc"><span class="svc-num">05</span><span class="svc-text"><strong>Social</strong> Management</span></div>
    <div class="svc"><span class="svc-num">06</span><span class="svc-text"><strong>Graphic</strong> Design</span></div>
  </div>
  <div class="cta-bar">👉 itsound.it/shop</div>
</div>
</body></html>`;
  await renderPost('03-servizi.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  POST 4 — "Marco Carbotti" (Primo artista)
//  Layout: full-bleed foto Marco + nome monumentale
// ══════════════════════════════════════════════════════════════════════════════
async function post4() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${IMG.marco}') center 30%/cover;filter:brightness(0.4) contrast(1.2) saturate(0.8)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.5) 100%),
             radial-gradient(ellipse at 50% 20%, rgba(220,38,38,0.15) 0%, transparent 50%)}
.vignette{position:absolute;inset:0;box-shadow:inset 0 0 120px rgba(0,0,0,0.9)}
.big-num{position:absolute;font-family:Orbitron,monospace;font-size:320px;font-weight:900;color:rgba(220,38,38,0.03);right:-30px;top:-60px;letter-spacing:-15px;pointer-events:none;line-height:1}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:60px 60px 80px;text-align:center}
.badge{font-family:Orbitron,monospace;font-size:10px;font-weight:500;color:${C.red};letter-spacing:5px;text-transform:uppercase;margin-bottom:12px;text-shadow:0 4px 30px rgba(0,0,0,0.7)}
.name{font-family:Orbitron,monospace;font-size:72px;font-weight:900;color:${C.white};line-height:1.0;letter-spacing:-2px;text-shadow:0 6px 60px rgba(0,0,0,0.8);margin-bottom:2px}
.name-sub{font-family:Orbitron,monospace;font-size:30px;font-weight:200;color:rgba(255,255,255,0.6);letter-spacing:14px;text-transform:uppercase;text-shadow:0 4px 40px rgba(0,0,0,0.7);margin-bottom:16px}
.divider{width:60px;height:2px;background:linear-gradient(90deg,${C.red},${C.purple});border-radius:1px;margin:0 auto 16px}
.genres{display:flex;gap:10px;margin-bottom:20px}
.genre{padding:5px 16px;border:1px solid rgba(255,255,255,0.06);border-radius:100px;font-size:10px;font-weight:300;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;background:rgba(0,0,0,0.3)}
.genre.hl{border-color:rgba(220,38,38,0.2);color:${C.redLight}}
.tracks{font-size:12px;font-weight:200;color:rgba(255,255,255,0.4);letter-spacing:1px;text-shadow:0 4px 20px rgba(0,0,0,0.7);margin-bottom:16px}
.tracks strong{color:${C.white};font-weight:400}
.spotify-link{display:inline-flex;align-items:center;gap:8px;padding:8px 24px;border:1px solid rgba(220,38,38,0.15);border-radius:100px;font-size:10px;font-weight:400;color:${C.red};letter-spacing:2px;text-transform:uppercase;background:rgba(220,38,38,0.05)}
</style></head><body>
<div class="bg"></div><div class="overlay"></div><div class="vignette"></div>
<div class="big-num">MC</div>
<div class="content">
  <div class="badge">🎧 Primo Artista</div>
  <div class="name">MARCO</div>
  <div class="name-sub">CARBOTTI</div>
  <div class="divider"></div>
  <div class="genres">
    <span class="genre hl">Techno</span>
    <span class="genre">Tech House</span>
    <span class="genre">Electronic</span>
  </div>
  <div class="tracks">Ascolta <strong>"Make You Mine"</strong> · <strong>"Mr. Saxobeat - Techno Mix"</strong></div>
  <div class="spotify-link">🎵 Spotify & tutte le piattaforme</div>
</div>
</body></html>`;
  await renderPost('04-marco-carbotti.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  POST 5 — "Call to Artists" (Reclutamento)
//  Layout: Frame-21 come bg, CTA forte
// ══════════════════════════════════════════════════════════════════════════════
async function post5() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;position:relative;font-family:Inter,sans-serif;background:${C.black}}
.bg{position:absolute;inset:0;background:url('${IMG.frame21}') center/cover;filter:brightness(0.3) contrast(1.3) saturate(0.6)}
.overlay{position:absolute;inset:0;
  background:linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.8) 100%),
             radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.12) 0%, transparent 50%),
             radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 40%)}
.stripe-l{position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(180deg,${C.red},${C.purple});opacity:0.25}
.stripe-r{position:absolute;top:0;right:0;width:3px;height:100%;background:linear-gradient(180deg,${C.purple},${C.red});opacity:0.25}
.content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 70px;text-align:center}
.badge-top{font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:6px;text-transform:uppercase;margin-bottom:20px}
.big-q{font-family:Orbitron,monospace;font-size:80px;font-weight:900;color:${C.white};line-height:1.0;letter-spacing:-3px;margin-bottom:4px;text-shadow:0 6px 60px rgba(0,0,0,0.8)}
.big-q .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sub-q{font-family:Inter,sans-serif;font-size:20px;font-weight:200;color:rgba(255,255,255,0.4);letter-spacing:6px;text-transform:uppercase;margin-bottom:24px;text-shadow:0 4px 30px rgba(0,0,0,0.7)}
.divider-lg{width:80px;height:2px;background:linear-gradient(90deg,${C.red},transparent);border-radius:1px;margin:0 auto 24px}
.roles{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:28px}
.role{padding:7px 18px;border:1px solid rgba(255,255,255,0.06);border-radius:100px;font-size:11px;font-weight:200;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;background:rgba(0,0,0,0.3)}
.role.dj{border-color:rgba(220,38,38,0.2);color:${C.redLight}}
.cta-card{border:1px solid rgba(220,38,38,0.12);border-radius:12px;padding:20px 28px;background:rgba(220,38,38,0.04);backdrop-filter:blur(6px);margin-bottom:12px}
.email{font-family:Orbitron,monospace;font-size:16px;font-weight:600;background:linear-gradient(135deg,${C.red},${C.purple});-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:0.5px}
.cta-label{font-size:9px;font-weight:300;color:rgba(255,255,255,0.25);letter-spacing:3px;text-transform:uppercase;margin-top:6px}
.bottom{font-size:11px;font-weight:200;color:rgba(255,255,255,0.15);letter-spacing:2px}
</style></head><body>
<div class="bg"></div><div class="overlay"></div>
<div class="stripe-l"></div><div class="stripe-r"></div>
<div class="content">
  <div class="badge-top">✧ Open Call ✧</div>
  <div class="big-q">SEI UN</div>
  <div class="big-q"><span class="red">ARTISTA?</span></div>
  <div class="sub-q">Cerchiamo nuovi talenti</div>
  <div class="divider-lg"></div>
  <div class="roles">
    <span class="role dj">🎧 DJ</span>
    <span class="role">🎹 Producer</span>
    <span class="role">🎤 Cantante</span>
    <span class="role">🎸 Musicista</span>
  </div>
  <div class="cta-card">
    <div class="email">labelsubmission@itsound.it</div>
    <div class="cta-label">Manda il tuo demo</div>
  </div>
  <div class="bottom">Non vediamo l'ora di ascoltarti 🎵</div>
</div>
</body></html>`;
  await renderPost('05-call-to-artists.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  POST 6 — "Perché ITSound?" (Valori)
//  Layout: split photo + card valori
// ══════════════════════════════════════════════════════════════════════════════
async function post6() {
  const html = `<!DOCTYPE html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;font-family:Inter,sans-serif;background:${C.black};display:flex}
/* Left — photo */
.photo{width:50%;height:100%;position:relative;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(0.45) contrast(1.1) saturate(0.7)}
.photo-fade{position:absolute;inset:0;background:linear-gradient(to right, transparent 40%, ${C.black} 100%)}
/* Right — content */
.content{width:50%;height:100%;background:${C.black};display:flex;flex-direction:column;justify-content:center;padding:50px 36px;position:relative}
.badge-top{font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:4px;text-transform:uppercase;margin-bottom:10px}
.title{font-family:Orbitron,monospace;font-size:36px;font-weight:900;color:${C.white};line-height:1.05;letter-spacing:-1px;margin-bottom:2px}
.title .red{background:linear-gradient(135deg,${C.red},${C.redLight});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.divider{width:40px;height:2px;background:linear-gradient(90deg,${C.red},${C.purple});border-radius:1px;margin:8px 0 20px}
.val-list{display:flex;flex-direction:column;gap:10px}
.val-item{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.02)}
.val-num{font-family:Orbitron,monospace;font-size:12px;font-weight:500;color:rgba(220,38,38,0.3);min-width:20px;letter-spacing:1px}
.val-text{flex:1}
.val-title{font-size:13px;font-weight:600;color:${C.white};letter-spacing:0.3px;margin-bottom:1px}
.val-desc{font-size:10px;font-weight:200;color:rgba(255,255,255,0.3);line-height:1.5}
.cta-line{margin-top:16px;font-family:Orbitron,monospace;font-size:9px;font-weight:500;color:${C.red};letter-spacing:3px;text-transform:uppercase}
.cta-line span{color:${C.purple}}
</style></head><body>
<div class="photo">
  <img src="${IMG.studio}" alt="Studio">
  <div class="photo-fade"></div>
</div>
<div class="content">
  <div class="badge-top">🎯 Perché sceglierci</div>
  <div class="title">PERCHÉ <span class="red">ITSOUND</span></div>
  <div class="divider"></div>
  <div class="val-list">
    <div class="val-item">
      <span class="val-num">01</span>
      <div class="val-text"><div class="val-title">Siamo locali</div><div class="val-desc">Conosciamo il territorio e il mercato della Puglia</div></div>
    </div>
    <div class="val-item">
      <span class="val-num">02</span>
      <div class="val-text"><div class="val-title">Servizi completi</div><div class="val-desc">Dalla produzione alla promozione, tutto in casa</div></div>
    </div>
    <div class="val-item">
      <span class="val-num">03</span>
      <div class="val-text"><div class="val-title">Rete internazionale</div><div class="val-desc">Collaboriamo con artisti di tutto il mondo</div></div>
    </div>
    <div class="val-item">
      <span class="val-num">04</span>
      <div class="val-text"><div class="val-title">Concreti e ambiziosi</div><div class="val-desc">Partiamo dalle cose vere, un passo alla volta</div></div>
    </div>
  </div>
  <div class="cta-line">✧ Scrivici e raccontaci il tuo progetto <span>✧</span></div>
</div>
</body></html>`;
  await renderPost('06-perche-itsound.png', html);
}

// ══════════════════════════════════════════════════════════════════════════════
//  RUN
// ══════════════════════════════════════════════════════════════════════════════
console.log('⚙️  Generazione post Instagram ITSound — Set 1 (6 post)');
console.log('   Stile: Rosso + Nero · Cinema/Editoriale · Orbitron + Inter\n');
console.time('Set 1');
await post1();
await post2();
await post3();
await post4();
await post5();
await post6();
console.timeEnd('Set 1');
console.log(`\n✅ Fatto! I post sono in ${OUT}/`);
const files = ['01-chi-siamo.png','02-territorio.png','03-servizi.png','04-marco-carbotti.png','05-call-to-artists.png','06-perche-itsound.png'];
files.forEach(f => console.log(`   📄 ${f}`));
