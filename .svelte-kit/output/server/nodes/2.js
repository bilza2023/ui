import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BYcH6n47.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.CJqlTs1C.js","_app/immutable/chunks/Nav.Bti8fVgK.js","_app/immutable/chunks/entry.Cfrng0GN.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/chunks/each.D7GNDiAv.js","_app/immutable/chunks/BetaWarning.BU3DPaun.js"];
export const stylesheets = ["_app/immutable/assets/2.lPlI-6TM.css"];
export const fonts = [];
