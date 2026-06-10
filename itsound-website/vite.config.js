import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/ITSound-Brand-Portal/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('gsap')) return 'gsap';
        },
      },
    },
  },
  server: {
    port: 4321,
    host: true,
  },
});
