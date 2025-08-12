
// src/lib/services/loginServices.js
// Simple auth: register, login, verify (JWT). No frills.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '$lib/server/prisma.js';

const TOKEN_TTL = '7d'; // adjust later
function getSecret() {
  const s = process.env.JWT_SECRET || 'dev-secret-change-me';
  if (!s) throw new Error('JWT_SECRET missing');
  return s;
}

function normEmail(email) {
  return (email ?? '').toString().trim().toLowerCase();
}

// Register: create user if email not taken
export async function register(email, password) {
  const e = normEmail(email);
  if (!e || !password) throw new Error('email and password are required');

  const exists = await prisma.user.findUnique({ where: { email: e }, select: { id: true } });
  if (exists) throw new Error('email already registered');

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email: e, password_hash },
    select: { id: true, email: true, created_at: true }
  });

  return user;
}

// Login: check credentials, return JWT + bare user
export async function login(email, password) {
  const e = normEmail(email);
  if (!e || !password) throw new Error('email and password are required');

  const user = await prisma.user.findUnique({
    where: { email: e },
    select: { id: true, email: true, password_hash: true, created_at: true }
  });
  if (!user) throw new Error('invalid credentials');

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error('invalid credentials');

  const token = jwt.sign({ sub: user.id, email: user.email }, getSecret(), { expiresIn: TOKEN_TTL });

  // don’t leak hash
  return { token, user: { id: user.id, email: user.email, created_at: user.created_at } };
}

// Verify: validate token → return decoded payload (and optional user)
export async function verify(token) {
  if (!token) throw new Error('token required');
  const payload = jwt.verify(token, getSecret()); // throws on invalid/expired
  // optional: fetch user to ensure still exists
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, created_at: true }
  });
  if (!user) throw new Error('user not found');
  return { payload, user };
}
