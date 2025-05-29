

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/videoblog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.Dzc918x6.js","_app/immutable/chunks/scheduler.DQuZDOUm.js","_app/immutable/chunks/index.B40-R7aE.js","_app/immutable/chunks/each.tjCpn8P1.js"];
export const stylesheets = [];
export const fonts = [];
