// /src/routes/+page.server.js
export const prerender = false;

import { getSetting } from '$lib/services/AppServices.js';
// import { listIndexItems } from '$lib/services/homeIndexService';
import { listIndexItems } from '$lib/services/homeIndexServices.js';

function dedupeBySlug(arr) {
  const seen = new Set();
  return arr.filter(x => (seen.has(x.slug) ? false : (seen.add(x.slug), true)));
}

export async function load({ setHeaders }) {


  let questions = await listIndexItems({
    includeQuestion : false,
    limit : 100,
  });
  // questions = dedupeBySlug(questions);

  setHeaders({ 'cache-control': 'public, max-age=60' });
  return {questions};
}
