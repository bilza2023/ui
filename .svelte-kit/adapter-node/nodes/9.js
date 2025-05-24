import * as server from '../entries/pages/videoblog/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/videoblog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/videoblog/+page.server.js";
export const imports = ["_app/immutable/nodes/9.CvbHM-EO.js","_app/immutable/chunks/scheduler.DJzX7Jse.js","_app/immutable/chunks/index.CA_LJP3g.js"];
export const stylesheets = ["_app/immutable/assets/9.D7klU2F7.css"];
export const fonts = [];
