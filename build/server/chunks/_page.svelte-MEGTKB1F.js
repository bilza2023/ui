import { c as create_ssr_component, v as validate_component, k as createEventDispatcher, e as each, d as escape, n as null_to_empty, b as add_attribute } from './ssr-DD2Fi2eU.js';
import { N as Nav } from './Nav-B7fxV0lO.js';
import { F as Footer } from './Footer-oESKp3b5.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';

const SidebarCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "" } = $$props;
  let { title = "" } = $$props;
  let { details = "" } = $$props;
  let { url = "#" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0) $$bindings.details(details);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
  return `<a${add_attribute("href", url, 0)} class="block no-underline"><div class="bg-[#fef6ec] border border-[#c4a77f] rounded-lg p-4 text-sm shadow-sm hover:shadow-md transition cursor-pointer"><h4 class="font-semibold text-[#3d2e1e] mb-1">${escape(icon)} ${escape(title)}</h4> <p class="text-gray-700">${escape(details)}</p></div></a>`;
});
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_attribute("class", ` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white bg-[#2E1C02]`, 0)}><h4 class="text-lg font-bold mb-2 text-white" data-svelte-h="svelte-1nme1y6">📢 Updates &amp; Insights</h4> ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🏆",
      title: "Collection of Class 9th Theorems",
      details: "Collection of Class 9th Theorems along with Images for revision of students. From Chpater 10 ,11 and 12.",
      url: "/blog/class9_all_theorems_pt1.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🚀",
      title: "Be Part of AI Revolution",
      details: "World is entering into a new era. This is a time to act for Pakistani Students. AI bring new oppertunities.",
      url: "/blog/be-part-of-ai-revolution.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "📜",
      title: "AI Foundation Track",
      details: "Introducing AI Foundation Track - Taleem.Help. In the current economic conditions AI is a new form of business and earning.",
      url: "/blog/ai-foundation-track-brochure.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "👨‍🎓",
      title: "Future in AI Era for Pakistani Students",
      details: "A brief blog post about some of the steps suggested for Pakistani Students",
      ".": true,
      url: "/blog/future-in-the-ai-era-for--pakistani-students.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🌳",
      title: "Brief: Pakistani IT Industry 2025",
      details: "A snap shot of Pakistani IT industray in 2025. Some of the Top Earners and the Industrial sectors they target",
      ".": true,
      url: "blog/backend-servies-presentation/pakistani-it-industry-overview.html"
    },
    {},
    {}
  )}</div>`;
});
const css$5 = {
  code: ".container.svelte-2fnci9.svelte-2fnci9{background-color:rgb(193, 178, 148);border-radius:2%;padding:2rem}body{background-color:#1e1e1e;color:#f0f0f0;font-family:Arial, sans-serif;margin:0}.gallery.svelte-2fnci9.svelte-2fnci9{display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:1.5rem;padding:0 1rem}.gallery-item.svelte-2fnci9.svelte-2fnci9{background-color:#C4A77F;border:1px solid #444;border-radius:8px;padding:1rem;text-align:center;box-shadow:0 0 10px rgba(0,0,0,0.3)}.gallery-item.svelte-2fnci9 img.svelte-2fnci9{max-width:100%;height:auto;border-radius:4px;margin-bottom:0.5rem;border:1px solid #555;display:block;margin-left:auto;margin-right:auto}.details.svelte-2fnci9.svelte-2fnci9{font-size:0.9rem;color:#291701;font-weight:bold}",
  map: '{"version":3,"file":"TcodeCard.svelte","sources":["TcodeCard.svelte"],"sourcesContent":["<script>\\n  export let tcodes = [];\\n  let folderName = \\"subject\\";\\n<\/script>\\n\\n\\n<div class=\\"container\\">\\n\\n  <div class=\\"gallery\\">\\n    {#each tcodes as t}\\n      <a href={`/${folderName}?tcode=${t.tcodeName}`}>\\n        <div class=\\"gallery-item\\">\\n          <img src={t.image} alt={t.tcodeName} />\\n          <div class=\\"details\\">{t.tcodeName}</div>\\n        </div>\\n      </a>\\n    {/each}\\n  </div>\\n</div>\\n\\n\\n<style>\\n\\n  .container {\\n    background-color: rgb(193, 178, 148);\\n    border-radius:2%;\\n    padding: 2rem;\\n  }\\n  :global(body) {\\n    background-color: #1e1e1e;\\n    color: #f0f0f0;\\n    font-family: Arial, sans-serif;\\n    margin: 0;\\n  }\\n\\n  h2 {\\n    text-align: center;\\n    margin-bottom: 2rem;\\n    color: #ffffff;\\n  }\\n\\n  .gallery {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\\n    gap: 1.5rem;\\n    padding: 0 1rem;\\n  }\\n\\n  .gallery-item {\\n    background-color: #C4A77F;\\n    border: 1px solid #444;\\n    border-radius: 8px;\\n    padding: 1rem;\\n    text-align: center;\\n    box-shadow: 0 0 10px rgba(0,0,0,0.3);\\n  }\\n\\n  .gallery-item img {\\n    max-width: 100%;\\n    height: auto;\\n    border-radius: 4px;\\n    margin-bottom: 0.5rem;\\n    border: 1px solid #555;\\n    display: block; /* Ensures image is centered within the container */\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n\\n  .details {\\n    font-size: 0.9rem;\\n    color: #291701;\\n    font-weight: bold;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuBE,sCAAW,CACT,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,cAAc,EAAE,CAChB,OAAO,CAAE,IACX,CACQ,IAAM,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,KAAK,CAAC,CAAC,UAAU,CAC9B,MAAM,CAAE,CACV,CAQA,oCAAS,CACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,SAAS,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC5D,GAAG,CAAE,MAAM,CACX,OAAO,CAAE,CAAC,CAAC,IACb,CAEA,yCAAc,CACZ,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACrC,CAEA,2BAAa,CAAC,iBAAI,CAChB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,aAAa,CAAE,MAAM,CACrB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAChB,CAEA,oCAAS,CACP,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IACf"}'
};
let folderName = "subject";
const TcodeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tcodes = [] } = $$props;
  if ($$props.tcodes === void 0 && $$bindings.tcodes && tcodes !== void 0) $$bindings.tcodes(tcodes);
  $$result.css.add(css$5);
  return `<div class="container svelte-2fnci9"><div class="gallery svelte-2fnci9">${each(tcodes, (t) => {
    return `<a${add_attribute("href", `/${folderName}?tcode=${t.tcodeName}`, 0)}><div class="gallery-item svelte-2fnci9"><img${add_attribute("src", t.image, 0)}${add_attribute("alt", t.tcodeName, 0)} class="svelte-2fnci9"> <div class="details svelte-2fnci9">${escape(t.tcodeName)}</div></div> </a>`;
  })}</div> </div>`;
});
const css$4 = {
  code: ".question-grid.svelte-17v39n3{display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;padding:1rem;width:100%}.card.svelte-17v39n3:hover{transform:translateY(2px);box-shadow:0 10px 10px rgba(21, 42, 0, 0.9)}.card.svelte-17v39n3{display:flex;flex-direction:column;border-radius:0.75rem;overflow:hidden;border:4px solid #2E1C02;box-shadow:0 8px 8px rgba(45, 44, 44, 0.8)}.thumb.svelte-17v39n3{width:100%;height:160px;-o-object-fit:cover;object-fit:cover;background-color:#f0f0f0;flex-shrink:0;border-top-left-radius:0.75rem;border-top-right-radius:0.75rem}.title.svelte-17v39n3{margin-top:auto;color:#d5bd9b;background-color:#2E1C02;padding:0.6rem;font-size:0.9rem;;}.no-questions.svelte-17v39n3{color:#331f04;font-size:1rem;text-align:center}",
  map: `{"version":3,"file":"QuestionCard.svelte","sources":["QuestionCard.svelte"],"sourcesContent":["<script>\\n  export let questions = [];\\n\\n  function getThumb(q) {\\n    return q.thumbnail\\n      ?? (q.type === 'slide'\\n        ? '/images/slide.webp'\\n        : '/images/beakers2.webp');\\n  }\\n\\n  function getMeta(q) {\\n    switch (q.type) {\\n      case 'slide': return { color: '#492d08', icon: '📷' };\\n      case 'note':  return { color: '#6c430b', icon: '📚' };\\n      case 'deck':  return { color: '#0c0535', icon: '📽️' };\\n      default:      return { color: '#2E1C02', icon: '' };\\n    }\\n  }\\n<\/script>\\n\\n<div class=\\"question-grid\\">\\n  {#if questions.length > 0}\\n    {#each questions as question}\\n      <a\\n        class=\\"card\\"\\n        href={question.type === 'note'\\n          ? \`/notes/\${question.filename}\`\\n          : \`/player?filename=\${question.filename}\`}\\n        style=\\"border: 4px solid {getMeta(question).color}\\"\\n      >\\n        <img\\n          class=\\"thumb\\"\\n          src={getThumb(question)}\\n          alt={question.name}\\n        />\\n\\n        <div\\n          class=\\"title\\"\\n          style=\\"background-color: {getMeta(question).color}\\"\\n        >\\n         <span style=\\"font-size:1.25rem\\"> {getMeta(question).icon}</span> \\n         &nbsp; \\n         <span style=\\"font-size:1rem\\">{question.name}</span>\\n        </div>\\n      </a>\\n    {/each}\\n  {:else}\\n    <p class=\\"no-questions\\">No questions available for this selection.</p>\\n  {/if}\\n</div>\\n\\n\\n<style>\\n  .question-grid {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center; /* Center cards horizontally */\\n    gap: 1rem;\\n    padding: 1rem;\\n    width: 100%;\\n  }\\n\\n \\n  .card:hover {\\n    transform: translateY(2px);\\n    box-shadow: 0 10px 10px rgba(21, 42, 0, 0.9);\\n  }\\n\\n  .card {\\n    display: flex;\\n  flex-direction: column;\\n  border-radius: 0.75rem;  /* rounded corners */\\n  overflow: hidden;   \\n  border: 4px solid #2E1C02;\\n  /* border: 4px solid #372205; */\\n  box-shadow: 0 8px 8px rgba(45, 44, 44, 0.8);\\n}\\n\\n.thumb {\\n  width: 100%;\\n  height: 160px;\\n  -o-object-fit: cover;\\n     object-fit: cover;\\n  background-color: #f0f0f0;\\n  flex-shrink: 0;\\n  border-top-left-radius: 0.75rem;\\n  border-top-right-radius: 0.75rem;\\n}\\n\\n.title {\\n  margin-top: auto;       /* stick title to bottom of the card */\\n  color: #d5bd9b;\\n    background-color: #2E1C02;\\n    padding: 0.6rem;\\n    font-size: 0.9rem;;\\n}\\n\\n\\n  .no-questions {\\n    color: #331f04;\\n    font-size: 1rem;\\n    text-align: center;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqDE,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IACT,CAGA,oBAAK,MAAO,CACV,SAAS,CAAE,WAAW,GAAG,CAAC,CAC1B,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC7C,CAEA,oBAAM,CACJ,OAAO,CAAE,IAAI,CACf,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,OAAO,CACtB,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAEzB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC5C,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,KAAK,CACjB,UAAU,CAAE,KAAK,CACpB,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,CAAC,CACd,sBAAsB,CAAE,OAAO,CAC/B,uBAAuB,CAAE,OAC3B,CAEA,qBAAO,CACL,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,OAAO,CACZ,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,MAAM,CACf,SAAS,CAAE,MAAM,CAAC,CACtB,CAGE,4BAAc,CACZ,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MACd"}`
};
function getThumb(q) {
  return q.thumbnail ?? (q.type === "slide" ? "/images/slide.webp" : "/images/beakers2.webp");
}
function getMeta(q) {
  switch (q.type) {
    case "slide":
      return { color: "#492d08", icon: "📷" };
    case "note":
      return { color: "#6c430b", icon: "📚" };
    case "deck":
      return { color: "#0c0535", icon: "📽️" };
    default:
      return { color: "#2E1C02", icon: "" };
  }
}
const QuestionCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { questions = [] } = $$props;
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0) $$bindings.questions(questions);
  $$result.css.add(css$4);
  return `<div class="question-grid svelte-17v39n3">${questions.length > 0 ? `${each(questions, (question) => {
    return `<a class="card svelte-17v39n3"${add_attribute(
      "href",
      question.type === "note" ? `/notes/${question.filename}` : `/player?filename=${question.filename}`,
      0
    )} style="${"border: 4px solid " + escape(getMeta(question).color, true)}"><img class="thumb svelte-17v39n3"${add_attribute("src", getThumb(question), 0)}${add_attribute("alt", question.name, 0)}> <div class="title svelte-17v39n3" style="${"background-color: " + escape(getMeta(question).color, true)}"><span style="font-size:1.25rem">${escape(getMeta(question).icon)}</span> 
           
         <span style="font-size:1rem">${escape(question.name)}</span></div> </a>`;
  })}` : `<p class="no-questions svelte-17v39n3" data-svelte-h="svelte-pjfwhw">No questions available for this selection.</p>`} </div>`;
});
const css$3 = {
  code: ".app-container.svelte-r4s3u4{display:flex;flex-direction:column;min-height:100vh}.layout-container.svelte-r4s3u4{display:flex;flex:1;gap:0;margin:0;padding:0;min-height:0}.main-content.svelte-r4s3u4{flex:1;width:95%;margin:0;padding:0;transition:width 0.3s ease;display:flex;flex-direction:column}.questions-container.svelte-r4s3u4{flex:1;display:flex;margin:0;padding:0;justify-content:center;align-items:flex-start;background-color:rgb(193, 178, 148);border-radius:2%}@media(max-width: 768px){.main-content.svelte-r4s3u4{width:100%}}",
  map: `{"version":3,"file":"HomeIndex.svelte","sources":["HomeIndex.svelte"],"sourcesContent":["<script>\\n    import { onMount } from 'svelte';\\n    import QuestionCard from './QuestionCard.svelte';\\n  \\n    let questions = [];\\n  \\n    onMount(async () => {\\n      try {\\n        const res = await fetch('/data/index_syllabus.json');\\n        if (!res.ok) throw new Error(\`Failed to fetch: \${res.status}\`);\\n        questions = await res.json();\\n      } catch (err) {\\n        console.error('Error loading syllabus index:', err);\\n        // Optionally set questions = [] or show an error state\\n      }\\n    });\\n  <\/script>\\n  \\n  <div class=\\"app-container\\">\\n    <div class=\\"layout-container\\">\\n      <div class=\\"main-content\\">\\n\\n        <div class=\\"questions-container\\">\\n          <!-- Only render once loaded -->\\n          {#if questions.length}\\n            <QuestionCard {questions} />\\n          {:else}\\n            <p>Loading…</p>\\n          {/if}\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n  \\n  <style>\\n    .app-container {\\n      display: flex;\\n      flex-direction: column;\\n      min-height: 100vh;\\n    }\\n  \\n    .layout-container {\\n      display: flex;\\n      flex: 1;\\n      gap: 0;\\n      margin: 0;\\n      padding: 0;\\n      min-height: 0;\\n    }\\n  \\n    .main-content {\\n      flex: 1;\\n      width: 95%;\\n      margin: 0;\\n      padding: 0;\\n      transition: width 0.3s ease;\\n      display: flex;\\n      flex-direction: column;\\n    }\\n  \\n    .questions-container {\\n      flex: 1;\\n      display: flex;\\n      margin: 0;\\n      padding: 0;\\n      justify-content: center;\\n      align-items: flex-start;\\n      background-color: rgb(193, 178, 148);\\n      border-radius:2%;\\n    }\\n  \\n    @media (max-width: 768px) {\\n      .main-content {\\n        width: 100%;\\n      }\\n    }\\n  </style>\\n  "],"names":[],"mappings":"AAmCI,4BAAe,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KACd,CAEA,+BAAkB,CAChB,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,CACd,CAEA,2BAAc,CACZ,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAC3B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB,CAEA,kCAAqB,CACnB,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,UAAU,CACvB,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,cAAc,EAChB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,2BAAc,CACZ,KAAK,CAAE,IACT,CACF"}`
};
const HomeIndex = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let questions = [];
  $$result.css.add(css$3);
  return `<div class="app-container svelte-r4s3u4"><div class="layout-container svelte-r4s3u4"><div class="main-content svelte-r4s3u4"><div class="questions-container svelte-r4s3u4"> ${questions.length ? `${validate_component(QuestionCard, "QuestionCard").$$render($$result, { questions }, {}, {})}` : `<p data-svelte-h="svelte-cr9qbe">Loading…</p>`}</div></div></div> </div>`;
});
const css$2 = {
  code: ".home-nav.svelte-20b2iy{width:100%;text-align:left}",
  map: `{"version":3,"file":"SecondaryNav.svelte","sources":["SecondaryNav.svelte"],"sourcesContent":["<!-- /src/lib/SecondaryNav.svelte -->\\n<script>\\n    import { createEventDispatcher } from 'svelte';\\n  \\n    export let items = [];                 // string[]\\n    export let pageDisplayState = 0;       // two-way bound from parent\\n    export let align = 'left';             // 'left' | 'center' | 'right'\\n    export let onSelect = null;            // optional callback(detail)\\n  \\n    const dispatch = createEventDispatcher();\\n  \\n    function select(i) {\\n      pageDisplayState = i; // updates parent via bind:pageDisplayState\\n      const detail = { index: i, ordinal: i + 1, label: items[i] };\\n      dispatch('select', detail);\\n      if (typeof onSelect === 'function') onSelect(detail);\\n    }\\n  \\n    $: justify =\\n      align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';\\n  <\/script>\\n  <div class=\\"home-nav py-4\\">\\n    <div class={\\"flex \\" + justify}>\\n      <div\\n        class=\\"inline-flex items-center rounded-full p-1 ring-1 ring-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 overflow-x-auto whitespace-nowrap\\"\\n        role=\\"tablist\\"\\n        aria-orientation=\\"horizontal\\"\\n      >\\n        {#each items as label, i}\\n          <button\\n            class={\`px-4 py-1.5 text-sm font-medium rounded-full transition outline-none focus:ring-2 focus:ring-[var(--color-primary)]/60 \${\\n              pageDisplayState === i\\n                ? 'bg-[var(--color-primary)] text-[var(--color-primary-text)]'\\n                : 'text-[var(--color-primary)]'\\n            }\`}\\n            role=\\"tab\\"\\n            aria-selected={pageDisplayState === i}\\n            aria-controls={\\"secondary-tab-\\" + i}\\n            on:click={() => select(i)}\\n            on:keydown={(e) => {\\n              const btn = e.currentTarget;\\n              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {\\n                e.preventDefault();\\n                const dir = e.key === 'ArrowRight' ? 'nextElementSibling' : 'previousElementSibling';\\n                const next =\\n                  btn[dir] ??\\n                  (dir === 'nextElementSibling'\\n                    ? btn.parentElement.firstElementChild\\n                    : btn.parentElement.lastElementChild);\\n                next?.focus();\\n              } else if (e.key === 'Enter' || e.key === ' ') {\\n                e.preventDefault();\\n                select([...btn.parentElement.children].indexOf(btn));\\n              }\\n            }}\\n          >\\n            {label}\\n          </button>\\n        {/each}\\n      </div>\\n    </div>\\n  </div>\\n  \\n  <style>\\n    .home-nav {\\n      width: 100%;\\n      text-align: left;\\n    }\\n  </style>\\n  \\n"],"names":[],"mappings":"AAgEI,uBAAU,CACR,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,IACd"}`
};
const SecondaryNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let justify;
  let { items = [] } = $$props;
  let { pageDisplayState = 0 } = $$props;
  let { align = "left" } = $$props;
  let { onSelect = null } = $$props;
  createEventDispatcher();
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.pageDisplayState === void 0 && $$bindings.pageDisplayState && pageDisplayState !== void 0) $$bindings.pageDisplayState(pageDisplayState);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.onSelect === void 0 && $$bindings.onSelect && onSelect !== void 0) $$bindings.onSelect(onSelect);
  $$result.css.add(css$2);
  justify = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";
  return `  <div class="home-nav py-4 svelte-20b2iy"><div class="${escape(null_to_empty("flex " + justify), true) + " svelte-20b2iy"}"><div class="inline-flex items-center rounded-full p-1 ring-1 ring-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 overflow-x-auto whitespace-nowrap" role="tablist" aria-orientation="horizontal">${each(items, (label, i) => {
    return `<button class="${escape(
      null_to_empty(`px-4 py-1.5 text-sm font-medium rounded-full transition outline-none focus:ring-2 focus:ring-[var(--color-primary)]/60 ${pageDisplayState === i ? "bg-[var(--color-primary)] text-[var(--color-primary-text)]" : "text-[var(--color-primary)]"}`),
      true
    ) + " svelte-20b2iy"}" role="tab"${add_attribute("aria-selected", pageDisplayState === i, 0)}${add_attribute("aria-controls", "secondary-tab-" + i, 0)}>${escape(label)} </button>`;
  })}</div></div> </div>`;
});
const css$1 = {
  code: ".app-container.svelte-11abmz6{display:flex;flex-direction:column;min-height:100vh}.layout-container.svelte-11abmz6{display:flex;flex:1;gap:0;margin:0;padding:0;min-height:0}.main-content.svelte-11abmz6{flex:1;width:95%;margin:0;padding:0;transition:width 0.3s ease;display:flex;flex-direction:column}.questions-container.svelte-11abmz6{flex:1;display:flex;margin:0;padding:0;justify-content:center;align-items:flex-start;background-color:rgb(193, 178, 148);border-radius:2%}@media(max-width: 768px){.main-content.svelte-11abmz6{width:100%}}",
  map: '{"version":3,"file":"HomePageNotes.svelte","sources":["HomePageNotes.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  import QuestionCard from \\"./QuestionCard.svelte\\";\\n\\n  let questions = [];\\n\\n  onMount(async () => {\\n    try {\\n      const res = await fetch(\\"/data/index_syllabus.json\\");\\n      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);\\n      questions = await res.json();\\n    } catch (err) {\\n      console.error(\\"Error loading syllabus index:\\", err);\\n      // Optionally set questions = [] or show an error state\\n    }\\n  });\\n<\/script>\\n\\n<div class=\\"app-container\\">\\n  <div class=\\"layout-container\\">\\n    <div class=\\"main-content\\">\\n      <div class=\\"questions-container\\">\\n        <!-- Only render once loaded -->\\n        {#if questions.length}\\n          <QuestionCard {questions} />\\n        {:else}\\n          <p>Loading…</p>\\n        {/if}\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  .app-container {\\n    display: flex;\\n    flex-direction: column;\\n    min-height: 100vh;\\n  }\\n\\n  .layout-container {\\n    display: flex;\\n    flex: 1;\\n    gap: 0;\\n    margin: 0;\\n    padding: 0;\\n    min-height: 0;\\n  }\\n\\n  .main-content {\\n    flex: 1;\\n    width: 95%;\\n    margin: 0;\\n    padding: 0;\\n    transition: width 0.3s ease;\\n    display: flex;\\n    flex-direction: column;\\n  }\\n\\n  .questions-container {\\n    flex: 1;\\n    display: flex;\\n    margin: 0;\\n    padding: 0;\\n    justify-content: center;\\n    align-items: flex-start;\\n    background-color: rgb(193, 178, 148);\\n    border-radius: 2%;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .main-content {\\n      width: 100%;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkCE,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KACd,CAEA,gCAAkB,CAChB,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,CACd,CAEA,4BAAc,CACZ,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAC3B,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB,CAEA,mCAAqB,CACnB,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,UAAU,CACvB,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,EACjB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,4BAAc,CACZ,KAAK,CAAE,IACT,CACF"}'
};
const HomePageNotes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let questions = [];
  $$result.css.add(css$1);
  return `<div class="app-container svelte-11abmz6"><div class="layout-container svelte-11abmz6"><div class="main-content svelte-11abmz6"><div class="questions-container svelte-11abmz6"> ${questions.length ? `${validate_component(QuestionCard, "QuestionCard").$$render($$result, { questions }, {}, {})}` : `<p data-svelte-h="svelte-cr9qbe">Loading…</p>`}</div></div></div> </div>`;
});
const css = {
  code: ".page.svelte-oksmgr{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-start;background-color:var(--color-bg);color:var(--color-text)}.secondary-nav-container.svelte-oksmgr{padding-left:5rem}.content-section.svelte-oksmgr{width:100%;padding:2.5rem 3rem;display:grid;grid-template-columns:1fr;gap:3rem;min-height:100vh;background-color:var(--color-surface)}@media(min-width: 768px){.content-section.svelte-oksmgr{grid-template-columns:3fr 1fr}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<!-- +page.svelte -->\\n<script>\\n  import { onMount } from \\"svelte\\";\\n  import Nav from \\"$lib/appComps/Nav.svelte\\";\\n  import Footer from \\"$lib/appComps/Footer.svelte\\";\\n  import Sidebar from \\"$lib/appComps/homepage/Sidebar.svelte\\";\\n  import TcodeCard from \\"$lib/appComps/homepage/TcodeCard.svelte\\";\\n  import HomeIndex from \\"$lib/homeIndex/HomeIndex.svelte\\";\\n  import SecondaryNav from \\"$lib/SecondaryNav.svelte\\";\\n  import HomePageNotes from \\"$lib/homeIndex/HomePageNotes.svelte\\";\\n  import { getSubjectsIndex } from \\"$lib/services/syllabusServicer\\";\\n\\n  let syllabus = [];\\n  onMount(async () => {\\n    syllabus = await getSubjectsIndex();\\n  });\\n\\n  let navItems = [\\"Courses\\", \\"Videos\\", \\"Notes\\"];\\n  let pageDisplayState = 0;\\n<\/script>\\n\\n<div class=\\"page\\">\\n  <Nav />\\n\\n  <div class=\\"secondary-nav-container\\">\\n    <SecondaryNav\\n      items={navItems}\\n      bind:pageDisplayState={pageDisplayState}\\n      align=\\"left\\"\\n    />\\n  </div>\\n\\n  <section class=\\"content-section\\">\\n    {#if pageDisplayState == 0}\\n      <TcodeCard tcodes={syllabus} />\\n    {:else if pageDisplayState == 1}\\n      <HomeIndex />\\n    {:else if pageDisplayState == 2}\\n      <HomePageNotes />\\n    {/if}\\n\\n    <Sidebar />\\n  </section>\\n\\n  <Footer />\\n</div>\\n\\n<style>\\n  .page {\\n    min-height: 100vh;\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: flex-start;\\n    background-color: var(--color-bg);\\n    color: var(--color-text);\\n  }\\n\\n  .secondary-nav-container {\\n    padding-left: 5rem;\\n  }\\n\\n  .content-section {\\n    width: 100%;\\n    padding: 2.5rem 3rem;\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 3rem;\\n    min-height: 100vh;\\n    background-color: var(--color-surface);\\n  }\\n\\n  @media (min-width: 768px) {\\n    .content-section {\\n      grid-template-columns: 3fr 1fr;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgDE,mBAAM,CACJ,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAAU,CAC3B,gBAAgB,CAAE,IAAI,UAAU,CAAC,CACjC,KAAK,CAAE,IAAI,YAAY,CACzB,CAEA,sCAAyB,CACvB,YAAY,CAAE,IAChB,CAEA,8BAAiB,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,KAAK,CACjB,gBAAgB,CAAE,IAAI,eAAe,CACvC,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,8BAAiB,CACf,qBAAqB,CAAE,GAAG,CAAC,GAC7B,CACF"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let syllabus = [];
  let navItems = ["Courses", "Videos", "Notes"];
  let pageDisplayState = 0;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  <div class="page svelte-oksmgr">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <div class="secondary-nav-container svelte-oksmgr">${validate_component(SecondaryNav, "SecondaryNav").$$render(
      $$result,
      {
        items: navItems,
        align: "left",
        pageDisplayState
      },
      {
        pageDisplayState: ($$value) => {
          pageDisplayState = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <section class="content-section svelte-oksmgr">${pageDisplayState == 0 ? `${validate_component(TcodeCard, "TcodeCard").$$render($$result, { tcodes: syllabus }, {}, {})}` : `${pageDisplayState == 1 ? `${validate_component(HomeIndex, "HomeIndex").$$render($$result, {}, {}, {})}` : `${pageDisplayState == 2 ? `${validate_component(HomePageNotes, "HomePageNotes").$$render($$result, {}, {}, {})}` : ``}`}`} ${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}</section> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} </div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-MEGTKB1F.js.map
