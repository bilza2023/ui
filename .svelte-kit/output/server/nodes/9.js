

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/player/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.CUH6Qt8j.js","_app/immutable/chunks/scheduler.n95hyz6h.js","_app/immutable/chunks/index.C7eUt7FF.js"];
export const stylesheets = ["_app/immutable/assets/9.DGtlpaTi.css"];
export const fonts = [];
