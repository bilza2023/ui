

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.DQDDdY_S.js","_app/immutable/chunks/scheduler.DQuZDOUm.js","_app/immutable/chunks/index.B40-R7aE.js"];
export const stylesheets = [];
export const fonts = [];
