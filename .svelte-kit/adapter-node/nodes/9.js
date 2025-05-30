import * as server from '../entries/pages/vb/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/vb/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/vb/+page.server.js";
export const imports = ["_app/immutable/nodes/9.CvY_b9x_.js","_app/immutable/chunks/scheduler.DQuZDOUm.js","_app/immutable/chunks/index.B40-R7aE.js"];
export const stylesheets = ["_app/immutable/assets/9.CqRndDAg.css"];
export const fonts = [];
