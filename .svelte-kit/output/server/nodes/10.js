

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/player/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CRJP0IPS.js","_app/immutable/chunks/scheduler.n95hyz6h.js","_app/immutable/chunks/index.C7eUt7FF.js","_app/immutable/chunks/titleSlide.CThYzb4Y.js"];
export const stylesheets = ["_app/immutable/assets/10.BJL7hFAU.css"];
export const fonts = [];
