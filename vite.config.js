// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  resolve: {
    alias: {
      // so `import { PivotPlayer } from 'taleem-pivot-player'` works
      'taleem-pivot-player': path.resolve(__dirname, 'src/lib/taleem-pivot-player')
    }
  },
  ssr: {
    // ensure svelte-katex (and your local player) get compiled into the SSR bundle
    noExternal: ['svelte-katex', 'taleem-pivot-player']
  },
  plugins: [sveltekit()]
});
