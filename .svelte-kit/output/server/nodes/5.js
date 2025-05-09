

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.FoeJBJG4.js","_app/immutable/chunks/scheduler.CS4dGvIb.js","_app/immutable/chunks/index.DciHV_FM.js"];
export const stylesheets = [];
export const fonts = [];
