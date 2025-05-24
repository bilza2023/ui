

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.6q2mGtJ1.js","_app/immutable/chunks/scheduler.DJzX7Jse.js","_app/immutable/chunks/index.CA_LJP3g.js","_app/immutable/chunks/spread.Fs6qu5HT.js","_app/immutable/chunks/index.BFNXmCfH.js"];
export const stylesheets = ["_app/immutable/assets/0.Bzr0mMZx.css"];
export const fonts = [];
