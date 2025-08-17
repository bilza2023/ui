
// src/lib/services/loginServices.js
// Simple auth: register, login, verify (JWT). No frills.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../server/prisma.js';
import { assertPasswordOrThrow } from './passwordPolicy.js';

const TOKEN_TTL = '7d'; // adjust later

function getSecret() {
  const s = process.env.JWT_SECRET || 'dev-secret-change-me';
  if (!s) throw new Error('JWT_SECRET missing');
  return s;
}

function normEmail(email) {
  return (email ?? '').toString().trim().toLowerCase();
}

export async function register(email, password) {
  const e = normEmail(email);
  if (!e || !password) throw new Error('email and password are required');

  // ✅ enforce simple policy
  assertPasswordOrThrow(password);

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
  // console.log("user" , user);
  return { payload, user };
}
// Simple admin check: verify token → match email against ADMIN_EMAIL
export async function isAdmin(token) {
  if (!token) return false;
  try {
    const { user } = await verify(token); // reuse verify()
    const adminEmail = "bilza2024@gmail.com";
    return user?.email?.toLowerCase() === adminEmail;
  } catch {
    return false;
  }
}

// One-shot authz: token + tcode → access decision
export async function isSubscribed(token, tcode) {
  const t = (tcode ?? '').toString().trim();

  if (!token) {
    return { allowed: false, reason: 'no-token', userId: null, tcode: t, expiresAt: null, remainingDays: null };
  }
  if (!t) {
    return { allowed: false, reason: 'no-subscription', userId: null, tcode: t, expiresAt: null, remainingDays: null };
  }

  try {
    // 1) authenticate
    const { user } = await verify(token); // throws on invalid/expired
    const now = new Date();

    // 2) find most recent sub for this (user, tcode)
    const sub = await prisma.subscription.findFirst({
      where: { user_id: user.id, tcode: t },
      orderBy: { start_date: 'desc' },
      select: { start_date: true, duration: true },
    });

    if (!sub) {
      return { allowed: false, reason: 'no-subscription', userId: user.id, tcode: t, expiresAt: null, remainingDays: null };
    }

    // 3) compute window
    const startMs  = sub.start_date.getTime();
    const expiryMs = startMs + sub.duration * 86400000; // 86_400_000 ms/day

    // Not yet active
    if (now.getTime() < startMs) {
      return { allowed: false, reason: 'no-subscription', userId: user.id, tcode: t, expiresAt: null, remainingDays: null };
    }

    // Expired
    if (now.getTime() >= expiryMs) {
      return {
        allowed: false,
        reason: 'expired',
        userId: user.id,
        tcode: t,
        expiresAt: new Date(expiryMs).toISOString(),
        remainingDays: 0,
      };
    }

    // Active
    const remainingDays = Math.ceil((expiryMs - now.getTime()) / 86400000);
    return {
      allowed: true,
      reason: 'ok',
      userId: user.id,
      tcode: t,
      expiresAt: new Date(expiryMs).toISOString(),
      remainingDays,
    };
  } catch {
    return { allowed: false, reason: 'invalid-token', userId: null, tcode: t, expiresAt: null, remainingDays: null };
  }
}
