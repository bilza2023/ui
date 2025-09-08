// /src/routes/admin/home-index/+page.server.js
export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { CATEGORIES, TYPES } from '$lib/constants/homeIndex.js';

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
 * - Returns { ok, message, values } on failure for sticky inputs.
 * - Returns { ok, message, saved, ... } on success (no redirect).
 */
export const actions = {
  add: makeAction({
    spec: {
      category:    R.$enum('category', CATEGORIES, { required: true }),
      type:        R.$enum('type', TYPES, { required: true }),
      title:       R.str('title', { required: true }),
      href:        R.str('href', { required: true }),  // canonical link
      description: R.str('description'),
      thumbnail:   R.str('thumbnail'),
      pinned:      R.str('pinned'),                    // 'on' | undefined
      sortOrder:   R.num('sortOrder', { gte: 0 })
    },
    prepare: (v) => {
      // Shape and clean payload for service layer
      return {
        category:    v.category,
        type:        v.type,
        title:       v.title.trim(),
        href:        v.href.trim(),
        description: v.description?.trim() || null,
        thumbnail:   v.thumbnail?.trim() || null,
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
      // Let the UI re-populate a couple of defaults
      values: {
        category: v.category,
        type: v.type,
        title: '',
        href: '',
        description: '',
        thumbnail: '',
        pinned: '',
        sortOrder: v.sortOrder ?? ''
      }
    })
  })
};
