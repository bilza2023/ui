import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = globalThis.__taleemPrisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.__taleemPrisma = prisma;
const MIN_LEN = 8;
const MAX_BYTES = 72;
function checkPassword(password) {
  const errors = [];
  if (typeof password !== "string") {
    return { ok: false, errors: ["password must be a string"] };
  }
  const bytes = Buffer.byteLength(password, "utf8");
  if (password.length < MIN_LEN) errors.push(`at least ${MIN_LEN} characters`);
  if (/\s/.test(password)) errors.push("no spaces or tabs");
  if (bytes > MAX_BYTES) errors.push(`too long (max ${MAX_BYTES} bytes)`);
  return { ok: errors.length === 0, errors };
}
function assertPasswordOrThrow(password) {
  const { ok, errors } = checkPassword(password);
  if (!ok) throw new Error(`weak password: ${errors.join(", ")}`);
}
const TOKEN_TTL = "7d";
function getSecret() {
  const s = process.env.JWT_SECRET || "dev-secret-change-me";
  return s;
}
function normEmail(email) {
  return (email ?? "").toString().trim().toLowerCase();
}
async function register(email, password) {
  const e = normEmail(email);
  if (!e || !password) throw new Error("email and password are required");
  assertPasswordOrThrow(password);
  const exists = await prisma.user.findUnique({ where: { email: e }, select: { id: true } });
  if (exists) throw new Error("email already registered");
  const password_hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email: e, password_hash },
    select: { id: true, email: true, created_at: true }
  });
  return user;
}
async function login(email, password) {
  const e = normEmail(email);
  if (!e || !password) throw new Error("email and password are required");
  const user = await prisma.user.findUnique({
    where: { email: e },
    select: { id: true, email: true, password_hash: true, created_at: true }
  });
  if (!user) throw new Error("invalid credentials");
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error("invalid credentials");
  const token = jwt.sign({ sub: user.id, email: user.email }, getSecret(), { expiresIn: TOKEN_TTL });
  return { token, user: { id: user.id, email: user.email, created_at: user.created_at } };
}
async function verify(token) {
  if (!token) throw new Error("token required");
  const payload = jwt.verify(token, getSecret());
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, created_at: true }
  });
  if (!user) throw new Error("user not found");
  return { payload, user };
}

export { login as l, prisma as p, register as r, verify as v };
//# sourceMappingURL=loginServices-D_o7Pg46.js.map
