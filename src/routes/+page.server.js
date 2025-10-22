// /src/routes/+page.server.js
export const prerender = false;
import { demoData } from '$lib/api/v1/user/homeApi.js';

export async function load() {
  
  // console.log("demoData()" ,demoData());
  return demoData();
}