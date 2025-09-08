export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';

// Minimal loader — returns only the array you need for the table.
// Supports optional filter: /admin/home-index?category=videos
export async function load({ url }) {
  const category = (url.searchParams.get('category') || '').trim() || null;

  // Service already knows how to list; we only pass the (optional) category.
  const entries = await homeIndexService.listEntries({ category });

  return {
    entries,    // [{ id, category, type, title, slug, description?, thumbnail?, pinned, sortOrder, status, createdAt, updatedAt }]
    category    // keep current filter in the page if you want a small chip/dropdown later
  };
}

export const actions = {
  delete: async ({ request }) => {
    const form = await request.formData();
    const id = Number(form.get('id'));
    if (!Number.isFinite(id) || id <= 0) {
      return { ok: false, message: 'Invalid id' };
    }

    // service expects a number, not an object
    await homeIndexService.deleteEntry(id); // ← important

    // SvelteKit will re-run load() after this POST
    return { ok: true, message: 'Deleted' };
  }
};