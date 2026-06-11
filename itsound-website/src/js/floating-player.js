/**
 * ITSound Floating Mini Player
 * Appears when scrolling past the hero — syncs with main player
 * Animated track transitions (spin + fade)
 */

const SYNC_INTERVAL = 2000; // poll main player DOM every 2s

let syncTimer = null;
let lastTitle = '';
let lastArtist = '';
let lastArt = '';
let animating = false;

export function initFloatingPlayer() {
  const el = document.getElementById('floatingPlayer');
  const hero = document.querySelector('.hero');
  if (!el || !hero) return;

  // ── IntersectionObserver: show when hero leaves viewport ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Hero is NOT intersecting → user scrolled past it
        if (!entry.isIntersecting) {
          el.classList.add('visible');
          startSync();
        } else {
          el.classList.remove('visible');
          stopSync();
        }
      });
    },
    { threshold: 0 }
  );

  observer.observe(hero);

  // ── Play button: open current album on Spotify ──
  const playBtn = document.getElementById('floatingPlayBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const albumUrl = getCurrentAlbumUrl();
      if (albumUrl) {
        window.open(albumUrl, '_blank');
        playBtn.innerHTML = '<i class="fas fa-spotify"></i>';
        setTimeout(() => {
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }, 2000);
      }
    });
  }

  // ── Click album art to advance ──
  const art = el.querySelector('.floating-player-art');
  if (art) {
    art.addEventListener('click', () => {
      advanceAndSync();
    });
    art.style.cursor = 'pointer';
    art.title = 'Clicca per la prossima release';
  }

  // Initial sync — no animation, just grab values
  initialSync();
}

function initialSync() {
  const mainPlayer = document.getElementById('itsoundPlayer');
  if (!mainPlayer) return;

  const mainTitle = mainPlayer.querySelector('.its-player-title');
  const mainArtist = mainPlayer.querySelector('.its-player-artist');
  const mainImg = mainPlayer.querySelector('.its-player-art-img');

  const fTitle = document.getElementById('floatingTitle');
  const fArtist = document.getElementById('floatingArtist');
  const fImg = document.getElementById('floatingArt');

  if (fTitle && mainTitle) fTitle.textContent = mainTitle.textContent;
  if (fArtist && mainArtist) fArtist.textContent = mainArtist.textContent;
  if (fImg && mainImg && mainImg.src) fImg.src = mainImg.src;

  // Store as last known (no animation on next identical poll)
  lastTitle = fTitle ? fTitle.textContent : '';
  lastArtist = fArtist ? fArtist.textContent : '';
  lastArt = fImg ? fImg.src : '';
}

function syncFromMainPlayer() {
  const mainPlayer = document.getElementById('itsoundPlayer');
  if (!mainPlayer) return;

  const mainTitle = mainPlayer.querySelector('.its-player-title');
  const mainArtist = mainPlayer.querySelector('.its-player-artist');
  const mainImg = mainPlayer.querySelector('.its-player-art-img');

  const fTitle = document.getElementById('floatingTitle');
  const fArtist = document.getElementById('floatingArtist');
  const fImg = document.getElementById('floatingArt');

  if (!fTitle || !fArtist || !fImg) return;

  const newTitle = mainTitle ? mainTitle.textContent : '';
  const newArtist = mainArtist ? mainArtist.textContent : '';
  const newArt = mainImg ? mainImg.src : '';

  // No change — skip
  if (newTitle === lastTitle && newArtist === lastArtist && newArt === lastArt) return;

  // Store new values
  lastTitle = newTitle;
  lastArtist = newArtist;
  lastArt = newArt;

  // Animate the transition
  animateTrackChange(fTitle, fArtist, fImg, newTitle, newArtist, newArt);
}

function animateTrackChange(titleEl, artistEl, imgEl, newTitle, newArtist, newArt) {
  if (animating) return;
  animating = true;

  // 1. Fade / spin OUT
  titleEl.classList.add('track-out');
  artistEl.classList.add('track-out');
  imgEl.classList.add('track-out');
  imgEl.classList.remove('track-in');
  titleEl.classList.remove('track-in');
  artistEl.classList.remove('track-in');

  // 2. After transition completes, swap content + fade IN
  setTimeout(() => {
    titleEl.textContent = newTitle;
    artistEl.textContent = newArtist;
    imgEl.src = newArt;

    // Force reflow so the browser registers the new content before removing 'out'
    void imgEl.offsetWidth;

    // 3. Fade / spin IN
    titleEl.classList.remove('track-out');
    titleEl.classList.add('track-in');
    artistEl.classList.remove('track-out');
    artistEl.classList.add('track-in');
    imgEl.classList.remove('track-out');
    imgEl.classList.add('track-in');

    setTimeout(() => {
      titleEl.classList.remove('track-in');
      artistEl.classList.remove('track-in');
      imgEl.classList.remove('track-in');
      animating = false;
    }, 350);
  }, 300);
}

function getCurrentAlbumUrl() {
  const mainPlayer = document.getElementById('itsoundPlayer');
  if (!mainPlayer) return null;
  const link = mainPlayer.querySelector('.its-player-spotify-link');
  return link ? link.getAttribute('href') : null;
}

function advanceAndSync() {
  // Simulate click on main player's art to advance album
  const mainPlayer = document.getElementById('itsoundPlayer');
  if (!mainPlayer) return;
  const art = mainPlayer.querySelector('.its-player-art');
  if (art) {
    art.click();
    // Sync immediately (don't wait for next poll interval)
    requestAnimationFrame(() => {
      setTimeout(syncFromMainPlayer, 80);
    });
  }
}

function startSync() {
  stopSync();
  syncTimer = setInterval(syncFromMainPlayer, SYNC_INTERVAL);
}

function stopSync() {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
  }
}
