

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CV4zN_mG.js","_app/immutable/chunks/scheduler.CS4dGvIb.js","_app/immutable/chunks/index.DciHV_FM.js"];
export const stylesheets = [];
export const fonts = [];
