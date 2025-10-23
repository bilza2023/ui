import { getHomeData } from '$lib/api/v1/user/homeApi.js';
export const prerender = false;

export async function load() {
  console.log("getHomeData()" , await getHomeData());

  return await getHomeData(); // returns { pageNav, questions }
}
