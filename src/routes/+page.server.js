import { getHomeData,getDemoData } from '$lib/api/v1/user/homeApi.js';
export const prerender = false;
export async function load() {

  return await getHomeData(); // returns { pageNav, questions }
  // return await getDemoData(); // returns { pageNav, questions }
}
