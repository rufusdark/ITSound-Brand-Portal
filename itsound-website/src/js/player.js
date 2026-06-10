/**
 * ITSound Custom Web Player
 * Premium glassmorphism player with album rotation
 */

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

export function initPlayer() {
  const container = document.getElementById('itsoundPlayer');
  if (!container) return;

  renderAlbum(currentIndex);

  // Play button
  const playBtn = document.getElementById('itsPlayBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.classList.add('playing');
      playBtn.innerHTML = '<i class="fas fa-spotify"></i>';
      window.open(ALBUMS[currentIndex].url, '_blank');
      setTimeout(() => {
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }, 3000);
    });
  }

  // Start rotation
  startRotation();

  // Next/prev click on album art
  const art = container.querySelector('.its-player-art');
  if (art) {
    art.addEventListener('click', () => {
      nextAlbum();
      resetRotation();
    });
    art.style.cursor = 'pointer';
    art.title = 'Clicca per la prossima release';
  }

  // Keyboard: arrow right for next
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && document.activeElement?.tagName !== 'INPUT') {
      nextAlbum();
      resetRotation();
    }
  });

  // Simulate progress
  animateProgress();
}

function renderAlbum(index) {
  const album = ALBUMS[index];
  const container = document.getElementById('itsoundPlayer');
  if (!container) return;

  // Update embed
  const embedContainer = container.querySelector('.its-player-embed');
  const existingIframe = container.querySelector('#itsSpotifyEmbed');

  container.innerHTML = `
    <div class="its-player-inner">
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
          <button class="its-player-btn its-player-play" id="itsPlayBtn" aria-label="Play on Spotify">
            <i class="fas fa-play"></i>
          </button>
          <div class="its-player-progress" id="itsProgress">
            <div class="its-player-progress-bar" id="itsProgressBar">
              <div class="its-player-progress-fill" id="itsProgressFill"></div>
            </div>
            <div class="its-player-time">
              <span id="itsTimeCurrent">0:00</span>
              <span id="itsTimeTotal">3:30</span>
            </div>
          </div>
          <div class="its-player-extra">
            <a href="${album.url}" target="_blank" rel="noopener" class="its-player-spotify-link" title="Ascolta su Spotify">
              <i class="fab fa-spotify"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="its-player-embed">
      <iframe 
        id="itsSpotifyEmbed"
        style="border-radius:12px;width:100%;height:80px;"
        src="https://open.spotify.com/embed/album/${album.id}?utm_source=itsound"
        width="100%" height="80"
        frameborder="0" 
        allowtransparency="true" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      ></iframe>
    </div>
  `;

  // Add entrance animation class to art
  const img = container.querySelector('.its-player-art-img');
  if (img) {
    img.style.transition = 'opacity 0.6s ease';
  }

  // Re-bind play button
  const playBtn = document.getElementById('itsPlayBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.classList.add('playing');
      playBtn.innerHTML = '<i class="fas fa-spotify"></i>';
      window.open(ALBUMS[currentIndex].url, '_blank');
      setTimeout(() => {
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }, 3000);
    });
  }

  // Re-bind click on art
  const artEl = container.querySelector('.its-player-art');
  if (artEl) {
    artEl.addEventListener('click', () => {
      nextAlbum();
      resetRotation();
    });
    artEl.style.cursor = 'pointer';
    artEl.title = 'Clicca per la prossima release';
  }
}

function nextAlbum() {
  currentIndex = (currentIndex + 1) % ALBUMS.length;
  renderAlbum(currentIndex);
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

function animateProgress() {
  const fill = document.getElementById('itsProgressFill');
  const current = document.getElementById('itsTimeCurrent');
  if (!fill || !current) return;

  const duration = 210; // 3:30 in seconds
  let startTime = Date.now();

  function tick() {
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    
    fill.style.width = `${progress * 100}%`;
    
    const mins = Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    current.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => {
        startTime = Date.now();
        animateProgress();
      }, 2000);
    }
  }

  tick();
}
