// src/lib/server/prisma.js
import { PrismaClient } from '@prisma/client';

const prisma = globalThis.__taleemPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.__taleemPrisma = prisma;

export default prisma;
