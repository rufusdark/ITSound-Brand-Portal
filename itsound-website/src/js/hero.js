import * as THREE from 'three';

let scene, camera, renderer, particles, animationId;

export function initHero() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const hero = canvas.parentElement;
  
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(75, hero.offsetWidth / hero.offsetHeight, 0.1, 1000);
  camera.position.z = 30;
  
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(hero.offsetWidth, hero.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const purple = new THREE.Color('#8B5CF6');
  const cyan = new THREE.Color('#06D6A0');
  const lightPurple = new THREE.Color('#A78BFA');

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 80;
    positions[i3 + 1] = (Math.random() - 0.5) * 60;
    positions[i3 + 2] = (Math.random() - 0.5) * 40;

    const colorChoice = Math.random();
    let color;
    if (colorChoice < 0.5) color = purple;
    else if (colorChoice < 0.8) color = lightPurple;
    else color = cyan;

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    sizes[i] = Math.random() * 3 + 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const textureCanvas = document.createElement('canvas');
  textureCanvas.width = 32;
  textureCanvas.height = 32;
  const ctx = textureCanvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  const particleTexture = new THREE.CanvasTexture(textureCanvas);

  const material = new THREE.PointsMaterial({
    size: 0.25,
    map: particleTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();
  window.addEventListener('resize', onResize);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  
  if (particles) {
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;
  }
  
  renderer.render(scene, camera);
}

function onResize() {
  const hero = document.getElementById('hero');
  if (!hero || !renderer) return;
  const w = hero.offsetWidth;
  const h = hero.offsetHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

export function destroyHero() {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener('resize', onResize);
  if (renderer) {
    renderer.dispose();
    renderer = null;
  }
  if (scene) {
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
    scene = null;
  }
}
