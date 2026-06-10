/**
 * ITSound Custom Web Player
 * Proprietary-looking player with Spotify embed
 */

const ALBUM_ID = '2X6OOybcYBDlQBRiTkJLgc';
const TRACK_TITLE = 'Titanium';
const ARTIST_NAME = 'Marco Carbotti';
const ALBUM_ART = 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020116c2522f5339ba301bf813';
const SPOTIFY_URL = 'https://open.spotify.com/album/2X6OOybcYBDlQBRiTkJLgc';

export function initPlayer() {
  const container = document.getElementById('itsoundPlayer');
  if (!container) return;

  // Build player HTML
  container.innerHTML = `
    <div class="its-player-inner">
      <div class="its-player-art">
        <img src="${ALBUM_ART}" alt="${TRACK_TITLE}" loading="lazy" />
        <div class="its-player-art-overlay">
          <i class="fas fa-music"></i>
        </div>
      </div>
      <div class="its-player-info">
        <span class="its-player-label">Ultima Release</span>
        <h3 class="its-player-title">${TRACK_TITLE}</h3>
        <span class="its-player-artist">${ARTIST_NAME}</span>
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
            <a href="${SPOTIFY_URL}" target="_blank" rel="noopener" class="its-player-spotify-link" title="Ascolta su Spotify">
              <i class="fab fa-spotify"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Hidden Spotify embed -->
    <div class="its-player-embed">
      <iframe 
        id="itsSpotifyEmbed"
        style="border-radius:12px;width:100%;height:80px;"
        src="https://open.spotify.com/embed/album/${ALBUM_ID}?utm_source=itsound"
        width="100%" height="80"
        frameborder="0" 
        allowtransparency="true" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      ></iframe>
    </div>
  `;

  // Play button → open on Spotify
  const playBtn = document.getElementById('itsPlayBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Animate button
      playBtn.classList.add('playing');
      playBtn.innerHTML = '<i class="fas fa-spotify"></i>';
      
      // Open Spotify in new tab
      window.open(SPOTIFY_URL, '_blank');
      
      // Reset after 3s
      setTimeout(() => {
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }, 3000);
    });
  }

  // Simulate progress animation for visual appeal
  animateProgress();
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
      // Reset when "done"
      setTimeout(() => {
        startTime = Date.now();
        animateProgress();
      }, 2000);
    }
  }

  tick();
}
