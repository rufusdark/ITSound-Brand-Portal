/**
 * ITSound Custom Web Player
 * Premium glassmorphism player with album rotation
 * GSAP-driven track change animations (exit → swap → staggered enter)
 */

import { gsap } from 'gsap';

const ALBUMS = [
  {
    id: '2X6OOybcYBDlQBRiTkJLgc',
    title: 'Titanium',
    artist: 'Marco Carbotti',
    art: 'https://i.scdn.co/image/ab67616d00001e020116c2522f5339ba301bf813',
    url: 'https://open.spotify.com/album/2X6OOybcYBDlQBRiTkJLgc',
    genre: 'Techno',
  },
  {
    id: '0JHyIPjFlEHyZqHQx2rETI',
    title: 'Make You Mine',
    artist: 'Marco Carbotti',
    art: 'https://i.scdn.co/image/ab67616d00001e0225387676ce323c13639b3adf',
    url: 'https://open.spotify.com/album/0JHyIPjFlEHyZqHQx2rETI',
    genre: 'Techno',
  },
  {
    id: '6RrvxRxldzSc0rlIoGVRU5',
    title: 'Mr. Saxobeat (Techno Mix)',
    artist: 'Marco Carbotti',
    art: 'https://i.scdn.co/image/ab67616d00001e021e17b9f6bba6541ebe714d4b',
    url: 'https://open.spotify.com/album/6RrvxRxldzSc0rlIoGVRU5',
    genre: 'Techno',
  },
];

let currentIndex = 0;
let rotationTimer = null;
const ROTATION_INTERVAL = 8000; // 8 seconds
let progressRAF = null;
let progressStartTime = Date.now();
const PROGRESS_DURATION = 210; // 3:30 in seconds

export function initPlayer() {
  const container = document.getElementById('itsoundPlayer');
  if (!container) return;

  // Build stable structure: .its-player-inner (animated) + .its-player-embed (stable)
  container.innerHTML = `
    <div class="its-player-inner"></div>
    <div class="its-player-embed">
      <iframe style="border-radius:12px;width:100%;height:80px;"
        width="100%" height="80" frameborder="0"
        allowtransparency="true"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy" title="Spotify Player"></iframe>
    </div>
  `;

  // First render — no animation (GSAP entrance handles the hero reveal)
  renderInner(currentIndex, false);

  // Re-bind events
  bindPlayerEvents(container);

  // Keyboard: arrow right for next
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && document.activeElement?.tagName !== 'INPUT') {
      nextAlbum();
    }
  });

  // Start auto-rotation
  startRotation();

  // Progress bar
  animateProgress();
}

// ─── Render the animated inner content ───

function renderInner(index, animate = true) {
  const container = document.getElementById('itsoundPlayer');
  if (!container) return;

  const album = ALBUMS[index];
  const inner = container.querySelector('.its-player-inner');
  const embedFrame = container.querySelector('.its-player-embed iframe');
  if (!inner) return;

  if (!animate) {
    // First load — instant, no transition
    inner.innerHTML = buildInnerHTML(album, index);
    if (embedFrame) embedFrame.src = `https://open.spotify.com/embed/album/${album.id}?utm_source=itsound`;
    resetProgress();
    return;
  }

  // ── Animated track change ──
  const tl = gsap.timeline({
    onComplete: () => {
      bindPlayerEvents(container);
    },
  });

  // 1) EXIT: current content slides out to the left
  tl.to(inner, {
    opacity: 0,
    scale: 0.85,
    x: -40,
    rotation: -4,
    duration: 0.3,
    ease: 'power2.in',
  });

  // 2) SWAP: update DOM + iframe
  tl.call(() => {
    inner.innerHTML = buildInnerHTML(album, index);
    if (embedFrame) embedFrame.src = `https://open.spotify.com/embed/album/${album.id}?utm_source=itsound`;
    resetProgress();

    // Grab fresh child references for the "in" phase
    // (GSAP will evaluate them at call-time, but we pass explicit refs for safety)
    window._itsPlayerArt = inner.querySelector('.its-player-art');
    window._itsPlayerInfo = inner.querySelector('.its-player-info');
    window._itsPlayerControls = inner.querySelector('.its-player-controls');
  });

  // Set the new inner to its starting state (off-stage right)
  tl.set(inner, {
    opacity: 0,
    scale: 0.88,
    x: 40,
    rotation: 3,
  }, '>');

  // 3) ENTER: the whole inner bounces in
  tl.to(inner, {
    opacity: 1,
    scale: 1,
    x: 0,
    rotation: 0,
    duration: 0.55,
    ease: 'back.out(1.4)',
  });

  // 4) STAGGER: child elements reveal with premium feel
  // Album art spins in from a slight rotation
  if (window._itsPlayerArt) {
    tl.fromTo(window._itsPlayerArt, {
      opacity: 0,
      scale: 0.6,
      rotation: -15,
    }, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, '-=0.45');
  }

  // Info (title, artist, genre, label) slides up
  if (window._itsPlayerInfo) {
    tl.fromTo(window._itsPlayerInfo, {
      opacity: 0,
      y: 24,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
    }, '-=0.3');
  }

  // Controls (buttons, progress) fade up slightly delayed
  if (window._itsPlayerControls) {
    tl.fromTo(window._itsPlayerControls, {
      opacity: 0,
      y: 14,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
    }, '-=0.2');
  }

  // Clean up global refs after timeline completes
  tl.call(() => {
    window._itsPlayerArt = null;
    window._itsPlayerInfo = null;
    window._itsPlayerControls = null;
  });
}

// ─── Build the inner HTML string ───

function buildInnerHTML(album, index) {
  return `
    <div class="its-player-art">
      <img src="${album.art}" alt="${album.title}" loading="lazy" class="its-player-art-img" />
      <div class="its-player-art-overlay">
        <i class="fas fa-redo-alt"></i>
      </div>
    </div>
    <div class="its-player-info">
      <span class="its-player-label">${ALBUMS.length > 1 ? `${index + 1}/${ALBUMS.length} · ` : ''}Ultima Release</span>
      <h3 class="its-player-title">${album.title}</h3>
      <span class="its-player-artist">${album.artist}</span>
      <span class="its-player-genre">${album.genre}</span>
      <div class="its-player-controls">
        <button class="its-player-btn its-player-play" aria-label="Play on Spotify">
          <i class="fas fa-play"></i>
        </button>
        <div class="its-player-progress">
          <div class="its-player-progress-bar">
            <div class="its-player-progress-fill"></div>
          </div>
          <div class="its-player-time">
            <span class="its-time-current">0:00</span>
            <span class="its-time-total">3:30</span>
          </div>
        </div>
        <div class="its-player-extra">
          <a href="${album.url}" target="_blank" rel="noopener" class="its-player-spotify-link" title="Ascolta su Spotify">
            <i class="fab fa-spotify"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

// ─── Event binding (re-called after each DOM swap) ───

function bindPlayerEvents(container) {
  // Play button → open Spotify
  const playBtn = container.querySelector('.its-player-play');
  if (playBtn) {
    // Remove any stale listeners via clone trick or just use one listener
    playBtn.replaceWith(playBtn.cloneNode(true));
    const freshBtn = container.querySelector('.its-player-play');
    freshBtn.addEventListener('click', () => {
      freshBtn.classList.add('playing');
      freshBtn.innerHTML = '<i class="fas fa-spotify"></i>';
      window.open(ALBUMS[currentIndex].url, '_blank');
      setTimeout(() => {
        freshBtn.classList.remove('playing');
        freshBtn.innerHTML = '<i class="fas fa-play"></i>';
      }, 3000);
    });
  }

  // Album art click → next
  const artEl = container.querySelector('.its-player-art');
  if (artEl) {
    artEl.style.cursor = 'pointer';
    artEl.title = 'Clicca per la prossima release';
    artEl.replaceWith(artEl.cloneNode(true));
    const freshArt = container.querySelector('.its-player-art');
    freshArt.addEventListener('click', () => {
      nextAlbum();
    });
  }
}

// ─── Track navigation ───

function nextAlbum() {
  currentIndex = (currentIndex + 1) % ALBUMS.length;
  renderInner(currentIndex, true);
  resetRotation();
}

function startRotation() {
  if (ALBUMS.length <= 1) return;
  stopRotation();
  rotationTimer = setInterval(() => {
    nextAlbum();
  }, ROTATION_INTERVAL);
}

function stopRotation() {
  if (rotationTimer) {
    clearInterval(rotationTimer);
    rotationTimer = null;
  }
}

function resetRotation() {
  stopRotation();
  startRotation();
}

// ─── Progress bar (continuous, reset on track change) ───

function resetProgress() {
  progressStartTime = Date.now();
  const fill = document.querySelector('.its-player-progress-fill');
  const current = document.querySelector('.its-time-current');
  if (fill) fill.style.width = '0%';
  if (current) current.textContent = '0:00';
}

function animateProgress() {
  function tick() {
    const elapsed = (Date.now() - progressStartTime) / 1000;
    const pct = Math.min(elapsed / PROGRESS_DURATION, 1);

    const fill = document.querySelector('.its-player-progress-fill');
    const current = document.querySelector('.its-time-current');

    if (fill) fill.style.width = `${pct * 100}%`;
    if (current) {
      const mins = Math.floor(elapsed / 60);
      const secs = Math.floor(elapsed % 60);
      current.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    if (pct < 1) {
      progressRAF = requestAnimationFrame(tick);
    } else {
      // Track "ended" — wait then loop
      setTimeout(() => {
        progressStartTime = Date.now();
        tick();
      }, 3000);
    }
  }

  tick();
}
