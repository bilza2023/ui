import * as server from '../entries/pages/syllabus/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/syllabus/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/syllabus/+page.server.js";
export const imports = ["_app/immutable/nodes/8.CVEcfml2.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BAnhAC8H.js","_app/immutable/chunks/each.D79ZyfDX.js","_app/immutable/chunks/stores.CE6yuWwi.js","_app/immutable/chunks/entry.sLa1DcBa.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/chunks/Nav.DLYUSb8D.js","_app/immutable/chunks/BetaWarning.CHecxEKv.js"];
export const stylesheets = ["_app/immutable/assets/8.B8lEp6m0.css"];
export const fonts = [];
