
// interactionServices.js — write-only wrappers per category

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

let _anchors = null; // Set<string>
const MAX_PAYLOAD_BYTES = 2048;
const ALLOWED_REACTIONS = new Set(['like', 'confused']);

export function initializeInteractionService({ anchors }) {
  if (!Array.isArray(anchors) || anchors.length === 0) {
    throw new Error('initializeInteractionService: anchors[] required');
  }
  _anchors = new Set(anchors);
}

function assertReady() {
  if (!_anchors) throw new Error('interactionServices not initialized: call initializeInteractionService({ anchors }) first.');
}

function requireAnchor(anchorId) {
  if (typeof anchorId !== 'string' || anchorId.length === 0) throw new Error('anchorId required');
  if (!_anchors.has(anchorId)) throw new Error(`Unknown anchorId: ${anchorId}`);
}

function requireActor(actorId) {
  if (typeof actorId !== 'string' || actorId.length === 0) throw new Error('actorId required');
}

function checkPayloadSize(obj) {
  const s = JSON.stringify(obj ?? {});
  if (Buffer.byteLength(s, 'utf8') > MAX_PAYLOAD_BYTES) {
    throw new Error(`payload too large (>${MAX_PAYLOAD_BYTES} bytes)`);
  }
}

export async function recordView(anchorId, actorId, userId = null) {
  assertReady();
  requireAnchor(anchorId);
  requireActor(actorId);
  const payload = {};
  checkPayloadSize(payload);

  const row = await prisma.userInteraction.create({
    data: {
      anchor_id: anchorId,
      actor_id: actorId,
      user_id: userId ?? null,
      category: 'view',
      tags: [],
      payload_json: payload,
    },
  });
  return { id: row.id, created_at: row.created_at };
}

export async function recordReaction(anchorId, reactionType, actorId, userId = null) {
  assertReady();
  requireAnchor(anchorId);
  requireActor(actorId);

  if (!ALLOWED_REACTIONS.has(reactionType)) {
    throw new Error(`reactionType invalid. Allowed: ${Array.from(ALLOWED_REACTIONS).join(', ')}`);
  }
  const payload = { reactionType };
  checkPayloadSize(payload);

  const row = await prisma.userInteraction.create({
    data: {
      anchor_id: anchorId,
      actor_id: actorId,
      user_id: userId ?? null,
      category: 'reaction',
      tags: [],
      payload_json: payload,
    },
  });
  return { id: row.id, created_at: row.created_at };
}

// For tests/cleanup
export async function closeInteractionService() {
  await prisma.$disconnect();
}
