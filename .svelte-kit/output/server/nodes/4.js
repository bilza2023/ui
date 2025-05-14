

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.C_E7Cvz4.js","_app/immutable/chunks/scheduler.n95hyz6h.js","_app/immutable/chunks/index.C7eUt7FF.js"];
export const stylesheets = [];
export const fonts = [];
