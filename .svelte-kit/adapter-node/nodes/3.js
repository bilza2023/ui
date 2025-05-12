

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.D3ZqkXE3.js","_app/immutable/chunks/scheduler.DZ80fnzp.js","_app/immutable/chunks/index.D7HHO6wW.js"];
export const stylesheets = [];
export const fonts = [];
