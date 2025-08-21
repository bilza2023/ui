import { PrismaClient } from '@prisma/client';

const prisma = globalThis.__taleemPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.__taleemPrisma = prisma;

export { prisma as p };
//# sourceMappingURL=prisma-CbVrW2fI.js.map
