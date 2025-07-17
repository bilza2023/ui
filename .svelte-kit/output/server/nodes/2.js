import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.8hZpaqZb.js","_app/immutable/chunks/scheduler.B7UmRXhB.js","_app/immutable/chunks/index.9hrlMsO0.js","_app/immutable/chunks/Nav.CszafaYL.js","_app/immutable/chunks/entry.C3h-Uk3m.js","_app/immutable/chunks/index.CmETmuT8.js","_app/immutable/chunks/each.BIHJqMB2.js","_app/immutable/chunks/BetaWarning.Jwu0kR9g.js"];
export const stylesheets = ["_app/immutable/assets/2.lPlI-6TM.css"];
export const fonts = [];
