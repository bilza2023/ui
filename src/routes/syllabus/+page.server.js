// /src/routes/syllabus/+page.server.js
export const prerender = false;

const S = (v) => (typeof v === 'string' ? v.trim() : '');

export async function load({ url, fetch, setHeaders }) {
  const tcodeSlug = S(url.searchParams.get('tcode'));
  const chapter   = S(url.searchParams.get('chapter')) || '';
  const exercise  = S(url.searchParams.get('exercise')) || '';

  // No tcode → safe, predictable payload so UI never crashes
  if (!tcodeSlug) {
    return {
      tcode: '',
      selected: { chapter: '', exercise: '' },
      synopsis: null,
      items: []            // QuestionCards uses `items`
    };
  }

  try {
    // 1) Fetch nested tcode (synopsis)
    const synRes = await fetch(`/api/tcodes/${encodeURIComponent(tcodeSlug)}`);
    if (!synRes.ok) throw new Error(`synopsis(${tcodeSlug}) → HTTP ${synRes.status}`);
    const synopsis = await synRes.json();
    // console.log('[Syllabus SSR] fetched synopsis for', tcodeSlug, synopsis);

    // 2) Fetch flat questions list for the tcode (no filters for now)
    const qRes = await fetch(`/api/tcodes/${encodeURIComponent(tcodeSlug)}/questions`);
    const items = qRes.ok ? await qRes.json() : [];
    // console.log('[Syllabus SSR] questions for', tcodeSlug, '→', Array.isArray(items) ? items.length : 0);

    // Light caching
    setHeaders({ 'cache-control': 'public, max-age=30' });

    return {
      tcode: tcodeSlug,                    // slug string for topbar/URL
      selected: { chapter, exercise },     // always present
      synopsis,                            // nested tcode object
      items                                // flat questions list
    };
  } catch (err) {
    console.error('[Syllabus SSR] failed:', err?.message || err);
    return {
      tcode: tcodeSlug,
      selected: { chapter, exercise },
      synopsis: null,
      items: []
    };
  }
}
