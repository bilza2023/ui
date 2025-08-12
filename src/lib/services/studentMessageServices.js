// studentMessageServices.js — simple student inbox (read + bulk upload)

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// Config — tiny & future-proof
const DEFAULT_CATEGORY = 'general';
const ALLOWED_CATEGORIES = new Set([DEFAULT_CATEGORY]);
const MAX_MESSAGE_BYTES = 16 * 1024; // 16KB per message (tweak later if needed)

// ────────────────────────────────────────────────────────────────────────────
// READ: get messages for a user (does NOT mark read)
//   userId: required
//   onlyUnread: default true
//   limit: default 50 (cap results)
//   cursor: optional message id for pagination (fetch next page)
// Returns newest-first list of messages.
export async function getUserMessages(userId, { onlyUnread = true, limit = 50, cursor = null } = {}) {
  if (!userId || typeof userId !== 'string') throw new Error('getUserMessages: userId (string) is required');
  const take = Math.max(1, Math.min(200, limit|0));

  const where = {
    user_id: userId,
    ...(onlyUnread ? { read: false } : {}),
  };

  const rows = await prisma.studentMessage.findMany({
    where,
    orderBy: { created_at: 'desc' },
    take,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: { id: true, user_id: true, category: true, message: true, read: true, created_at: true },
  });

  return rows;
}

// ────────────────────────────────────────────────────────────────────────────
// WRITE: bulk upload (admin/offline)
//   messagesArray: [{ user_id, category?, message, read? }, ...]
// Behavior:
//   - category defaults to 'general' if missing/invalid
//   - read defaults to false
//   - HTML is allowed in `message` (stored as-is)
// Returns: { count } from createMany
export async function bulkUpload(messagesArray) {
  if (!Array.isArray(messagesArray) || messagesArray.length === 0) {
    throw new Error('bulkUpload: messagesArray (non-empty) is required');
  }

  const payload = [];

  for (const [i, m] of messagesArray.entries()) {
    const user_id = (m?.user_id ?? '').toString().trim();
    const message = (m?.message ?? '').toString();
    if (!user_id) throw new Error(`bulkUpload: row ${i} missing user_id`);
    if (!message) throw new Error(`bulkUpload: row ${i} missing message`);

    const category = (m?.category ?? DEFAULT_CATEGORY).toString().trim();
    const cat = ALLOWED_CATEGORIES.has(category) ? category : DEFAULT_CATEGORY;

    // size check (HTML allowed, but cap length)
    const bytes = Buffer.byteLength(message, 'utf8');
    if (bytes > MAX_MESSAGE_BYTES) {
      throw new Error(`bulkUpload: row ${i} message too large (${bytes} > ${MAX_MESSAGE_BYTES} bytes)`);
    }

    payload.push({
      user_id,
      category: cat,
      message,              // HTML OK (store as TEXT)
      read: !!m?.read ?? false,
    });
  }

  const result = await prisma.studentMessage.createMany({ data: payload });
  return { count: result.count };
}
