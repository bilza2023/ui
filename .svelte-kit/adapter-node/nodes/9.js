import * as server from '../entries/pages/syllabus/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/syllabus/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/syllabus/+page.server.js";
export const imports = ["_app/immutable/nodes/9.D6OwwXHi.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.CJqlTs1C.js","_app/immutable/chunks/each.D7GNDiAv.js","_app/immutable/chunks/stores.CKAeza8D.js","_app/immutable/chunks/entry.BQO5tePw.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/chunks/Nav.DRROvpGe.js","_app/immutable/chunks/BetaWarning.BU3DPaun.js"];
export const stylesheets = ["_app/immutable/assets/9.DprQlTmV.css"];
export const fonts = [];
