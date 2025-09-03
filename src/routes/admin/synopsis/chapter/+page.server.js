


export const prerender = false;

import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '$lib/function/slug.js';
// Use syllabus service directly so shapes match exactly
import {
  getAllTcodes,
  createChapter as svcCreateChapter,
  updateChapter as svcUpdateChapter,
  deleteChapter as svcDeleteChapter
} from '../../../../lib/services/contentServices/syllabusService.js';

/**
 * Returns:
 *  - tcodes: [{ slug, name }]
 *  - chaptersByTcode: { [tcodeSlug]: [{ slug, name, sortOrder, exerciseCount }] }
 */
export async function load({ setHeaders }) {
  const rows = await getAllTcodes({ includeChapters: true });

  const tcodes = rows.map(t => ({ slug: t.slug, name: t.name }));

  const chaptersByTcode = {};
  for (const t of rows) {
    const ch = Array.isArray(t.chapters) ? t.chapters : [];
    chaptersByTcode[t.slug] = ch
      .map(c => ({
        slug: c.slug,
        name: c.name,
        sortOrder: Number(c.sortOrder ?? 0),
        exerciseCount: Number(
          c.exerciseCount ??
          c._count?.exercises ??
          (Array.isArray(c.exercises) ? c.exercises.length : 0)
        )
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  }

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes, chaptersByTcode };
}

export const actions = {
  // Add Chapter — slug auto from name (immutable)
  addChapter: makeAction({
    spec: {
      tcode:     R.str('tcode', { required: true }),
      name:      R.str('name',  { required: true, trim: true }),
      sortOrder: R.num('sortOrder') // optional
    },
    prepare: (v) => {
      const slug = SLUG(v.name);
      const sortOrder = Number.isFinite(v.sortOrder) ? v.sortOrder : undefined;
      return { tcodeSlug: v.tcode, slug, name: v.name.trim(), sortOrder };
    },
    service: (v) => svcCreateChapter(v), // <-- single object
    success: (_r, v) => ({
      message: `Added chapter "${v.name}"`,
      tcodeSlug: v.tcodeSlug,
      chapter: {
        slug: v.slug,
        name: v.name,
        sortOrder: v.sortOrder ?? 0,
        exerciseCount: 0
      }
    })
  }),

  // Rename Chapter — name-only (slug stays the same)
  renameChapter: makeAction({
    spec: {
      tcode:   R.str('tcode',   { required: true }),
      chapter: R.str('chapter', { required: true }),
      name:    R.str('name',    { required: true, trim: true })
    },
    service: (v) => svcUpdateChapter(v.tcode, v.chapter, { name: v.name }),
    success: (_r, v) => ({
      message: 'Renamed',
      tcodeSlug: v.tcode,
      chapterSlug: v.chapter,
      name: v.name
    })
  }),

  // Delete Chapter — server should throw { code:'CHAPTER_HAS_EXERCISES' } if blocked
  deleteChapter: makeAction({
    spec: {
      tcode:   R.str('tcode',   { required: true }),
      chapter: R.str('chapter', { required: true })
    },
    service: (v) => svcDeleteChapter(v.tcode, v.chapter),
    success: (_r, v) => ({
      message: 'Deleted',
      tcodeSlug: v.tcode,
      chapterSlug: v.chapter
    })
  })
};
