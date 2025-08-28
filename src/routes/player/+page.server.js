// /src/routes/player/+page.server.js
import { error, redirect } from '@sveltejs/kit';
import { getQuestionByFilename} from '../../lib/services/questionServices.js';
import { taleemServices as svc} from '../../lib/taleemServices';

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

  const row = await getQuestionByFilename(filename);
  if (!row) throw error(404, `Deck "${filename}" not found`);
  if (row.type !== 'deck' || !row.deck) throw error(415, `Item "${filename}" is not a deck`);

  // row.deck may be {version, background, deck:[]} or an array of slides
  const slides = Array.isArray(row.deck) ? row.deck : (row.deck.deck ?? []);
  if (!Array.isArray(slides) || slides.length === 0) {
    throw error(422, `Deck "${filename}" has no slides`);
  }

  // Subscription check (gate playback)
  const token = getToken(cookies, request);
  const authz = await svc.subscriptions.isSubscribed(row.tcode ?? '', token);

  if (!authz.allowed) {
    const q = new URLSearchParams({
      tcode: row.tcode ?? '',
      filename,
      reason: authz.reason ?? 'denied'
    }).toString();
    throw redirect(302, `/sales?${q}`);
  }

  // console.log("row.deck" ,row.deck);

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
