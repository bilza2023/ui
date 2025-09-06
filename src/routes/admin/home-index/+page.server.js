export const prerender = false;

import { makeAction } from '$lib/formKit/actionFactory.js';
import { R } from '$lib/formKit/readers.js';
import { homeIndexService } from '$lib/services/homeIndexServices.js';

const S = (v) => (typeof v === 'string' ? v.trim() : '');
const toInt = (v, d = null) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

export async function load({ url }) {
  const category = S(url.searchParams.get('category')) || '';

  const categories = await homeIndexService.listCategories({ status: 'active' });

  const items = await homeIndexService.listIndexItems({
    category: category || undefined,
    status: 'active',
    includeQuestion: true,
    limit: 1000
  });

  // Strict visual order for admin table
  items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return {
    category,
    categories,
    items
  };
}

/* -------------------- formKit actions -------------------- */

// CREATE
const createSpec = {
  category:     R.str('category',     { required: true }),
  questionSlug: R.str('questionSlug', { required: true }),
  pinned:       R.str('pinned'),           // checkbox → handled in prepare()
  sortOrder:    R.num('sortOrder')         // optional
};

function createPrepare(v) {
  // normalize checkbox + optional number
  const pinned = S(v.pinned) === 'on';
  const sortOrder = (v.sortOrder ?? '') === '' ? null : toInt(v.sortOrder, null);
  return { category: v.category, questionSlug: v.questionSlug, pinned, sortOrder };
}

async function createService(v) {
  // If no sortOrder provided, append to the end of that category
  let sortOrder = v.sortOrder;
  if (sortOrder === null) {
    const existing = await homeIndexService.listIndexItems({
      category: v.category,
      status: 'active',
      includeQuestion: false,
      limit: 5000
    });
    const max = existing.reduce((m, it) => Math.max(m, toInt(it.sortOrder, -1)), -1);
    sortOrder = max + 1;
  }
  const row = await homeIndexService.createIndexItem({
    category: v.category,
    questionSlug: v.questionSlug,
    pinned: v.pinned,
    sortOrder,
    status: 'active'
  });
  return { id: row?.id ?? null, category: v.category };
}

function createSuccess(result, v) {
  return {
    ok: true,
    message: 'Added to Home Index.',
    saved: result?.id,
    // keep category sticky; clear the other fields
    values: {
      category: v.category,
      questionSlug: '',
      pinned: false,
      sortOrder: ''
    }
  };
}

function createFailure(err, v) {
  return {
    ok: false,
    message: err?.message || 'Could not add item.',
    values: {
      category: v.category,
      questionSlug: v.questionSlug,
      pinned: v.pinned,
      sortOrder: v.sortOrder ?? ''
    }
  };
}

// DELETE
const deleteSpec = {
  id:       R.num('id', { required: true }),
  category: R.str('category') // preserve filter after delete
};

function deletePrepare(v) {
  return { id: toInt(v.id), category: v.category ?? '' };
}

async function deleteService(v) {
  await homeIndexService.deleteIndexItem(v.id);
  return { category: v.category };
}

function deleteSuccess(result, v) {
  return {
    ok: true,
    message: 'Deleted.',
    values: { category: v.category }
  };
}

function deleteFailure(err, v) {
  return {
    ok: false,
    message: err?.message || 'Delete failed.',
    values: { category: v.category }
  };
}

export const actions = {
  create: makeAction({
    spec: createSpec,
    prepare: createPrepare,
    service: createService,
    success: createSuccess,
    failure: createFailure
  }),
  delete: makeAction({
    spec: deleteSpec,
    prepare: deletePrepare,
    service: deleteService,
    success: deleteSuccess,
    failure: deleteFailure
  })
};
