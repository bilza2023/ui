// ui/vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['tests/setup/test-env.js', 'tests/setup/teardown.js'],
    include: ['tests/**/*.test.js']
  }
});
