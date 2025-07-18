import { c as create_ssr_component, e as escape, d as each, b as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { N as Nav } from "../../../chunks/Nav.js";
import { B as BetaWarning } from "../../../chunks/BetaWarning.js";
const css$4 = {
  code: `.button-container.svelte-jhu7dy{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;padding:0.75rem 1.25rem;background-color:#f9f9fb;border-radius:8px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.06);font-family:'Segoe UI', sans-serif;font-size:0.95rem}.btn.svelte-jhu7dy{background:transparent;border:none;cursor:pointer;padding:0.3rem 0.8rem;font-size:1.5rem;border-radius:16px;font-weight:500;font-style:italic;text-transform:capitalize;transition:background-color 0.2s ease;display:flex;align-items:center;gap:0.3rem}.btn.svelte-jhu7dy::after{content:"›";font-style:normal;margin-left:0.4rem;color:#aaa}.btn.svelte-jhu7dy:last-child::after{content:""}.btn.svelte-jhu7dy:hover{background-color:#e6e6f0}.chapter-btn.svelte-jhu7dy{color:#0056b3}.exercise-btn.svelte-jhu7dy{color:#1d7834}.question-btn.svelte-jhu7dy{color:#ffc107}`,
  map: null
};
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { syllabus } = $$props;
  let { selectedChapter } = $$props;
  let { selectedExercise } = $$props;
  let { unSelectCh } = $$props;
  let { unSelectEx } = $$props;
  if ($$props.syllabus === void 0 && $$bindings.syllabus && syllabus !== void 0)
    $$bindings.syllabus(syllabus);
  if ($$props.selectedChapter === void 0 && $$bindings.selectedChapter && selectedChapter !== void 0)
    $$bindings.selectedChapter(selectedChapter);
  if ($$props.selectedExercise === void 0 && $$bindings.selectedExercise && selectedExercise !== void 0)
    $$bindings.selectedExercise(selectedExercise);
  if ($$props.unSelectCh === void 0 && $$bindings.unSelectCh && unSelectCh !== void 0)
    $$bindings.unSelectCh(unSelectCh);
  if ($$props.unSelectEx === void 0 && $$bindings.unSelectEx && unSelectEx !== void 0)
    $$bindings.unSelectEx(unSelectEx);
  $$result.css.add(css$4);
  return `<div class="button-container svelte-jhu7dy"><button class="btn chapter-btn svelte-jhu7dy">${escape(syllabus.tcodeName)}:</button> ${selectedChapter ? `<button class="btn exercise-btn svelte-jhu7dy">Chapter › ${escape(selectedChapter.name)}</button>` : ``} ${selectedExercise ? `<button class="btn question-btn svelte-jhu7dy">Exercise › ${escape(selectedExercise.name)}</button>` : ``} </div>`;
});
const css$3 = {
  code: ".card.svelte-g5urb7{width:240px;min-height:180px;background-color:#ffffff;border:2px solid var(--card-color);border-top:8px solid var(--card-color);padding:1.2rem 1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;transition:transform 0.15s ease, box-shadow 0.15s ease;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:sans-serif;text-align:center}.card.svelte-g5urb7:hover{transform:translateY(-4px);box-shadow:0 6px 16px rgba(0,0,0,0.12);background-color:#fdfdfd}.card-icon.svelte-g5urb7{font-size:3rem;margin-bottom:0.75rem;color:var(--card-color)}.card-title.svelte-g5urb7{font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}.card-desc.svelte-g5urb7{font-size:0.9rem;color:#555;opacity:0.85;margin-top:auto}",
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "📘" } = $$props;
  let { title = "Untitled" } = $$props;
  let { description = "" } = $$props;
  let { color = "#007BFF" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$3);
  return `  <div class="card svelte-g5urb7" style="${"--card-color: " + escape(color, true)}"><div class="card-icon svelte-g5urb7">${escape(icon)}</div> <div class="card-title svelte-g5urb7">${title ? `${escape(title.slice(0, 20))}${escape(title.length > 20 ? "…" : "")}` : ``}</div> ${description ? `<div class="card-desc svelte-g5urb7">${escape(description)}</div>` : ``} </div>`;
});
const css$2 = {
  code: ".card.svelte-ozmayb{width:240px;min-height:180px;background-color:#ffffff;border:2px solid var(--card-color);border-top:8px solid var(--card-color);padding:1.2rem 1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0, 0, 0, 0.06);cursor:pointer;transition:transform 0.15s ease,\n      box-shadow 0.15s ease;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:sans-serif;text-align:center}.card.svelte-ozmayb:hover{transform:translateY(-4px);box-shadow:0 6px 16px rgba(0, 0, 0, 0.12);background-color:#fdfdfd}.card-icon.svelte-ozmayb{font-size:3rem;margin-bottom:0.75rem;color:var(--card-color)}.card-title.svelte-ozmayb{font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}.card-desc.svelte-ozmayb{font-size:0.9rem;color:#555;opacity:0.85;margin-top:auto}",
  map: null
};
const CardChapters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "📘" } = $$props;
  let { title = "Untitled" } = $$props;
  let { description = "" } = $$props;
  let { color = "#007BFF" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$2);
  return `  <div class="card svelte-ozmayb" style="${"--card-color: " + escape(color, true)}"><div class="card-icon svelte-ozmayb">${escape(icon)}</div> <div class="card-title svelte-ozmayb">${title ? `${escape(title.slice(0, 20))}${escape(title.length > 20 ? "…" : "")}` : ``}</div> ${description ? `<div class="card-desc svelte-ozmayb">${escape(description)}</div>` : ``} </div>`;
});
const css$1 = {
  code: ".questions.svelte-1f8fdtp{padding:1rem;text-align:center}.question-cards.svelte-1f8fdtp{display:flex;flex-wrap:wrap;justify-content:center}.question-cards.svelte-1f8fdtp button{margin:0.5rem}",
  map: null
};
function shortFilename(q) {
  return q.filename.length > 15 ? q.filename.slice(0, 15) + "…" : q.filename.slice(0, 15);
}
const QuestionCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { questions = [] } = $$props;
  let { selectedChapter } = $$props;
  let { selectedExercise } = $$props;
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0)
    $$bindings.questions(questions);
  if ($$props.selectedChapter === void 0 && $$bindings.selectedChapter && selectedChapter !== void 0)
    $$bindings.selectedChapter(selectedChapter);
  if ($$props.selectedExercise === void 0 && $$bindings.selectedExercise && selectedExercise !== void 0)
    $$bindings.selectedExercise(selectedExercise);
  $$result.css.add(css$1);
  return `<main class="questions svelte-1f8fdtp"><h5 class="text-left text-red-800 " data-svelte-h="svelte-1lkmx79">Questions</h5> ${selectedExercise ? `${questions.length ? `<div class="question-cards svelte-1f8fdtp">${each(questions, (q) => {
    return `<a${add_attribute("href", `/content?filename=${q.filename}`, 0)} class="card-link" target="_blank" rel="noopener">${validate_component(Card, "Card").$$render(
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
  map: null
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
export {
  Page as default
};
