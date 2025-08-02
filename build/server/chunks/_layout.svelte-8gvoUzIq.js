import { c as create_ssr_component, v as validate_component, a as subscribe, e as each, b as add_attribute, d as escape, n as null_to_empty, o as onDestroy, m as missing_component, f as assign, i as identity, g as noop } from './ssr-DD2Fi2eU.js';
import { w as writable } from './index-BLxZcfXI.js';

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
const css$2 = {
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
  $$result.css.add(css$2);
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
const css$1 = {
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
  $$result.css.add(css$1);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="_toastContainer svelte-yh90az">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes?.join(" ")), true) + " svelte-yh90az"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})} </li>`;
  })} </ul>`;
});
const css = {
  code: '@font-face{font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(fonts/KaTeX_AMS-Regular.woff2) format("woff2"),url(fonts/KaTeX_AMS-Regular.woff) format("woff"),url(fonts/KaTeX_AMS-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Bold.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Caligraphic-Regular.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Regular.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Fraktur-Bold.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Bold.woff) format("woff"),url(fonts/KaTeX_Fraktur-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Fraktur-Regular.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Regular.woff) format("woff"),url(fonts/KaTeX_Fraktur-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Main-Bold.woff2) format("woff2"),url(fonts/KaTeX_Main-Bold.woff) format("woff"),url(fonts/KaTeX_Main-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Main-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Main-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Main-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Main-Italic.woff2) format("woff2"),url(fonts/KaTeX_Main-Italic.woff) format("woff"),url(fonts/KaTeX_Main-Italic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Main-Regular.woff2) format("woff2"),url(fonts/KaTeX_Main-Regular.woff) format("woff"),url(fonts/KaTeX_Main-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Math-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Math-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Math-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Math-Italic.woff2) format("woff2"),url(fonts/KaTeX_Math-Italic.woff) format("woff"),url(fonts/KaTeX_Math-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:700;src:url(fonts/KaTeX_SansSerif-Bold.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Bold.woff) format("woff"),url(fonts/KaTeX_SansSerif-Bold.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:italic;font-weight:400;src:url(fonts/KaTeX_SansSerif-Italic.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Italic.woff) format("woff"),url(fonts/KaTeX_SansSerif-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:400;src:url(fonts/KaTeX_SansSerif-Regular.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Regular.woff) format("woff"),url(fonts/KaTeX_SansSerif-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Script-Regular.woff2) format("woff2"),url(fonts/KaTeX_Script-Regular.woff) format("woff"),url(fonts/KaTeX_Script-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size1-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size1-Regular.woff) format("woff"),url(fonts/KaTeX_Size1-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size2-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size2-Regular.woff) format("woff"),url(fonts/KaTeX_Size2-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size3-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size3-Regular.woff) format("woff"),url(fonts/KaTeX_Size3-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size4-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size4-Regular.woff) format("woff"),url(fonts/KaTeX_Size4-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Typewriter-Regular.woff2) format("woff2"),url(fonts/KaTeX_Typewriter-Regular.woff) format("woff"),url(fonts/KaTeX_Typewriter-Regular.ttf) format("truetype")}',
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["  \\n<style>/* === Theme: Royal Blue === */\\n.theme-royalBlue {\\n    --backgroundColor: #001f3f;\\n    --baseTextColor: #dfe6e9;\\n    --headingColor: #74b9ff;\\n    --bulletColor: #81ecec;\\n    --primaryColor: #00cec9;\\n    --secondaryColor: #0984e3;\\n    --borderColor: #003366;\\n    --shadowColor: rgba(0, 0, 50, 0.3);\\n    --fontHeading: \\"Palatino Linotype\\", serif;\\n    --fontBase: \\"Helvetica\\", sans-serif;\\n  }\\n/* === Theme: Neon Dark === */\\n.theme-neonDark {\\n    --backgroundColor: #0a0a0a;\\n    --baseTextColor: #39ff14;\\n    --headingColor: #f81ce5;\\n    --bulletColor: #00ffff;\\n    --primaryColor: #ff0090;\\n    --secondaryColor: #00ffcc;\\n    --borderColor: #222222;\\n    --shadowColor: rgba(255, 255, 255, 0.1);\\n    --fontHeading: \\"Courier New\\", monospace;\\n    --fontBase: \\"Lucida Console\\", monospace;\\n  }\\n/* === Theme: Dark === */\\n.theme-darkTheme {\\n    --backgroundColor: #121212;\\n    --baseTextColor: #e0e0e0;\\n    --headingColor: #ffffff;\\n    --bulletColor: #bbbbbb;\\n    --primaryColor: #00bcd4;\\n    --secondaryColor: #ff9800;\\n    --borderColor: #333333;\\n    --shadowColor: rgba(255, 255, 255, 0.05);\\n    --fontHeading: \\"Segoe UI\\", sans-serif;\\n    --fontBase: \\"Arial\\", sans-serif;\\n  }\\n/* === Theme: High Contrast === */\\n.theme-highContrast {\\n    --backgroundColor: #000000;\\n    --baseTextColor: #ffffff;\\n    --headingColor: #ffff00;\\n    --bulletColor: #ff00ff;\\n    --primaryColor: #00ffff;\\n    --secondaryColor: #ff0000;\\n    --borderColor: #ffffff;\\n    --shadowColor: rgba(255, 255, 255, 0.2);\\n    --fontHeading: \\"Impact\\", sans-serif;\\n    --fontBase: \\"Tahoma\\", sans-serif;\\n  }\\n/* === Theme: Pastel === */\\n.theme-pastel {\\n    --backgroundColor: #fef6f0;\\n    --baseTextColor: #6c5b7b;\\n    --headingColor: #355c7d;\\n    --bulletColor: #f67280;\\n    --primaryColor: #c06c84;\\n    --secondaryColor: #f8b195;\\n    --borderColor: #999999;\\n    --shadowColor: rgba(0, 0, 0, 0.05);\\n    --fontHeading: \\"Georgia\\", serif;\\n    --fontBase: \\"Verdana\\", sans-serif;\\n  }\\n/* === Utility Token Classes === */\\n.text-primary {\\n    color: var(--baseTextColor);\\n    font-family: var(--fontBase);\\n  }\\n.heading {\\n    color: var(--headingColor);\\n    font-family: var(--fontHeading);\\n  }\\n.bullet {\\n    color: var(--bulletColor);\\n    font-family: var(--fontBase);\\n  }\\n.border-accent {\\n    border-color: var(--borderColor);\\n  }\\n.bg-primary {\\n    background-color: var(--backgroundColor);\\n  }\\n@font-face{font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(fonts/KaTeX_AMS-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_AMS-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_AMS-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Caligraphic-Bold.woff) format(\\"woff\\"),url(fonts/KaTeX_Caligraphic-Bold.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Caligraphic-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Caligraphic-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Caligraphic-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Fraktur-Bold.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Fraktur-Bold.woff) format(\\"woff\\"),url(fonts/KaTeX_Fraktur-Bold.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Fraktur-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Fraktur-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Fraktur-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Main-Bold.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Main-Bold.woff) format(\\"woff\\"),url(fonts/KaTeX_Main-Bold.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Main-BoldItalic.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Main-BoldItalic.woff) format(\\"woff\\"),url(fonts/KaTeX_Main-BoldItalic.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Main-Italic.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Main-Italic.woff) format(\\"woff\\"),url(fonts/KaTeX_Main-Italic.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Main-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Main-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Main-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Math-BoldItalic.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Math-BoldItalic.woff) format(\\"woff\\"),url(fonts/KaTeX_Math-BoldItalic.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Math-Italic.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Math-Italic.woff) format(\\"woff\\"),url(fonts/KaTeX_Math-Italic.ttf) format(\\"truetype\\")}\\n@font-face{font-family:\\"KaTeX_SansSerif\\";font-style:normal;font-weight:700;src:url(fonts/KaTeX_SansSerif-Bold.woff2) format(\\"woff2\\"),url(fonts/KaTeX_SansSerif-Bold.woff) format(\\"woff\\"),url(fonts/KaTeX_SansSerif-Bold.ttf) format(\\"truetype\\")}\\n@font-face{font-family:\\"KaTeX_SansSerif\\";font-style:italic;font-weight:400;src:url(fonts/KaTeX_SansSerif-Italic.woff2) format(\\"woff2\\"),url(fonts/KaTeX_SansSerif-Italic.woff) format(\\"woff\\"),url(fonts/KaTeX_SansSerif-Italic.ttf) format(\\"truetype\\")}\\n@font-face{font-family:\\"KaTeX_SansSerif\\";font-style:normal;font-weight:400;src:url(fonts/KaTeX_SansSerif-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_SansSerif-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_SansSerif-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Script-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Script-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Script-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size1-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Size1-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Size1-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size2-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Size2-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Size2-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size3-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Size3-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Size3-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size4-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Size4-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Size4-Regular.ttf) format(\\"truetype\\")}\\n@font-face{font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Typewriter-Regular.woff2) format(\\"woff2\\"),url(fonts/KaTeX_Typewriter-Regular.woff) format(\\"woff\\"),url(fonts/KaTeX_Typewriter-Regular.ttf) format(\\"truetype\\")}\\n.katex{font:normal 1.21em KaTeX_Main,Times New Roman,serif;line-height:1.2;text-indent:0;text-rendering:auto}\\n.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}\\n.katex .katex-version:after{content:\\"0.16.22\\"}\\n.katex .katex-mathml{clip:rect(1px,1px,1px,1px);border:0;height:1px;overflow:hidden;padding:0;position:absolute;width:1px}\\n.katex .katex-html>.newline{display:block}\\n.katex .base{position:relative;white-space:nowrap;width:-moz-min-content;width:min-content}\\n.katex .base,.katex .strut{display:inline-block}\\n.katex .textbf{font-weight:700}\\n.katex .textit{font-style:italic}\\n.katex .textrm{font-family:KaTeX_Main}\\n.katex .textsf{font-family:KaTeX_SansSerif}\\n.katex .texttt{font-family:KaTeX_Typewriter}\\n.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}\\n.katex .mathit{font-family:KaTeX_Main;font-style:italic}\\n.katex .mathrm{font-style:normal}\\n.katex .mathbf{font-family:KaTeX_Main;font-weight:700}\\n.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}\\n.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}\\n.katex .mathcal{font-family:KaTeX_Caligraphic}\\n.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}\\n.katex .mathboldfrak,.katex .textboldfrak{font-family:KaTeX_Fraktur;font-weight:700}\\n.katex .mathtt{font-family:KaTeX_Typewriter}\\n.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}\\n.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}\\n.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}\\n.katex .mathitsf,.katex .mathsfit,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}\\n.katex .mainrm{font-family:KaTeX_Main;font-style:normal}\\n.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}\\n.katex .vlist-r{display:table-row}\\n.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}\\n.katex .vlist>span{display:block;height:0;position:relative}\\n.katex .vlist>span>span{display:inline-block}\\n.katex .vlist>span>.pstrut{overflow:hidden;width:0}\\n.katex .vlist-t2{margin-right:-2px}\\n.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}\\n.katex .vbox{align-items:baseline;display:inline-flex;flex-direction:column}\\n.katex .hbox{width:100%}\\n.katex .hbox,.katex .thinbox{display:inline-flex;flex-direction:row}\\n.katex .thinbox{max-width:0;width:0}\\n.katex .msupsub{text-align:left}\\n.katex .mfrac>span>span{text-align:center}\\n.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}\\n.katex .hdashline,.katex .hline,.katex .mfrac .frac-line,.katex .overline .overline-line,.katex .rule,.katex .underline .underline-line{min-height:1px}\\n.katex .mspace{display:inline-block}\\n.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}\\n.katex .clap>.inner,.katex .llap>.inner,.katex .rlap>.inner{position:absolute}\\n.katex .clap>.fix,.katex .llap>.fix,.katex .rlap>.fix{display:inline-block}\\n.katex .llap>.inner{right:0}\\n.katex .clap>.inner,.katex .rlap>.inner{left:0}\\n.katex .clap>.inner>span{margin-left:-50%;margin-right:50%}\\n.katex .rule{border:0 solid;display:inline-block;position:relative}\\n.katex .hline,.katex .overline .overline-line,.katex .underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}\\n.katex .hdashline{border-bottom-style:dashed;display:inline-block;width:100%}\\n.katex .sqrt>.root{margin-left:.2777777778em;margin-right:-.5555555556em}\\n.katex .fontsize-ensurer.reset-size1.size1,.katex .sizing.reset-size1.size1{font-size:1em}\\n.katex .fontsize-ensurer.reset-size1.size2,.katex .sizing.reset-size1.size2{font-size:1.2em}\\n.katex .fontsize-ensurer.reset-size1.size3,.katex .sizing.reset-size1.size3{font-size:1.4em}\\n.katex .fontsize-ensurer.reset-size1.size4,.katex .sizing.reset-size1.size4{font-size:1.6em}\\n.katex .fontsize-ensurer.reset-size1.size5,.katex .sizing.reset-size1.size5{font-size:1.8em}\\n.katex .fontsize-ensurer.reset-size1.size6,.katex .sizing.reset-size1.size6{font-size:2em}\\n.katex .fontsize-ensurer.reset-size1.size7,.katex .sizing.reset-size1.size7{font-size:2.4em}\\n.katex .fontsize-ensurer.reset-size1.size8,.katex .sizing.reset-size1.size8{font-size:2.88em}\\n.katex .fontsize-ensurer.reset-size1.size9,.katex .sizing.reset-size1.size9{font-size:3.456em}\\n.katex .fontsize-ensurer.reset-size1.size10,.katex .sizing.reset-size1.size10{font-size:4.148em}\\n.katex .fontsize-ensurer.reset-size1.size11,.katex .sizing.reset-size1.size11{font-size:4.976em}\\n.katex .fontsize-ensurer.reset-size2.size1,.katex .sizing.reset-size2.size1{font-size:.8333333333em}\\n.katex .fontsize-ensurer.reset-size2.size2,.katex .sizing.reset-size2.size2{font-size:1em}\\n.katex .fontsize-ensurer.reset-size2.size3,.katex .sizing.reset-size2.size3{font-size:1.1666666667em}\\n.katex .fontsize-ensurer.reset-size2.size4,.katex .sizing.reset-size2.size4{font-size:1.3333333333em}\\n.katex .fontsize-ensurer.reset-size2.size5,.katex .sizing.reset-size2.size5{font-size:1.5em}\\n.katex .fontsize-ensurer.reset-size2.size6,.katex .sizing.reset-size2.size6{font-size:1.6666666667em}\\n.katex .fontsize-ensurer.reset-size2.size7,.katex .sizing.reset-size2.size7{font-size:2em}\\n.katex .fontsize-ensurer.reset-size2.size8,.katex .sizing.reset-size2.size8{font-size:2.4em}\\n.katex .fontsize-ensurer.reset-size2.size9,.katex .sizing.reset-size2.size9{font-size:2.88em}\\n.katex .fontsize-ensurer.reset-size2.size10,.katex .sizing.reset-size2.size10{font-size:3.4566666667em}\\n.katex .fontsize-ensurer.reset-size2.size11,.katex .sizing.reset-size2.size11{font-size:4.1466666667em}\\n.katex .fontsize-ensurer.reset-size3.size1,.katex .sizing.reset-size3.size1{font-size:.7142857143em}\\n.katex .fontsize-ensurer.reset-size3.size2,.katex .sizing.reset-size3.size2{font-size:.8571428571em}\\n.katex .fontsize-ensurer.reset-size3.size3,.katex .sizing.reset-size3.size3{font-size:1em}\\n.katex .fontsize-ensurer.reset-size3.size4,.katex .sizing.reset-size3.size4{font-size:1.1428571429em}\\n.katex .fontsize-ensurer.reset-size3.size5,.katex .sizing.reset-size3.size5{font-size:1.2857142857em}\\n.katex .fontsize-ensurer.reset-size3.size6,.katex .sizing.reset-size3.size6{font-size:1.4285714286em}\\n.katex .fontsize-ensurer.reset-size3.size7,.katex .sizing.reset-size3.size7{font-size:1.7142857143em}\\n.katex .fontsize-ensurer.reset-size3.size8,.katex .sizing.reset-size3.size8{font-size:2.0571428571em}\\n.katex .fontsize-ensurer.reset-size3.size9,.katex .sizing.reset-size3.size9{font-size:2.4685714286em}\\n.katex .fontsize-ensurer.reset-size3.size10,.katex .sizing.reset-size3.size10{font-size:2.9628571429em}\\n.katex .fontsize-ensurer.reset-size3.size11,.katex .sizing.reset-size3.size11{font-size:3.5542857143em}\\n.katex .fontsize-ensurer.reset-size4.size1,.katex .sizing.reset-size4.size1{font-size:.625em}\\n.katex .fontsize-ensurer.reset-size4.size2,.katex .sizing.reset-size4.size2{font-size:.75em}\\n.katex .fontsize-ensurer.reset-size4.size3,.katex .sizing.reset-size4.size3{font-size:.875em}\\n.katex .fontsize-ensurer.reset-size4.size4,.katex .sizing.reset-size4.size4{font-size:1em}\\n.katex .fontsize-ensurer.reset-size4.size5,.katex .sizing.reset-size4.size5{font-size:1.125em}\\n.katex .fontsize-ensurer.reset-size4.size6,.katex .sizing.reset-size4.size6{font-size:1.25em}\\n.katex .fontsize-ensurer.reset-size4.size7,.katex .sizing.reset-size4.size7{font-size:1.5em}\\n.katex .fontsize-ensurer.reset-size4.size8,.katex .sizing.reset-size4.size8{font-size:1.8em}\\n.katex .fontsize-ensurer.reset-size4.size9,.katex .sizing.reset-size4.size9{font-size:2.16em}\\n.katex .fontsize-ensurer.reset-size4.size10,.katex .sizing.reset-size4.size10{font-size:2.5925em}\\n.katex .fontsize-ensurer.reset-size4.size11,.katex .sizing.reset-size4.size11{font-size:3.11em}\\n.katex .fontsize-ensurer.reset-size5.size1,.katex .sizing.reset-size5.size1{font-size:.5555555556em}\\n.katex .fontsize-ensurer.reset-size5.size2,.katex .sizing.reset-size5.size2{font-size:.6666666667em}\\n.katex .fontsize-ensurer.reset-size5.size3,.katex .sizing.reset-size5.size3{font-size:.7777777778em}\\n.katex .fontsize-ensurer.reset-size5.size4,.katex .sizing.reset-size5.size4{font-size:.8888888889em}\\n.katex .fontsize-ensurer.reset-size5.size5,.katex .sizing.reset-size5.size5{font-size:1em}\\n.katex .fontsize-ensurer.reset-size5.size6,.katex .sizing.reset-size5.size6{font-size:1.1111111111em}\\n.katex .fontsize-ensurer.reset-size5.size7,.katex .sizing.reset-size5.size7{font-size:1.3333333333em}\\n.katex .fontsize-ensurer.reset-size5.size8,.katex .sizing.reset-size5.size8{font-size:1.6em}\\n.katex .fontsize-ensurer.reset-size5.size9,.katex .sizing.reset-size5.size9{font-size:1.92em}\\n.katex .fontsize-ensurer.reset-size5.size10,.katex .sizing.reset-size5.size10{font-size:2.3044444444em}\\n.katex .fontsize-ensurer.reset-size5.size11,.katex .sizing.reset-size5.size11{font-size:2.7644444444em}\\n.katex .fontsize-ensurer.reset-size6.size1,.katex .sizing.reset-size6.size1{font-size:.5em}\\n.katex .fontsize-ensurer.reset-size6.size2,.katex .sizing.reset-size6.size2{font-size:.6em}\\n.katex .fontsize-ensurer.reset-size6.size3,.katex .sizing.reset-size6.size3{font-size:.7em}\\n.katex .fontsize-ensurer.reset-size6.size4,.katex .sizing.reset-size6.size4{font-size:.8em}\\n.katex .fontsize-ensurer.reset-size6.size5,.katex .sizing.reset-size6.size5{font-size:.9em}\\n.katex .fontsize-ensurer.reset-size6.size6,.katex .sizing.reset-size6.size6{font-size:1em}\\n.katex .fontsize-ensurer.reset-size6.size7,.katex .sizing.reset-size6.size7{font-size:1.2em}\\n.katex .fontsize-ensurer.reset-size6.size8,.katex .sizing.reset-size6.size8{font-size:1.44em}\\n.katex .fontsize-ensurer.reset-size6.size9,.katex .sizing.reset-size6.size9{font-size:1.728em}\\n.katex .fontsize-ensurer.reset-size6.size10,.katex .sizing.reset-size6.size10{font-size:2.074em}\\n.katex .fontsize-ensurer.reset-size6.size11,.katex .sizing.reset-size6.size11{font-size:2.488em}\\n.katex .fontsize-ensurer.reset-size7.size1,.katex .sizing.reset-size7.size1{font-size:.4166666667em}\\n.katex .fontsize-ensurer.reset-size7.size2,.katex .sizing.reset-size7.size2{font-size:.5em}\\n.katex .fontsize-ensurer.reset-size7.size3,.katex .sizing.reset-size7.size3{font-size:.5833333333em}\\n.katex .fontsize-ensurer.reset-size7.size4,.katex .sizing.reset-size7.size4{font-size:.6666666667em}\\n.katex .fontsize-ensurer.reset-size7.size5,.katex .sizing.reset-size7.size5{font-size:.75em}\\n.katex .fontsize-ensurer.reset-size7.size6,.katex .sizing.reset-size7.size6{font-size:.8333333333em}\\n.katex .fontsize-ensurer.reset-size7.size7,.katex .sizing.reset-size7.size7{font-size:1em}\\n.katex .fontsize-ensurer.reset-size7.size8,.katex .sizing.reset-size7.size8{font-size:1.2em}\\n.katex .fontsize-ensurer.reset-size7.size9,.katex .sizing.reset-size7.size9{font-size:1.44em}\\n.katex .fontsize-ensurer.reset-size7.size10,.katex .sizing.reset-size7.size10{font-size:1.7283333333em}\\n.katex .fontsize-ensurer.reset-size7.size11,.katex .sizing.reset-size7.size11{font-size:2.0733333333em}\\n.katex .fontsize-ensurer.reset-size8.size1,.katex .sizing.reset-size8.size1{font-size:.3472222222em}\\n.katex .fontsize-ensurer.reset-size8.size2,.katex .sizing.reset-size8.size2{font-size:.4166666667em}\\n.katex .fontsize-ensurer.reset-size8.size3,.katex .sizing.reset-size8.size3{font-size:.4861111111em}\\n.katex .fontsize-ensurer.reset-size8.size4,.katex .sizing.reset-size8.size4{font-size:.5555555556em}\\n.katex .fontsize-ensurer.reset-size8.size5,.katex .sizing.reset-size8.size5{font-size:.625em}\\n.katex .fontsize-ensurer.reset-size8.size6,.katex .sizing.reset-size8.size6{font-size:.6944444444em}\\n.katex .fontsize-ensurer.reset-size8.size7,.katex .sizing.reset-size8.size7{font-size:.8333333333em}\\n.katex .fontsize-ensurer.reset-size8.size8,.katex .sizing.reset-size8.size8{font-size:1em}\\n.katex .fontsize-ensurer.reset-size8.size9,.katex .sizing.reset-size8.size9{font-size:1.2em}\\n.katex .fontsize-ensurer.reset-size8.size10,.katex .sizing.reset-size8.size10{font-size:1.4402777778em}\\n.katex .fontsize-ensurer.reset-size8.size11,.katex .sizing.reset-size8.size11{font-size:1.7277777778em}\\n.katex .fontsize-ensurer.reset-size9.size1,.katex .sizing.reset-size9.size1{font-size:.2893518519em}\\n.katex .fontsize-ensurer.reset-size9.size2,.katex .sizing.reset-size9.size2{font-size:.3472222222em}\\n.katex .fontsize-ensurer.reset-size9.size3,.katex .sizing.reset-size9.size3{font-size:.4050925926em}\\n.katex .fontsize-ensurer.reset-size9.size4,.katex .sizing.reset-size9.size4{font-size:.462962963em}\\n.katex .fontsize-ensurer.reset-size9.size5,.katex .sizing.reset-size9.size5{font-size:.5208333333em}\\n.katex .fontsize-ensurer.reset-size9.size6,.katex .sizing.reset-size9.size6{font-size:.5787037037em}\\n.katex .fontsize-ensurer.reset-size9.size7,.katex .sizing.reset-size9.size7{font-size:.6944444444em}\\n.katex .fontsize-ensurer.reset-size9.size8,.katex .sizing.reset-size9.size8{font-size:.8333333333em}\\n.katex .fontsize-ensurer.reset-size9.size9,.katex .sizing.reset-size9.size9{font-size:1em}\\n.katex .fontsize-ensurer.reset-size9.size10,.katex .sizing.reset-size9.size10{font-size:1.2002314815em}\\n.katex .fontsize-ensurer.reset-size9.size11,.katex .sizing.reset-size9.size11{font-size:1.4398148148em}\\n.katex .fontsize-ensurer.reset-size10.size1,.katex .sizing.reset-size10.size1{font-size:.2410800386em}\\n.katex .fontsize-ensurer.reset-size10.size2,.katex .sizing.reset-size10.size2{font-size:.2892960463em}\\n.katex .fontsize-ensurer.reset-size10.size3,.katex .sizing.reset-size10.size3{font-size:.337512054em}\\n.katex .fontsize-ensurer.reset-size10.size4,.katex .sizing.reset-size10.size4{font-size:.3857280617em}\\n.katex .fontsize-ensurer.reset-size10.size5,.katex .sizing.reset-size10.size5{font-size:.4339440694em}\\n.katex .fontsize-ensurer.reset-size10.size6,.katex .sizing.reset-size10.size6{font-size:.4821600771em}\\n.katex .fontsize-ensurer.reset-size10.size7,.katex .sizing.reset-size10.size7{font-size:.5785920926em}\\n.katex .fontsize-ensurer.reset-size10.size8,.katex .sizing.reset-size10.size8{font-size:.6943105111em}\\n.katex .fontsize-ensurer.reset-size10.size9,.katex .sizing.reset-size10.size9{font-size:.8331726133em}\\n.katex .fontsize-ensurer.reset-size10.size10,.katex .sizing.reset-size10.size10{font-size:1em}\\n.katex .fontsize-ensurer.reset-size10.size11,.katex .sizing.reset-size10.size11{font-size:1.1996142719em}\\n.katex .fontsize-ensurer.reset-size11.size1,.katex .sizing.reset-size11.size1{font-size:.2009646302em}\\n.katex .fontsize-ensurer.reset-size11.size2,.katex .sizing.reset-size11.size2{font-size:.2411575563em}\\n.katex .fontsize-ensurer.reset-size11.size3,.katex .sizing.reset-size11.size3{font-size:.2813504823em}\\n.katex .fontsize-ensurer.reset-size11.size4,.katex .sizing.reset-size11.size4{font-size:.3215434084em}\\n.katex .fontsize-ensurer.reset-size11.size5,.katex .sizing.reset-size11.size5{font-size:.3617363344em}\\n.katex .fontsize-ensurer.reset-size11.size6,.katex .sizing.reset-size11.size6{font-size:.4019292605em}\\n.katex .fontsize-ensurer.reset-size11.size7,.katex .sizing.reset-size11.size7{font-size:.4823151125em}\\n.katex .fontsize-ensurer.reset-size11.size8,.katex .sizing.reset-size11.size8{font-size:.578778135em}\\n.katex .fontsize-ensurer.reset-size11.size9,.katex .sizing.reset-size11.size9{font-size:.6945337621em}\\n.katex .fontsize-ensurer.reset-size11.size10,.katex .sizing.reset-size11.size10{font-size:.8336012862em}\\n.katex .fontsize-ensurer.reset-size11.size11,.katex .sizing.reset-size11.size11{font-size:1em}\\n.katex .delimsizing.size1{font-family:KaTeX_Size1}\\n.katex .delimsizing.size2{font-family:KaTeX_Size2}\\n.katex .delimsizing.size3{font-family:KaTeX_Size3}\\n.katex .delimsizing.size4{font-family:KaTeX_Size4}\\n.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}\\n.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}\\n.katex .nulldelimiter{display:inline-block;width:.12em}\\n.katex .delimcenter,.katex .op-symbol{position:relative}\\n.katex .op-symbol.small-op{font-family:KaTeX_Size1}\\n.katex .op-symbol.large-op{font-family:KaTeX_Size2}\\n.katex .accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}\\n.katex .accent .accent-body{position:relative}\\n.katex .accent .accent-body:not(.accent-full){width:0}\\n.katex .overlay{display:block}\\n.katex .mtable .vertical-separator{display:inline-block;min-width:1px}\\n.katex .mtable .arraycolsep{display:inline-block}\\n.katex .mtable .col-align-c>.vlist-t{text-align:center}\\n.katex .mtable .col-align-l>.vlist-t{text-align:left}\\n.katex .mtable .col-align-r>.vlist-t{text-align:right}\\n.katex .svg-align{text-align:left}\\n.katex svg{fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;display:block;height:inherit;position:absolute;width:100%}\\n.katex svg path{stroke:none}\\n.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}\\n.katex .stretchy{display:block;overflow:hidden;position:relative;width:100%}\\n.katex .stretchy:after,.katex .stretchy:before{content:\\"\\"}\\n.katex .hide-tail{overflow:hidden;position:relative;width:100%}\\n.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}\\n.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}\\n.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}\\n.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}\\n.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}\\n.katex .x-arrow-pad{padding:0 .5em}\\n.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}\\n.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}\\n.katex .boxpad{padding:0 .3em}\\n.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}\\n.katex .cancel-pad{padding:0 .2em}\\n.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}\\n.katex .sout{border-bottom-style:solid;border-bottom-width:.08em}\\n.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}\\n.katex .anglpad{padding:0 .03889em}\\n.katex .eqn-num:before{content:\\"(\\" counter(katexEqnNo) \\")\\";counter-increment:katexEqnNo}\\n.katex .mml-eqn-num:before{content:\\"(\\" counter(mmlEqnNo) \\")\\";counter-increment:mmlEqnNo}\\n.katex .mtr-glue{width:50%}\\n.katex .cd-vert-arrow{display:inline-block;position:relative}\\n.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}\\n.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}\\n.katex-display{display:block;margin:1em 0;text-align:center}\\n.katex-display>.katex{display:block;text-align:center;white-space:nowrap}\\n.katex-display>.katex>.katex-html{display:block;position:relative}\\n.katex-display>.katex>.katex-html>.tag{position:absolute;right:0}\\n.katex-display.leqno>.katex>.katex-html>.tag{left:0;right:auto}\\n.katex-display.fleqn>.katex{padding-left:2em;text-align:left}\\nbody{counter-reset:katexEqnNo mmlEqnNo}\\n\\n</style>\\n\\n\\n<script>\\n  \\n  import \\"../app.css\\";\\n  import { SvelteToast } from '@zerodevx/svelte-toast'\\n   const options = {}\\n\\n\\n\\n<\/script>\\n\\n<SvelteToast {options} />\\n<!-- <slot/> -->\\n\\n<div class=\\" min-h-screen h-full\\">\\n  <slot></slot>\\n  </div>"],"names":[],"mappings":"AAqFA,UAAU,CAAC,YAAY,SAAS,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,kCAAkC,CAAC,OAAO,OAAO,CAAC,CAAC,iCAAiC,CAAC,OAAO,MAAM,CAAC,CAAC,gCAAgC,CAAC,OAAO,UAAU,CAAC,CAC9N,UAAU,CAAC,YAAY,iBAAiB,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,uCAAuC,CAAC,OAAO,OAAO,CAAC,CAAC,sCAAsC,CAAC,OAAO,MAAM,CAAC,CAAC,qCAAqC,CAAC,OAAO,UAAU,CAAC,CACrP,UAAU,CAAC,YAAY,iBAAiB,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,0CAA0C,CAAC,OAAO,OAAO,CAAC,CAAC,yCAAyC,CAAC,OAAO,MAAM,CAAC,CAAC,wCAAwC,CAAC,OAAO,UAAU,CAAC,CAC9P,UAAU,CAAC,YAAY,aAAa,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,mCAAmC,CAAC,OAAO,OAAO,CAAC,CAAC,kCAAkC,CAAC,OAAO,MAAM,CAAC,CAAC,iCAAiC,CAAC,OAAO,UAAU,CAAC,CACrO,UAAU,CAAC,YAAY,aAAa,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,sCAAsC,CAAC,OAAO,OAAO,CAAC,CAAC,qCAAqC,CAAC,OAAO,MAAM,CAAC,CAAC,oCAAoC,CAAC,OAAO,UAAU,CAAC,CAC9O,UAAU,CAAC,YAAY,UAAU,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,gCAAgC,CAAC,OAAO,OAAO,CAAC,CAAC,+BAA+B,CAAC,OAAO,MAAM,CAAC,CAAC,8BAA8B,CAAC,OAAO,UAAU,CAAC,CACzN,UAAU,CAAC,YAAY,UAAU,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,sCAAsC,CAAC,OAAO,OAAO,CAAC,CAAC,qCAAqC,CAAC,OAAO,MAAM,CAAC,CAAC,oCAAoC,CAAC,OAAO,UAAU,CAAC,CAC3O,UAAU,CAAC,YAAY,UAAU,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,kCAAkC,CAAC,OAAO,OAAO,CAAC,CAAC,iCAAiC,CAAC,OAAO,MAAM,CAAC,CAAC,gCAAgC,CAAC,OAAO,UAAU,CAAC,CAC/N,UAAU,CAAC,YAAY,UAAU,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,mCAAmC,CAAC,OAAO,OAAO,CAAC,CAAC,kCAAkC,CAAC,OAAO,MAAM,CAAC,CAAC,iCAAiC,CAAC,OAAO,UAAU,CAAC,CAClO,UAAU,CAAC,YAAY,UAAU,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,sCAAsC,CAAC,OAAO,OAAO,CAAC,CAAC,qCAAqC,CAAC,OAAO,MAAM,CAAC,CAAC,oCAAoC,CAAC,OAAO,UAAU,CAAC,CAC3O,UAAU,CAAC,YAAY,UAAU,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,kCAAkC,CAAC,OAAO,OAAO,CAAC,CAAC,iCAAiC,CAAC,OAAO,MAAM,CAAC,CAAC,gCAAgC,CAAC,OAAO,UAAU,CAAC,CAC/N,UAAU,CAAC,YAAY,iBAAiB,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,qCAAqC,CAAC,OAAO,OAAO,CAAC,CAAC,oCAAoC,CAAC,OAAO,MAAM,CAAC,CAAC,mCAAmC,CAAC,OAAO,UAAU,CAAC,CAC/O,UAAU,CAAC,YAAY,iBAAiB,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,uCAAuC,CAAC,OAAO,OAAO,CAAC,CAAC,sCAAsC,CAAC,OAAO,MAAM,CAAC,CAAC,qCAAqC,CAAC,OAAO,UAAU,CAAC,CACrP,UAAU,CAAC,YAAY,iBAAiB,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,wCAAwC,CAAC,OAAO,OAAO,CAAC,CAAC,uCAAuC,CAAC,OAAO,MAAM,CAAC,CAAC,sCAAsC,CAAC,OAAO,UAAU,CAAC,CACxP,UAAU,CAAC,YAAY,YAAY,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,qCAAqC,CAAC,OAAO,OAAO,CAAC,CAAC,oCAAoC,CAAC,OAAO,MAAM,CAAC,CAAC,mCAAmC,CAAC,OAAO,UAAU,CAAC,CAC1O,UAAU,CAAC,YAAY,WAAW,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,oCAAoC,CAAC,OAAO,OAAO,CAAC,CAAC,mCAAmC,CAAC,OAAO,MAAM,CAAC,CAAC,kCAAkC,CAAC,OAAO,UAAU,CAAC,CACtO,UAAU,CAAC,YAAY,WAAW,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,oCAAoC,CAAC,OAAO,OAAO,CAAC,CAAC,mCAAmC,CAAC,OAAO,MAAM,CAAC,CAAC,kCAAkC,CAAC,OAAO,UAAU,CAAC,CACtO,UAAU,CAAC,YAAY,WAAW,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,oCAAoC,CAAC,OAAO,OAAO,CAAC,CAAC,mCAAmC,CAAC,OAAO,MAAM,CAAC,CAAC,kCAAkC,CAAC,OAAO,UAAU,CAAC,CACtO,UAAU,CAAC,YAAY,WAAW,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,oCAAoC,CAAC,OAAO,OAAO,CAAC,CAAC,mCAAmC,CAAC,OAAO,MAAM,CAAC,CAAC,kCAAkC,CAAC,OAAO,UAAU,CAAC,CACtO,UAAU,CAAC,YAAY,gBAAgB,CAAC,WAAW,MAAM,CAAC,YAAY,GAAG,CAAC,IAAI,yCAAyC,CAAC,OAAO,OAAO,CAAC,CAAC,wCAAwC,CAAC,OAAO,MAAM,CAAC,CAAC,uCAAuC,CAAC,OAAO,UAAU,CAAC"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const options = {};
  $$result.css.add(css);
  return `${validate_component(SvelteToast, "SvelteToast").$$render($$result, { options }, {}, {})}  <div class="min-h-screen h-full">${slots.default ? slots.default({}) : ``}</div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-8gvoUzIq.js.map
