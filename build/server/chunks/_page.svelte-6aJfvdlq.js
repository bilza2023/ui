import { c as create_ssr_component, v as validate_component, e as escape } from './ssr-CO7PFcwR.js';
import { N as Nav } from './Nav-CIe9NOWg.js';
import { A as AdminNav } from './AdminNav-DPQi_ewN.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(AdminNav, "AdminNav").$$render($$result, {}, {}, {})} <h1 data-svelte-h="svelte-171lafx">Settings</h1> <form method="POST" enctype="multipart/form-data"><label class="btn">Upload Index Data
      <input name="index_json" type="file" accept=".json,application/json" required hidden></label></form> ${form?.ok ? `<p>✅ Saved ${escape(form.count)} items.</p>` : `${form?.error ? `<p style="color:#f66">❌ ${escape(form.error)}</p>` : ``}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-6aJfvdlq.js.map
