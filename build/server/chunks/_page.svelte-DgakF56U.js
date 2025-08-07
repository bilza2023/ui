import { c as create_ssr_component, v as validate_component, e as each, f as escape, d as add_attribute } from './ssr-BUN1JaxN.js';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';
import { N as Nav } from './Nav-ByhrJ9Gc.js';

const BetaWarning = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-yellow-500 border-l-4 border-yellow-500 text-yellow-800 p-4 mx-0 my-2 text-center rounded shadow-md text-md font-semibold mt-0" data-svelte-h="svelte-ybtape">🛠️ This App is in Beta Testing Mode.</div>`;
});
const css$4 = {
  code: `.button-container.svelte-jhu7dy{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;padding:0.75rem 1.25rem;background-color:#f9f9fb;border-radius:8px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.06);font-family:'Segoe UI', sans-serif;font-size:0.95rem}.btn.svelte-jhu7dy{background:transparent;border:none;cursor:pointer;padding:0.3rem 0.8rem;font-size:1.5rem;border-radius:16px;font-weight:500;font-style:italic;text-transform:capitalize;transition:background-color 0.2s ease;display:flex;align-items:center;gap:0.3rem}.btn.svelte-jhu7dy::after{content:"›";font-style:normal;margin-left:0.4rem;color:#aaa}.btn.svelte-jhu7dy:last-child::after{content:""}.btn.svelte-jhu7dy:hover{background-color:#e6e6f0}.chapter-btn.svelte-jhu7dy{color:#0056b3}.exercise-btn.svelte-jhu7dy{color:#1d7834}.question-btn.svelte-jhu7dy{color:#ffc107}`,
  map: `{"version":3,"file":"NavBar.svelte","sources":["NavBar.svelte"],"sourcesContent":["\\n<script>\\n  // renamed from fbise9physics → syllabus\\n  export let syllabus;\\n  export let selectedChapter;\\n  export let selectedExercise;\\n  export let unSelectCh;\\n  export let unSelectEx;\\n<\/script>\\n\\n<div class=\\"button-container\\">\\n  <button on:click={() => { unSelectCh(); unSelectEx(); }} class=\\"btn chapter-btn\\">\\n    {syllabus.tcodeName}:\\n  </button>\\n\\n  {#if selectedChapter}\\n    <button on:click={unSelectEx} class=\\"btn exercise-btn\\">\\n      Chapter › {selectedChapter.name}\\n    </button>\\n  {/if}\\n\\n  {#if selectedExercise}\\n    <button class=\\"btn question-btn\\">\\n      Exercise › {selectedExercise.name}\\n    </button>\\n  {/if}\\n</div>\\n\\n<style>\\n  .button-container {\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    flex-wrap: wrap;\\n    gap: 0.5rem;\\n    margin-bottom: 1rem;\\n    padding: 0.75rem 1.25rem;\\n    background-color: #f9f9fb;\\n    border-radius: 8px;\\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);\\n    font-family: 'Segoe UI', sans-serif;\\n    font-size: 0.95rem;\\n  }\\n\\n  .btn {\\n    background: transparent;\\n    border: none;\\n    cursor: pointer;\\n    padding: 0.3rem 0.8rem;\\n    font-size: 1.5rem;\\n    border-radius: 16px;\\n    font-weight: 500;\\n    font-style: italic;\\n    text-transform: capitalize;\\n    transition: background-color 0.2s ease;\\n    display: flex;\\n    align-items: center;\\n    gap: 0.3rem;\\n  }\\n\\n  .btn::after {\\n    content: \\"›\\";\\n    font-style: normal;\\n    margin-left: 0.4rem;\\n    color: #aaa;\\n  }\\n\\n  .btn:last-child::after {\\n    content: \\"\\";\\n  }\\n\\n  .btn:hover {\\n    background-color: #e6e6f0;\\n  }\\n\\n  .chapter-btn {\\n    color: #0056b3;\\n  }\\n\\n  .exercise-btn {\\n    color: #1d7834;\\n  }\\n\\n  .question-btn {\\n    color: #ffc107;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA6BE,+BAAkB,CAChB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,MAAM,CACX,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,OAAO,CAAC,OAAO,CACxB,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACzC,WAAW,CAAE,UAAU,CAAC,CAAC,UAAU,CACnC,SAAS,CAAE,OACb,CAEA,kBAAK,CACH,UAAU,CAAE,WAAW,CACvB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,MAAM,CAAC,MAAM,CACtB,SAAS,CAAE,MAAM,CACjB,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,UAAU,CAC1B,UAAU,CAAE,gBAAgB,CAAC,IAAI,CAAC,IAAI,CACtC,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,MACP,CAEA,kBAAI,OAAQ,CACV,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IACT,CAEA,kBAAI,WAAW,OAAQ,CACrB,OAAO,CAAE,EACX,CAEA,kBAAI,MAAO,CACT,gBAAgB,CAAE,OACpB,CAEA,0BAAa,CACX,KAAK,CAAE,OACT,CAEA,2BAAc,CACZ,KAAK,CAAE,OACT,CAEA,2BAAc,CACZ,KAAK,CAAE,OACT"}`
};
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { syllabus } = $$props;
  let { selectedChapter } = $$props;
  let { selectedExercise } = $$props;
  let { unSelectCh } = $$props;
  let { unSelectEx } = $$props;
  if ($$props.syllabus === void 0 && $$bindings.syllabus && syllabus !== void 0) $$bindings.syllabus(syllabus);
  if ($$props.selectedChapter === void 0 && $$bindings.selectedChapter && selectedChapter !== void 0) $$bindings.selectedChapter(selectedChapter);
  if ($$props.selectedExercise === void 0 && $$bindings.selectedExercise && selectedExercise !== void 0) $$bindings.selectedExercise(selectedExercise);
  if ($$props.unSelectCh === void 0 && $$bindings.unSelectCh && unSelectCh !== void 0) $$bindings.unSelectCh(unSelectCh);
  if ($$props.unSelectEx === void 0 && $$bindings.unSelectEx && unSelectEx !== void 0) $$bindings.unSelectEx(unSelectEx);
  $$result.css.add(css$4);
  return `<div class="button-container svelte-jhu7dy"><button class="btn chapter-btn svelte-jhu7dy">${escape(syllabus.tcodeName)}:</button> ${selectedChapter ? `<button class="btn exercise-btn svelte-jhu7dy">Chapter › ${escape(selectedChapter.name)}</button>` : ``} ${selectedExercise ? `<button class="btn question-btn svelte-jhu7dy">Exercise › ${escape(selectedExercise.name)}</button>` : ``} </div>`;
});
const css$3 = {
  code: ".card.svelte-g5urb7{width:240px;min-height:180px;background-color:#ffffff;border:2px solid var(--card-color);border-top:8px solid var(--card-color);padding:1.2rem 1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;transition:transform 0.15s ease, box-shadow 0.15s ease;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:sans-serif;text-align:center}.card.svelte-g5urb7:hover{transform:translateY(-4px);box-shadow:0 6px 16px rgba(0,0,0,0.12);background-color:#fdfdfd}.card-icon.svelte-g5urb7{font-size:3rem;margin-bottom:0.75rem;color:var(--card-color)}.card-title.svelte-g5urb7{font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}.card-desc.svelte-g5urb7{font-size:0.9rem;color:#555;opacity:0.85;margin-top:auto}",
  map: `{"version":3,"file":"Card.svelte","sources":["Card.svelte"],"sourcesContent":["<script>\\n  export let icon = \\"📘\\";\\n  export let title = \\"Untitled\\";\\n  export let description = \\"\\";\\n  export let color = \\"#007BFF\\";\\n<\/script>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<div class=\\"card\\" style=\\"--card-color: {color}\\" on:click>\\n  <div class=\\"card-icon\\">{icon}</div>\\n\\n  <div class=\\"card-title\\">\\n    {#if title}\\n      {title.slice(0, 20)}{title.length > 20 ? '…' : ''}\\n    {/if}\\n  </div>\\n  \\n  {#if description}\\n    <div class=\\"card-desc\\">{description}</div>\\n  {/if}\\n</div>\\n\\n<style>\\n.card {\\n  width: 240px;\\n  min-height: 180px;\\n  background-color: #ffffff;\\n  border: 2px solid var(--card-color);\\n  border-top: 8px solid var(--card-color);\\n  padding: 1.2rem 1rem;\\n  border-radius: 12px;\\n  box-shadow: 0 2px 6px rgba(0,0,0,0.06);\\n  cursor: pointer;\\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: space-between;\\n  font-family: sans-serif;\\n  text-align: center;\\n}\\n\\n.card:hover {\\n  transform: translateY(-4px);\\n  box-shadow: 0 6px 16px rgba(0,0,0,0.12);\\n  background-color: #fdfdfd;\\n}\\n\\n.card-icon {\\n  font-size: 3rem;\\n  margin-bottom: 0.75rem;\\n  color: var(--card-color);\\n}\\n\\n.card-title {\\n  font-size: 1.2rem;\\n  font-weight: 600;\\n  margin-bottom: 0.5rem;\\n}\\n\\n.card-desc {\\n  font-size: 0.9rem;\\n  color: #555;\\n  opacity: 0.85;\\n  margin-top: auto;\\n}\\n</style>\\n"],"names":[],"mappings":"AAwBA,mBAAM,CACJ,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,KAAK,CACjB,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACnC,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACvC,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACtC,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,UAAU,CAAC,KAAK,CAAC,IAAI,CACvD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,UAAU,CACvB,UAAU,CAAE,MACd,CAEA,mBAAK,MAAO,CACV,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACvC,gBAAgB,CAAE,OACpB,CAEA,wBAAW,CACT,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,OAAO,CACtB,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,yBAAY,CACV,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,MACjB,CAEA,wBAAW,CACT,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IACd"}`
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "📘" } = $$props;
  let { title = "Untitled" } = $$props;
  let { description = "" } = $$props;
  let { color = "#007BFF" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  $$result.css.add(css$3);
  return `  <div class="card svelte-g5urb7" style="${"--card-color: " + escape(color, true)}"><div class="card-icon svelte-g5urb7">${escape(icon)}</div> <div class="card-title svelte-g5urb7">${title ? `${escape(title.slice(0, 20))}${escape(title.length > 20 ? "…" : "")}` : ``}</div> ${description ? `<div class="card-desc svelte-g5urb7">${escape(description)}</div>` : ``} </div>`;
});
const css$2 = {
  code: ".card.svelte-ozmayb{width:240px;min-height:180px;background-color:#ffffff;border:2px solid var(--card-color);border-top:8px solid var(--card-color);padding:1.2rem 1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0, 0, 0, 0.06);cursor:pointer;transition:transform 0.15s ease,\n      box-shadow 0.15s ease;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:sans-serif;text-align:center}.card.svelte-ozmayb:hover{transform:translateY(-4px);box-shadow:0 6px 16px rgba(0, 0, 0, 0.12);background-color:#fdfdfd}.card-icon.svelte-ozmayb{font-size:3rem;margin-bottom:0.75rem;color:var(--card-color)}.card-title.svelte-ozmayb{font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}.card-desc.svelte-ozmayb{font-size:0.9rem;color:#555;opacity:0.85;margin-top:auto}",
  map: '{"version":3,"file":"CardChapters.svelte","sources":["CardChapters.svelte"],"sourcesContent":["<script>\\n  export let icon = \\"📘\\";\\n  export let title = \\"Untitled\\";\\n  export let description = \\"\\";\\n  export let color = \\"#007BFF\\";\\n<\/script>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<!-- svelte-ignore a11y-no-static-element-interactions -->\\n<div class=\\"card\\" style=\\"--card-color: {color}\\" on:click>     \\n  <div class=\\"card-icon\\">{icon}</div>\\n\\n  <div class=\\"card-title\\">\\n    {#if title}\\n      {title.slice(0, 20)}{title.length > 20 ? \\"…\\" : \\"\\"}\\n    {/if}\\n  </div>\\n\\n  {#if description}\\n    <div class=\\"card-desc\\">{description}</div>\\n  {/if}\\n</div>\\n\\n<style>\\n  .card {\\n    width: 240px;\\n    min-height: 180px;\\n    background-color: #ffffff;\\n    border: 2px solid var(--card-color);\\n    border-top: 8px solid var(--card-color);\\n    padding: 1.2rem 1rem;\\n    border-radius: 12px;\\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);\\n    cursor: pointer;\\n    transition:\\n      transform 0.15s ease,\\n      box-shadow 0.15s ease;\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    justify-content: space-between;\\n    font-family: sans-serif;\\n    text-align: center;\\n  }\\n\\n  .card:hover {\\n    transform: translateY(-4px);\\n    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\\n    background-color: #fdfdfd;\\n  }\\n\\n  .card-icon {\\n    font-size: 3rem;\\n    margin-bottom: 0.75rem;\\n    color: var(--card-color);\\n  }\\n\\n  .card-title {\\n    font-size: 1.2rem;\\n    font-weight: 600;\\n    margin-bottom: 0.5rem;\\n  }\\n\\n  .card-desc {\\n    font-size: 0.9rem;\\n    color: #555;\\n    opacity: 0.85;\\n    margin-top: auto;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAwBE,mBAAM,CACJ,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,KAAK,CACjB,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACnC,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACvC,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACzC,MAAM,CAAE,OAAO,CACf,UAAU,CACR,SAAS,CAAC,KAAK,CAAC,IAAI;AAC1B,MAAM,UAAU,CAAC,KAAK,CAAC,IAAI,CACvB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,UAAU,CACvB,UAAU,CAAE,MACd,CAEA,mBAAK,MAAO,CACV,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC1C,gBAAgB,CAAE,OACpB,CAEA,wBAAW,CACT,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,OAAO,CACtB,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,yBAAY,CACV,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,MACjB,CAEA,wBAAW,CACT,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IACd"}'
};
const CardChapters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "📘" } = $$props;
  let { title = "Untitled" } = $$props;
  let { description = "" } = $$props;
  let { color = "#007BFF" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  $$result.css.add(css$2);
  return `  <div class="card svelte-ozmayb" style="${"--card-color: " + escape(color, true)}"><div class="card-icon svelte-ozmayb">${escape(icon)}</div> <div class="card-title svelte-ozmayb">${title ? `${escape(title.slice(0, 20))}${escape(title.length > 20 ? "…" : "")}` : ``}</div> ${description ? `<div class="card-desc svelte-ozmayb">${escape(description)}</div>` : ``} </div>`;
});
const css$1 = {
  code: ".questions.svelte-1f8fdtp{padding:1rem;text-align:center}.question-cards.svelte-1f8fdtp{display:flex;flex-wrap:wrap;justify-content:center}.question-cards.svelte-1f8fdtp button{margin:0.5rem}",
  map: `{"version":3,"file":"QuestionCard.svelte","sources":["QuestionCard.svelte"],"sourcesContent":["<script>\\n  export let questions = [];\\n  export let selectedChapter;\\n  export let selectedExercise;\\n  import Card from './Card.svelte';\\n\\n  function shortFilename(q){\\n    return q.filename.length > 15\\n      ? q.filename.slice(0, 15) + '…'\\n      : q.filename.slice(0, 15);\\n  } \\n\\n<\/script>\\n\\n<main class=\\"questions\\">\\n<h5 class=\\"text-left   text-red-800   \\">Questions</h5>  \\n  {#if selectedExercise}\\n\\n    {#if questions.length}\\n      <div class=\\"question-cards\\">\\n        {#each questions as q}\\n\\n      <a\\n        href={\`/player?filename=\${q.filename}\`}\\n        class=\\"card-link\\"\\n        target=\\"_blank\\"\\n        rel=\\"noopener\\"\\n      >\\n          <Card title={q.name} \\n          description={shortFilename(q)}\\n          icon=\\"❓\\" />\\n      </a>\\n\\n        {/each}\\n      </div>\\n    {:else}\\n      <p>No questions available.</p>\\n    {/if}\\n  {:else}\\n    <p>Please select an exercise to view questions.</p>\\n  {/if}\\n</main>\\n\\n<style>\\n.questions {\\n  padding: 1rem;\\n  text-align: center;\\n}\\n.question-cards {\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: center;\\n}\\n.question-cards :global(button) {\\n  margin: 0.5rem;\\n}\\n</style>\\n"],"names":[],"mappings":"AA4CA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MACd,CACA,8BAAgB,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MACnB,CACA,8BAAe,CAAS,MAAQ,CAC9B,MAAM,CAAE,MACV"}`
};
function shortFilename(q) {
  return q.filename.length > 15 ? q.filename.slice(0, 15) + "…" : q.filename.slice(0, 15);
}
const QuestionCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { questions = [] } = $$props;
  let { selectedChapter } = $$props;
  let { selectedExercise } = $$props;
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0) $$bindings.questions(questions);
  if ($$props.selectedChapter === void 0 && $$bindings.selectedChapter && selectedChapter !== void 0) $$bindings.selectedChapter(selectedChapter);
  if ($$props.selectedExercise === void 0 && $$bindings.selectedExercise && selectedExercise !== void 0) $$bindings.selectedExercise(selectedExercise);
  $$result.css.add(css$1);
  return `<main class="questions svelte-1f8fdtp"><h5 class="text-left text-red-800 " data-svelte-h="svelte-1lkmx79">Questions</h5> ${selectedExercise ? `${questions.length ? `<div class="question-cards svelte-1f8fdtp">${each(questions, (q) => {
    return `<a${add_attribute("href", `/player?filename=${q.filename}`, 0)} class="card-link" target="_blank" rel="noopener">${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: q.name,
        description: shortFilename(q),
        icon: "❓"
      },
      {},
      {}
    )} </a>`;
  })}</div>` : `<p data-svelte-h="svelte-1sjg8k1">No questions available.</p>`}` : `<p data-svelte-h="svelte-11jaj4g">Please select an exercise to view questions.</p>`} </main>`;
});
const css = {
  code: ".view-container.svelte-124hnu0{text-align:center;margin-top:2rem}button.svelte-124hnu0{margin:0.5rem}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n  import { page } from '$app/stores';\\n  import { get } from 'svelte/store';\\n  import Nav from '$lib/appComps/Nav.svelte';\\n  import BetaWarning from '$lib/appComps/BetaWarning.svelte';\\n  import NavBar from './components/NavBar.svelte';\\n  import Card from './components/Card.svelte';\\n  import CardChapters from './components/CardChapters.svelte';\\n  import QuestionCard from './components/QuestionCard.svelte';\\n  // import { syllabusMap } from '../../lib/syllabus/syllabus_json';\\n  // import { syllabus as syllabusArray } from '../../lib/syllabus/syllabus';\\n  // console.log(\\"syllabusArray\\", syllabusArray);\\n  // will hold the current syllabus once we read the URL\\n  // let syllabus;\\n  let syllabus = [];\\n  // local UI state\\n  let selectedChapter  = null;\\n  let selectedExercise = null;\\n\\n  \\t/* ──────────────────────────────────────────────\\n\\t   ▼ 1-2.  reactive aliases used by markup\\n\\t─────────────────────────────────────────────── */\\n\\t$: selChapter  = selectedChapter;\\n\\t$: selExercise = selectedExercise;\\n\\n\\t/* ──────────────────────────────────────────────\\n\\t   ▼ 3-4.  event handlers wired to on:select\\n\\t─────────────────────────────────────────────── */\\n\\tfunction onChapter(e) {\\n\\t\\t/* LeftChaptersBar emits either the chapter object itself\\n\\t\\t   or e.detail.chapter — support both: */\\n\\t\\tselectedChapter  = e.detail?.chapter ?? e.detail;\\n\\t\\tselectedExercise = null;        // reset exercise when chapter changes\\n\\t}\\n\\n\\tfunction onExercise(e) {\\n\\t\\t/* ExNavBar emits either the exercise object or e.detail.exercise */\\n\\t\\tselectedExercise = e.detail?.exercise ?? e.detail;\\n\\t}\\n  \\n  onMount(async() => {\\n    const slug = get(page).url.searchParams.get('tcode') ?? 'fbise9physics';\\n    const res = await fetch('/data/syllabus.json');\\n    const res2 = await res.json();\\n    syllabus = res2.find(s => s.tcodeName === slug);\\n});\\n\\n  // derive lists only after syllabus is set\\n  $: chapters  = syllabus?.chapters  || [];\\n  $: exercises = selectedChapter\\n    ? chapters.find(ch => ch.filename === selectedChapter.filename)?.exercises || []\\n    : [];\\n  $: questions = selectedExercise?.questions || [];\\n\\n  function chooseChapter(ch) {\\n    selectedChapter  = ch;\\n    selectedExercise = null;\\n  }\\n  function chooseExercise(ex) {\\n    selectedExercise = ex;\\n  }\\n  function resetAll() {\\n    selectedChapter  = null;\\n    selectedExercise = null;\\n  }\\n  function unSelectCh() {\\n    selectedChapter  = null;\\n    selectedExercise = null;\\n  }\\n  function unSelectEx() {\\n    selectedExercise = null;\\n  }\\n<\/script>\\n\\n\\n<Nav />\\n<BetaWarning />\\n\\n{#if syllabus}\\n  <NavBar\\n    {syllabus}\\n    {selectedChapter}\\n    {selectedExercise}\\n    on:reset={resetAll}\\n    {unSelectCh}\\n    {unSelectEx}\\n  />\\n{/if}\\n\\n<div class=\\"view-container\\">\\n  {#if !selectedChapter}\\n    {#each chapters as ch}\\n      <button on:click={() => chooseChapter(ch)}>\\n        <CardChapters title={ch.name} description=\\"\\" icon=\\"📁\\" />\\n      </button>\\n    {/each}\\n\\n  {:else if selectedChapter && !selectedExercise}\\n    {#each exercises as ex}\\n      <button on:click={() => chooseExercise(ex)}>\\n        <!-- <h5 class=\\"text-left   text-red-800   \\">Exercises</h5> -->\\n        <Card title={ex.name} description=\\"\\" icon=\\"📂\\" />\\n      </button>\\n    {/each}\\n\\n  {:else if selectedChapter && selectedExercise}\\n      <QuestionCard\\n        {questions}\\n        {selectedChapter}\\n        {selectedExercise}\\n      />\\n  {/if}\\n</div>\\n\\n<style>\\n  .view-container {\\n    text-align: center;\\n    margin-top: 2rem;\\n  }\\n  button {\\n    margin: 0.5rem;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoHE,8BAAgB,CACd,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IACd,CACA,qBAAO,CACL,MAAM,CAAE,MACV"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chapters;
  let exercises;
  let questions;
  let syllabus = [];
  let selectedChapter = null;
  let selectedExercise = null;
  function unSelectCh() {
    selectedChapter = null;
    selectedExercise = null;
  }
  function unSelectEx() {
    selectedExercise = null;
  }
  $$result.css.add(css);
  chapters = syllabus?.chapters || [];
  exercises = selectedChapter ? chapters.find((ch) => ch.filename === selectedChapter.filename)?.exercises || [] : [];
  questions = selectedExercise?.questions || [];
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(BetaWarning, "BetaWarning").$$render($$result, {}, {}, {})} ${syllabus ? `${validate_component(NavBar, "NavBar").$$render(
    $$result,
    {
      syllabus,
      selectedChapter,
      selectedExercise,
      unSelectCh,
      unSelectEx
    },
    {},
    {}
  )}` : ``} <div class="view-container svelte-124hnu0">${!selectedChapter ? `${each(chapters, (ch) => {
    return `<button class="svelte-124hnu0">${validate_component(CardChapters, "CardChapters").$$render(
      $$result,
      {
        title: ch.name,
        description: "",
        icon: "📁"
      },
      {},
      {}
    )} </button>`;
  })}` : `${selectedChapter && !selectedExercise ? `${each(exercises, (ex) => {
    return `<button class="svelte-124hnu0"> ${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: ex.name,
        description: "",
        icon: "📂"
      },
      {},
      {}
    )} </button>`;
  })}` : `${selectedChapter && selectedExercise ? `${validate_component(QuestionCard, "QuestionCard").$$render(
    $$result,
    {
      questions,
      selectedChapter,
      selectedExercise
    },
    {},
    {}
  )}` : ``}`}`} </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DgakF56U.js.map
