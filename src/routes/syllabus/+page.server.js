// /src/routes/syllabus/+page.server.js
export const prerender = false;

import { error } from '@sveltejs/kit';
import { getSynopsis, getTcodeBySlug } from '$lib/services/syllabusService.js';
import { questions } from '$lib/services/questionServices.js';

export async function load({ url, setHeaders }) {
  setHeaders({ 'cache-control': 'public, max-age=30' });

  const tParam = (url.searchParams.get('tcode') || '').trim();
  if (!tParam) throw error(400, 'tcode required');

  // Resolve tcodeId from slug or numeric
  let tcodeId = Number.isFinite(Number(tParam)) ? Number(tParam) : null;
  if (!tcodeId) {
    const t = await getTcodeBySlug(tParam);
    if (!t?.id) throw error(404, 'tcode not found');
    tcodeId = t.id;
  }

  // Synopsis: chapters + exercises tree
  const synopsis = await getSynopsis(tcodeId);
  if (!synopsis) throw error(404, 'tcode not found');

  // Build id→slug maps for chapter/exercise
  const chapterSlugById = new Map(synopsis.chapters.map(c => [c.id, c.slug]));
  const exerciseSlugById = new Map();
  for (const c of synopsis.chapters) {
    for (const e of (c.exercises || [])) exerciseSlugById.set(e.id, e.slug);
  }

  // Questions for this tcode
  const raw = await questions.getByTcodeId(tcodeId);

  // Format items to what <Syllabus /> expects
  const items = raw.map(q => ({
    id: q.id,
    name: q.name,
    description: q.description,
    type: q.type,
    status: q.status,
    thumbnail: q.thumbnail || '',
    editedAt: q.editedAt,
    tcode: synopsis.slug,
    chapter: chapterSlugById.get(q.chapterId) || '',
    exercise: exerciseSlugById.get(q.exerciseId) || ''
  }));

  const selected = {
    chapter: (url.searchParams.get('chapter') || '').trim(),
    exercise: (url.searchParams.get('exercise') || '').trim()
  };

  return { tcode: synopsis.slug, selected, synopsis, items };
}
