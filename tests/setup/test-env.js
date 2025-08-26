// ui/tests/setup/test-env.js
import { config as loadEnv } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();
const envTest = path.join(root, '.env.test');
if (fs.existsSync(envTest)) {
  loadEnv({ path: envTest });
} else {
  loadEnv(); // fallback to .env if needed
}

// Sensible defaults if not provided
process.env.DATABASE_URL ||= 'file:./test.db';
process.env.JWT_SECRET   ||= 'test-secret';
process.env.NODE_ENV     ||= 'test';

// Prepare a clean test DB schema (idempotent)
try {
  execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
} catch (e) {
  console.error('Failed to push Prisma schema for tests:', e?.message || e);
  throw e;
}
