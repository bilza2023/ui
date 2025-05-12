

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/static_canvas_player/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.DR0cBJnf.js","_app/immutable/chunks/scheduler.DZ80fnzp.js","_app/immutable/chunks/index.D7HHO6wW.js","_app/immutable/chunks/EditorBehaviour.DoJtPCPY.js","_app/immutable/chunks/CanvasPlayer.DHFV5ds0.js"];
export const stylesheets = [];
export const fonts = [];
