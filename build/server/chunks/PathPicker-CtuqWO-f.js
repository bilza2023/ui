import { c as create_ssr_component, d as each, e as escape, f as add_attribute } from './ssr-CO7PFcwR.js';
import { l as listTcodes, g as getChapters, a as getExercises, c as chapterNo } from './synopsisServices-C-26dl2-.js';

const css = {
  code: ".pp-grid.svelte-1mgcx14{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width: 900px){.pp-grid.svelte-1mgcx14{grid-template-columns:1fr}}.pp-field.svelte-1mgcx14{display:grid;gap:8px}label.svelte-1mgcx14{font-weight:600;font-size:14px}.req.svelte-1mgcx14{color:#e33;margin-left:4px}select.svelte-1mgcx14{padding:10px 12px;border:1px solid #333;border-radius:12px;background:#111;color:#eee;outline:none}.hint.svelte-1mgcx14{color:#9aa;font-size:12px}",
  map: `{"version":3,"file":"PathPicker.svelte","sources":["PathPicker.svelte"],"sourcesContent":["<script>\\n    import {\\n      listTcodes,\\n      getChapters,\\n      getExercises,\\n      chapterNo\\n    } from '../services/synopsisServices';\\n  \\n    // parent binds this: { tcode, chapterSlug, chapterNo, exerciseSlug }\\n    export let value = { tcode: '', chapterSlug: '', chapterNo: null, exerciseSlug: '' };\\n    export let disabled = false;\\n    export let required = true;\\n  \\n    let tcodes = [];\\n    let chapters = [];\\n    let exercises = [];\\n  \\n    // load tcodes once (sync, no DB)\\n    $: tcodes = listTcodes();\\n  \\n    // when tcode changes → refresh chapters; reset chapter/exercise if invalid\\n    $: {\\n      chapters = value.tcode ? getChapters(value.tcode) : [];\\n      if (!chapters.find(c => c.filename === value.chapterSlug)) {\\n        value.chapterSlug = '';\\n        value.chapterNo = null;\\n      }\\n    }\\n  \\n    // when chapter changes → refresh exercises; compute chapterNo; reset exercise if invalid\\n    $: {\\n      exercises = (value.tcode && value.chapterSlug) ? getExercises(value.tcode, value.chapterSlug) : [];\\n      value.chapterNo = (value.tcode && value.chapterSlug) ? chapterNo(value.tcode, value.chapterSlug) : null;\\n      if (!exercises.find(e => e.filename === value.exerciseSlug)) {\\n        value.exerciseSlug = '';\\n      }\\n    }\\n  <\/script>\\n  \\n  <div class=\\"pp-grid\\">\\n    <div class=\\"pp-field\\">\\n      <label>Tcode{#if required}<span class=\\"req\\">*</span>{/if}</label>\\n      <select bind:value={value.tcode} disabled={disabled} required={required}>\\n        <option value=\\"\\" disabled selected hidden>— Select tcode —</option>\\n        {#each tcodes as t}\\n          <option value={t.tcodeName}>{t.tcodeName}</option>\\n        {/each}\\n      </select>\\n    </div>\\n  \\n    <div class=\\"pp-field\\">\\n      <label>Chapter{#if required}<span class=\\"req\\">*</span>{/if}</label>\\n      <select\\n        bind:value={value.chapterSlug}\\n        disabled={disabled || !value.tcode || !chapters.length}\\n        required={required}\\n      >\\n        <option value=\\"\\" disabled selected hidden>— Select chapter —</option>\\n        {#each chapters as ch}\\n          <option value={ch.filename}>{ch.name}</option>\\n        {/each}\\n      </select>\\n      {#if value.chapterNo !== null}\\n        <small class=\\"hint\\">Chapter # {value.chapterNo}</small>\\n      {/if}\\n    </div>\\n  \\n    <div class=\\"pp-field\\">\\n      <label>Exercise{#if required}<span class=\\"req\\">*</span>{/if}</label>\\n      <select\\n        bind:value={value.exerciseSlug}\\n        disabled={disabled || !value.chapterSlug || !exercises.length}\\n        required={required}\\n      >\\n        <option value=\\"\\" disabled selected hidden>— Select exercise —</option>\\n        {#each exercises as ex}\\n          <option value={ex.filename}>{ex.name}</option>\\n        {/each}\\n      </select>\\n    </div>\\n  </div>\\n  \\n  <style>\\n    .pp-grid { display:grid; grid-template-columns: repeat(3,1fr); gap:16px; }\\n    @media (max-width: 900px){ .pp-grid{ grid-template-columns:1fr; } }\\n    .pp-field{ display:grid; gap:8px; }\\n    label{ font-weight:600; font-size:14px; }\\n    .req{ color:#e33; margin-left:4px; }\\n    select{\\n      padding:10px 12px; border:1px solid #333; border-radius:12px;\\n      background:#111; color:#eee; outline:none;\\n    }\\n    .hint{ color:#9aa; font-size:12px; }\\n  </style>\\n  "],"names":[],"mappings":"AAmFI,uBAAS,CAAE,QAAQ,IAAI,CAAE,qBAAqB,CAAE,OAAO,CAAC,CAAC,GAAG,CAAC,CAAE,IAAI,IAAM,CACzE,MAAO,YAAY,KAAK,CAAC,CAAE,uBAAQ,CAAE,sBAAsB,GAAK,CAAE,CAClE,wBAAS,CAAE,QAAQ,IAAI,CAAE,IAAI,GAAK,CAClC,oBAAK,CAAE,YAAY,GAAG,CAAE,UAAU,IAAM,CACxC,mBAAI,CAAE,MAAM,IAAI,CAAE,YAAY,GAAK,CACnC,qBAAM,CACJ,QAAQ,IAAI,CAAC,IAAI,CAAE,OAAO,GAAG,CAAC,KAAK,CAAC,IAAI,CAAE,cAAc,IAAI,CAC5D,WAAW,IAAI,CAAE,MAAM,IAAI,CAAE,QAAQ,IACvC,CACA,oBAAK,CAAE,MAAM,IAAI,CAAE,UAAU,IAAM"}`
};
const PathPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = {
    tcode: "",
    chapterSlug: "",
    chapterNo: null,
    exerciseSlug: ""
  } } = $$props;
  let { disabled = false } = $$props;
  let { required = true } = $$props;
  let tcodes = [];
  let chapters = [];
  let exercises = [];
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  $$result.css.add(css);
  tcodes = listTcodes();
  {
    {
      chapters = value.tcode ? getChapters(value.tcode) : [];
      if (!chapters.find((c) => c.filename === value.chapterSlug)) {
        value.chapterSlug = "";
        value.chapterNo = null;
      }
    }
  }
  {
    {
      exercises = value.tcode && value.chapterSlug ? getExercises(value.tcode, value.chapterSlug) : [];
      value.chapterNo = value.tcode && value.chapterSlug ? chapterNo(value.tcode, value.chapterSlug) : null;
      if (!exercises.find((e) => e.filename === value.exerciseSlug)) {
        value.exerciseSlug = "";
      }
    }
  }
  return `<div class="pp-grid svelte-1mgcx14"><div class="pp-field svelte-1mgcx14"><label class="svelte-1mgcx14">Tcode${required ? `<span class="req svelte-1mgcx14" data-svelte-h="svelte-11pvnzz">*</span>` : ``}</label> <select ${disabled ? "disabled" : ""} ${required ? "required" : ""} class="svelte-1mgcx14"><option value="" disabled selected hidden data-svelte-h="svelte-x8hqf0">— Select tcode —</option>${each(tcodes, (t) => {
    return `<option${add_attribute("value", t.tcodeName, 0)}>${escape(t.tcodeName)}</option>`;
  })}</select></div> <div class="pp-field svelte-1mgcx14"><label class="svelte-1mgcx14">Chapter${required ? `<span class="req svelte-1mgcx14" data-svelte-h="svelte-11pvnzz">*</span>` : ``}</label> <select ${disabled || !value.tcode || !chapters.length ? "disabled" : ""} ${required ? "required" : ""} class="svelte-1mgcx14"><option value="" disabled selected hidden data-svelte-h="svelte-1if4kfc">— Select chapter —</option>${each(chapters, (ch) => {
    return `<option${add_attribute("value", ch.filename, 0)}>${escape(ch.name)}</option>`;
  })}</select> ${value.chapterNo !== null ? `<small class="hint svelte-1mgcx14">Chapter # ${escape(value.chapterNo)}</small>` : ``}</div> <div class="pp-field svelte-1mgcx14"><label class="svelte-1mgcx14">Exercise${required ? `<span class="req svelte-1mgcx14" data-svelte-h="svelte-11pvnzz">*</span>` : ``}</label> <select ${disabled || !value.chapterSlug || !exercises.length ? "disabled" : ""} ${required ? "required" : ""} class="svelte-1mgcx14"><option value="" disabled selected hidden data-svelte-h="svelte-1u8m99">— Select exercise —</option>${each(exercises, (ex) => {
    return `<option${add_attribute("value", ex.filename, 0)}>${escape(ex.name)}</option>`;
  })}</select></div> </div>`;
});

export { PathPicker as P };
//# sourceMappingURL=PathPicker-CtuqWO-f.js.map
