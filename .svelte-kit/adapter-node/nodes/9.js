import * as server from '../entries/pages/syllabus/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/syllabus/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/syllabus/+page.server.js";
export const imports = ["_app/immutable/nodes/9.TNRgUJyx.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BAnhAC8H.js","_app/immutable/chunks/each.D79ZyfDX.js","_app/immutable/chunks/stores.BKm8uxho.js","_app/immutable/chunks/entry.B0gfeYuw.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/chunks/Nav.CWC7HPcC.js","_app/immutable/chunks/BetaWarning.CHecxEKv.js"];
export const stylesheets = ["_app/immutable/assets/9.DprQlTmV.css"];
export const fonts = [];
