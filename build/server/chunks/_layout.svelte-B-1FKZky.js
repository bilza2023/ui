import { c as create_ssr_component, v as validate_component, a as subscribe, e as each, b as add_attribute, d as escape, n as null_to_empty, o as onDestroy, m as missing_component, f as assign, i as identity, g as noop } from './ssr-B0JoWuEN.js';
import { w as writable } from './index-Dc4pCWI_.js';

const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const defaults = {
  duration: 4e3,
  initial: 1,
  next: 0,
  pausable: false,
  dismissable: true,
  reversed: false,
  intro: { x: 256 }
};
function createToast() {
  const { subscribe: subscribe2, update } = writable(new Array());
  const options = {};
  let count = 0;
  function _obj(obj) {
    return obj instanceof Object;
  }
  function _init(target = "default", opts = {}) {
    options[target] = opts;
    return options;
  }
  function push(msg, opts) {
    const param = {
      target: "default",
      ..._obj(msg) ? (
        /** @type {SvelteToastOptions} */
        msg
      ) : { ...opts, msg }
    };
    const conf = options[param.target] || {};
    const entry = {
      ...defaults,
      ...conf,
      ...param,
      theme: { ...conf.theme, ...param.theme },
      classes: [...conf.classes || [], ...param.classes || []],
      id: ++count
    };
    update((n) => entry.reversed ? [...n, entry] : [entry, ...n]);
    return count;
  }
  function pop(id) {
    update((n) => {
      if (!n.length || id === 0) return [];
      if (typeof id === "function") return n.filter((i) => id(i));
      if (_obj(id))
        return n.filter(
          /** @type {SvelteToastOptions[]} i */
          (i) => i.target !== id.target
        );
      const found = id || Math.max(...n.map((i) => i.id));
      return n.filter((i) => i.id !== found);
    });
  }
  function set(id, opts) {
    const param = _obj(id) ? id : { ...opts, id };
    update((n) => {
      const idx = n.findIndex((i) => i.id === param.id);
      if (idx > -1) {
        n[idx] = { ...n[idx], ...param };
      }
      return n;
    });
  }
  return { subscribe: subscribe2, push, pop, set, _init };
}
const toast = createToast();
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults2 = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults2), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$1 = {
  code: "._toastItem.svelte-l65oht{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(\n    --toastBoxShadow,\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\n  );border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;flex-direction:row;align-items:center;overflow:hidden;will-change:transform, opacity;-webkit-tap-highlight-color:transparent}._toastMsg.svelte-l65oht{padding:var(--toastMsgPadding, 0.75rem 0.5rem);flex:1 1 0%}.pe.svelte-l65oht,._toastMsg.svelte-l65oht a{pointer-events:auto}._toastBtn.svelte-l65oht{width:var(--toastBtnWidth, 2rem);height:var(--toastBtnHeight, 100%);cursor:pointer;outline:none}._toastBtn.svelte-l65oht::after{content:var(--toastBtnContent, '✕');font:var(--toastBtnFont, 1rem sans-serif);display:flex;align-items:center;justify-content:center}._toastBar.svelte-l65oht{top:var(--toastBarTop, auto);right:var(--toastBarRight, auto);bottom:var(--toastBarBottom, 0);left:var(--toastBarLeft, 0);height:var(--toastBarHeight, 6px);width:var(--toastBarWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}._toastBar.svelte-l65oht::-webkit-progress-bar{background:transparent}._toastBar.svelte-l65oht::-webkit-progress-value{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}._toastBar.svelte-l65oht::-moz-progress-bar{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}",
  map: `{"version":3,"file":"ToastItem.svelte","sources":["ToastItem.svelte"],"sourcesContent":["<script>\\nimport { onMount, onDestroy } from 'svelte'\\nimport { tweened } from 'svelte/motion'\\nimport { linear } from 'svelte/easing'\\nimport { toast } from './stores.js'\\n\\n/** @type {import('./stores.js').SvelteToastOptions} */\\nexport let item\\n\\n/** @type {any} */\\nlet next = item.initial\\nlet prev = next\\nlet paused = false\\nlet cprops = {}\\n/** @type {any} */\\nlet unlisten\\n/** @type {MouseEvent | KeyboardEvent} */\\nlet event\\n\\nconst progress = tweened(item.initial, { duration: item.duration, easing: linear })\\n\\n/** @param {MouseEvent|KeyboardEvent|undefined} [ev] */\\nfunction close(ev) {\\n  if (ev) event = ev\\n  toast.pop(item.id)\\n}\\n\\nfunction autoclose() {\\n  if ($progress === 1 || $progress === 0) close()\\n}\\n\\nfunction pause() {\\n  if (!paused && $progress !== next) {\\n    progress.set($progress, { duration: 0 })\\n    paused = true\\n  }\\n}\\n\\nfunction resume() {\\n  if (paused) {\\n    const d = /** @type {any} */ (item.duration)\\n    const duration = d - d * (($progress - prev) / (next - prev))\\n    progress.set(next, { duration }).then(autoclose)\\n    paused = false\\n  }\\n}\\n\\n/** @param {any} prop */\\nfunction check(prop, kind = 'undefined') {\\n  return typeof prop === kind\\n}\\n\\nfunction listen(d = document) {\\n  if (check(d.hidden)) return\\n  const handler = () => (d.hidden ? pause() : resume())\\n  const name = 'visibilitychange'\\n  d.addEventListener(name, handler)\\n  unlisten = () => d.removeEventListener(name, handler)\\n  handler()\\n}\\n\\n$: if (next !== item.next) {\\n  next = item.next\\n  prev = $progress\\n  paused = false\\n  progress.set(next).then(autoclose)\\n}\\n\\n$: if (item.component) {\\n  const { props = {}, sendIdTo } = item.component\\n  cprops = { ...props, ...(sendIdTo && { [sendIdTo]: item.id }) }\\n}\\n\\n// \`progress\` has been renamed to \`next\`; shim included for backward compatibility, to remove in next major\\n$: if (!check(item.progress)) {\\n  item.next = item.progress\\n}\\n\\nonMount(listen)\\n\\nonDestroy(() => {\\n  item.onpop && item.onpop(item.id, { event })\\n  unlisten && unlisten()\\n})\\n<\/script>\\n\\n<div\\n  role=\\"status\\"\\n  class=\\"_toastItem\\"\\n  class:pe={item.pausable}\\n  on:mouseenter={() => {\\n    if (item.pausable) pause()\\n  }}\\n  on:mouseleave={resume}\\n>\\n  <div class=\\"_toastMsg\\" class:pe={item.component}>\\n    {#if item.component}\\n      <svelte:component this={item.component.src} {...cprops} />\\n    {:else}\\n      {@html item.msg}\\n    {/if}\\n  </div>\\n  {#if item.dismissable}\\n    <div\\n      class=\\"_toastBtn pe\\"\\n      role=\\"button\\"\\n      tabindex=\\"0\\"\\n      on:click={(ev) => close(ev)}\\n      on:keydown={(ev) => {\\n        if (ev instanceof KeyboardEvent && ['Enter', ' '].includes(ev.key)) close(ev)\\n      }}\\n    />\\n  {/if}\\n  <progress class=\\"_toastBar\\" value={$progress} />\\n</div>\\n\\n<style>\\n._toastItem {\\n  width: var(--toastWidth, 16rem);\\n  height: var(--toastHeight, auto);\\n  min-height: var(--toastMinHeight, 3.5rem);\\n  margin: var(--toastMargin, 0 0 0.5rem 0);\\n  padding: var(--toastPadding, 0);\\n  background: var(--toastBackground, rgba(66, 66, 66, 0.9));\\n  color: var(--toastColor, #fff);\\n  box-shadow: var(\\n    --toastBoxShadow,\\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\\n  );\\n  border: var(--toastBorder, none);\\n  border-radius: var(--toastBorderRadius, 0.125rem);\\n  position: relative;\\n  display: flex;\\n  flex-direction: row;\\n  align-items: center;\\n  overflow: hidden;\\n  will-change: transform, opacity;\\n  -webkit-tap-highlight-color: transparent;\\n}\\n._toastMsg {\\n  padding: var(--toastMsgPadding, 0.75rem 0.5rem);\\n  flex: 1 1 0%;\\n}\\n.pe,\\n._toastMsg :global(a) {\\n  pointer-events: auto;\\n}\\n._toastBtn {\\n  width: var(--toastBtnWidth, 2rem);\\n  height: var(--toastBtnHeight, 100%);\\n  cursor: pointer;\\n  outline: none;\\n}\\n._toastBtn::after {\\n  content: var(--toastBtnContent, '✕');\\n  font: var(--toastBtnFont, 1rem sans-serif);\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n}\\n._toastBar {\\n  top: var(--toastBarTop, auto);\\n  right: var(--toastBarRight, auto);\\n  bottom: var(--toastBarBottom, 0);\\n  left: var(--toastBarLeft, 0);\\n  height: var(--toastBarHeight, 6px);\\n  width: var(--toastBarWidth, 100%);\\n  position: absolute;\\n  display: block;\\n  -webkit-appearance: none;\\n  -moz-appearance: none;\\n  appearance: none;\\n  border: none;\\n  background: transparent;\\n  pointer-events: none;\\n}\\n._toastBar::-webkit-progress-bar {\\n  background: transparent;\\n}\\n/* \`--toastProgressBackground\` renamed to \`--toastBarBackground\`; override included for backward compatibility */\\n._toastBar::-webkit-progress-value {\\n  background: var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)));\\n}\\n._toastBar::-moz-progress-bar {\\n  background: var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)));\\n}\\n</style>\\n"],"names":[],"mappings":"AAqHA,yBAAY,CACV,KAAK,CAAE,IAAI,YAAY,CAAC,MAAM,CAAC,CAC/B,MAAM,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAChC,UAAU,CAAE,IAAI,gBAAgB,CAAC,OAAO,CAAC,CACzC,MAAM,CAAE,IAAI,aAAa,CAAC,aAAa,CAAC,CACxC,OAAO,CAAE,IAAI,cAAc,CAAC,EAAE,CAAC,CAC/B,UAAU,CAAE,IAAI,iBAAiB,CAAC,sBAAsB,CAAC,CACzD,KAAK,CAAE,IAAI,YAAY,CAAC,KAAK,CAAC,CAC9B,UAAU,CAAE;AACd,IAAI,gBAAgB;AACpB;AACA;AACA,EAAE,CAAC,CACD,MAAM,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAChC,aAAa,CAAE,IAAI,mBAAmB,CAAC,SAAS,CAAC,CACjD,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,SAAS,CAAC,CAAC,OAAO,CAC/B,2BAA2B,CAAE,WAC/B,CACA,wBAAW,CACT,OAAO,CAAE,IAAI,iBAAiB,CAAC,eAAe,CAAC,CAC/C,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,EACZ,CACA,iBAAG,CACH,wBAAU,CAAS,CAAG,CACpB,cAAc,CAAE,IAClB,CACA,wBAAW,CACT,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACnC,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IACX,CACA,wBAAU,OAAQ,CAChB,OAAO,CAAE,IAAI,iBAAiB,CAAC,IAAI,CAAC,CACpC,IAAI,CAAE,IAAI,cAAc,CAAC,gBAAgB,CAAC,CAC1C,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MACnB,CACA,wBAAW,CACT,GAAG,CAAE,IAAI,aAAa,CAAC,KAAK,CAAC,CAC7B,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,MAAM,CAAE,IAAI,gBAAgB,CAAC,EAAE,CAAC,CAChC,IAAI,CAAE,IAAI,cAAc,CAAC,EAAE,CAAC,CAC5B,MAAM,CAAE,IAAI,gBAAgB,CAAC,IAAI,CAAC,CAClC,KAAK,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACjC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,cAAc,CAAE,IAClB,CACA,wBAAU,sBAAuB,CAC/B,UAAU,CAAE,WACd,CAEA,wBAAU,wBAAyB,CACjC,UAAU,CAAE,IAAI,yBAAyB,CAAC,oDAAoD,CAChG,CACA,wBAAU,mBAAoB,CAC5B,UAAU,CAAE,IAAI,yBAAyB,CAAC,oDAAoD,CAChG"}`
};
function check(prop, kind = "undefined") {
  return typeof prop === kind;
}
const ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { item } = $$props;
  let next = item.initial;
  let cprops = {};
  let event;
  const progress = tweened(item.initial, { duration: item.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  function close(ev) {
    toast.pop(item.id);
  }
  function autoclose() {
    if ($progress === 1 || $progress === 0) close();
  }
  onDestroy(() => {
    item.onpop && item.onpop(item.id, { event });
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0) $$bindings.item(item);
  $$result.css.add(css$1);
  {
    if (!check(item.progress)) {
      item.next = item.progress;
    }
  }
  {
    if (next !== item.next) {
      next = item.next;
      progress.set(next).then(autoclose);
    }
  }
  {
    if (item.component) {
      const { props = {}, sendIdTo } = item.component;
      cprops = {
        ...props,
        ...sendIdTo && { [sendIdTo]: item.id }
      };
    }
  }
  $$unsubscribe_progress();
  return `<div role="status" class="${["_toastItem svelte-l65oht", item.pausable ? "pe" : ""].join(" ").trim()}"><div class="${["_toastMsg svelte-l65oht", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign({}, cprops), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div> ${item.dismissable ? `<div class="_toastBtn pe svelte-l65oht" role="button" tabindex="0"></div>` : ``} <progress class="_toastBar svelte-l65oht"${add_attribute("value", $progress, 0)}></progress> </div>`;
});
const css = {
  code: "._toastContainer.svelte-yh90az{top:var(--toastContainerTop, 1.5rem);right:var(--toastContainerRight, 2rem);bottom:var(--toastContainerBottom, auto);left:var(--toastContainerLeft, auto);position:fixed;margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastContainerZIndex, 9999)}",
  map: `{"version":3,"file":"SvelteToast.svelte","sources":["SvelteToast.svelte"],"sourcesContent":["<script>\\nimport { fade, fly } from 'svelte/transition'\\nimport { flip } from 'svelte/animate'\\nimport { toast } from './stores.js'\\nimport ToastItem from './ToastItem.svelte'\\n\\n/** @type {import('./stores.js').SvelteToastOptions} */\\nexport let options = {}\\n/** @type {(string|'default')} */\\nexport let target = 'default'\\n\\n/** @type {import('./stores.js').SvelteToastOptions[]} */\\nlet items = []\\n\\n/** @param {Object<string,string|number>} [theme] */\\nfunction getCss(theme) {\\n  return theme ? Object.keys(theme).reduce((a, c) => \`\${a}\${c}:\${theme[c]};\`, '') : undefined\\n}\\n\\n$: toast._init(target, options)\\n\\n$: items = $toast.filter((i) => i.target === target)\\n<\/script>\\n\\n<ul class=\\"_toastContainer\\">\\n  {#each items as item (item.id)}\\n    <li\\n      class={item.classes?.join(' ')}\\n      in:fly={item.intro}\\n      out:fade\\n      animate:flip={{ duration: 200 }}\\n      style={getCss(item.theme)}\\n    >\\n      <ToastItem {item} />\\n    </li>\\n  {/each}\\n</ul>\\n\\n<style>\\n._toastContainer {\\n  top: var(--toastContainerTop, 1.5rem);\\n  right: var(--toastContainerRight, 2rem);\\n  bottom: var(--toastContainerBottom, auto);\\n  left: var(--toastContainerLeft, auto);\\n  position: fixed;\\n  margin: 0;\\n  padding: 0;\\n  list-style-type: none;\\n  pointer-events: none;\\n  z-index: var(--toastContainerZIndex, 9999);\\n}\\n</style>\\n"],"names":[],"mappings":"AAuCA,8BAAiB,CACf,GAAG,CAAE,IAAI,mBAAmB,CAAC,OAAO,CAAC,CACrC,KAAK,CAAE,IAAI,qBAAqB,CAAC,KAAK,CAAC,CACvC,MAAM,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAAC,CACzC,IAAI,CAAE,IAAI,oBAAoB,CAAC,KAAK,CAAC,CACrC,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,IAAI,CACrB,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,IAAI,sBAAsB,CAAC,KAAK,CAC3C"}`
};
function getCss(theme) {
  return theme ? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "") : void 0;
}
const SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  let { options = {} } = $$props;
  let { target = "default" } = $$props;
  let items = [];
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
  $$result.css.add(css);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="_toastContainer svelte-yh90az">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes?.join(" ")), true) + " svelte-yh90az"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})} </li>`;
  })} </ul>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const options = {};
  return `${validate_component(SvelteToast, "SvelteToast").$$render($$result, { options }, {}, {})}  <div class="min-h-screen h-full">${slots.default ? slots.default({}) : ``}</div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-B-1FKZky.js.map
