

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DH6_A_6V.js","_app/immutable/chunks/scheduler.DQuZDOUm.js","_app/immutable/chunks/index.B40-R7aE.js"];
export const stylesheets = [];
export const fonts = [];
