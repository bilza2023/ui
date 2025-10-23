

import { questions as questionSvc } from '$lib/services/questionServices.js';

// ---------- UI contract ----------
export const PAGE_NAV = [
  { id: 'videos',  label: 'Videos',   icon: '🗺️'   },
  { id: 'blog',    label: 'Blog',     icon: '📊'   },
  { id: 'help',    label: 'Help',     icon: '❓'   }
];

const ALLOWED_STATUSES = ['published', 'ready'];
const THUMB_FALLBACK = '/media/images/box.webp';

// back-compat → new categories
function normalizeCategory(q) {
  const c = (q.homeCategory || '').toLowerCase();
  if (c === 'courses' || c === 'examples' || c === 'help') return c;
  if (c === 'videos') return 'examples';
  if (c === 'blog')   return 'help';
  // infer if missing
  if ((q.type || '').toLowerCase() === 'deck') return 'courses';
  return 'examples';
}

function buildHref(q, category) {
  if (category === 'courses') {
    const code = q.slug ?? q.tcodeId ?? q.id;
    return `/syllabus?tcode=${encodeURIComponent(String(code))}`;
  }
  const slug = q.slug ?? q.id;
  return category === 'help'
    ? `/help/${encodeURIComponent(String(slug))}`
    : `/examples/${encodeURIComponent(String(slug))}`;
}

function toHomeCard(q) {
  const category = normalizeCategory(q);
  if (!category) return null;
  return {
    id: q.id,
    category,
    title: q.name ?? q.title ?? `Untitled #${q.id}`,
    thumbnail: q.thumbnail || THUMB_FALLBACK,
    href: buildHref(q, category)
  };
}

function sortForUI(a, b) {
  // stable alpha by title within a category
  return String(a.title).localeCompare(String(b.title));
}

function buildHref(q, category) {
  if (category === 'courses') {
    const code = q.slug ?? q.tcodeId ?? q.id;
    return `/syllabus?tcode=${encodeURIComponent(String(code))}`;
  }
  const slug = q.slug ?? q.id;
  return category === 'help'
    ? `/help/${encodeURIComponent(String(slug))}`
    : `/examples/${encodeURIComponent(String(slug))}`;
}

export async function getHomeData() {
  const VALID = new Set(PAGE_NAV.map(i => String(i.id).toLowerCase()));
  const validList = Array.from(VALID);

  // Try server-side filtering (if questionSvc.list supports Prisma-like where)
  let rows;
  try {
    rows = await questionSvc.list?.({
      includePayload: false,
      where: {
        homeCategory: { in: validList }
      }
    });
  } catch {
    rows = undefined;
  }

  // Fallback to all rows if service ignores "where"
  if (!Array.isArray(rows)) {
    rows = await questionSvc.list({ includePayload: false });
  }

  // Local filter and mapping to UI cards
  const cards = rows
    .filter(q => q.homeCategory && VALID.has(String(q.homeCategory).toLowerCase()))
    .map(q => {
      const category = String(q.homeCategory).toLowerCase();
      return {
        id: q.id,
        category,
        title: q.name ?? q.title ?? `Untitled #${q.id}`,
        thumbnail: q.thumbnail || THUMB_FALLBACK,
        href: buildHref(q, category),
        _pinned: !!q.homePinned,
        _homeSort: Number.isFinite(q.homeSort) ? q.homeSort : 0
      };
    });

  // Sort: nav order → pinned → homeSort → title
  const orderIndex = Object.fromEntries(PAGE_NAV.map((it, idx) => [it.id, idx]));
  cards.sort((a, b) => {
    const ai = orderIndex[a.category] ?? 999;
    const bi = orderIndex[b.category] ?? 999;
    if (ai !== bi) return ai - bi;
    if (a._pinned !== b._pinned) return a._pinned ? -1 : 1;
    if (a._homeSort !== b._homeSort) return a._homeSort - b._homeSort;
    return String(a.title).localeCompare(String(b.title));
  });

  const questions = cards.map(({ _pinned, _homeSort, ...rest }) => rest);
  return { pageNav: PAGE_NAV, questions };
}


// keep your existing demo export as-is
export function demoData() {
  const pageNav = [
    { id: 'courses',  label: 'Courses',  icon: '🗺️' },
    { id: 'examples', label: 'Examples', icon: '📊' },
    { id: 'help',     label: 'Help',     icon: '❓' }
  ];

  const questions = [
    { id: 101, category: 'courses',  title: 'Intro to Algebra',  thumbnail: '/media/images/box.webp',  href: '/syllabus?tcode=intro-algebra' },
    { id: 102, category: 'courses',  title: 'Angles & Triangles', thumbnail: '/media/images/class.webp', href: '/syllabus?tcode=geometry-angles' },
    { id: 103, category: 'courses',  title: 'Calculus: Limits',   thumbnail: '/media/images/theorems9old_10.1.1.svg', href: '/syllabus?tcode=calculus-basics' },

    { id: 201, category: 'examples', title: 'Solve: 3x + 5 = 20', thumbnail: '/media/images/exp.jpeg', href: '/examples/linear-equation' },
    { id: 202, category: 'examples', title: 'Area of a Circle',   thumbnail: '/media/images/box.webp', href: '/examples/circle-area' },
    { id: 203, category: 'examples', title: 'Probability: Two Dice', thumbnail: '/media/images/theorems9old_10.1.2.svg', href: '/examples/probability-dice' },

    { id: 301, category: 'help', title: 'Getting Started', thumbnail: '/media/images/exp.jpeg', href: '/help/getting-started' },
    { id: 302, category: 'help', title: 'Create a Deck',   thumbnail: '/media/images/class.webp', href: '/help/create-deck' },
    { id: 303, category: 'help', title: 'FAQ & Troubleshooting', thumbnail: '/media/images/theorems9old_10.1.3.svg', href: '/help/faq' }
  ];

  return { pageNav, questions };
}
