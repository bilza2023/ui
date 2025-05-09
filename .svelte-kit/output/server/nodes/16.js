

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/static_canvas_player/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.CYk_Pbi2.js","_app/immutable/chunks/scheduler.CS4dGvIb.js","_app/immutable/chunks/index.DciHV_FM.js","_app/immutable/chunks/EditorBehaviour.DoJtPCPY.js","_app/immutable/chunks/CanvasPlayer.B5cV2T4Y.js"];
export const stylesheets = [];
export const fonts = [];
