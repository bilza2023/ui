
import { isAdmin } from '$lib/services/loginServices.js';
import { redirect, error } from '@sveltejs/kit';

export async function load({ url, cookies, request }) {
  const token = cookies.get('token') ?? request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!(await isAdmin(token))) {
    // throw redirect(303, `/login?next=${encodeURIComponent(url.pathname + url.search)}`);
    throw redirect(303, `/`);
  }
  return {};
}
