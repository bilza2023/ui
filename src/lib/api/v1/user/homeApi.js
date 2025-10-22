
// /src/lib/api/v1/user/homeApi.js
// Read-only façade that groups Questions for the public Home view.
// Relies ONLY on the service layer (no direct Prisma access here).

import { questions } from '$lib/services/questionServices.js';

/**
 * Stable default category display order for Home.
 * Keep this tiny and explicit. Unknown categories are appended after this order.
 */
export const HOME_CATEGORY_ORDER = ['blog', 'videos', 'courses'];

/**
 * Default visibility rules for the public Home.
 * You can tighten/relax this without changing the UI contract.
 */
const DEFAULT_ALLOWED_STATUSES = ['published', 'ready'];

/**
 * Map a Question (service layer row) to a lean Home card.
 * Keep this DTO tiny and stable — the UI should not need internal service fields.
 */
function toHomeCard(q) {
  return {
    id: q.id,
    name: q.name ?? '',
    type: q.type, // 'deck' | 'note' (future-safe for more)
    status: q.status,
    thumbnail: q.thumbnail ?? null,
    editedAt: q.editedAt ?? null,

    // Home controls (presentation):
    pinned: !!q.homePinned,
    sort: typeof q.homeSort === 'number' ? q.homeSort : 0,

    // Optional anchors (available for downstream routing if needed)
    tcodeId: q.tcodeId,
    chapterId: q.chapterId,
    exerciseId: q.exerciseId,
  };
}

/**
 * Deterministic sort inside a category:
 *  1) pinned DESC
 *  2) sort (homeSort) ASC
 *  3) editedAt DESC (newer first)
 *  4) name ASC (stable tiebreak)
 */
export function sortHomeItems(a, b) {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

  const sa = a.sort ?? 0;
  const sb = b.sort ?? 0;
  if (sa !== sb) return sa - sb;

  const ea = a.editedAt ? new Date(a.editedAt).getTime() : 0;
  const eb = b.editedAt ? new Date(b.editedAt).getTime() : 0;
  if (ea !== eb) return eb - ea;

  const na = (a.name || '').toLowerCase();
  const nb = (b.name || '').toLowerCase();
  if (na < nb) return -1;
  if (na > nb) return 1;
  return 0;
}

/**
 * Public Home groups — read-only.
 *
 * @param {Object} opts
 * @param {string[]} [opts.allowedStatuses=['published','ready']]  Limit to visible statuses.
 * @param {boolean}  [opts.includeEmpty=false]                      If true, include empty categories (from categoryOrder).
 * @param {string[]} [opts.categoryOrder=HOME_CATEGORY_ORDER]       Preferred display order.
 *
 * @returns {Promise<{ order: string[], groups: Record<string, ReturnType<typeof toHomeCard>[]> }>}
 */
export async function listHomeGroups({
  allowedStatuses = DEFAULT_ALLOWED_STATUSES,
  includeEmpty = false,
  categoryOrder = HOME_CATEGORY_ORDER,
} = {}) {
  // 1) Fetch lightweight question rows (no payloads)
  const rows = await questions.list({ includePayload: false });

  // 2) Filter: must have a homeCategory and pass visibility
  const visible = rows.filter(
    (q) => q.homeCategory && (!allowedStatuses || allowedStatuses.includes(q.status))
  );

  // 3) Map to DTO
  const cards = visible.map(toHomeCard);

  // 4) Group by category
  const groupsMap = new Map();

  // Seed known categories to preserve desired order (optional empties)
  categoryOrder.forEach((cat) => {
    groupsMap.set(cat, []);
  });

  for (const q of visible) {
    const cat = q.homeCategory; // enum/string from DB
    if (!groupsMap.has(cat)) groupsMap.set(cat, []);
    groupsMap.get(cat).push(cards.find((c) => c.id === q.id));
  }

  // 5) Sort items inside each category
  for (const [cat, items] of groupsMap.entries()) {
    items.sort(sortHomeItems);
    if (!includeEmpty && items.length === 0) {
      groupsMap.delete(cat);
    }
  }

  // 6) Build final order: known order first, then any unknown categories in alpha
  const unknown = [...groupsMap.keys()].filter((k) => !categoryOrder.includes(k)).sort();
  const order = [...categoryOrder.filter((k) => groupsMap.has(k)), ...unknown];

  // 7) Plain object for transport
  const groups = {};
  for (const key of order) {
    groups[key] = groupsMap.get(key) || [];
  }

  return { order, groups };
}

export default {
  listHomeGroups,
  sortHomeItems,
  HOME_CATEGORY_ORDER,
};
