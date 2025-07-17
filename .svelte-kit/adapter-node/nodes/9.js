import * as server from '../entries/pages/syllabus/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/syllabus/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/syllabus/+page.server.js";
export const imports = ["_app/immutable/nodes/9.CwL2KJ8N.js","_app/immutable/chunks/scheduler.B7UmRXhB.js","_app/immutable/chunks/index.9hrlMsO0.js","_app/immutable/chunks/each.BIHJqMB2.js","_app/immutable/chunks/stores.C5nfd1Aw.js","_app/immutable/chunks/entry.C3h-Uk3m.js","_app/immutable/chunks/index.CmETmuT8.js","_app/immutable/chunks/Nav.CszafaYL.js","_app/immutable/chunks/BetaWarning.Jwu0kR9g.js"];
export const stylesheets = ["_app/immutable/assets/9.DprQlTmV.css"];
export const fonts = [];
