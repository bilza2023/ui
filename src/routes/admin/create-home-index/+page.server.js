// /src/routes/admin/home-index/+page.server.js
export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { CATEGORIES, TYPES } from '$lib/constants/homeIndex.js';

// --- Route mapper (authoritative) ---
const hrefFor = (row) => {
  if (!row?.slug) return '';
  if (row?.type === 'note')   return `/notes?filename=${row.slug}`;
  if (row?.type === 'deck')   return `/player?filename=${row.slug}`;
  if (row?.type === 'course') return `/syllabus?tcode=${row.slug}`;
  return '';
};

export async function load({ url }) {
  const category = (url.searchParams.get('category') || '').trim();

  const entries = await homeIndexService.listEntries({
    category: category || null
  });

  return {
    entries,
    category,
    categories: CATEGORIES,
    types: TYPES
  };
}

/**
 * Action: add
 * - Uses formKit readers (trim/validate).
 * - Server computes `href` from `type + slug`.
 * - Returns sticky `values` on failure and resets on success.
 */
export const actions = {
  add: makeAction({
    spec: {
      category:    R.$enum('category', CATEGORIES, { required: true }),
      type:        R.$enum('type', TYPES, { required: true }),
      title:       R.str('title', { required: true }),
      slug:        R.str('slug', { required: true }),   // anchor/id
      href:        R.str('href'),                      // UI preview only (ignored)
      description: R.str('description'),
      thumbnail:   R.str('thumbnail'),
      pinned:      R.str('pinned'),                    // 'on' | undefined
      sortOrder:   R.num('sortOrder', { gte: 0 })
    },
    prepare: (v) => {
      const computedHref = hrefFor({ type: v.type, slug: v.slug });
      return {
        category:    v.category,
        type:        v.type,
        title:       v.title.trim(),
        slug:        v.slug.trim(),
        href:        computedHref, // authoritative
        description: v.description?.trim() || null,
        thumbnail:   v.thumbnail?.trim() || "/media/images/taleem.webp",
        pinned:      v.pinned === 'on',
        sortOrder:   v.sortOrder ?? null,
        status:      'active'
      };
    },
    service: (clean) => homeIndexService.createEntry(clean),
    success: (result, v) => ({
      ok: true,
      message: 'Added to Home Index.',
      saved: result?.id ?? null,
      values: {
        category: v.category,
        type: v.type,
        title: '',
        slug: '',
        href: '',
        description: '',
        thumbnail: '',
        pinned: '',
        sortOrder: v.sortOrder ?? ''
      }
    })
  })
};
