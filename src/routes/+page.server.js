// SSR loader for Home page — reads from AppSettings
import { getSetting } from '$lib/services/AppServices.js';

export const prerender = false; // dynamic DB-backed page

export async function load({ setHeaders }) {
 
  const fromIndexData     = await getSetting('index_data', null);
  const blog_index     = await getSetting('blog_index', null);

  // console.log("fromIndexData" ,fromIndexData);
  const questions =  fromIndexData ?? [];

  // Optional small cache; remove if you want zero caching.
  setHeaders({ 'cache-control': 'public, max-age=60' });

  return { questions,blog_index };
}
