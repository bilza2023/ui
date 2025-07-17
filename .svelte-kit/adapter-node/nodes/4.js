

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.D23ZnU2c.js","_app/immutable/chunks/scheduler.B7UmRXhB.js","_app/immutable/chunks/index.9hrlMsO0.js"];
export const stylesheets = [];
export const fonts = [];
