
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// This builds a single JS file that registers <taleem-slides>.
export default defineConfig({
  build: {
    lib: {
      entry: 'src/ce/taleem-slides-ce.js',
      name: 'TaleemSlidesCE',
      fileName: () => 'taleem-slides.js',
      formats: ['es'],               // output as native module
    },
    rollupOptions: {
      // no external deps expected; bundle everything
    },
    sourcemap: true,
    emptyOutDir: false,              // so it won’t wipe your main /dist if you share it
    outDir: 'dist/ce',               // separate output folder for the CE build
  },
  publicDir: false,                  // we don’t need /public for this build
  plugins: [
    svelte({
      compilerOptions: { customElement: true },
      emitCss: true,                 // keep scoped CSS emitted
    }),
  ],
});
