

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CmsMUqZ_.js","_app/immutable/chunks/scheduler.B7UmRXhB.js","_app/immutable/chunks/index.CjsDA58_.js"];
export const stylesheets = [];
export const fonts = [];
