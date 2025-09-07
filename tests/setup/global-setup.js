// ui/tests/setup/global-setup.js
import { config as loadEnv } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export default async function () {
  const root = process.cwd();
  const envTest = path.join(root, '.env.test');

  // Load test env (falls back to .env if .env.test missing)
  if (fs.existsSync(envTest)) loadEnv({ path: envTest });
  else loadEnv();

  // Hard default to test DB if not provided
  process.env.DATABASE_URL ||= 'file:./prisma/test.db';
  process.env.NODE_ENV ||= 'test';

  // Push schema ONCE, globally
  try {
    console.log('[global-setup] Using DB:', process.env.DATABASE_URL);
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
  } catch (e) {
    console.error('[global-setup] prisma db push failed:', e?.message || e);
    throw e;
  }
}
