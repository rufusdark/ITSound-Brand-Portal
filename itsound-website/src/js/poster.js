const albums = [
  {
    title: "Titanium",
    artist: "Marco Carbotti",
    art: "https://i.scdn.co/image/ab67616d00001e020116c2522f5339ba301bf813",
    url: "https://open.spotify.com/album/2X6OOybcYBDlQBRiTkJLgc",
  },
  {
    title: "Make You Mine",
    artist: "Marco Carbotti",
    art: "https://i.scdn.co/image/ab67616d00001e0225387676ce323c13639b3adf",
    url: "https://open.spotify.com/album/0JHyIPjFlEHyZqHQx2rETI",
  },
  {
    title: "Mr. Saxobeat",
    artist: "Marco Carbotti",
    art: "https://i.scdn.co/image/ab67616d00001e021e17b9f6bba6541ebe714d4b",
    url: "https://open.spotify.com/album/6RrvxRxldzSc0rlIoGVRU5",
  },
];

function initPlayer() {
  const shot = document.getElementById("nextRelease");
  const art = document.getElementById("heroArt");
  const fact = document.getElementById("heroFact");
  const listen = document.getElementById("heroListen");
  if (!shot || !art || !fact || !listen) return;

  let index = 0;

  function show(next) {
    index = (next + albums.length) % albums.length;
    const album = albums[index];
    art.src = album.art;
    art.alt = `Copertina di ${album.title}, ${album.artist}`;
    fact.textContent = album.title;
    listen.href = album.url;
  }

  shot.addEventListener("click", () => show(index + 1));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight") return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    show(index + 1);
  });
}

function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );
  nodes.forEach((node) => observer.observe(node));
}

initPlayer();
initReveal();
