

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CSBrvMNN.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/index.Bncx8Y1l.js"];
export const stylesheets = [];
export const fonts = [];
