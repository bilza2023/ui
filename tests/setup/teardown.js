// ui/tests/setup/teardown.js
import prisma from '../..//src/lib/server/prisma.js';
import { afterAll } from 'vitest';

afterAll(async () => {
  await prisma.$disconnect();
});
