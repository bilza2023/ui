

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Bb73hL1Z.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/index.Bncx8Y1l.js","_app/immutable/chunks/entry.FDq9o3ih.js","_app/immutable/chunks/index.CkdOSYlD.js","_app/immutable/chunks/each.CM3BrcY7.js"];
export const stylesheets = [];
export const fonts = [];
