import { questions as questionSvc } from '$lib/services/questionServices.js';
// ADD: import for courses
import { listTcodes } from '$lib/services/syllabusService.js';

export const PAGE_NAV = [
  { id: 'videos',  label: 'Videos',  icon: '🗺️' },
  { id: 'blog',    label: 'Blog',    icon: '📊' },
  { id: 'courses', label: 'Courses', icon: '🎨' }
];

const THUMB_FALLBACK = '/media/images/box.webp';

function buildHref(q, category) {
  const slug = q.slug ?? q.id;
  if (category === 'courses') {
    const code = q.slug ?? q.tcodeId ?? q.id;
    return `/syllabus?tcode=${encodeURIComponent(String(code))}`;
  }
  // videos → /examples, blog → /help (adjust if you add a real /blog route)
  return category === 'videos'
    ? `/examples/${encodeURIComponent(String(slug))}`
    : `/help/${encodeURIComponent(String(slug))}`;
}

export async function getHomeData() {
  const VALID = new Set(PAGE_NAV.map(i => String(i.id).toLowerCase()));
  const validList = Array.from(VALID);

  // Prefer server-side filter; fall back gracefully if not supported.
  let rows;
  try {
    rows = await questionSvc.list?.({
      includePayload: false,
      where: { homeCategory: { in: validList } }
    });
  } catch {
    rows = undefined;
  }
  if (!Array.isArray(rows)) {
    rows = await questionSvc.list({ includePayload: false });
  }

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


const courseCards = await getCoursesCards();
cards.push(...courseCards);
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
export function getDemoData() {
  const pageNav = [
    { id: 'videos',  label: 'Videos',  icon: '🗺️' },
    { id: 'blog',    label: 'Blog',    icon: '📊' },
    { id: 'courses', label: 'Courses', icon: '🎨' }
  ];

  const questions = [
    // --- Courses ---
    { id: 101, category: 'courses', title: 'Intro to Algebra',  thumbnail: '/media/images/box.webp',  href: '/syllabus?tcode=intro-algebra' },
    { id: 102, category: 'courses', title: 'Angles & Triangles', thumbnail: '/media/images/class.webp', href: '/syllabus?tcode=geometry-angles' },
    { id: 103, category: 'courses', title: 'Calculus: Limits',   thumbnail: '/media/images/theorems9old_10.1.1.svg', href: '/syllabus?tcode=calculus-basics' },

    // --- Videos ---
    { id: 201, category: 'videos', title: 'Solve: 3x + 5 = 20', thumbnail: '/media/images/exp.jpeg', href: '/examples/linear-equation' },
    { id: 202, category: 'videos', title: 'Area of a Circle',   thumbnail: '/media/images/box.webp', href: '/examples/circle-area' },
    { id: 203, category: 'videos', title: 'Probability: Two Dice', thumbnail: '/media/images/theorems9old_10.1.2.svg', href: '/examples/probability-dice' },

    // --- Blog ---
    { id: 301, category: 'blog', title: 'Getting Started', thumbnail: '/media/images/exp.jpeg', href: '/help/getting-started' },
    { id: 302, category: 'blog', title: 'Create a Deck',   thumbnail: '/media/images/class.webp', href: '/help/create-deck' },
    { id: 303, category: 'blog', title: 'FAQ & Troubleshooting', thumbnail: '/media/images/theorems9old_10.1.3.svg', href: '/help/faq' }
  ];

  return { pageNav, questions };
}


// NEW: fetch Courses (tcodes) and map to the same "card" shape
async function getCoursesCards() {
  const THUMB_FALLBACK = '/media/images/box.webp';
  const tcodes = await listTcodes(); // [{ id, slug, name, image, sortOrder, ... }]

  return tcodes.map((t) => ({
    id: t.id,
    category: 'courses',
    title: t.name ?? `Course #${t.id}`,
    thumbnail: t.image || THUMB_FALLBACK,
    href: `/syllabus?tcode=${encodeURIComponent(String(t.slug ?? t.id))}`,
    _pinned: false,
    _homeSort: Number.isFinite(t.sortOrder) ? t.sortOrder : 0
  }));
}
