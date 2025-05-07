

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/player/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.v62-nWpd.js","_app/immutable/chunks/scheduler.BvVxdwIw.js","_app/immutable/chunks/index.Bncx8Y1l.js","_app/immutable/chunks/index.3rfbx_ts.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.BAYCSJ8g.js","_app/immutable/chunks/index.CkdOSYlD.js","_app/immutable/chunks/EditorBehaviour.DoJtPCPY.js","_app/immutable/chunks/Player.rV7iksvK.js","_app/immutable/chunks/CanvasPlayer.CTkzYTVN.js","_app/immutable/chunks/each.CM3BrcY7.js","_app/immutable/chunks/getPresentationImages.BzPQnyJG.js","_app/immutable/chunks/getCanvasSlideImages.C7USBa2E.js","_app/immutable/chunks/ProjectToolbar.wq7gOVbA.js","_app/immutable/chunks/ajaxGet.NB-3tkvm.js"];
export const stylesheets = ["_app/immutable/assets/SvelteToast.Bn1lMYWi.css","_app/immutable/assets/Player.0YQbNFlR.css","_app/immutable/assets/getPresentationImages.CYcg1EC6.css"];
export const fonts = [];
