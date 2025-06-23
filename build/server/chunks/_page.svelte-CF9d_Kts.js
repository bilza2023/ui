import { c as create_ssr_component, j as get_store_value, b as escape, e as each, v as validate_component, d as add_attribute } from './ssr-DxeigfMQ.js';
import { p as page } from './stores-BepMWtov.js';
import { marked } from 'marked';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const MdSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { content } = $$props;
  let { theme = {} } = $$props;
  const defaultTheme = {
    intro: "bg-[#fcf7f2] text-[#3e2a1c] p-6 rounded-2xl text-xl leading-relaxed shadow-sm mb-8",
    definition: "bg-[#fff8e5] border-l-4 border-[#c89f60] text-[#3b2e1f] p-6 font-serif rounded-xl shadow-sm mb-8",
    example: "bg-[#f3f1ef] font-mono text-[#1e1e1e] text-sm p-6 rounded-xl whitespace-pre-wrap shadow-inner mb-8",
    note: "bg-[#fff9d6] border-l-4 border-[#e8c343] text-[#5e4a1e] p-6 italic rounded-xl mb-8",
    image: "text-center mt-10 mb-12",
    tag: "bg-[#e8e3dc] text-[#5c4a34] text-sm px-3 py-1 rounded-full shadow"
  };
  const styles = { ...defaultTheme, ...theme };
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  return `${type === "intro" ? `<section${add_attribute("class", styles.intro, 0)}><h2 class="text-xl font-semibold mb-2" data-svelte-h="svelte-jdjspi">Introduction</h2> <!-- HTML_TAG_START -->${marked(content)}<!-- HTML_TAG_END --></section>` : `${type === "definition" ? `<section${add_attribute("class", styles.definition, 0)}><h2 class="text-lg font-bold mb-2" data-svelte-h="svelte-1dqsblu">Definition</h2> <!-- HTML_TAG_START -->${marked(content)}<!-- HTML_TAG_END --></section>` : `${type === "example" ? `<section${add_attribute("class", styles.example, 0)}><h2 class="text-lg font-bold mb-2" data-svelte-h="svelte-11v1tu3">Example</h2> <!-- HTML_TAG_START -->${marked(content)}<!-- HTML_TAG_END --></section>` : `${type === "teacher-note" ? `<section${add_attribute("class", styles.note, 0)}><h2 class="text-lg font-bold mb-2" data-svelte-h="svelte-7njjff">Teacher Note</h2> <!-- HTML_TAG_START -->${marked(content)}<!-- HTML_TAG_END --></section>` : `${type === "image-prompt" ? `<section${add_attribute("class", styles.image, 0)}> <img${add_attribute("src", content, 0)} alt="Prompt image" class="rounded-xl shadow-md w-full max-w-[600px] h-auto mx-auto"></section>` : `${type === "tags" ? `<section class="flex flex-wrap gap-2 mt-8">${each(content.split(" "), (tag) => {
    return `<span${add_attribute("class", styles.tag, 0)}>#${escape(tag)}</span>`;
  })}</section>` : ``}`}`}`}`}`}`;
});
const demo = "::title::\nWelcome to Taleem.Help\n\n\n::intro::\nOops! This lesson is not yet available. But don't worry — Taleem.Help is always expanding its library to bring you top-quality learning content.\n\n::definition::\nTaleem.Help is Pakistan's first AI-powered learning platform — built for students, educators, and lifelong learners.  \nWe deliver structured, smart content — chapter by chapter, concept by concept.\n\n::example::\nExplore topics like:\n- Linear Equations\n- Python Programming\n- AI Foundations\n- IT Essentials\n\nWith interactive lessons, solved examples, and quizzes (coming soon!).\n\n::image-prompt::\n/images/taleemclass.webp\n\n::teacher-note::\nStay curious! We're constantly updating our content. If you're looking for a specific topic, check back soon — or message us directly.\n\n::tags::\n#taleem #ai #pakistan #learning #notfound\n";
const demo$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: demo
}, Symbol.toStringTag, { value: "Module" }));
function parseMdSections(raw) {
  const sectionRegex = /::(.*?)::\n([\s\S]*?)(?=(::|$))/g;
  const parsed = {};
  let match;
  while ((match = sectionRegex.exec(raw)) !== null) {
    const [, key, value] = match;
    parsed[key.trim()] = value.trim();
  }
  return parsed;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filename;
  let sections = {};
  let error = null;
  const allMdFiles = /* @__PURE__ */ Object.assign({ "/src/lib/md/demo.md": () => Promise.resolve().then(() => demo$1).then((m) => m["default"]), "/src/lib/md/mockSyllabus/mockSyllabus-chapter-3-ex3_1-q4.md": () => import('./mockSyllabus-chapter-3-ex3_1-q4-DoHGdj1E.js').then((m) => m["default"]) });
  async function loadMd() {
    error = null;
    sections = {};
    const fileKey = `/src/lib/md/mockSyllabus/${filename}.md`;
    const loader = allMdFiles[fileKey];
    if (!filename || !loader) {
      sections = parseMdSections(demo);
      return;
    }
    try {
      const raw = await loader();
      sections = parseMdSections(raw);
    } catch (err) {
      error = "Failed to load content.";
      console.error(err);
    }
  }
  filename = get_store_value(page).url.searchParams.get("filename") || "";
  {
    loadMd();
  }
  return `${error ? `<p class="text-red-500 p-4">${escape(error)}</p>` : `${Object.keys(sections).length === 0 ? `<p class="p-4" data-svelte-h="svelte-y4rhh8">Loading...</p>` : `  <div class="w-full px-6 sm:px-10 lg:px-24 py-10 bg-[#353330]"><h1 class="text-3xl font-bold mb-6">${escape(sections.title || "Reading Material")}</h1> ${each(Object.entries(sections), ([type, content]) => {
    return `${type !== "title" ? `${validate_component(MdSection, "MdSection").$$render($$result, { type, content }, {}, {})}` : ``}`;
  })}</div>`}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CF9d_Kts.js.map
