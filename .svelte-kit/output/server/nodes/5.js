

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.DenQhUm5.js","_app/immutable/chunks/scheduler.DZ80fnzp.js","_app/immutable/chunks/index.D7HHO6wW.js"];
export const stylesheets = [];
export const fonts = [];
