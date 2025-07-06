// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  resolve: {
    alias: {
      // point at the entry file, not the folder
      'taleem-pivot-player': path.resolve(
        __dirname,
        'src/lib/taleem-pivot-player/index.js'
      )
    }
  },
  ssr: {
    noExternal: ['svelte-katex', 'taleem-pivot-player']
  },
  plugins: [sveltekit()]
});
