// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    globalSetup: ['./tests/setup/global-setup.js'],
    setupFiles: [
      './tests/setup/test-env.js',
      './tests/setup/teardown.js'
    ]
  }
});

