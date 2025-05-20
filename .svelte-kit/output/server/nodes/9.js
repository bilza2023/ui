

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/videoblog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.BmER7sY_.js","_app/immutable/chunks/scheduler.n95hyz6h.js","_app/immutable/chunks/index.DFBL_hBO.js"];
export const stylesheets = ["_app/immutable/assets/9.D3YilaQw.css"];
export const fonts = [];
