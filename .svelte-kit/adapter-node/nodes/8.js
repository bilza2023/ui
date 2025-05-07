

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/courses/ai/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.1djzVQV7.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/each.CM3BrcY7.js","_app/immutable/chunks/index.Bncx8Y1l.js"];
export const stylesheets = [];
export const fonts = [];
