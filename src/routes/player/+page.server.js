import prisma from '$lib/server/prisma.js';
import { isSubscribed as isSubscribedForTcode } from '$lib/services/subscriptionServices.js';
// 1) add this import
import { error, redirect } from '@sveltejs/kit';

export const prerender = false;

function getToken(cookies, request) {
  const cookie = cookies.get('token');
  if (cookie) return cookie;
  const auth = request.headers.get('authorization');
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

export async function load({ url, cookies, request }) {
  const filename = url.searchParams.get('filename');
  if (!filename) throw error(400, 'filename is required');

  const row = await prisma.question.findUnique({
    where: { filename },
    select: {
      type: true,
      deck: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      timed: true,
      tcode: true,
      chapter: true,
      exercise: true,
      editedAt: true,
      createdAt: true
    }
  });

  if (!row) throw error(404, `Deck "${filename}" not found`);
  if (row.type !== 'deck' || !row.deck) throw error(415, `Item "${filename}" is not a deck`);

  // `row.deck` can be either a deck object {version, background, deck:[]} or an array of slides.
  const slides = Array.isArray(row.deck) ? row.deck : (row.deck.deck ?? []);
  if (!Array.isArray(slides) || slides.length === 0) {
    throw error(422, `Deck "${filename}" has no slides`);
  }

  // ── NEW: subscription check (non-blocking; UI can decide) ───────────────
  const token = getToken(cookies, request);
  // debugger;
  const authz = await isSubscribedForTcode(row.tcode ?? '', token);
  
  // console.log("authz" ,authz);
  // ⛔ gate playback: bounce to /sales with helpful context
  if (!authz.allowed) {
    const q = new URLSearchParams({
      tcode: row.tcode ?? '',
      filename,
      reason: authz.reason ?? 'denied'
    }).toString();
    throw redirect(302, `/sales?${q}`);
  }
  /////////////////////////////////////////////////////////////
  return {
    meta: {
      filename,
      name: row.name ?? filename,
      description: row.description ?? '',
      status: row.status ?? null,
      tags: row.tags ?? [],
      timed: !!row.timed,
      tcode: row.tcode,
      chapter: row.chapter,
      exercise: row.exercise,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    deckRaw: row.deck,
    authz // { allowed, reason, userId, tcode, expiresAt, remainingDays }
  };
}
