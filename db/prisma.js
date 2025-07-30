// src/lib/db/prisma.js
import { PrismaClient } from '@prisma/client';

// Single shared client instance
const prisma = new PrismaClient();

export default prisma;
