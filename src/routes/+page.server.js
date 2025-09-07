// /src/routes/+page.server.js
export const prerender = false;

import { homeIndexService } from '$lib/services/homeIndexServices.js';

export async function load({ setHeaders }) {
  // Pull all entries (cap high; you said max ~50)
  const questions = await homeIndexService.listEntries({ limit: 500 });

  // Light caching (tweak if you want)
  setHeaders({ 'cache-control': 'public, max-age=30' });

  return { questions };
}
