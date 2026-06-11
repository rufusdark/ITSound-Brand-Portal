/**
 * ITSound Floating Mini Player
 * Appears when scrolling past the hero — syncs with main player
 */

const SYNC_INTERVAL = 2000; // poll main player DOM every 2s

let syncTimer = null;

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

  // Initial sync
  syncFromMainPlayer();
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

  if (mainTitle && fTitle) fTitle.textContent = mainTitle.textContent;
  if (mainArtist && fArtist) fArtist.textContent = mainArtist.textContent;
  if (mainImg && fImg && mainImg.src) fImg.src = mainImg.src;
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
    // Wait a tick for the render, then sync
    requestAnimationFrame(() => {
      setTimeout(syncFromMainPlayer, 50);
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
