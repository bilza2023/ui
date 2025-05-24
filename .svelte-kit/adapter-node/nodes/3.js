

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BTe_0WC9.js","_app/immutable/chunks/scheduler.DJzX7Jse.js","_app/immutable/chunks/index.CA_LJP3g.js"];
export const stylesheets = [];
export const fonts = [];
