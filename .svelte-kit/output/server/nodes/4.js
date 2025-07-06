

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CwaoqAvV.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BAnhAC8H.js"];
export const stylesheets = [];
export const fonts = [];
