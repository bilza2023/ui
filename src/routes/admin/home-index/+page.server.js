// /src/routes/admin/home-index/+page.server.js
export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { CATEGORIES, TYPES, computeHref } from '$lib/constants/homeIndex.js';

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

export const actions = {
  add: makeAction({
    spec: {
      category:    R.$enum('category', CATEGORIES, { required: true }),
      type:        R.$enum('type', TYPES, { required: true }),
      title:       R.str('title', { required: true }),
      slug:        R.str('slug', { required: true }),
      href:        R.str('href', { required: true }),  // <— now required
      description: R.str('description', { required: false }),
      thumbnail:   R.str('thumbnail', { required: false }),
      pinned:      R.str('pinned', { required: false }),     // 'on' | undefined
      sortOrder:   R.num('sortOrder', { required: false, gte: 0 })
    },
    prepare: (v) => {
      // If href is blank (shouldn’t be because required), or user left placeholder,
      // derive it from type+slug to keep consistency.
      const suggested = computeHref(v.type, v.slug);
      const href = v.href?.trim() || suggested;

      const clean = {
        category: v.category,
        type: v.type,
        title: v.title,
        slug: v.slug,
        href,                                       // persist href explicitly
        description: v.description?.trim() || null,
        thumbnail: v.thumbnail?.trim() || null,
        pinned: v.pinned === 'on',
        sortOrder: v.sortOrder ?? null
      };

      console.log('[home-index:add] href (final):', clean.href);
      return clean;
    },
    service: (clean) => homeIndexService.createEntry(clean),
    success: (result, v) => ({
      ok: true,
      message: 'Added to Home Index.',
      saved: result?.id,
      href: v.href,
      defaults: { category: v.category, type: v.type, pinned: v.pinned }
    })
  })
};
