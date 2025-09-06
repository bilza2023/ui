

// /src/routes/admin/homeIndex/+page.server.js
export const prerender = false;

import { redirect, fail } from '@sveltejs/kit';
import { homeIndexService } from '$lib/services/homeIndexServices.js';

const S = (v) => (typeof v === 'string' ? v.trim() : '');
const toInt = (v, d = null) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

export async function load({ url }) {
  const category = S(url.searchParams.get('category')) || '';

  // categories with counts (active only)
  const categories = await homeIndexService.listCategories({ status: 'active' });

  // list items (include question for display)
  const items = await homeIndexService.listIndexItems({
    category: category || undefined,
    status: 'active',
    includeQuestion: true,
    limit: 1000
  });

  // Admin view: sort strictly by sortOrder (ignore pinned here)
  items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return {
    category,            // selected filter
    categories,          // [{ category, count }]
    items                // IndexItem[] with .question selected fields
  };
}

export const actions = {
  create: async ({ request, url }) => {
    const fd = await request.formData();
    const category = S(fd.get('category'));
    const questionSlug = S(fd.get('questionSlug'));
    const pinned = S(fd.get('pinned')) === 'on';
    const sortOrderRaw = S(fd.get('sortOrder'));
    const sortOrderGiven = sortOrderRaw === '' ? null : toInt(sortOrderRaw, null);

    if (!category || !questionSlug) {
      return fail(400, {
        ok: false,
        message: 'category and questionSlug are required',
        values: { category, questionSlug, pinned, sortOrder: sortOrderRaw }
      });
    }

    // If no sortOrder provided, append to end
    let sortOrder = sortOrderGiven;
    if (sortOrder === null) {
      const existing = await homeIndexService.listIndexItems({
        category,
        status: 'active',
        includeQuestion: false,
        limit: 5000
      });
      const max = existing.reduce((m, it) => Math.max(m, toInt(it.sortOrder, -1)), -1);
      sortOrder = max + 1;
    }

    try {
      await homeIndexService.createIndexItem({
        category,
        questionSlug,
        pinned,
        sortOrder,
        status: 'active'
      });
    } catch (e) {
      return fail(400, {
        ok: false,
        message: e?.message || 'Failed to create index item',
        values: { category, questionSlug, pinned, sortOrder }
      });
    }

    const back = `/admin/homeIndex${category ? `?category=${encodeURIComponent(category)}` : ''}`;
    throw redirect(303, back);
  },

  delete: async ({ request, url }) => {
    const fd = await request.formData();
    const id = toInt(fd.get('id'));
    const category = S(fd.get('category')) || '';

    if (!id) {
      return fail(400, { ok: false, message: 'id is required to delete' });
    }
    try {
      await homeIndexService.deleteIndexItem(id);
    } catch (e) {
      return fail(400, { ok: false, message: e?.message || 'Failed to delete' });
    }

    const back = `/admin/homeIndex${category ? `?category=${encodeURIComponent(category)}` : ''}`;
    throw redirect(303, back);
  }
};
