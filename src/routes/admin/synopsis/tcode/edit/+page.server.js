export const prerender = false;

import * as admin from '$lib/services/adminServices.js';
import { R } from '$lib/formKit/readers.js';
import { makeAction } from '$lib/formKit/actionFactory.js';
import { SLUG } from '../../../../../lib/function/slug.js'; // adjust path if different

/** 
 * SSR load:
 * Must return tcodes: [{ slug, name, description?, image?, chapterCount }]
 */
export async function load({ setHeaders }) {
  const rows = await admin.listTcodes();
  // normalize a bit in case service doesn’t include the count key yet
  const tcodes = (rows ?? []).map(r => ({
    slug: r.slug,
    name: r.name,
    description: r.description ?? null,
    image: r.image ?? null,
    chapterCount: Number(r.chapterCount ?? r._count?.chapters ?? 0)
  }));

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes };
}

export const actions = {
  /**
   * Add Tcode — slug is auto from name (immutable)
   */
  addTcode: makeAction({
    spec: {
      name:        R.str('name',        { required: true, trim: true }),
      description: R.str('description', { trim: true }),
      image:       R.str('image',       { trim: true })
    },
    prepare: (v) => {
      const slug = SLUG(v.name);
      // Strip empty strings to undefined (optional)
      const description = v.description?.trim() ? v.description.trim() : undefined;
      const image       = v.image?.trim() ? v.image.trim() : undefined;
      return { slug, name: v.name.trim(), description, image };
    },
    service: (v) => admin.addTcode(v),
    success: (_result, v) => ({
      message: `Added ${v.name}`,
      // Let the client update UI without reloading:
      tcode: { slug: v.slug, name: v.name, description: v.description ?? null, image: v.image ?? null, chapterCount: 0 }
    })
  }),

  /**
   * Rename Tcode — name only (slug stays the same)
   */
  renameTcode: makeAction({
    spec: {
      slug: R.str('slug', { required: true }),                 // from dropdown
      name: R.str('name', { required: true, trim: true })      // new display name
    },
    service: (v) => admin.renameTcode(v.slug, { name: v.name }),
    success: (_r, v) => ({
      message: 'Renamed',
      slug: v.slug,
      name: v.name
    })
  }),

  /**
   * Delete Tcode — hard guard on server (must throw TCODE_HAS_CHAPTERS if blocked)
   */
  deleteTcode: makeAction({
    spec: {
      slug: R.str('slug', { required: true }) // from dropdown
    },
    service: (v) => admin.deleteTcode(v.slug),
    success: (_r, v) => ({
      message: 'Deleted',
      slug: v.slug
    })
  })
};
