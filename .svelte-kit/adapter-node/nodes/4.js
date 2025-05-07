

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.wue70Tab.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/each.CM3BrcY7.js","_app/immutable/chunks/index.Bncx8Y1l.js"];
export const stylesheets = [];
export const fonts = [];
