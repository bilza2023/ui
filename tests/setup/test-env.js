// ui/tests/setup/test-env.js
import { config as loadEnv } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const envTest = path.join(root, '.env.test');

if (fs.existsSync(envTest)) loadEnv({ path: envTest });
else loadEnv();

process.env.DATABASE_URL ||= 'file:./prisma/test.db';
process.env.JWT_SECRET   ||= 'test-secret';
process.env.NODE_ENV     ||= 'test';

console.log('[test-env] DATABASE_URL =', process.env.DATABASE_URL);
