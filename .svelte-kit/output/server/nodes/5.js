

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.B4MGu0hn.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/index.Bncx8Y1l.js"];
export const stylesheets = ["_app/immutable/assets/5.CiOj15UQ.css"];
export const fonts = [];
