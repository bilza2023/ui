

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.Bnw5nlJh.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/index.Bncx8Y1l.js"];
export const stylesheets = [];
export const fonts = [];
