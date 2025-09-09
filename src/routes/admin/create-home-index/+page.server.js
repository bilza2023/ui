// /src/routes/admin/home-index/+page.server.js
export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';

import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { CATEGORIES, TYPES } from '$lib/constants/homeIndex.js';

// Authoritative mapper for URL targets
const hrefFor = (row) => {
  if (!row?.slug) return '';
  if (row?.type === 'note')   return `/notes?filename=${row.slug}`;
  if (row?.type === 'deck')   return `/player?filename=${row.slug}`;
  if (row?.type === 'course') return `/syllabus?tcode=${row.slug}`;
  return '';
};

export async function load({ url }) {
  const category = (url.searchParams.get('category') || '').trim() || null;

  const entries = await homeIndexService.listEntries({ category });

  return {
    entries,          // table rows
    category,         // current filter (if any)
    categories: CATEGORIES,
    types: TYPES
  };
}

export const actions = {
  // --- Add Entry (FormUi posts here) ---
  add: makeAction({
    spec: {
      category:    R.$enum('category', CATEGORIES, { required: true }),
      type:        R.$enum('type', TYPES, { required: true }),
      title:       R.str('title', { required: true }),
      slug:        R.str('slug', { required: true }),   // identity anchor
      // 'href' is optional in UI; server recomputes authoritative value
      href:        R.str('href'),
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
        sortOrder:   v.sortOrder ?? 0,
        status:      'active'
      };
    },
    service: (clean) => homeIndexService.createEntry(clean),
    success: (result, v) => ({
      ok: true,
      message: 'Added to Home Index.',
      saved: result?.id ?? null,
      // Reset most fields; keep selects sticky for speed
      values: {
        category: v.category,
        type: v.type,
        title: '',
        slug: '',
        href: '',
        description: '',
        thumbnail: '',
        pinned: '',
        sortOrder: v.sortOrder ?? 0
      }
    })
  }),

  // --- Delete Entry (row form posts here) ---
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));
    if (!Number.isFinite(id) || id <= 0) {
      return { ok: false, message: 'Invalid id' };
    }
    await homeIndexService.deleteEntry(id);
    return { ok: true, message: 'Deleted' };
  }
};
