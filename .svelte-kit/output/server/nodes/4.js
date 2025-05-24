

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.4hvBN2pE.js","_app/immutable/chunks/scheduler.DJzX7Jse.js","_app/immutable/chunks/index.CA_LJP3g.js"];
export const stylesheets = [];
export const fonts = [];
