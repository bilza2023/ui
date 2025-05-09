import { c as create_ssr_component, v as validate_component, d as add_attribute, e as each, b as escape } from './ssr-BKqIka7n.js';
import './SvelteToast.svelte_svelte_type_style_lang-B7k2UuT-.js';
import './index-ClERLwKE.js';

const css$1 = {
  code: `.dropdown.svelte-1wiajq0{padding:8px 12px;border:1px solid #ccc;border-radius:4px;font-size:1rem;background-color:white;color:#333;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;background-size:16px;cursor:pointer}.dropdown.svelte-1wiajq0:focus{outline:none;border-color:#007bff;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.25)}`,
  map: null
};
const DD = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items } = $$props;
  let { selectedValue = null } = $$props;
  let { onSelect = (value) => {
  } } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.selectedValue === void 0 && $$bindings.selectedValue && selectedValue !== void 0)
    $$bindings.selectedValue(selectedValue);
  if ($$props.onSelect === void 0 && $$bindings.onSelect && onSelect !== void 0)
    $$bindings.onSelect(onSelect);
  $$result.css.add(css$1);
  return `<select class="dropdown svelte-1wiajq0"${add_attribute("value", selectedValue, 0)}><option${add_attribute("value", null, 0)} data-svelte-h="svelte-1nmfvxr">Select an item</option>${each(items, (item) => {
    return `<option${add_attribute("value", item, 0)}>${escape(item)}</option>`;
  })}</select>`;
});
const exerciseNumbersList = [
  "1.1",
  "1.2",
  "1.3",
  "2.1",
  "2.2",
  "2.3",
  "2.4",
  "2.5",
  "2.6",
  "3.1",
  "3.2",
  "3.3",
  "3.4",
  "4.1",
  "4.2",
  "4.3",
  "4.4",
  "4.5",
  "4.6",
  "4.7",
  "4.8",
  "5.1",
  "5.2",
  "5.3",
  "5.4",
  "6.1",
  "6.2",
  "6.3",
  "6.4",
  "6.5",
  "6.6",
  "7.1",
  "7.2",
  "8.1",
  "8.2",
  "8.3",
  "8.4",
  "9.1",
  "9.2",
  "9.3",
  "9.4",
  "9.5",
  "9.6",
  "9.7"
];
const css = {
  code: ".card-container.svelte-1qn49f5{display:flex;justify-content:center;flex-wrap:wrap;gap:16px}.card.svelte-1qn49f5{border:1px solid #ccc;border-radius:8px;overflow:hidden;box-shadow:0 2px 4px rgba(0, 0, 0, 0.1);width:300px}.card-header.svelte-1qn49f5{background-color:#f0f0f0;color:#333;padding:12px;text-align:center;font-weight:bold;border-bottom:1px solid #ccc}.load-button.svelte-1qn49f5{background-color:#007bff;color:white;padding:5px 80px;border:none;border-radius:5px;cursor:pointer;font-size:1rem;transition:background-color 0.3s ease}.load-button.svelte-1qn49f5:hover{background-color:#0056b3}.load-button.svelte-1qn49f5:focus{outline:none;box-shadow:0 0 0 0.2rem rgba(0, 123, 255, 0.5)}.load-button.svelte-1qn49f5:active{background-color:#004085}h1.svelte-1qn49f5{margin-top:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let exerciseItems = exerciseNumbersList;
  let exercise = "1.1";
  function setExercise(val) {
    exercise = val;
    console.log("exercise", exercise);
  }
  $$result.css.add(css);
  return `<div class="flex justify-center text-white pt-4 pb-4" data-svelte-h="svelte-1mr8du9"><h1 class="text-3xl border-2 border-white py-1 px-8 rounded-md  svelte-1qn49f5">Syllabus</h1></div>  <div class="flex gap-2 justify-center pt-5 pb-5 bg-slate-700">  <h1 class="text-white svelte-1qn49f5" data-svelte-h="svelte-1p3d5z2">Exercise</h1> ${validate_component(DD, "DD").$$render(
    $$result,
    {
      items: exerciseItems,
      selectedValue: exercise,
      onSelect: setExercise
    },
    {},
    {}
  )} <button class="load-button svelte-1qn49f5" data-svelte-h="svelte-1ecc9ze">Load</button></div>  <div class="p-4 bg-gray-800">${``} </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BlUM6wxi.js.map
