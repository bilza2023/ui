import * as server from '../entries/pages/syllabus/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/syllabus/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/syllabus/+page.server.js";
export const imports = ["_app/immutable/nodes/9.Cue9CFD8.js","_app/immutable/chunks/scheduler.B7UmRXhB.js","_app/immutable/chunks/index.CjsDA58_.js","_app/immutable/chunks/each.DAnRgm2i.js","_app/immutable/chunks/Nav.V0L7thlX.js","_app/immutable/chunks/entry.DLEyZfTn.js","_app/immutable/chunks/index.CmETmuT8.js","_app/immutable/chunks/BetaWarning.Cd5jOKse.js"];
export const stylesheets = ["_app/immutable/assets/9.CafJn2MR.css"];
export const fonts = [];
