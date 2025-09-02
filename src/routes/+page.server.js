// SSR loader for Home page — reads from AppSettings
import { getSetting } from '$lib/services/AppServices.js';
import { listTcodes } from '$lib/services/synopisisServices2.js';
export const prerender = false; // dynamic DB-backed page

export async function load({ setHeaders }) {
 
  const fromIndexData     = await getSetting('index_data', null);
  const blog_index     = await getSetting('blog_index', null);

  const questions =  fromIndexData ?? [];

  const rows = await listTcodes(); // [{ id, tcode, name, description, image }]
  // Shape it to what you want on the client
  const syllabus = rows.map(r => ({
    tcodeName: r.tcode,
    name: r.name,
    description: r.description,
    image: r.image
  }));
  // Optional small cache; remove if you want zero caching.
  setHeaders({ 'cache-control': 'public, max-age=60' });

  return { questions,blog_index,syllabus };
}
