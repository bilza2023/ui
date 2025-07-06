import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.CL1Ttz35.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BAnhAC8H.js","_app/immutable/chunks/Nav.Di9e53VQ.js","_app/immutable/chunks/entry.cxcEyyKJ.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/chunks/each.D79ZyfDX.js","_app/immutable/chunks/BetaWarning.CHecxEKv.js"];
export const stylesheets = ["_app/immutable/assets/2.lPlI-6TM.css"];
export const fonts = [];
