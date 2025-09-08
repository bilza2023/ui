// /src/routes/admin/home-index/+page.server.js
export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';

const CATEGORIES = ['featured', 'videos', 'blog', 'courses'];

export async function load({ url }) {
  const category = (url.searchParams.get('category') || '').trim();
  const entries = await homeIndexService.listEntries({
    category: category || null
  });

  return {
    entries,
    category,
    categories: CATEGORIES
  };
}

export const actions = {
  add: makeAction({
    spec: {
      category:   R.$enum('category', ['featured','videos','blog','courses'], { required: true }),
      type:       R.str('type', { required: false }),
      title:      R.str('title', { required: true }),
      url:        R.str('url', { required: true }),
      description:R.str('description', { required: false }),
      thumbnail:  R.str('thumbnail', { required: false }),
      pinned:     R.str('pinned', { required: false }),     // checkbox ('on' | undefined)
      sortOrder:  R.num('sortOrder', { required: false, gte: 0 })
    },
    prepare: (v) => {
      return {
        category: v.category,
        type: (v.type || 'link').trim(),
        title: v.title,
        url: v.url,
        description: v.description?.trim() || null,
        thumbnail: v.thumbnail?.trim() || null,
        pinned: v.pinned === 'on',
        sortOrder: (v.sortOrder ?? null)
      };
    },
    service: (clean) => homeIndexService.createEntry(clean),
    success: (result, v) => ({
      ok: true,
      message: 'Added to Home Index.',
      saved: result?.id,
      // FormUi can optionally use this to set sticky defaults client-side if needed
      defaults: { category: v.category, type: v.type, pinned: v.pinned }
    })
  })
};
