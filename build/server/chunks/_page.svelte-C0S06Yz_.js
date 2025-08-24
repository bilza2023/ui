import { c as create_ssr_component, o as onDestroy, e as escape, v as validate_component, f as add_attribute, m as missing_component, d as each, h as null_to_empty } from './ssr-CO7PFcwR.js';
import { L as Like, C as Comment } from './Comment-j8Qbdo2-.js';
import { z } from 'zod';
import 'katex';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import 'howler';

const Katex = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { displayMode = false } = $$props;
  let output;
  let latex;
  if ($$props.displayMode === void 0 && $$bindings.displayMode && displayMode !== void 0) $$bindings.displayMode(displayMode);
  return ` <span style="display: none;"${add_attribute("this", latex, 0)}>${slots.default ? slots.default({}) : ``}</span>  <span${add_attribute("this", output, 0)}></span>`;
});
const baseSlide = z.object({
  start: z.number(),
  end: z.number()
});
const titleSlide = baseSlide.extend({
  type: z.literal("titleSlide"),
  data: z.array(
    z.object({
      name: z.literal("title"),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const titleAndSubtitle = baseSlide.extend({
  type: z.literal("titleAndSubtitle"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("subtitle"), content: z.string(), showAt: z.number() })
    ])
  )
});
const bulletList = baseSlide.extend({
  type: z.literal("bulletList"),
  data: z.array(
    z.object({
      name: z.literal("bullet"),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const twoColumnText = baseSlide.extend({
  type: z.literal("twoColumnText"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("left"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("right"), content: z.string(), showAt: z.number() })
    ])
  )
});
const imageSlide = baseSlide.extend({
  type: z.literal("imageSlide"),
  data: z.array(
    z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() })
  )
});
const imageWithTitle = baseSlide.extend({
  type: z.literal("imageWithTitle"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() })
    ])
  )
});
const imageWithCaption = baseSlide.extend({
  type: z.literal("imageWithCaption"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("caption"), content: z.string(), showAt: z.number() })
    ])
  )
});
const imageLeftBulletsRight = baseSlide.extend({
  type: z.literal("imageLeftBulletsRight"),
  data: z.array(
    z.object({
      name: z.union([z.literal("image"), z.literal("bullet")]),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const imageRightBulletsLeft = baseSlide.extend({
  type: z.literal("imageRightBulletsLeft"),
  data: z.array(
    z.object({
      name: z.union([z.literal("image"), z.literal("bullet")]),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const table = baseSlide.extend({
  type: z.literal("table"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("headers"), content: z.array(z.string()), showAt: z.number() }),
      z.object({ name: z.literal("rows"), content: z.array(z.array(z.string())), showAt: z.number() })
    ])
  )
});
const statistic = baseSlide.extend({
  type: z.literal("statistic"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("number"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("label"), content: z.string(), showAt: z.number() })
    ])
  )
});
const donutChart = baseSlide.extend({
  type: z.literal("donutChart"),
  data: z.array(
    z.object({
      name: z.union([z.literal("percent"), z.literal("label"), z.literal("color")]),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const bigNumber = baseSlide.extend({
  type: z.literal("bigNumber"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("number"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("label"), content: z.string(), showAt: z.number() })
    ])
  )
});
const barChart = baseSlide.extend({
  type: z.literal("barChart"),
  data: z.array(
    z.object({
      name: z.literal("bar"),
      label: z.string(),
      value: z.number(),
      showAt: z.number()
    })
  )
});
const quoteSlide = baseSlide.extend({
  type: z.literal("quoteSlide"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("quoteLine"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("author"), content: z.string(), showAt: z.number() })
    ])
  )
});
const quoteWithImage = baseSlide.extend({
  type: z.literal("quoteWithImage"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("quoteLine"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("author"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() })
    ])
  )
});
const cornerWordsSlide = baseSlide.extend({
  type: z.literal("cornerWordsSlide"),
  data: z.array(
    z.object({
      name: z.literal("card"),
      icon: z.string(),
      label: z.string(),
      showAt: z.number()
    })
  )
});
const contactSlide = baseSlide.extend({
  type: z.literal("contactSlide"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("headline"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("email"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("phone"), content: z.string(), showAt: z.number() })
    ])
  )
});
const eqSlide = baseSlide.extend({
  type: z.literal("eq"),
  data: z.array(
    z.object({
      name: z.literal("line"),
      type: z.union([
        z.literal("heading"),
        z.literal("text"),
        z.literal("math")
      ]),
      content: z.string(),
      showAt: z.number(),
      spItems: z.array(
        z.object({
          type: z.union([
            z.literal("spHeading"),
            z.literal("spText"),
            z.literal("spMath"),
            z.literal("spImage")
          ]),
          content: z.string()
        })
      ).optional()
    })
  )
});
const fillImage = baseSlide.extend({
  type: z.literal("fillImage"),
  data: z.array(
    z.object({
      name: z.literal("image"),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const titleAndPara = baseSlide.extend({
  type: z.literal("titleAndPara"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("paragraph"), content: z.string(), showAt: z.number() })
    ])
  )
});
const svgPointer = baseSlide.extend({
  type: z.literal("svgPointer"),
  data: z.array(
    z.union([
      /* base SVG image (inline-loaded by the component) */
      z.object({
        type: z.literal("image"),
        content: z.string(),
        // path to .svg file
        showAt: z.number().optional()
        // default 0
      }),
      /* pointer overlay primitives */
      z.object({
        type: z.enum(["arrow", "circle", "dot"]),
        x: z.number(),
        y: z.number(),
        showAt: z.number(),
        duration: z.number().optional()
        // defaults inside component
      }),
      /* NEW — focus rectangle */
      z.object({
        type: z.literal("window"),
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
        showAt: z.number(),
        duration: z.number().optional()
      }),
      /* NEW — blink an inline-SVG element by id */
      z.object({
        type: z.literal("blink"),
        targetId: z.string(),
        rate: z.number().optional(),
        // Hz, default 2
        showAt: z.number(),
        duration: z.number().optional()
      })
    ])
  ).refine((arr) => arr.filter((d) => d.type === "image").length === 1, {
    message: "svgPointer slide must include exactly one image entry"
  })
});
const zodAQuestionV1 = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "ready", "published", "archived"]).optional(),
  createdAt: z.string().datetime().optional(),
  editedAt: z.string().datetime().optional(),
  version: z.literal("deck-v1"),
  background: z.object({
    backgroundColor: z.string().optional(),
    backgroundImage: z.string().optional(),
    backgroundImageOpacity: z.number().optional()
  }).optional(),
  deck: z.array(
    z.discriminatedUnion("type", [
      titleAndPara,
      svgPointer,
      eqSlide,
      fillImage,
      titleSlide,
      titleAndSubtitle,
      bulletList,
      twoColumnText,
      imageSlide,
      imageWithTitle,
      imageWithCaption,
      imageLeftBulletsRight,
      imageRightBulletsLeft,
      table,
      statistic,
      donutChart,
      bigNumber,
      barChart,
      quoteSlide,
      quoteWithImage,
      cornerWordsSlide,
      contactSlide
    ])
  )
});
class DeckDoctor {
  /* ──────────────────────────────  PUBLIC API  ────────────────────────────── */
  /** Pure schema check (no mutation) */
  static validate(deck) {
    const r = zodAQuestionV1.safeParse(deck);
    return r.success ? { ok: true, value: r.data } : { ok: false, errors: r.error.issues };
  }
  /** 🔨  Build = inject defaults + expand EQ + apply sidebar-persistence  */
  static build(rawDeck) {
    let d = structuredClone(rawDeck);
    d = this.#injectDefaults(d);
    d = this.#expandFlatEQ(d);
    return d;
  }
  /* Convenience helpers (unchanged from original file) */
  static checkTimings(deck) {
  }
  static getTotalDuration(deck) {
  }
  static slideAtTime(deck, t) {
  }
  static toStaticBackground(deck) {
  }
  static withoutSound(deck) {
  }
  static flattenEQ(deck) {
  }
  static diff(a, b) {
  }
  static isDeckV1(obj) {
    return obj && obj.version === "deck-v1" && Array.isArray(obj.deck);
  }
  /* ───────────────────────────── PRIVATE HELPERS ─────────────────────────── */
  /** Default background if author omitted it */
  static #injectDefaults(deck) {
    const bgDefault = {
      backgroundColor: "#F3E5AB",
      backgroundImage: "/images/taleem.webp",
      backgroundImageOpacity: 0.07
    };
    return { ...deck, background: deck.background || bgDefault };
  }
  /** Convert flat-EQ → nested-EQ & apply sidebar-memory (sp-persistence) */
  static #expandFlatEQ(deck) {
    const slides = Array.isArray(deck.deck) ? deck.deck : [];
    deck.deck = slides.map((slide) => {
      if (slide.type !== "eq") return slide;
      const lines = [];
      let sidebarMem = null;
      slide.data.forEach((item) => {
        if (item.sp !== void 0 && Object.keys(item.sp).length === 0) {
          sidebarMem = null;
          return;
        }
        if (typeof item.type === "string" && item.type.startsWith("sp")) {
          sidebarMem ??= [];
          sidebarMem.push({ type: item.type, content: item.content });
          return;
        }
        const line = {
          name: "line",
          type: item.type,
          content: item.content,
          showAt: item.showAt,
          spItems: sidebarMem ? structuredClone(sidebarMem) : void 0
        };
        lines.push(line);
      });
      return { ...slide, data: lines };
    });
    return deck;
  }
}
const css$r = {
  code: ".quote-slide.svelte-1096xqm{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;text-align:center;padding:40px}.heading.svelte-1096xqm{font-size:68px;margin-bottom:0.8rem}.author-text.svelte-1096xqm{font-size:28px;opacity:0.85;margin-top:1.6rem}@media(max-width: 480px){.heading.svelte-1096xqm{font-size:32px}.author-text.svelte-1096xqm{font-size:18px}}@media(min-width: 481px) and (max-width: 767px){.heading.svelte-1096xqm{font-size:40px}.author-text.svelte-1096xqm{font-size:20px}}@media(min-width: 768px) and (max-width: 1024px){.heading.svelte-1096xqm{font-size:52px}.author-text.svelte-1096xqm{font-size:24px}}@media(min-width: 1025px) and (max-width: 1440px){.heading.svelte-1096xqm{font-size:60px}.author-text.svelte-1096xqm{font-size:26px}}@media(min-width: 1441px){.heading.svelte-1096xqm{font-size:120px}.author-text.svelte-1096xqm{font-size:35px}}",
  map: '{"version":3,"file":"Quote.svelte","sources":["Quote.svelte"],"sourcesContent":["<script>\\n  export let data;\\n\\n  const quoteLines = data.filter((d) => d.name === \\"quoteLine\\");\\n  const author = data.find((d) => d.name === \\"author\\")?.content ?? \\"\\";\\n<\/script>\\n\\n<div class=\\"quote-slide\\">\\n  {#each quoteLines as line}\\n    <h1 class=\\"heading\\">{line.content}</h1>\\n  {/each}\\n\\n  <p class=\\"text-primary author-text\\">{author}</p>\\n</div>\\n\\n<style>\\n.quote-slide {\\n  display: flex;\\n\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  height: 100%;\\n  text-align: center;\\n  padding: 40px;\\n}\\n\\n/* Default desktop baseline */\\n.heading {\\n  font-size: 68px;\\n  margin-bottom: 0.8rem;\\n}\\n\\n.author-text {\\n  font-size: 28px;\\n  opacity: 0.85;\\n  margin-top: 1.6rem;\\n}\\n\\n/* === Breakpoints === */\\n\\n/* xs: <480px */\\n@media (max-width: 480px) {\\n  .heading { font-size: 32px; }\\n  .author-text { font-size: 18px; }\\n}\\n\\n/* sm: 481–767px */\\n@media (min-width: 481px) and (max-width: 767px) {\\n  .heading { font-size: 40px; }\\n  .author-text { font-size: 20px; }\\n}\\n\\n/* md: 768–1024px */\\n@media (min-width: 768px) and (max-width: 1024px) {\\n  .heading { font-size: 52px; }\\n  .author-text { font-size: 24px; }\\n}\\n\\n/* lg: 1025–1440px */\\n@media (min-width: 1025px) and (max-width: 1440px) {\\n  .heading { font-size: 60px; }\\n  .author-text { font-size: 26px; }\\n}\\n\\n/* xl: >1440px */\\n@media (min-width: 1441px) {\\n  .heading { font-size: 120px; }\\n  .author-text { font-size: 35px; }\\n}\\n\\n</style>\\n"],"names":[],"mappings":"AAgBA,2BAAa,CACX,OAAO,CAAE,IAAI,CAEb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IACX,CAGA,uBAAS,CACP,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,MACjB,CAEA,2BAAa,CACX,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MACd,CAKA,MAAO,YAAY,KAAK,CAAE,CACxB,uBAAS,CAAE,SAAS,CAAE,IAAM,CAC5B,2BAAa,CAAE,SAAS,CAAE,IAAM,CAClC,CAGA,MAAO,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAE,CAC/C,uBAAS,CAAE,SAAS,CAAE,IAAM,CAC5B,2BAAa,CAAE,SAAS,CAAE,IAAM,CAClC,CAGA,MAAO,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,MAAM,CAAE,CAChD,uBAAS,CAAE,SAAS,CAAE,IAAM,CAC5B,2BAAa,CAAE,SAAS,CAAE,IAAM,CAClC,CAGA,MAAO,YAAY,MAAM,CAAC,CAAC,GAAG,CAAC,YAAY,MAAM,CAAE,CACjD,uBAAS,CAAE,SAAS,CAAE,IAAM,CAC5B,2BAAa,CAAE,SAAS,CAAE,IAAM,CAClC,CAGA,MAAO,YAAY,MAAM,CAAE,CACzB,uBAAS,CAAE,SAAS,CAAE,KAAO,CAC7B,2BAAa,CAAE,SAAS,CAAE,IAAM,CAClC"}'
};
const Quote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const quoteLines = data.filter((d) => d.name === "quoteLine");
  const author = data.find((d) => d.name === "author")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$r);
  return `<div class="quote-slide svelte-1096xqm">${each(quoteLines, (line) => {
    return `<h1 class="heading svelte-1096xqm">${escape(line.content)}</h1>`;
  })} <p class="text-primary author-text svelte-1096xqm">${escape(author)}</p> </div>`;
});
const css$q = {
  code: ".card-grid.svelte-118o6os{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;width:100%;height:100%;box-sizing:border-box}.card.svelte-118o6os{display:flex;flex-direction:column;justify-content:center;align-items:center;border:3px solid currentColor;border-radius:16px;box-sizing:border-box;width:100%;height:100%;padding:20px;text-align:center}.icon.svelte-118o6os{font-size:clamp(40px, 10vw, 80px);margin-bottom:12px}.label.svelte-118o6os{font-size:clamp(18px, 3vw, 28px);font-weight:bold;line-height:1.2}@media(max-width: 600px){.card.svelte-118o6os{padding:2px}}",
  map: '{"version":3,"file":"CornerWords.svelte","sources":["CornerWords.svelte"],"sourcesContent":["<script>\\n  export let data;\\n  export let currentTime;\\n\\n  const cards = data.filter(d => d.name === \\"card\\");\\n<\/script>\\n\\n<div class=\\"card-grid text-primary\\">\\n  {#each cards as card}\\n    <div class=\\"card\\">\\n      {#if card.showAt <= currentTime}\\n        <div class=\\"icon\\">{card.icon}</div>\\n      {/if}\\n      <div class=\\"label\\">{card.label}</div>\\n    </div>\\n  {/each}\\n</div>\\n\\n<style>\\n.card-grid {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  grid-template-rows: 1fr 1fr;\\n  width: 100%;\\n  height: 100%;\\n  box-sizing: border-box;\\n}\\n\\n.card {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  border: 3px solid currentColor;\\n  border-radius: 16px;\\n  box-sizing: border-box;\\n  width: 100%;\\n  height: 100%;\\n  padding: 20px;\\n  text-align: center;\\n}\\n\\n.icon {\\n  font-size: clamp(40px, 10vw, 80px);\\n  margin-bottom: 12px;\\n}\\n\\n.label {\\n  font-size: clamp(18px, 3vw, 28px);\\n  font-weight: bold;\\n  line-height: 1.2;\\n}\\n\\n@media (max-width: 600px) {\\n  .card {\\n    padding: 2px;\\n  }\\n}\\n</style>\\n"],"names":[],"mappings":"AAmBA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,kBAAkB,CAAE,GAAG,CAAC,GAAG,CAC3B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,UACd,CAEA,oBAAM,CACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,YAAY,CAC9B,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MACd,CAEA,oBAAM,CACJ,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAClC,aAAa,CAAE,IACjB,CAEA,qBAAO,CACL,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACjC,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,oBAAM,CACJ,OAAO,CAAE,GACX,CACF"}'
};
const CornerWords = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { currentTime } = $$props;
  const cards = data.filter((d) => d.name === "card");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$q);
  return `<div class="card-grid text-primary svelte-118o6os">${each(cards, (card) => {
    return `<div class="card svelte-118o6os">${card.showAt <= currentTime ? `<div class="icon svelte-118o6os">${escape(card.icon)}</div>` : ``} <div class="label svelte-118o6os">${escape(card.label)}</div> </div>`;
  })} </div>`;
});
const css$p = {
  code: ".title-slide.svelte-1rlf2bs{display:flex;justify-content:center;align-items:center;height:100%;text-align:center;padding:40px;box-sizing:border-box}.main-title.svelte-1rlf2bs{font-weight:bold;line-height:1.2;text-wrap:balance;font-size:72px;text-shadow:8px 8px 22px var(--shadowColor)}@media(max-width: 480px){.main-title.svelte-1rlf2bs{font-size:36px}}@media(min-width: 481px) and (max-width: 767px){.main-title.svelte-1rlf2bs{font-size:48px}}@media(min-width: 768px) and (max-width: 1024px){.main-title.svelte-1rlf2bs{font-size:60px}}@media(min-width: 1025px) and (max-width: 1440px){.main-title.svelte-1rlf2bs{font-size:72px}}@media(min-width: 1441px){.main-title.svelte-1rlf2bs{font-size:100px}}",
  map: '{"version":3,"file":"Title.svelte","sources":["Title.svelte"],"sourcesContent":["<script>\\n    export let data;\\n    const title = data.find(d => d.name === \\"title\\")?.content ?? \\"\\";\\n  <\/script>\\n  \\n  <div class=\\"title-slide\\">\\n    <h1 class=\\"main-title\\">{title}</h1>\\n  </div>\\n  \\n  <style>\\n  .title-slide {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  height: 100%;\\n  text-align: center;\\n  padding: 40px;\\n  box-sizing: border-box;\\n}\\n\\n.main-title {\\n  font-weight: bold;\\n  line-height: 1.2;\\n  text-wrap: balance;\\n  font-size: 72px;\\n  text-shadow: 8px 8px 22px var(--shadowColor);\\n}\\n\\n\\n/* === Responsive Breakpoints === */\\n\\n/* xs: <480px */\\n@media (max-width: 480px) {\\n  .main-title {\\n    font-size: 36px;\\n  }\\n}\\n\\n/* sm: 481–767px */\\n@media (min-width: 481px) and (max-width: 767px) {\\n  .main-title {\\n    font-size: 48px;\\n  }\\n}\\n\\n/* md: 768–1024px */\\n@media (min-width: 768px) and (max-width: 1024px) {\\n  .main-title {\\n    font-size: 60px;\\n  }\\n}\\n\\n/* lg: 1025–1440px */\\n@media (min-width: 1025px) and (max-width: 1440px) {\\n  .main-title {\\n    font-size: 72px;\\n  }\\n}\\n\\n/* xl: >1440px */\\n@media (min-width: 1441px) {\\n  .main-title {\\n    font-size: 100px;\\n  }\\n}\\n\\n  </style>\\n  "],"names":[],"mappings":"AAUE,2BAAa,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UACd,CAEA,0BAAY,CACV,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,OAAO,CAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,aAAa,CAC7C,CAMA,MAAO,YAAY,KAAK,CAAE,CACxB,0BAAY,CACV,SAAS,CAAE,IACb,CACF,CAGA,MAAO,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,KAAK,CAAE,CAC/C,0BAAY,CACV,SAAS,CAAE,IACb,CACF,CAGA,MAAO,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,YAAY,MAAM,CAAE,CAChD,0BAAY,CACV,SAAS,CAAE,IACb,CACF,CAGA,MAAO,YAAY,MAAM,CAAC,CAAC,GAAG,CAAC,YAAY,MAAM,CAAE,CACjD,0BAAY,CACV,SAAS,CAAE,IACb,CACF,CAGA,MAAO,YAAY,MAAM,CAAE,CACzB,0BAAY,CACV,SAAS,CAAE,KACb,CACF"}'
};
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const title = data.find((d) => d.name === "title")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$p);
  return `<div class="title-slide svelte-1rlf2bs"><h1 class="main-title svelte-1rlf2bs">${escape(title)}</h1> </div>`;
});
const css$o = {
  code: ".image-slide.svelte-1x2yghd{display:flex;align-items:center;justify-content:center;height:100%;width:100%;padding:2rem;box-sizing:border-box;overflow:hidden;min-height:0}.fullImage.svelte-1x2yghd{display:block;margin:auto;max-width:100%;max-height:90%;width:auto;height:auto;-o-object-fit:contain;object-fit:contain}",
  map: '{"version":3,"file":"Image.svelte","sources":["Image.svelte"],"sourcesContent":["<!-- ImageSlide.svelte -->\\n<script>\\n  export let data;\\n  // find the image URL\\n  const imageSrc = data.find(d => d.name === \\"image\\")?.content ?? \\"\\";\\n<\/script>\\n\\n<div class=\\"image-slide\\">\\n  <!-- svelte-ignore a11y-img-redundant-alt -->\\n  <img class=\\"fullImage\\" src={imageSrc} alt=\\"Slide Image\\" />\\n</div>\\n\\n<style>\\n .image-slide{\\n  display:flex; align-items:center; justify-content:center;\\n  height:100%; width:100%;\\n  padding:2rem; box-sizing:border-box;\\n  overflow:hidden; min-height:0;\\n}\\n\\n.fullImage{\\n  display:block; margin:auto;\\n  max-width:100%; max-height:90%;\\n  width:auto; height:auto;\\n  -o-object-fit:contain;\\n     object-fit:contain;\\n}\\n\\n\\n\\n</style>\\n"],"names":[],"mappings":"AAaC,2BAAY,CACX,QAAQ,IAAI,CAAE,YAAY,MAAM,CAAE,gBAAgB,MAAM,CACxD,OAAO,IAAI,CAAE,MAAM,IAAI,CACvB,QAAQ,IAAI,CAAE,WAAW,UAAU,CACnC,SAAS,MAAM,CAAE,WAAW,CAC9B,CAEA,yBAAU,CACR,QAAQ,KAAK,CAAE,OAAO,IAAI,CAC1B,UAAU,IAAI,CAAE,WAAW,GAAG,CAC9B,MAAM,IAAI,CAAE,OAAO,IAAI,CACvB,cAAc,OAAO,CAClB,WAAW,OAChB"}'
};
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const imageSrc = data.find((d) => d.name === "image")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$o);
  return `  <div class="image-slide svelte-1x2yghd"> <img class="fullImage svelte-1x2yghd"${add_attribute("src", imageSrc, 0)} alt="Slide Image"> </div>`;
});
const css$n = {
  code: ".slide-container.svelte-1ynr6nh.svelte-1ynr6nh{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:center;gap:clamp(1rem, 3vw, 2rem);height:100%;width:100%;padding:clamp(1rem, 3vw, 2rem);box-sizing:border-box}.image-left.svelte-1ynr6nh.svelte-1ynr6nh{flex:0 0 40%;max-width:40%;max-height:80%;display:flex;align-items:center;justify-content:center}.image-left.svelte-1ynr6nh img.svelte-1ynr6nh{width:100%;height:auto;-o-object-fit:contain;object-fit:contain}.bullets-right.svelte-1ynr6nh.svelte-1ynr6nh{flex:1 1 0;min-width:0;font-size:clamp(1.2rem, 4vw, 2.5rem);font-weight:bold;line-height:1.5}.bullets-right.svelte-1ynr6nh ul.svelte-1ynr6nh{margin:0;padding-left:1em}.bullets-right.svelte-1ynr6nh li.svelte-1ynr6nh{margin-bottom:0.5em}.bullets-right.svelte-1ynr6nh li.dim.svelte-1ynr6nh{opacity:0.45}.bullets-right.svelte-1ynr6nh li.active.svelte-1ynr6nh{opacity:1}.image-left.img-dim.svelte-1ynr6nh img.svelte-1ynr6nh{opacity:0.65}.image-left.img-active.svelte-1ynr6nh img.svelte-1ynr6nh{opacity:1}",
  map: `{"version":3,"file":"ImageLeftBulletsRight.svelte","sources":["ImageLeftBulletsRight.svelte"],"sourcesContent":["<script>\\n  export let data;\\n  export let currentTime;\\n\\n  // Image: always visible; highlight when time passes showAt\\n  $: imageItem = (Array.isArray(data) ? data : []).find(d => d?.name === \\"image\\");\\n  $: imageActive = imageItem ? currentTime >= (imageItem.showAt ?? 0) : false;\\n\\n  // Bullets: all visible; order by showAt\\n  $: bullets = (Array.isArray(data) ? data : [])\\n    .filter(d => d?.name === \\"bullet\\")\\n    .sort((a, b) => a.showAt - b.showAt);\\n<\/script>\\n\\n<div class=\\"slide-container\\">\\n  {#if imageItem}\\n    <div class={\`image-left \${imageActive ? 'img-active' : 'img-dim'}\`}>\\n      <img src={imageItem.content} alt=\\"Slide image\\" />\\n    </div>\\n  {/if}\\n  <div class=\\"bullets-right\\">\\n    <ul>\\n      {#each bullets as b}\\n        <li class={currentTime >= b.showAt ? 'active' : 'dim'}>\\n          {b.content}\\n        </li>\\n      {/each}\\n    </ul>\\n  </div>\\n</div>\\n\\n<style>\\n  /* ───────────────── slide frame ───────────────── */\\n  .slide-container {\\n    display: flex;\\n    flex-direction: row;        /* image left, bullets right */\\n    flex-wrap: nowrap;          /* never stack vertically   */\\n    align-items: center;        /* vertical centering       */\\n    justify-content: center;    /* horizontal balance       */\\n    gap: clamp(1rem, 3vw, 2rem);\\n\\n    height: 100%;\\n    width: 100%;\\n    padding: clamp(1rem, 3vw, 2rem);\\n    box-sizing: border-box;\\n  }\\n\\n  /* ───────────────── image column ───────────────── */\\n  .image-left {\\n    flex: 0 0 40%;              /* ~40 % of slide, can shrink if needed */\\n    max-width: 40%;\\n    max-height: 80%;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n  }\\n\\n  .image-left img {\\n    width: 100%;\\n    height: auto;\\n    -o-object-fit: contain;\\n       object-fit: contain;\\n  }\\n\\n  /* ───────────────── bullet column ──────────────── */\\n  .bullets-right {\\n    flex: 1 1 0;                /* take remaining width, allow shrink */\\n    min-width: 0;               /* permit shrinking instead of wrap   */\\n    font-size: clamp(1.2rem, 4vw, 2.5rem);\\n    font-weight: bold;\\n    line-height: 1.5;\\n  }\\n\\n  .bullets-right ul {\\n    margin: 0;\\n    padding-left: 1em;\\n  }\\n\\n  .bullets-right li {\\n    margin-bottom: 0.5em;\\n  }\\n\\n  /* ───────────── NEW: highlight states only ───────────── */\\n  .bullets-right li.dim { opacity: 0.45; }\\n  .bullets-right li.active { opacity: 1; }\\n\\n  .image-left.img-dim img { opacity: 0.65; }\\n  .image-left.img-active img { opacity: 1; }\\n</style>\\n"],"names":[],"mappings":"AAiCE,8CAAiB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAE3B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC/B,UAAU,CAAE,UACd,CAGA,yCAAY,CACV,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CACb,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,GAAG,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MACnB,CAEA,0BAAW,CAAC,kBAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OACjB,CAGA,4CAAe,CACb,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACX,SAAS,CAAE,CAAC,CACZ,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CACrC,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GACf,CAEA,6BAAc,CAAC,iBAAG,CAChB,MAAM,CAAE,CAAC,CACT,YAAY,CAAE,GAChB,CAEA,6BAAc,CAAC,iBAAG,CAChB,aAAa,CAAE,KACjB,CAGA,6BAAc,CAAC,EAAE,mBAAK,CAAE,OAAO,CAAE,IAAM,CACvC,6BAAc,CAAC,EAAE,sBAAQ,CAAE,OAAO,CAAE,CAAG,CAEvC,WAAW,uBAAQ,CAAC,kBAAI,CAAE,OAAO,CAAE,IAAM,CACzC,WAAW,0BAAW,CAAC,kBAAI,CAAE,OAAO,CAAE,CAAG"}`
};
const ImageLeftBulletsRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imageItem;
  let imageActive;
  let bullets;
  let { data } = $$props;
  let { currentTime } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$n);
  imageItem = (Array.isArray(data) ? data : []).find((d) => d?.name === "image");
  imageActive = imageItem ? currentTime >= (imageItem.showAt ?? 0) : false;
  bullets = (Array.isArray(data) ? data : []).filter((d) => d?.name === "bullet").sort((a, b) => a.showAt - b.showAt);
  return `<div class="slide-container svelte-1ynr6nh">${imageItem ? `<div class="${escape(null_to_empty(`image-left ${imageActive ? "img-active" : "img-dim"}`), true) + " svelte-1ynr6nh"}"><img${add_attribute("src", imageItem.content, 0)} alt="Slide image" class="svelte-1ynr6nh"></div>` : ``} <div class="bullets-right svelte-1ynr6nh"><ul class="svelte-1ynr6nh">${each(bullets, (b) => {
    return `<li class="${escape(null_to_empty(currentTime >= b.showAt ? "active" : "dim"), true) + " svelte-1ynr6nh"}">${escape(b.content)} </li>`;
  })}</ul></div> </div>`;
});
const css$m = {
  code: ".slide-container.svelte-1mfrdfb.svelte-1mfrdfb{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:center;gap:clamp(1rem, 3vw, 2rem);height:100%;width:100%;padding:clamp(1rem, 3vw, 2rem);box-sizing:border-box}.bullets-left.svelte-1mfrdfb.svelte-1mfrdfb{flex:1 1 0;min-width:0;display:flex;font-weight:bold;align-items:center;justify-content:center;font-size:clamp(1.2rem, 4vw, 2.5rem);line-height:1.5}.bullets-left.svelte-1mfrdfb ul.svelte-1mfrdfb{margin:0;padding-left:1.25em}.bullets-left.svelte-1mfrdfb li.svelte-1mfrdfb{margin-bottom:0.5em}.image-right.svelte-1mfrdfb.svelte-1mfrdfb{flex:0 0 40%;max-width:40%;max-height:80%;display:flex;align-items:center;justify-content:center}.image-right.svelte-1mfrdfb img.svelte-1mfrdfb{width:100%;height:auto;-o-object-fit:contain;object-fit:contain;border-radius:12px}.bullets-left.svelte-1mfrdfb li.dim.svelte-1mfrdfb{opacity:0.45}.bullets-left.svelte-1mfrdfb li.active.svelte-1mfrdfb{opacity:1}.image-right.img-dim.svelte-1mfrdfb img.svelte-1mfrdfb{opacity:0.65}.image-right.img-active.svelte-1mfrdfb img.svelte-1mfrdfb{opacity:1}",
  map: `{"version":3,"file":"ImageRightBulletsLeft.svelte","sources":["ImageRightBulletsLeft.svelte"],"sourcesContent":["<script>\\n  export let data;\\n  export let currentTime;\\n\\n  // Image: always render if present; highlight after its showAt\\n  $: imageItem   = (Array.isArray(data) ? data : []).find(d => d?.name === \\"image\\");\\n  $: imageActive = imageItem ? currentTime >= (imageItem.showAt ?? 0) : false;\\n\\n  // Bullets: always render; order by showAt so highlight progresses in time\\n  $: bullets = (Array.isArray(data) ? data : [])\\n    .filter(d => d?.name === \\"bullet\\")\\n    .sort((a, b) => a.showAt - b.showAt);\\n<\/script>\\n\\n<div class=\\"slide-container\\">\\n  <div class=\\"bullets-left\\">\\n    <ul>\\n      {#each bullets as b}\\n        <li class={currentTime >= b.showAt ? 'active' : 'dim'}>\\n          {b.content}\\n        </li>\\n      {/each}\\n    </ul>\\n  </div>\\n\\n  {#if imageItem}\\n    <div class={\`image-right \${imageActive ? 'img-active' : 'img-dim'}\`}>\\n      <img src={imageItem.content} alt=\\"Slide image\\" />\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  /* ───────────────── slide frame ───────────────── */\\n  .slide-container {\\n    display: flex;\\n    flex-direction: row; /* bullets left, image right */\\n    flex-wrap: nowrap; /* never stack vertically    */\\n    align-items: center; /* vertical centering        */\\n    justify-content: center; /* horizontal balance        */\\n    gap: clamp(1rem, 3vw, 2rem);\\n\\n    height: 100%;\\n    width: 100%;\\n    padding: clamp(1rem, 3vw, 2rem);\\n    box-sizing: border-box;\\n  }\\n\\n  /* ───────────────── bullets column ─────────────── */\\n  .bullets-left {\\n    flex: 1 1 0; /* takes remaining width, can shrink */\\n    min-width: 0; /* allow shrinking instead of wrap   */\\n    display: flex;\\n    font-weight: bold;\\n    align-items: center;\\n    justify-content: center;\\n    font-size: clamp(1.2rem, 4vw, 2.5rem);\\n    line-height: 1.5;\\n  }\\n\\n  .bullets-left ul {\\n    margin: 0;\\n    padding-left: 1.25em; /* disc bullets */\\n  }\\n\\n  .bullets-left li {\\n    margin-bottom: 0.5em;\\n  }\\n\\n  /* ───────────────── image column ──────────────── */\\n  .image-right {\\n    flex: 0 0 40%; /* ~40 % of slide, can shrink */\\n    max-width: 40%;\\n    max-height: 80%;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n  }\\n\\n  .image-right img {\\n    width: 100%;\\n    height: auto;\\n    -o-object-fit: contain;\\n       object-fit: contain;\\n    border-radius: 12px;\\n  }\\n\\n  /* ───────────── NEW: highlight states only ───────────── */\\n  .bullets-left li.dim { opacity: 0.45; }\\n  .bullets-left li.active { opacity: 1; }\\n\\n  .image-right.img-dim img { opacity: 0.65; }\\n  .image-right.img-active img { opacity: 1; }\\n</style>\\n"],"names":[],"mappings":"AAkCE,8CAAiB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAE3B,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC/B,UAAU,CAAE,UACd,CAGA,2CAAc,CACZ,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CACX,SAAS,CAAE,CAAC,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CACrC,WAAW,CAAE,GACf,CAEA,4BAAa,CAAC,iBAAG,CACf,MAAM,CAAE,CAAC,CACT,YAAY,CAAE,MAChB,CAEA,4BAAa,CAAC,iBAAG,CACf,aAAa,CAAE,KACjB,CAGA,0CAAa,CACX,IAAI,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CACb,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,GAAG,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MACnB,CAEA,2BAAY,CAAC,kBAAI,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OAAO,CACtB,aAAa,CAAE,IACjB,CAGA,4BAAa,CAAC,EAAE,mBAAK,CAAE,OAAO,CAAE,IAAM,CACtC,4BAAa,CAAC,EAAE,sBAAQ,CAAE,OAAO,CAAE,CAAG,CAEtC,YAAY,uBAAQ,CAAC,kBAAI,CAAE,OAAO,CAAE,IAAM,CAC1C,YAAY,0BAAW,CAAC,kBAAI,CAAE,OAAO,CAAE,CAAG"}`
};
const ImageRightBulletsLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imageItem;
  let imageActive;
  let bullets;
  let { data } = $$props;
  let { currentTime } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$m);
  imageItem = (Array.isArray(data) ? data : []).find((d) => d?.name === "image");
  imageActive = imageItem ? currentTime >= (imageItem.showAt ?? 0) : false;
  bullets = (Array.isArray(data) ? data : []).filter((d) => d?.name === "bullet").sort((a, b) => a.showAt - b.showAt);
  return `<div class="slide-container svelte-1mfrdfb"><div class="bullets-left svelte-1mfrdfb"><ul class="svelte-1mfrdfb">${each(bullets, (b) => {
    return `<li class="${escape(null_to_empty(currentTime >= b.showAt ? "active" : "dim"), true) + " svelte-1mfrdfb"}">${escape(b.content)} </li>`;
  })}</ul></div> ${imageItem ? `<div class="${escape(null_to_empty(`image-right ${imageActive ? "img-active" : "img-dim"}`), true) + " svelte-1mfrdfb"}"><img${add_attribute("src", imageItem.content, 0)} alt="Slide image" class="svelte-1mfrdfb"></div>` : ``} </div>`;
});
const css$l = {
  code: ".image-slide.svelte-1svc2o5{position:relative;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.full-image.svelte-1svc2o5{max-width:90vw;max-height:70vh;-o-object-fit:contain;object-fit:contain;border-radius:12px;box-shadow:0 0 30px rgba(0, 0, 0, 0.2)}.text-overlay.caption.svelte-1svc2o5{position:absolute;bottom:5%;left:50%;transform:translateX(-50%);font-size:2.5rem;color:white;text-shadow:1px 1px 4px black}",
  map: '{"version":3,"file":"ImageWithCaption.svelte","sources":["ImageWithCaption.svelte"],"sourcesContent":["<script>\\n    export let data;\\n    const imageSrc = data.find(d => d.name === \\"image\\")?.content ?? \\"\\";\\n    const caption = data.find(d => d.name === \\"caption\\")?.content ?? \\"\\";\\n  <\/script>\\n  \\n  <div class=\\"image-slide\\">\\n    <img class=\\"full-image\\" src={imageSrc} alt=\\"Slide Image\\" />\\n    <div class=\\"text-overlay caption\\">{caption}</div>\\n  </div>\\n  \\n  <style>\\n  .image-slide {\\n    position: relative;\\n    width: 100%;\\n    height: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n  \\n  .full-image {\\n    max-width: 90vw;\\n    max-height: 70vh;\\n    -o-object-fit: contain;\\n       object-fit: contain;\\n    border-radius: 12px;\\n    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);\\n  }\\n  \\n  .text-overlay.caption {\\n    position: absolute;\\n    bottom: 5%;\\n    left: 50%;\\n    transform: translateX(-50%);\\n    font-size: 2.5rem;\\n    color: white;\\n    text-shadow: 1px 1px 4px black;\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AAYE,2BAAa,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACf,CAEA,0BAAY,CACV,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OAAO,CACtB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACxC,CAEA,aAAa,uBAAS,CACpB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,EAAE,CACV,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAC3B"}'
};
const ImageWithCaption = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const imageSrc = data.find((d) => d.name === "image")?.content ?? "";
  const caption = data.find((d) => d.name === "caption")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$l);
  return `<div class="image-slide svelte-1svc2o5"><img class="full-image svelte-1svc2o5"${add_attribute("src", imageSrc, 0)} alt="Slide Image"> <div class="text-overlay caption svelte-1svc2o5">${escape(caption)}</div> </div>`;
});
const css$k = {
  code: ".slide-container.svelte-ahwrpi.svelte-ahwrpi{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;padding:20px;box-sizing:border-box;gap:20px}.title-zone.svelte-ahwrpi.svelte-ahwrpi{text-align:center}.slide-title.svelte-ahwrpi.svelte-ahwrpi{margin:0;font-size:clamp(1.5rem, 6vw, 4rem);line-height:1.2}.image-zone.svelte-ahwrpi.svelte-ahwrpi{display:flex;justify-content:center;align-items:center;max-width:70%;max-height:60%}.image-zone.svelte-ahwrpi img.svelte-ahwrpi{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}@media(max-width: 768px){.slide-title.svelte-ahwrpi.svelte-ahwrpi{font-size:clamp(1.2rem, 8vw, 2rem)}.image-zone.svelte-ahwrpi.svelte-ahwrpi{max-width:90%;max-height:70%}}",
  map: '{"version":3,"file":"ImageWithTitle.svelte","sources":["ImageWithTitle.svelte"],"sourcesContent":["<script>\\n  export let data;\\n\\n  const imageSrc = data.find(d => d.name === \\"image\\")?.content ?? \\"\\";\\n  const title = data.find(d => d.name === \\"title\\")?.content ?? \\"\\";\\n<\/script>\\n\\n<div class=\\"slide-container\\">\\n  <div class=\\"title-zone\\">\\n    <h1 class=\\"slide-title\\">{title}</h1>\\n  </div>\\n  <div class=\\"image-zone\\">\\n    <img src={imageSrc} alt=\\"Slide Image\\" />\\n  </div>\\n</div>\\n\\n<style>\\n  .slide-container {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;    /* vertical centering */\\n    align-items: center;        /* horizontal centering */\\n    height: 100%;\\n    width: 100%;\\n    padding: 20px;\\n    box-sizing: border-box;\\n    gap: 20px;\\n  }\\n\\n  .title-zone {\\n    text-align: center;\\n  }\\n\\n  .slide-title {\\n    margin: 0;\\n    font-size: clamp(1.5rem, 6vw, 4rem);\\n    line-height: 1.2;\\n  }\\n\\n  .image-zone {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    max-width: 70%;\\n    max-height: 60%;\\n  }\\n\\n  .image-zone img {\\n    max-width: 100%;\\n    max-height: 100%;\\n    -o-object-fit: contain;\\n       object-fit: contain;\\n  }\\n\\n  @media (max-width: 768px) {\\n    .slide-title {\\n      font-size: clamp(1.2rem, 8vw, 2rem);\\n    }\\n    .image-zone {\\n      max-width: 90%;\\n      max-height: 70%;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiBE,4CAAiB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UAAU,CACtB,GAAG,CAAE,IACP,CAEA,uCAAY,CACV,UAAU,CAAE,MACd,CAEA,wCAAa,CACX,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACnC,WAAW,CAAE,GACf,CAEA,uCAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,GACd,CAEA,yBAAW,CAAC,iBAAI,CACd,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OACjB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,wCAAa,CACX,SAAS,CAAE,MAAM,MAAM,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CACpC,CACA,uCAAY,CACV,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,GACd,CACF"}'
};
const ImageWithTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const imageSrc = data.find((d) => d.name === "image")?.content ?? "";
  const title = data.find((d) => d.name === "title")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$k);
  return `<div class="slide-container svelte-ahwrpi"><div class="title-zone svelte-ahwrpi"><h1 class="slide-title svelte-ahwrpi">${escape(title)}</h1></div> <div class="image-zone svelte-ahwrpi"><img${add_attribute("src", imageSrc, 0)} alt="Slide Image" class="svelte-ahwrpi"></div> </div>`;
});
const css$j = {
  code: ".table-slide.svelte-1btlhxz{display:flex;justify-content:center;align-items:center;height:100vh;padding:2rem;box-sizing:border-box}table.svelte-1btlhxz{width:90%;border-collapse:collapse;font-size:2rem;box-shadow:0 0 10px rgba(0, 0, 0, 0.15)}th.svelte-1btlhxz,td.svelte-1btlhxz{padding:1rem 1.5rem;text-align:left;border:1px solid #ccc}th.svelte-1btlhxz{background-color:#f0f0f0;font-weight:600}@media(max-width: 768px){table.svelte-1btlhxz{font-size:1.4rem}}",
  map: '{"version":3,"file":"Table.svelte","sources":["Table.svelte"],"sourcesContent":["<script>\\n  export let data;\\n\\n  // Extract headers and rows from slide data\\n  const headers = data.find(d => d.name === \\"headers\\")?.content ?? [];\\n  const rows = data.find(d => d.name === \\"rows\\")?.content ?? [];\\n<\/script>\\n\\n<div class=\\"table-slide\\">\\n  <table>\\n    <thead>\\n      <tr>\\n        {#each headers as header}\\n          <th>{header}</th>\\n        {/each}\\n      </tr>\\n    </thead>\\n    <tbody>\\n      {#each rows as row}\\n        <tr>\\n          {#each row as cell}\\n            <td>{cell}</td>\\n          {/each}\\n        </tr>\\n      {/each}\\n    </tbody>\\n  </table>\\n</div>\\n\\n<style>\\n.table-slide {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  height: 100vh;\\n  padding: 2rem;\\n  box-sizing: border-box;\\n}\\n\\ntable {\\n  width: 90%;\\n  border-collapse: collapse;\\n  font-size: 2rem;\\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\\n}\\n\\nth, td {\\n  padding: 1rem 1.5rem;\\n  text-align: left;\\n  border: 1px solid #ccc;\\n}\\n\\nth {\\n  background-color: #f0f0f0;\\n  font-weight: 600;\\n}\\n\\n@media (max-width: 768px) {\\n  table {\\n    font-size: 1.4rem;\\n  }\\n}\\n</style>\\n"],"names":[],"mappings":"AA8BA,2BAAa,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UACd,CAEA,oBAAM,CACJ,KAAK,CAAE,GAAG,CACV,eAAe,CAAE,QAAQ,CACzB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CACzC,CAEA,iBAAE,CAAE,iBAAG,CACL,OAAO,CAAE,IAAI,CAAC,MAAM,CACpB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IACpB,CAEA,iBAAG,CACD,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,GACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,oBAAM,CACJ,SAAS,CAAE,MACb,CACF"}'
};
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const headers = data.find((d) => d.name === "headers")?.content ?? [];
  const rows = data.find((d) => d.name === "rows")?.content ?? [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$j);
  return `<div class="table-slide svelte-1btlhxz"><table class="svelte-1btlhxz"><thead><tr>${each(headers, (header) => {
    return `<th class="svelte-1btlhxz">${escape(header)}</th>`;
  })}</tr></thead> <tbody>${each(rows, (row) => {
    return `<tr>${each(row, (cell) => {
      return `<td class="svelte-1btlhxz">${escape(cell)}</td>`;
    })} </tr>`;
  })}</tbody></table> </div>`;
});
const css$i = {
  code: ".stat-slide.svelte-x6jlyi{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;width:100vw;text-align:center;gap:1rem}.stat-number.svelte-x6jlyi{font-size:10rem;font-weight:800;color:#333}.stat-label.svelte-x6jlyi{font-size:3rem;font-weight:500;color:#555}",
  map: '{"version":3,"file":"StatisticSlide.svelte","sources":["StatisticSlide.svelte"],"sourcesContent":["<script>\\n    export let data;\\n  \\n    const number = data.find(d => d.name === \\"number\\")?.content ?? \\"\\";\\n    const label = data.find(d => d.name === \\"label\\")?.content ?? \\"\\";\\n  <\/script>\\n  \\n  <div class=\\"stat-slide\\">\\n    <div class=\\"stat-number\\">{number}</div>\\n    <div class=\\"stat-label\\">{label}</div>\\n  </div>\\n  \\n  <style>\\n  .stat-slide {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: center;\\n    height: 100vh;\\n    width: 100vw;\\n    text-align: center;\\n    gap: 1rem;\\n  }\\n  \\n  .stat-number {\\n    font-size: 10rem;\\n    font-weight: 800;\\n    color: #333;\\n  }\\n  \\n  .stat-label {\\n    font-size: 3rem;\\n    font-weight: 500;\\n    color: #555;\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AAaE,yBAAY,CACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,IACP,CAEA,0BAAa,CACX,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IACT,CAEA,yBAAY,CACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IACT"}'
};
const StatisticSlide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const number = data.find((d) => d.name === "number")?.content ?? "";
  const label = data.find((d) => d.name === "label")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$i);
  return `<div class="stat-slide svelte-x6jlyi"><div class="stat-number svelte-x6jlyi">${escape(number)}</div> <div class="stat-label svelte-x6jlyi">${escape(label)}</div> </div>`;
});
const css$h = {
  code: ".slide-container.svelte-1oq83yb{display:flex;justify-content:center;align-items:center;height:100%;width:100%;padding:60px;box-sizing:border-box}.bar-container.svelte-1oq83yb{display:flex;flex-direction:column;align-items:center;width:60px;height:100%;justify-content:flex-end}.chart-area.svelte-1oq83yb{display:flex;align-items:flex-end;gap:100px;height:80%;width:100%;justify-content:center}.bar.svelte-1oq83yb{width:100%;transition:height 0.3s ease-in-out}.label.svelte-1oq83yb{margin-top:12px;font-size:1.5rem;color:black;text-align:center}@media(max-width: 768px){.label.svelte-1oq83yb{font-size:1rem}.bar-container.svelte-1oq83yb{width:40px}}",
  map: `{"version":3,"file":"BarChartSlide.svelte","sources":["BarChartSlide.svelte"],"sourcesContent":["<script>\\n  export let data;\\n  export let currentTime;\\n  let bars = [];\\n\\n  $: bars = data\\n    .filter(item => item.name === \\"bar\\" && item.showAt <= currentTime)\\n    .sort((a, b) => a.showAt - b.showAt);\\n<\/script>\\n\\n<!-- debug -->\\n<!-- <p style=\\"position:absolute; top:10px; left:10px; color:white; z-index:99;\\">\\n  currentTime: {currentTime}\\n</p> -->\\n<!-- <p style=\\"position:absolute; top:30px; left:10px; color:white; z-index:99;\\">\\n  bars: {JSON.stringify(bars)}\\n</p> -->\\n\\n<div class=\\"slide-container\\">\\n  <div class=\\"chart-area\\">\\n    {#each bars as bar}\\n      <div class=\\"bar-container\\">\\n        <div\\n          class=\\"bar\\"\\n          style=\\"height: {bar.value}%; background-color: {bar.color || '#3498db'}\\"\\n        ></div>\\n        <div class=\\"label\\">{bar.label}</div>\\n      </div>\\n    {/each}\\n  </div>\\n</div>\\n\\n  <style>\\n.slide-container {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;   /* ← center vertically */\\n  height: 100%;\\n  width: 100%;\\n  padding: 60px;         /* removed padding-bottom override */\\n  box-sizing: border-box;\\n}\\n\\n.bar-container {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  width: 60px;\\n  height: 100%;\\n  justify-content: flex-end;\\n}\\n\\n.chart-area {\\n  display: flex;\\n  align-items: flex-end;\\n  gap: 100px;\\n  height: 80%;\\n  width: 100%;\\n  justify-content: center;\\n}\\n\\n.bar {\\n  width: 100%;\\n  transition: height 0.3s ease-in-out;\\n}\\n\\n.label {\\n  margin-top: 12px;\\n  font-size: 1.5rem;\\n  color: black;\\n  text-align: center;\\n}\\n\\n@media (max-width: 768px) {\\n  .label {\\n    font-size: 1rem;\\n  }\\n  .bar-container {\\n    width: 40px;\\n  }\\n}\\n\\n</style>"],"names":[],"mappings":"AAiCA,+BAAiB,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UACd,CAEA,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,QACnB,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,QAAQ,CACrB,GAAG,CAAE,KAAK,CACV,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,MACnB,CAEA,mBAAK,CACH,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,WAC1B,CAEA,qBAAO,CACL,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACd,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,qBAAO,CACL,SAAS,CAAE,IACb,CACA,6BAAe,CACb,KAAK,CAAE,IACT,CACF"}`
};
const BarChartSlide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { currentTime } = $$props;
  let bars = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$h);
  bars = data.filter((item) => item.name === "bar" && item.showAt <= currentTime).sort((a, b) => a.showAt - b.showAt);
  return `   <div class="slide-container svelte-1oq83yb"><div class="chart-area svelte-1oq83yb">${each(bars, (bar) => {
    return `<div class="bar-container svelte-1oq83yb"><div class="bar svelte-1oq83yb" style="${"height: " + escape(bar.value, true) + "%; background-color: " + escape(bar.color || "#3498db", true)}"></div> <div class="label svelte-1oq83yb">${escape(bar.label)}</div> </div>`;
  })}</div> </div>`;
});
const css$g = {
  code: ".slide-outer.svelte-i78l9p{display:flex;align-items:center;justify-content:center;height:100vh;width:100%;overflow:hidden}.slide-scaler.svelte-i78l9p{width:100%;max-width:1000px;margin:0 auto}",
  map: `{"version":3,"file":"SlideScaler.svelte","sources":["SlideScaler.svelte"],"sourcesContent":["<!-- SlideScaler.svelte -->\\n<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  let handleResize;\\n\\n  onMount(() => {\\n    handleResize = () => {\\n      // scale down if viewport < 1000px, otherwise stay at 1\\n      const scale = Math.min(1, window.innerWidth / 1000);\\n      document.documentElement.style.setProperty('--scale', scale);\\n    };\\n\\n    handleResize();\\n    window.addEventListener('resize', handleResize);\\n  });\\n\\n  onDestroy(() => {\\n    window.removeEventListener('resize', handleResize);\\n  });\\n<\/script>\\n\\n<div class=\\"slide-outer\\">\\n  <div\\n    class=\\"slide-scaler\\"\\n    style=\\"transform: scale(var(--scale)); transform-origin: top center;\\"\\n  >\\n    <slot />\\n  </div>\\n</div>\\n\\n<style>\\n  /* Full-viewport flex container to center its child both vertically and horizontally */\\n  .slide-outer {\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    height: 100vh;\\n    width: 100%;\\n    overflow: hidden;\\n  }\\n\\n  /* Keeps the slide at a max 1000px width and handles the scale transform */\\n  .slide-scaler {\\n    width: 100%;\\n    max-width: 1000px;\\n    margin: 0 auto;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgCE,0BAAa,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,MACZ,CAGA,2BAAc,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IACZ"}`
};
const SlideScaler = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let handleResize;
  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
  });
  $$result.css.add(css$g);
  return `  <div class="slide-outer svelte-i78l9p"><div class="slide-scaler svelte-i78l9p" style="transform: scale(var(--scale)); transform-origin: top center;">${slots.default ? slots.default({}) : ``}</div> </div>`;
});
const css$f = {
  code: ".container.svelte-1hcy68h{display:flex;align-items:center;justify-content:center;height:100%}.two-col-slide.svelte-1hcy68h{display:flex;flex-direction:column;text-align:center;gap:clamp(1rem, 4vh, 3rem);padding:clamp(1rem, 4vw, 4rem);height:100%;box-sizing:border-box}.slide-title.svelte-1hcy68h{font-size:clamp(2rem, 6vw, 4rem);text-align:center;font-weight:700;margin:0}.columns.svelte-1hcy68h{display:flex;gap:clamp(1rem, 4vw, 4rem);flex:1}.column.svelte-1hcy68h{flex:1;min-width:0;font-size:clamp(1rem, 4vw, 2.5rem);white-space:pre-line;line-height:1.6}",
  map: `{"version":3,"file":"TwoColumnTextSlide.svelte","sources":["TwoColumnTextSlide.svelte"],"sourcesContent":["<!-- TwoColumnTextSlide.svelte -->\\n<script>\\n  import SlideScaler from './SlideScaler.svelte';\\n  export let data;\\n  export let currentTime = 0;\\n\\n  $: title = data.find(d => d.name === 'title' && d.showAt <= currentTime)?.content ?? '';\\n  $: left  = data.find(d => d.name === 'left'  && d.showAt <= currentTime)?.content ?? '';\\n  $: right = data.find(d => d.name === 'right' && d.showAt <= currentTime)?.content ?? '';\\n<\/script>\\n\\n<SlideScaler>\\n<div class=\\"container\\">\\n  <div class=\\"two-col-slide\\">\\n    {#if title}\\n      <h1 class=\\"slide-title\\">{title}</h1>\\n    {/if}\\n\\n    <div class=\\"columns\\">\\n      <div class=\\"column\\">{left}</div>\\n      <div class=\\"column\\">{right}</div>\\n    </div>\\n  </div>\\n</div>\\n</SlideScaler>\\n\\n<style>\\n\\n .container {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  height: 100%;     /* or any other fixed height */\\n } \\n.two-col-slide {\\n  display: flex;\\n  flex-direction: column;\\n  text-align: center;\\n  gap: clamp(1rem, 4vh, 3rem);\\n  padding: clamp(1rem, 4vw, 4rem);\\n  height: 100%;\\n  box-sizing: border-box;\\n}\\n\\n.slide-title {\\n  font-size: clamp(2rem, 6vw, 4rem);\\n  text-align: center;\\n  font-weight: 700;\\n  margin: 0;\\n}\\n\\n.columns {\\n  display: flex;\\n  gap: clamp(1rem, 4vw, 4rem);\\n  flex: 1;\\n}\\n\\n.column {\\n  flex: 1;\\n  min-width: 0;\\n  font-size: clamp(1rem, 4vw, 2.5rem);\\n  white-space: pre-line;\\n  line-height: 1.6;\\n}\\n</style>\\n"],"names":[],"mappings":"AA4BC,yBAAW,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IACT,CACD,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC3B,OAAO,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC/B,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,UACd,CAEA,2BAAa,CACX,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACjC,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CACV,CAEA,uBAAS,CACP,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC3B,IAAI,CAAE,CACR,CAEA,sBAAQ,CACN,IAAI,CAAE,CAAC,CACP,SAAS,CAAE,CAAC,CACZ,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CACnC,WAAW,CAAE,QAAQ,CACrB,WAAW,CAAE,GACf"}`
};
const TwoColumnTextSlide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let left;
  let right;
  let { data } = $$props;
  let { currentTime = 0 } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$f);
  title = data.find((d) => d.name === "title" && d.showAt <= currentTime)?.content ?? "";
  left = data.find((d) => d.name === "left" && d.showAt <= currentTime)?.content ?? "";
  right = data.find((d) => d.name === "right" && d.showAt <= currentTime)?.content ?? "";
  return `  ${validate_component(SlideScaler, "SlideScaler").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="container svelte-1hcy68h"><div class="two-col-slide svelte-1hcy68h">${title ? `<h1 class="slide-title svelte-1hcy68h">${escape(title)}</h1>` : ``} <div class="columns svelte-1hcy68h"><div class="column svelte-1hcy68h">${escape(left)}</div> <div class="column svelte-1hcy68h">${escape(right)}</div></div></div></div>`;
    }
  })}`;
});
const css$e = {
  code: ".donut-slide.svelte-180u8c1{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:2rem}svg.svelte-180u8c1{transform:rotate(-90deg)}.track.svelte-180u8c1{fill:none;stroke:#eee;stroke-width:20}.fill.svelte-180u8c1{fill:none;stroke-width:20;stroke-linecap:round;transition:stroke-dashoffset 1s ease}.center-text.svelte-180u8c1{fill:#333;font-size:2.5rem;font-weight:bold;transform:rotate(90deg)}.donut-label.svelte-180u8c1{font-size:2.5rem;font-weight:500}",
  map: '{"version":3,"file":"DonutChartSlide.svelte","sources":["DonutChartSlide.svelte"],"sourcesContent":["<script>\\n    export let data;\\n  \\n    const percent = parseInt(data.find(d => d.name === \\"percent\\")?.content ?? 0);\\n    const label = data.find(d => d.name === \\"label\\")?.content ?? \\"\\";\\n    const color = data.find(d => d.name === \\"color\\")?.content ?? \\"#4CAF50\\";\\n  \\n    const circumference = 2 * Math.PI * 80;\\n    const offset = circumference * (1 - percent / 100);\\n  <\/script>\\n  \\n  <div class=\\"donut-slide\\">\\n    <svg width=\\"200\\" height=\\"200\\" viewBox=\\"0 0 200 200\\">\\n      <circle class=\\"track\\" cx=\\"100\\" cy=\\"100\\" r=\\"80\\" />\\n      <circle\\n        class=\\"fill\\"\\n        cx=\\"100\\"\\n        cy=\\"100\\"\\n        r=\\"80\\"\\n        stroke={color}\\n        stroke-dasharray={circumference}\\n        stroke-dashoffset={offset}\\n      />\\n      <text x=\\"100\\" y=\\"110\\" text-anchor=\\"middle\\" class=\\"center-text\\">{percent}%</text>\\n    </svg>\\n    <div class=\\"donut-label\\">{label}</div>\\n  </div>\\n  \\n  <style>\\n  .donut-slide {\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    justify-content: center;\\n    height: 100vh;\\n    gap: 2rem;\\n  }\\n  \\n  svg {\\n    transform: rotate(-90deg);\\n  }\\n  \\n  .track {\\n    fill: none;\\n    stroke: #eee;\\n    stroke-width: 20;\\n  }\\n  \\n  .fill {\\n    fill: none;\\n    stroke-width: 20;\\n    stroke-linecap: round;\\n    transition: stroke-dashoffset 1s ease;\\n  }\\n  \\n  .center-text {\\n    fill: #333;\\n    font-size: 2.5rem;\\n    font-weight: bold;\\n    transform: rotate(90deg);\\n  }\\n  \\n  .donut-label {\\n    font-size: 2.5rem;\\n    font-weight: 500;\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AA6BE,2BAAa,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,KAAK,CACb,GAAG,CAAE,IACP,CAEA,kBAAI,CACF,SAAS,CAAE,OAAO,MAAM,CAC1B,CAEA,qBAAO,CACL,IAAI,CAAE,IAAI,CACV,MAAM,CAAE,IAAI,CACZ,YAAY,CAAE,EAChB,CAEA,oBAAM,CACJ,IAAI,CAAE,IAAI,CACV,YAAY,CAAE,EAAE,CAChB,cAAc,CAAE,KAAK,CACrB,UAAU,CAAE,iBAAiB,CAAC,EAAE,CAAC,IACnC,CAEA,2BAAa,CACX,IAAI,CAAE,IAAI,CACV,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,OAAO,KAAK,CACzB,CAEA,2BAAa,CACX,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GACf"}'
};
const DonutChartSlide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const percent = parseInt(data.find((d) => d.name === "percent")?.content ?? 0);
  const label = data.find((d) => d.name === "label")?.content ?? "";
  const color = data.find((d) => d.name === "color")?.content ?? "#4CAF50";
  const circumference = 2 * Math.PI * 80;
  const offset = circumference * (1 - percent / 100);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$e);
  return `<div class="donut-slide svelte-180u8c1"><svg width="200" height="200" viewBox="0 0 200 200" class="svelte-180u8c1"><circle class="track svelte-180u8c1" cx="100" cy="100" r="80"></circle><circle class="fill svelte-180u8c1" cx="100" cy="100" r="80"${add_attribute("stroke", color, 0)}${add_attribute("stroke-dasharray", circumference, 0)}${add_attribute("stroke-dashoffset", offset, 0)}></circle><text x="100" y="110" text-anchor="middle" class="center-text svelte-180u8c1">${escape(percent)}%</text></svg> <div class="donut-label svelte-180u8c1">${escape(label)}</div> </div>`;
});
const css$d = {
  code: ".slide-container.svelte-d2p9h1{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%;padding:40px;box-sizing:border-box;text-align:center;gap:20px}.slide-title.svelte-d2p9h1{font-size:6rem;margin:0}.slide-subtitle.svelte-d2p9h1{font-size:3rem;margin:0;opacity:0.8}@media(max-width: 768px){.slide-title.svelte-d2p9h1{font-size:3rem}.slide-subtitle.svelte-d2p9h1{font-size:1.25rem}}",
  map: '{"version":3,"file":"TitleAndSubtitle.svelte","sources":["TitleAndSubtitle.svelte"],"sourcesContent":["<script>\\n  export let data;\\n  export let currentTime;\\n\\n  $: title = data.find(d => d.name === \\"title\\" && d.showAt <= currentTime)?.content ?? \\"\\";\\n  $: subtitle = data.find(d => d.name === \\"subtitle\\" && d.showAt <= currentTime)?.content ?? \\"\\";\\n<\/script>\\n\\n<div class=\\"slide-container\\">\\n  {#if title}\\n    <h1 class=\\"slide-title\\">{title}</h1>\\n  {/if}\\n  {#if subtitle}\\n    <p class=\\"slide-subtitle\\">{subtitle}</p>\\n  {/if}\\n</div>\\n\\n<style>\\n.slide-container {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  height: 100%;\\n  width: 100%;\\n  padding: 40px;\\n  box-sizing: border-box;\\n  text-align: center;\\n  gap: 20px;\\n}\\n\\n.slide-title {\\n  font-size: 6rem;\\n  margin: 0;\\n}\\n\\n.slide-subtitle {\\n  font-size: 3rem;\\n  margin: 0;\\n  opacity: 0.8;\\n}\\n\\n@media (max-width: 768px) {\\n  .slide-title {\\n    font-size: 3rem;\\n  }\\n  .slide-subtitle {\\n    font-size: 1.25rem;\\n  }\\n}\\n</style>\\n"],"names":[],"mappings":"AAkBA,8BAAiB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,IACP,CAEA,0BAAa,CACX,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CACV,CAEA,6BAAgB,CACd,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,GACX,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,0BAAa,CACX,SAAS,CAAE,IACb,CACA,6BAAgB,CACd,SAAS,CAAE,OACb,CACF"}'
};
const TitleAndSubtitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let subtitle;
  let { data } = $$props;
  let { currentTime } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$d);
  title = data.find((d) => d.name === "title" && d.showAt <= currentTime)?.content ?? "";
  subtitle = data.find((d) => d.name === "subtitle" && d.showAt <= currentTime)?.content ?? "";
  return `<div class="slide-container svelte-d2p9h1">${title ? `<h1 class="slide-title svelte-d2p9h1">${escape(title)}</h1>` : ``} ${subtitle ? `<p class="slide-subtitle svelte-d2p9h1">${escape(subtitle)}</p>` : ``} </div>`;
});
const css$c = {
  code: ".wrapper.svelte-iy1azi{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;text-align:center;padding:0 2rem}.title.svelte-iy1azi{font-size:3rem;font-weight:700;margin:0 0 1rem 0;line-height:1.2}.paragraph.svelte-iy1azi{font-size:1.9rem;line-height:1.5;font-family:Helvetica , Arial , sans-serif;max-width:1000px;margin:0 auto;text-align:justify;text-justify:inter-word}",
  map: `{"version":3,"file":"TitleAndPara.svelte","sources":["TitleAndPara.svelte"],"sourcesContent":["<script>\\n  // Received slide data (title and paragraph) and current time pointer\\n  export let data = [];\\n\\n\\n  // Find title and paragraph items\\n  const titleItem = data.find(item => item.name === 'title');\\n  const paragraphItem = data.find(item => item.name === 'paragraph');\\n<\/script>\\n\\n<!-- Always show title and paragraph centered -->\\n<div class=\\"wrapper\\">\\n  {#if titleItem}\\n    <h1 class=\\"title\\">{titleItem.content}</h1>\\n  {/if}\\n\\n  {#if paragraphItem}\\n    <p class=\\"paragraph\\">{paragraphItem.content}</p>\\n  {/if}\\n</div>\\n\\n<style>\\n  .wrapper {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: center;\\n    height: 100%;\\n    width: 100%;\\n    text-align: center;\\n    padding: 0 2rem;\\n  }\\n\\n  .title {\\n    font-size: 3rem;\\n    font-weight: 700;\\n    margin: 0 0 1rem 0;\\n    line-height: 1.2;\\n  }\\n\\n  .paragraph {\\n    font-size: 1.9rem;\\n    line-height: 1.5;\\n    font-family: Helvetica , Arial , sans-serif;\\n    max-width: 1000px;\\n    margin: 0 auto;        /* center the block if you like */\\n  text-align: justify;   /* justify both left and right edges */\\n  text-justify: inter-word; /* improve spacing in most browsers */\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsBE,sBAAS,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,CAAC,CAAC,IACb,CAEA,oBAAO,CACL,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAClB,WAAW,CAAE,GACf,CAEA,wBAAW,CACT,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,SAAS,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,UAAU,CAC3C,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CAChB,UAAU,CAAE,OAAO,CACnB,YAAY,CAAE,UACd"}`
};
const TitleAndPara = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = [] } = $$props;
  const titleItem = data.find((item) => item.name === "title");
  const paragraphItem = data.find((item) => item.name === "paragraph");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$c);
  return ` <div class="wrapper svelte-iy1azi">${titleItem ? `<h1 class="title svelte-iy1azi">${escape(titleItem.content)}</h1>` : ``} ${paragraphItem ? `<p class="paragraph svelte-iy1azi">${escape(paragraphItem.content)}</p>` : ``} </div>`;
});
const css$b = {
  code: ".slide-container.svelte-dfkf1f{display:flex;justify-content:center;align-items:center;height:100%;width:100%;padding:40px;box-sizing:border-box}.bullet-list.svelte-dfkf1f{list-style-type:disc;padding-left:1.5rem;font-size:5rem}.bullet-item.svelte-dfkf1f{margin-bottom:0.8rem}.bullet-item.dim.svelte-dfkf1f{opacity:0.45}.bullet-item.active.svelte-dfkf1f{opacity:1;font-weight:700}@media(max-width: 768px){.bullet-list.svelte-dfkf1f{font-size:2rem}}",
  map: `{"version":3,"file":"BulletList.svelte","sources":["BulletList.svelte"],"sourcesContent":["<script>\\n  export let data;\\n  export let currentTime;\\n\\n  // All bullets visible; sort by showAt for stable order\\n  $: bullets = (Array.isArray(data) ? data : [])\\n    .filter(item => item?.name === \\"bullet\\")\\n    .sort((a, b) => a.showAt - b.showAt);\\n<\/script>\\n\\n<div class=\\"slide-container\\">\\n  <ul class=\\"bullet-list\\">\\n    {#each bullets as b}\\n      <li class={\`bullet-item \${currentTime >= b.showAt ? 'active' : 'dim'}\`}>\\n        {b.content}\\n      </li>\\n    {/each}\\n  </ul>\\n</div>\\n\\n<style>\\n.slide-container {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  height: 100%;\\n  width: 100%;\\n  padding: 40px;\\n  box-sizing: border-box;\\n}\\n\\n.bullet-list {\\n  list-style-type: disc;\\n  padding-left: 1.5rem;\\n  font-size: 5rem;\\n}\\n\\n.bullet-item {\\n  margin-bottom: 0.8rem;\\n}\\n\\n/* NEW: highlight vs. pre-highlight */\\n.bullet-item.dim {\\n  opacity: 0.45;\\n}\\n.bullet-item.active {\\n  opacity: 1;\\n  font-weight: 700;\\n}\\n\\n@media (max-width: 768px) {\\n  .bullet-list {\\n    font-size: 2rem;\\n  }\\n}\\n</style>\\n"],"names":[],"mappings":"AAqBA,8BAAiB,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UACd,CAEA,0BAAa,CACX,eAAe,CAAE,IAAI,CACrB,YAAY,CAAE,MAAM,CACpB,SAAS,CAAE,IACb,CAEA,0BAAa,CACX,aAAa,CAAE,MACjB,CAGA,YAAY,kBAAK,CACf,OAAO,CAAE,IACX,CACA,YAAY,qBAAQ,CAClB,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,GACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,0BAAa,CACX,SAAS,CAAE,IACb,CACF"}`
};
const BulletList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let bullets;
  let { data } = $$props;
  let { currentTime } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$b);
  bullets = (Array.isArray(data) ? data : []).filter((item) => item?.name === "bullet").sort((a, b) => a.showAt - b.showAt);
  return `<div class="slide-container svelte-dfkf1f"><ul class="bullet-list svelte-dfkf1f">${each(bullets, (b) => {
    return `<li class="${escape(null_to_empty(`bullet-item ${currentTime >= b.showAt ? "active" : "dim"}`), true) + " svelte-dfkf1f"}">${escape(b.content)} </li>`;
  })}</ul> </div>`;
});
const css$a = {
  code: ".slide-container.svelte-hzv82f{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;gap:20px;padding:40px;box-sizing:border-box;text-align:center}.big-number.svelte-hzv82f{font-size:6rem;font-weight:bold}.label-text.svelte-hzv82f{font-size:1.5rem;opacity:0.8}@media(max-width: 768px){.big-number.svelte-hzv82f{font-size:3rem}.label-text.svelte-hzv82f{font-size:1rem}}",
  map: '{"version":3,"file":"BigNumber.svelte","sources":["BigNumber.svelte"],"sourcesContent":["<script>\\n    export let data;\\n  \\n    const number = data.find(d => d.name === \\"number\\")?.content ?? \\"\\";\\n    const label = data.find(d => d.name === \\"label\\")?.content ?? \\"\\";\\n  <\/script>\\n  \\n  <div class=\\"slide-container\\">\\n    <div class=\\"big-number\\">{number}</div>\\n    <div class=\\"label-text\\">{label}</div>\\n  </div>\\n  \\n  <style>\\n  .slide-container {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: center;\\n    height: 100%;\\n    width: 100%;\\n    gap: 20px;\\n    padding: 40px;\\n    box-sizing: border-box;\\n    text-align: center;\\n  }\\n  \\n  .big-number {\\n    font-size: 6rem;\\n    font-weight: bold;\\n  }\\n  \\n  .label-text {\\n    font-size: 1.5rem;\\n    opacity: 0.8;\\n  }\\n  \\n  @media (max-width: 768px) {\\n    .big-number {\\n      font-size: 3rem;\\n    }\\n  \\n    .label-text {\\n      font-size: 1rem;\\n    }\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AAaE,8BAAiB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,MACd,CAEA,yBAAY,CACV,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IACf,CAEA,yBAAY,CACV,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,GACX,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,yBAAY,CACV,SAAS,CAAE,IACb,CAEA,yBAAY,CACV,SAAS,CAAE,IACb,CACF"}'
};
const BigNumber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const number = data.find((d) => d.name === "number")?.content ?? "";
  const label = data.find((d) => d.name === "label")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$a);
  return `<div class="slide-container svelte-hzv82f"><div class="big-number svelte-hzv82f">${escape(number)}</div> <div class="label-text svelte-hzv82f">${escape(label)}</div> </div>`;
});
const css$9 = {
  code: ".slide.svelte-1sisncx.svelte-1sisncx{display:flex;flex-direction:column;justify-content:flex-start;align-items:center;text-align:center;padding:clamp(1rem, 5vw, 2rem);height:100vh;box-sizing:border-box}.title.svelte-1sisncx.svelte-1sisncx{font-size:clamp(2rem, 6vw, 3rem);margin:clamp(0.25rem, 1.5vw, 0.75rem) 0;line-height:1.1}.subtitle.svelte-1sisncx.svelte-1sisncx{font-size:clamp(1.25rem, 4vw, 1.5rem);margin-bottom:clamp(0.5rem, 2vw, 1rem);opacity:0.8}.image-container.svelte-1sisncx.svelte-1sisncx{flex:1;display:flex;justify-content:center;align-items:center;width:100%}.image-container.svelte-1sisncx img.svelte-1sisncx{width:clamp(40%, 70vw, 70%);height:auto;-o-object-fit:contain;object-fit:contain}",
  map: '{"version":3,"file":"QuoteWithImage.svelte","sources":["QuoteWithImage.svelte"],"sourcesContent":["<script>\\n  export let data;\\n\\n  // Extract slide data\\n  const title = data.find(d => d.name === \\"quoteLine\\")?.content ?? \\"\\";\\n  const subtitle = data.find(d => d.name === \\"author\\")?.content ?? \\"\\";\\n  const imageSrc = data.find(d => d.name === \\"image\\")?.content ?? \\"\\";\\n<\/script>\\n\\n<div class=\\"slide\\">\\n  <h1 class=\\"title\\">{title}</h1>\\n  <p class=\\"subtitle\\">— {subtitle}</p>\\n  <div class=\\"image-container\\">\\n    <img src={imageSrc} alt={subtitle} />\\n  </div>\\n</div>\\n\\n<style>\\n.slide {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: flex-start;\\n  align-items: center;\\n  text-align: center;\\n  padding: clamp(1rem, 5vw, 2rem);\\n  height: 100vh;\\n  box-sizing: border-box;\\n}\\n\\n.title {\\n  font-size: clamp(2rem, 6vw, 3rem);\\n  margin: clamp(0.25rem, 1.5vw, 0.75rem) 0;\\n  line-height: 1.1;\\n}\\n\\n.subtitle {\\n  font-size: clamp(1.25rem, 4vw, 1.5rem);\\n  margin-bottom: clamp(0.5rem, 2vw, 1rem);\\n  opacity: 0.8;\\n}\\n\\n.image-container {\\n  flex: 1;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  width: 100%;\\n}\\n\\n.image-container img {\\n  width: clamp(40%, 70vw, 70%);\\n  height: auto;\\n  -o-object-fit: contain;\\n     object-fit: contain;\\n}\\n</style>\\n"],"names":[],"mappings":"AAkBA,oCAAO,CACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,UAAU,CAC3B,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAC/B,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,UACd,CAEA,oCAAO,CACL,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACjC,MAAM,CAAE,MAAM,OAAO,CAAC,CAAC,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,CACxC,WAAW,CAAE,GACf,CAEA,uCAAU,CACR,SAAS,CAAE,MAAM,OAAO,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CACtC,aAAa,CAAE,MAAM,MAAM,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACvC,OAAO,CAAE,GACX,CAEA,8CAAiB,CACf,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IACT,CAEA,+BAAgB,CAAC,kBAAI,CACnB,KAAK,CAAE,MAAM,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAC5B,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OACjB"}'
};
const QuoteWithImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const title = data.find((d) => d.name === "quoteLine")?.content ?? "";
  const subtitle = data.find((d) => d.name === "author")?.content ?? "";
  const imageSrc = data.find((d) => d.name === "image")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$9);
  return `<div class="slide svelte-1sisncx"><h1 class="title svelte-1sisncx">${escape(title)}</h1> <p class="subtitle svelte-1sisncx">— ${escape(subtitle)}</p> <div class="image-container svelte-1sisncx"><img${add_attribute("src", imageSrc, 0)}${add_attribute("alt", subtitle, 0)} class="svelte-1sisncx"></div> </div>`;
});
const css$8 = {
  code: ".slide-container.svelte-zu687n{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;text-align:center;gap:12px;padding:40px;box-sizing:border-box}.headline.svelte-zu687n{font-size:5.6rem;margin:0 0 10px 0}.contact-line.svelte-zu687n{font-size:3.5rem;margin:0}@media(max-width: 768px){.headline.svelte-zu687n{font-size:3.6rem}.contact-line.svelte-zu687n{font-size:2rem}}",
  map: '{"version":3,"file":"ContactSlide.svelte","sources":["ContactSlide.svelte"],"sourcesContent":["<script>\\n    export let data;\\n  \\n    const headline = data.find(d => d.name === \\"headline\\")?.content ?? \\"\\";\\n    const email = data.find(d => d.name === \\"email\\")?.content ?? \\"\\";\\n    const phone = data.find(d => d.name === \\"phone\\")?.content ?? \\"\\";\\n  <\/script>\\n  \\n  <div class=\\"slide-container\\">\\n    <h1 class=\\"headline\\">{headline}</h1>\\n    <p class=\\"contact-line\\">Email: {email}</p>\\n    <p class=\\"contact-line\\">Phone: {phone}</p>\\n  </div>\\n  \\n  <style>\\n  .slide-container {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: center;\\n    height: 100%;\\n    width: 100%;\\n    text-align: center;\\n    gap: 12px;\\n    padding: 40px;\\n    box-sizing: border-box;\\n  }\\n  \\n  .headline {\\n    font-size: 5.6rem;\\n    margin: 0 0 10px 0;\\n  }\\n  \\n  .contact-line {\\n    font-size: 3.5rem;\\n    margin: 0;\\n  }\\n  \\n  @media (max-width: 768px) {\\n    .headline {\\n      font-size: 3.6rem;\\n    }\\n  \\n    .contact-line {\\n      font-size: 2rem;\\n    }\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AAeE,8BAAiB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UACd,CAEA,uBAAU,CACR,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACnB,CAEA,2BAAc,CACZ,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CACV,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,uBAAU,CACR,SAAS,CAAE,MACb,CAEA,2BAAc,CACZ,SAAS,CAAE,IACb,CACF"}'
};
const ContactSlide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const headline = data.find((d) => d.name === "headline")?.content ?? "";
  const email = data.find((d) => d.name === "email")?.content ?? "";
  const phone = data.find((d) => d.name === "phone")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$8);
  return `<div class="slide-container svelte-zu687n"><h1 class="headline svelte-zu687n">${escape(headline)}</h1> <p class="contact-line svelte-zu687n">Email: ${escape(email)}</p> <p class="contact-line svelte-zu687n">Phone: ${escape(phone)}</p> </div>`;
});
const css$7 = {
  code: ".full-image-slide.svelte-1ubxe27{height:100%;width:100%;padding:1rem;box-sizing:border-box}.full-image.svelte-1ubxe27{width:100%;height:100%;-o-object-fit:contain;object-fit:contain;display:block}",
  map: '{"version":3,"file":"FillImage.svelte","sources":["FillImage.svelte"],"sourcesContent":["<!-- FullImageSlide.svelte -->\\n<script>\\n    export let data;\\n    const imageSrc = data.find(d => d.name === \\"image\\")?.content ?? \\"\\";\\n  <\/script>\\n  \\n  <div class=\\"full-image-slide\\">\\n    <!-- svelte-ignore a11y-img-redundant-alt -->\\n    <img class=\\"full-image\\" src={imageSrc} alt=\\"Slide Image\\" />\\n  </div>\\n  \\n  <style>\\n    /* Fullscreen image slide container */\\n    .full-image-slide {\\n      height: 100%;\\n      width: 100%;\\n      padding: 1rem;               /* breathing room around edges */\\n      box-sizing: border-box;\\n    }\\n  \\n    .full-image {\\n      width: 100%;\\n      height: 100%;\\n      -o-object-fit: contain;\\n         object-fit: contain;         /* no crop, scale to fit */\\n      display: block;\\n    }\\n  </style>\\n  "],"names":[],"mappings":"AAaI,gCAAkB,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,UACd,CAEA,0BAAY,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OAAO,CACtB,OAAO,CAAE,KACX"}'
};
const FillImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const imageSrc = data.find((d) => d.name === "image")?.content ?? "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css$7);
  return `  <div class="full-image-slide svelte-1ubxe27"> <img class="full-image svelte-1ubxe27"${add_attribute("src", imageSrc, 0)} alt="Slide Image"> </div>`;
});
const css$6 = {
  code: ".eq-heading.svelte-1pls5no{display:block;margin:0 0 0.5rem 0;padding:0.5rem 1rem;text-align:center;font-size:1.5rem;font-weight:600;color:#333;background-color:#f5ebe0;border-left:4px solid #d18b5a;border-radius:0.25rem;text-transform:uppercase;letter-spacing:0.05em}.eq-lines.svelte-1pls5no{display:flex;flex-direction:column;gap:1rem}.eq-line.svelte-1pls5no{padding:0.75rem;border-radius:0.5rem;border:1px solid #ddd;background-color:white;transition:background-color 0.3s ease, opacity 0.3s ease}.eq-line.active.svelte-1pls5no{background-color:#9dec96;border-left:4px solid #444;font-size:1.75rem;opacity:1}.eq-line.inactive.svelte-1pls5no{opacity:0.6;font-size:1.25rem}",
  map: `{"version":3,"file":"EqLines.svelte","sources":["EqLines.svelte"],"sourcesContent":["<!-- EqLines.svelte -->\\n<script>\\n  import Katex from 'svelte-katex';\\n  export let lines = [];\\n  export let currentTime;\\n\\n  // Compute which line is currently active\\n  $: activeIndex = lines.findIndex(\\n    (line, idx) =>\\n      line.showAt <= currentTime &&\\n      (idx === lines.length - 1 || lines[idx + 1].showAt > currentTime)\\n  );\\n  $: activeLine = lines[activeIndex];\\n\\n  // Always remove items from top so that active line is third from top\\n  const topOffset = 2;\\n  $: visibleBlocks = lines.slice(Math.max(0, activeIndex - topOffset));\\n<\/script>\\n\\n<div class=\\"eq-lines\\">\\n  {#each visibleBlocks as line}\\n    <div\\n      class=\\"eq-line\\"\\n      class:active={line === activeLine}\\n      class:inactive={line !== activeLine}\\n    >\\n      {#if line.type === 'math'}\\n        <Katex displayMode>{line.content}</Katex>\\n      {:else if line.type === 'text'}\\n        {line.content}\\n      {:else if line.type === 'heading'}\\n        <span class=\\"eq-heading\\">{line.content}</span>\\n      {:else}\\n        {@html line.content}\\n      {/if}\\n    </div>\\n  {/each}\\n</div>\\n\\n<style>\\n  .eq-heading{\\n    display: block;\\n  margin: 0 0 0.5rem 0;\\n  padding: 0.5rem 1rem;\\n  text-align: center;\\n  font-size: 1.5rem;\\n  font-weight: 600;\\n  color: #333;\\n  background-color: #f5ebe0;\\n  border-left: 4px solid #d18b5a;\\n  border-radius: 0.25rem;\\n  text-transform: uppercase;\\n  letter-spacing: 0.05em;\\n  }\\n  .eq-lines {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 1rem;\\n  }\\n\\n  .eq-line {\\n    padding: 0.75rem;\\n    border-radius: 0.5rem;\\n    border: 1px solid #ddd;\\n    background-color: white;\\n    transition: background-color 0.3s ease, opacity 0.3s ease;\\n  }\\n\\n  .eq-line.active {\\n    background-color: #9dec96;\\n    border-left: 4px solid #444;\\n    font-size: 1.75rem;\\n    opacity: 1;\\n  }\\n\\n  .eq-line.inactive {\\n    opacity: 0.6;\\n    font-size: 1.25rem;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAwCE,0BAAW,CACT,OAAO,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CACpB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC9B,aAAa,CAAE,OAAO,CACtB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,MAChB,CACA,wBAAU,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACP,CAEA,uBAAS,CACP,OAAO,CAAE,OAAO,CAChB,aAAa,CAAE,MAAM,CACrB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,gBAAgB,CAAE,KAAK,CACvB,UAAU,CAAE,gBAAgB,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,IACvD,CAEA,QAAQ,sBAAQ,CACd,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC3B,SAAS,CAAE,OAAO,CAClB,OAAO,CAAE,CACX,CAEA,QAAQ,wBAAU,CAChB,OAAO,CAAE,GAAG,CACZ,SAAS,CAAE,OACb"}`
};
const topOffset = 2;
const EqLines = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeIndex;
  let activeLine;
  let visibleBlocks;
  let { lines = [] } = $$props;
  let { currentTime } = $$props;
  if ($$props.lines === void 0 && $$bindings.lines && lines !== void 0) $$bindings.lines(lines);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$6);
  activeIndex = lines.findIndex((line, idx) => line.showAt <= currentTime && (idx === lines.length - 1 || lines[idx + 1].showAt > currentTime));
  activeLine = lines[activeIndex];
  visibleBlocks = lines.slice(Math.max(0, activeIndex - topOffset));
  return `  <div class="eq-lines svelte-1pls5no">${each(visibleBlocks, (line) => {
    return `<div class="${[
      "eq-line svelte-1pls5no",
      (line === activeLine ? "active" : "") + " " + (line !== activeLine ? "inactive" : "")
    ].join(" ").trim()}">${line.type === "math" ? `${validate_component(Katex, "Katex").$$render($$result, { displayMode: true }, {}, {
      default: () => {
        return `${escape(line.content)}`;
      }
    })}` : `${line.type === "text" ? `${escape(line.content)}` : `${line.type === "heading" ? `<span class="eq-heading svelte-1pls5no">${escape(line.content)}</span>` : `<!-- HTML_TAG_START -->${line.content}<!-- HTML_TAG_END -->`}`}`} </div>`;
  })} </div>`;
});
const css$5 = {
  code: ".eq-sidebar.svelte-20ziul.svelte-20ziul{display:flex;flex-direction:column;gap:0.5rem}.sp-item.svelte-20ziul.svelte-20ziul{padding:0.5rem;font-size:2rem;border-radius:0.25rem;background-color:#1f2937;color:white}.sp-item.image.svelte-20ziul.svelte-20ziul{padding:0;background:none}.sp-item.image.svelte-20ziul img.svelte-20ziul{max-width:100%;height:auto;display:block;opacity:1;border-radius:0.25rem}.sp-item.title.svelte-20ziul.svelte-20ziul{text-align:center;background-color:cornsilk;color:rgb(14, 32, 234);font-size:1.5rem}.sp-item.text.svelte-20ziul.svelte-20ziul{text-align:center;font-size:1.5rem}",
  map: `{"version":3,"file":"EqSidebar.svelte","sources":["EqSidebar.svelte"],"sourcesContent":["<!-- EqSidebar.svelte -->\\n<script>\\n  import Katex from 'svelte-katex';\\n  export let spItems = [];\\n<\/script>\\n\\n<div class=\\"eq-sidebar\\">\\n  {#each spItems as item}\\n    {#if item.type === 'spMath'}\\n      <div class=\\"sp-item math\\">\\n        <Katex displayMode>{item.content}</Katex>\\n      </div>\\n\\n    {:else if item.type === 'spHeading'}\\n      <div class=\\"sp-item title\\">{item.content}</div>\\n\\n    {:else if item.type === 'spImage'}\\n      <div class=\\"sp-item image\\">\\n        <img src={item.content} alt=\\"\\" />\\n      </div>\\n\\n    {:else}\\n      <div class=\\"sp-item text\\">{item.content}</div>\\n    {/if}\\n  {/each}\\n</div>\\n\\n<style>\\n  .eq-sidebar {\\n    display: flex;\\n    flex-direction: column;\\n    gap: 0.5rem;\\n  }\\n\\n  .sp-item {\\n    padding: 0.5rem;\\n    font-size: 2rem;\\n    border-radius: 0.25rem;\\n    background-color: #1f2937;\\n    color: white;\\n  }\\n\\n  .sp-item.math {\\n    /* KaTeX styling via imported CSS */\\n  }\\n\\n  /* Add these rules to support image items in the sidebar */\\n.sp-item.image {\\n  padding: 0;            /* remove text padding */\\n  background: none;      /* let the image fill the container */\\n}\\n\\n.sp-item.image img {\\n  max-width: 100%;       /* constrain to container width */\\n  height: auto;          /* maintain aspect ratio */\\n  display: block;\\n  opacity: 1;\\n  border-radius: 0.25rem;\\n}\\n\\n  .sp-item.title {\\n    text-align: center;\\n    background-color: cornsilk;\\n    color: rgb(14, 32, 234);\\n    font-size: 1.5rem;\\n  }\\n\\n  .sp-item.text {\\n    text-align: center;\\n    font-size: 1.5rem;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4BE,uCAAY,CACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,MACP,CAEA,oCAAS,CACP,OAAO,CAAE,MAAM,CACf,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,OAAO,CACtB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KACT,CAOF,QAAQ,kCAAO,CACb,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,IACd,CAEA,QAAQ,oBAAM,CAAC,iBAAI,CACjB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KAAK,CACd,OAAO,CAAE,CAAC,CACV,aAAa,CAAE,OACjB,CAEE,QAAQ,kCAAO,CACb,UAAU,CAAE,MAAM,CAClB,gBAAgB,CAAE,QAAQ,CAC1B,KAAK,CAAE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACvB,SAAS,CAAE,MACb,CAEA,QAAQ,iCAAM,CACZ,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MACb"}`
};
const EqSidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { spItems = [] } = $$props;
  if ($$props.spItems === void 0 && $$bindings.spItems && spItems !== void 0) $$bindings.spItems(spItems);
  $$result.css.add(css$5);
  return `  <div class="eq-sidebar svelte-20ziul">${each(spItems, (item) => {
    return `${item.type === "spMath" ? `<div class="sp-item math svelte-20ziul">${validate_component(Katex, "Katex").$$render($$result, { displayMode: true }, {}, {
      default: () => {
        return `${escape(item.content)}`;
      }
    })} </div>` : `${item.type === "spHeading" ? `<div class="sp-item title svelte-20ziul">${escape(item.content)}</div>` : `${item.type === "spImage" ? `<div class="sp-item image svelte-20ziul"><img${add_attribute("src", item.content, 0)} alt="" class="svelte-20ziul"> </div>` : `<div class="sp-item text svelte-20ziul">${escape(item.content)}</div>`}`}`}`;
  })} </div>`;
});
const css$4 = {
  code: ".eq-container.svelte-4jxrw4{display:flex;width:100%;height:100%;background-color:rgb(148, 144, 165)}.eq-left.svelte-4jxrw4{width:70%;padding:1rem;overflow-y:auto}.eq-right.svelte-4jxrw4{width:30%;padding:1rem;overflow-y:auto;border-left:1px solid #e5e7eb;background-color:#1f2937;color:white}",
  map: `{"version":3,"file":"Eq.svelte","sources":["Eq.svelte"],"sourcesContent":["<script>\\n\\n  import EqLines from './EqLines.svelte';\\n  import EqSidebar from './EqSidebar.svelte';\\n\\n  export let data = [];\\n  export let currentTime = 0;\\n\\n  // lines already have shape: { name: \\"line\\", showAt, content, type, spItems: [...] }\\n  $: lines = data.filter(item => item.name === \\"line\\");\\n\\n  $: activeLine = lines.findLast(l => l.showAt <= currentTime);\\n  $: visibleSpItems = activeLine?.spItems ?? (lines[0]?.spItems ?? []);\\n<\/script>\\n<link rel=\\"stylesheet\\" href=\\"/css/katex.min.css\\">\\n\\n<div class=\\"eq-container\\">\\n\\n    <div class=\\"eq-left\\">\\n      <EqLines lines={lines} {currentTime} />\\n    </div>\\n    \\n    <div class=\\"eq-right\\">\\n      <EqSidebar spItems={visibleSpItems} />\\n    </div>\\n\\n</div>\\n\\n\\n<style>\\n  .eq-container {\\n    display: flex;\\n    width: 100%;\\n    height: 100%;\\n    background-color: rgb(148, 144, 165);\\n  }\\n\\n  .eq-left {\\n    width: 70%;\\n    padding: 1rem;\\n    overflow-y: auto;\\n  }\\n\\n  .eq-right {\\n    width: 30%;\\n    padding: 1rem;\\n    overflow-y: auto;\\n    border-left: 1px solid #e5e7eb; /* gray-200 */\\n    background-color: #1f2937; /* gray-800 */\\n    color: white;\\n  }\\n</style>\\n\\n"],"names":[],"mappings":"AA8BE,2BAAc,CACZ,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACrC,CAEA,sBAAS,CACP,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IACd,CAEA,uBAAU,CACR,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC9B,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KACT"}`
};
const Eq = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lines;
  let activeLine;
  let visibleSpItems;
  let { data = [] } = $$props;
  let { currentTime = 0 } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$4);
  lines = data.filter((item) => item.name === "line");
  activeLine = lines.findLast((l) => l.showAt <= currentTime);
  visibleSpItems = activeLine?.spItems ?? (lines[0]?.spItems ?? []);
  return `<link rel="stylesheet" href="/css/katex.min.css"> <div class="eq-container svelte-4jxrw4"><div class="eq-left svelte-4jxrw4">${validate_component(EqLines, "EqLines").$$render($$result, { lines, currentTime }, {}, {})}</div> <div class="eq-right svelte-4jxrw4">${validate_component(EqSidebar, "EqSidebar").$$render($$result, { spItems: visibleSpItems }, {}, {})}</div> </div>`;
});
const css$3 = {
  code: ".svg-wrapper.svelte-e6g8gj{width:100%;height:100%}@keyframes svelte-e6g8gj-blink{0%,100%{opacity:1}50%{opacity:0.15}}.blink{animation:svelte-e6g8gj-blink 1s linear infinite}svg g#overlay .arrow{stroke:red;fill:none;stroke-width:2;stroke-linecap:round}svg g#overlay .circle{stroke:red;fill:none;stroke-width:2}svg g#overlay .dot{fill:red;stroke:red;stroke-width:0}",
  map: '{"version":3,"file":"SvgPointer.svelte","sources":["SvgPointer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount, onDestroy } from \\"svelte\\";\\nexport let data = [];\\nexport let currentTime = 0;\\nconst DEF_DUR = 5;\\nconst imgEntry = data.find((d) => d.type === \\"image\\");\\nconst pointers = data.filter((d) => d.type !== \\"image\\");\\nlet container = null;\\nlet svgRoot = null;\\nlet overlay = null;\\nconst rendered = /* @__PURE__ */ new Map();\\nonMount(async () => {\\n  if (!imgEntry || !container) return;\\n  const text = await (await fetch(imgEntry.content)).text();\\n  svgRoot = new DOMParser().parseFromString(text, \\"image/svg+xml\\").documentElement;\\n  svgRoot.setAttribute(\\"width\\", \\"100%\\");\\n  svgRoot.setAttribute(\\"height\\", \\"100%\\");\\n  overlay = document.createElementNS(\\"http://www.w3.org/2000/svg\\", \\"g\\");\\n  overlay.setAttribute(\\"id\\", \\"overlay\\");\\n  svgRoot.appendChild(overlay);\\n  container.appendChild(svgRoot);\\n});\\nonDestroy(() => {\\n  rendered.clear();\\n  if (svgRoot && container) container.removeChild(svgRoot);\\n});\\nfunction makeShape(p) {\\n  const NS = \\"http://www.w3.org/2000/svg\\";\\n  let el = null;\\n  switch (p.type) {\\n    case \\"arrow\\": {\\n      el = document.createElementNS(NS, \\"path\\");\\n      el.setAttribute(\\"d\\", \\"M0,0 L18,0 M10,-6 L18,0 L10,6\\");\\n      el.classList.add(\\"arrow\\", \\"blink\\");\\n      break;\\n    }\\n    case \\"circle\\": {\\n      el = document.createElementNS(NS, \\"circle\\");\\n      el.setAttribute(\\"r\\", \\"12\\");\\n      el.classList.add(\\"circle\\", \\"blink\\");\\n      break;\\n    }\\n    case \\"dot\\": {\\n      el = document.createElementNS(NS, \\"circle\\");\\n      el.setAttribute(\\"r\\", \\"4\\");\\n      el.classList.add(\\"dot\\", \\"blink\\");\\n      break;\\n    }\\n  }\\n  if (el) el.setAttribute(\\"transform\\", `translate(${p.x} ${p.y})`);\\n  return el;\\n}\\n$: if (overlay) {\\n  for (const p of pointers) {\\n    const dur = p.duration ?? DEF_DUR;\\n    const active = currentTime >= p.showAt && currentTime < p.showAt + dur;\\n    if (active && !rendered.has(p)) {\\n      const shape = makeShape(p);\\n      if (shape) {\\n        overlay.appendChild(shape);\\n        rendered.set(p, shape);\\n      }\\n    }\\n    if (!active && rendered.has(p)) {\\n      overlay.removeChild(rendered.get(p));\\n      rendered.delete(p);\\n    }\\n  }\\n}\\n<\/script>\\n\\n<!-- mount point -->\\n<div class=\\"svg-wrapper\\" bind:this={container}></div>\\n<style>\\n  .svg-wrapper {\\n    width: 100%;\\n    height: 100%;\\n  }\\n\\n  /* blinking animation */\\n  @keyframes blink {\\n    0%,100% { opacity: 1; }\\n    50%     { opacity: 0.15; }\\n  }\\n\\n  /* :global() makes rules hit runtime SVG nodes  */\\n  :global(.blink) {\\n    animation: blink 1s linear infinite;\\n  }\\n\\n  :global(svg g#overlay .arrow) {\\n    stroke: red;\\n    fill: none;\\n    stroke-width: 2;\\n    stroke-linecap: round;\\n  }\\n\\n  :global(svg g#overlay .circle) {\\n    stroke: red;\\n    fill: none;          /* empty circle */\\n    stroke-width: 2;\\n  }\\n\\n  :global(svg g#overlay .dot) {\\n    fill: red;\\n    stroke: red;\\n    stroke-width: 0;\\n  }\\n</style>"],"names":[],"mappings":"AAyEE,0BAAa,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CAGA,WAAW,mBAAM,CACf,EAAE,CAAC,IAAK,CAAE,OAAO,CAAE,CAAG,CACtB,GAAQ,CAAE,OAAO,CAAE,IAAM,CAC3B,CAGQ,MAAQ,CACd,SAAS,CAAE,mBAAK,CAAC,EAAE,CAAC,MAAM,CAAC,QAC7B,CAEQ,oBAAsB,CAC5B,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,IAAI,CACV,YAAY,CAAE,CAAC,CACf,cAAc,CAAE,KAClB,CAEQ,qBAAuB,CAC7B,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,IAAI,CACV,YAAY,CAAE,CAChB,CAEQ,kBAAoB,CAC1B,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,GAAG,CACX,YAAY,CAAE,CAChB"}'
};
const SvgPointer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = [] } = $$props;
  let { currentTime = 0 } = $$props;
  data.find((d) => d.type === "image");
  data.filter((d) => d.type !== "image");
  let container = null;
  const rendered = /* @__PURE__ */ new Map();
  onDestroy(() => {
    rendered.clear();
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  $$result.css.add(css$3);
  return ` <div class="svg-wrapper svelte-e6g8gj"${add_attribute("this", container, 0)}></div>`;
});
const SlideMap = {
  titleAndPara: TitleAndPara,
  fillImage: FillImage,
  svgPointer: SvgPointer,
  eq: Eq,
  quoteSlide: Quote,
  cornerWordsSlide: CornerWords,
  titleSlide: Title,
  imageSlide: Image,
  imageLeftBulletsRight: ImageLeftBulletsRight,
  imageRightBulletsLeft: ImageRightBulletsLeft,
  imageWithCaption: ImageWithCaption,
  imageWithTitle: ImageWithTitle,
  table: Table,
  statistic: StatisticSlide,
  barChart: BarChartSlide,
  twoColumnText: TwoColumnTextSlide,
  donutChart: DonutChartSlide,
  titleAndSubtitle: TitleAndSubtitle,
  bulletList: BulletList,
  bigNumber: BigNumber,
  quoteWithImage: QuoteWithImage,
  contactSlide: ContactSlide
};
function pickSlideByTime(deck, t) {
  if (!Array.isArray(deck) || deck.length === 0) {
    return { index: -1, slide: null, type: null };
  }
  const getStart = (s) => Number.isFinite(s.start) ? s.start : Number.isFinite(s.startAt) ? s.startAt : 0;
  let idx = 0;
  for (let i = 0; i < deck.length; i++) {
    const start = getStart(deck[i]);
    if (start <= t) idx = i;
    else break;
  }
  const slide = deck[idx];
  return { index: idx, slide, type: slide?.type ?? null };
}
const css$2 = {
  code: "html, body{height:100%;margin:0}.stage.svelte-2aki2b{position:relative;height:100dvh;display:grid;place-items:stretch;overflow:hidden;color:black}.fallback.svelte-2aki2b{color:#aaa;font-size:14px}",
  map: `{"version":3,"file":"TaleemSlides.svelte","sources":["TaleemSlides.svelte"],"sourcesContent":["\\n<svelte:options customElement=\\"taleem-slides\\" />\\n\\n\\n<script>\\n\\nimport SlideMap from './SlideMap.js';\\n  import { pickSlideByTime } from './pickSlideByTime.js';\\n\\n  // Props\\n  export let deck = [];              // array of slides (Zod-checked: has startAt, type)\\n  export let currentTime = 0;        // global time (seconds)\\n  \\n  export let background = {\\n    backgroundColor: '#f2f2b5',\\n    backgroundImage: '/images/taleem.webp',\\n    backgroundImageOpacity: 0.1\\n  };\\n\\n  // Map slide.type -> Svelte component\\n  function resolveSlideComponent(type) {\\n    return SlideMap?.[type] ?? null;\\n  }\\n\\n  // --- Reactive selection via pure function ---------------------------\\n  let currentSlideIndex = 0;\\n  let slide = null;\\n  let slideType = null;\\n  let SlideComp = null;\\n\\n  $: ({ index: currentSlideIndex, slide, type: slideType } = pickSlideByTime(deck, currentTime));\\n  $: SlideComp = resolveSlideComponent(slideType);\\n  $: console.log('TaleemSlides (pickSlideByTime) →', { t: currentTime, currentSlideIndex, slideType });\\n\\n  // --- Background helpers ---------------------------------------------\\n  function hexToRgb(hex) {\\n    if (!hex) return { r: 0, g: 0, b: 0 };\\n    let h = hex.trim();\\n    if (h.startsWith('#')) h = h.slice(1);\\n    if (h.length === 3) h = h.split('').map(c => c + c).join('');\\n    if (h.length !== 6) return { r: 0, g: 0, b: 0 };\\n    const n = parseInt(h, 16);\\n    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: (n) & 255 };\\n  }\\n  const clamp01 = (x) => Math.min(1, Math.max(0, x));\\n\\n  $: bgColor = background?.backgroundColor || 'transparent';\\n  $: imgUrl = background?.backgroundImage || '';\\n  $: imgOpacity = clamp01(background?.backgroundImageOpacity ?? 1);\\n  $: overlayAlpha = clamp01(1 - imgOpacity);\\n  $: rgb = hexToRgb(bgColor);\\n\\n  $: bgImageValue = imgUrl\\n    ? \`linear-gradient(rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, \${overlayAlpha}), rgba(\${rgb.r}, \${rgb.g}, \${rgb.b}, \${overlayAlpha})), url('\${imgUrl}')\`\\n    : 'none';\\n\\n  $: bgStyle = \`\\n    background-color: \${bgColor};\\n    background-image: \${bgImageValue};\\n    background-size: cover;\\n    background-position: center;\\n    background-repeat: no-repeat;\\n  \`;\\n<\/script>\\n\\n<div class=\\"stage\\" style={bgStyle}>\\n  {#if SlideComp && slide}\\n    <svelte:component\\n      this={SlideComp}\\n      data={slide.data}\\n      items={slide.data}\\n      {slide}\\n      {currentTime}\\n    />\\n  {:else}\\n    <div class=\\"fallback\\">No slide to render.</div>\\n  {/if}\\n</div>\\n\\n<style>\\n  :global(html, body) { height: 100%; margin: 0; }\\n\\n  .stage {\\n    position: relative;\\n    height: 100dvh;\\n    display: grid;\\n    place-items: stretch;\\n    overflow: hidden;\\n    /* color: inherit; */\\n    color: black;\\n  }\\n\\n  .fallback { color: #aaa; font-size: 14px; }\\n</style>\\n"],"names":[],"mappings":"AAgFU,UAAY,CAAE,MAAM,CAAE,IAAI,CAAE,MAAM,CAAE,CAAG,CAE/C,oBAAO,CACL,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,MAAM,CACd,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,OAAO,CACpB,QAAQ,CAAE,MAAM,CAEhB,KAAK,CAAE,KACT,CAEA,uBAAU,CAAE,KAAK,CAAE,IAAI,CAAE,SAAS,CAAE,IAAM"}`
};
function hexToRgb(hex) {
  if (!hex) return { r: 0, g: 0, b: 0 };
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return { r: 0, g: 0, b: 0 };
  const n = parseInt(h, 16);
  return {
    r: n >> 16 & 255,
    g: n >> 8 & 255,
    b: n & 255
  };
}
const TaleemSlides = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let bgColor;
  let imgUrl;
  let imgOpacity;
  let overlayAlpha;
  let rgb;
  let bgImageValue;
  let bgStyle;
  let { deck = [] } = $$props;
  let { currentTime = 0 } = $$props;
  let { background = {
    backgroundColor: "#f2f2b5",
    backgroundImage: "/images/taleem.webp",
    backgroundImageOpacity: 0.1
  } } = $$props;
  function resolveSlideComponent(type) {
    return SlideMap?.[type] ?? null;
  }
  let currentSlideIndex = 0;
  let slide = null;
  let slideType = null;
  let SlideComp = null;
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  if ($$props.deck === void 0 && $$bindings.deck && deck !== void 0) $$bindings.deck(deck);
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0) $$bindings.background(background);
  $$result.css.add(css$2);
  ({ index: currentSlideIndex, slide, type: slideType } = pickSlideByTime(deck, currentTime));
  SlideComp = resolveSlideComponent(slideType);
  {
    console.log("TaleemSlides (pickSlideByTime) →", {
      t: currentTime,
      currentSlideIndex,
      slideType
    });
  }
  bgColor = background?.backgroundColor || "transparent";
  imgUrl = background?.backgroundImage || "";
  imgOpacity = clamp01(background?.backgroundImageOpacity ?? 1);
  overlayAlpha = clamp01(1 - imgOpacity);
  rgb = hexToRgb(bgColor);
  bgImageValue = imgUrl ? `linear-gradient(rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayAlpha}), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${overlayAlpha})), url('${imgUrl}')` : "none";
  bgStyle = `
    background-color: ${bgColor};
    background-image: ${bgImageValue};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;
  return `  <div class="stage svelte-2aki2b"${add_attribute("style", bgStyle, 0)}>${SlideComp && slide ? `${validate_component(SlideComp || missing_component, "svelte:component").$$render(
    $$result,
    {
      data: slide.data,
      items: slide.data,
      slide,
      currentTime
    },
    {},
    {}
  )}` : `<div class="fallback svelte-2aki2b" data-svelte-h="svelte-usisj8">No slide to render.</div>`} </div>`;
});
const css$1 = {
  code: '.nav-bar.svelte-1kl1jgz.svelte-1kl1jgz{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.6);color:white;display:flex;align-items:center;padding:0.5rem 1rem;gap:0.5rem;opacity:0;transition:opacity 0.4s;z-index:10}.nav-bar.visible.svelte-1kl1jgz.svelte-1kl1jgz{opacity:1}.nav-bar.svelte-1kl1jgz button.svelte-1kl1jgz{border:none;border-radius:6px;padding:0.4rem 0.75rem;font-size:0.9rem;background:#333;color:#fff;cursor:pointer}.nav-bar.svelte-1kl1jgz button.svelte-1kl1jgz:hover{background:#555}.nav-bar.svelte-1kl1jgz .timer.svelte-1kl1jgz{min-width:90px;text-align:center}.nav-bar.svelte-1kl1jgz input[type="range"].svelte-1kl1jgz{flex:1}',
  map: `{"version":3,"file":"NavBar.svelte","sources":["NavBar.svelte"],"sourcesContent":["<!-- NavBar.svelte -->\\n<script>\\n  import { page } from '$app/stores';\\n  import { goto } from '$app/navigation';\\n\\n  export let currentTime = 0;\\n  export let soundUrl = null;\\n  export let duration    = 100;\\n  export let onPlay  = () => {};\\n  export let onPause = () => {};\\n  export let onStop  = () => {};\\n  export let onSeek  = (val) => {};\\n\\n\\n  /* ─── transient visibility logic (unchanged) ─── */\\n  let visible = true;\\n  let hideTimeout;\\n  function showTemporarily() {\\n    visible = true;\\n    clearTimeout(hideTimeout);\\n    hideTimeout = setTimeout(() => (visible = false), 4000);\\n  }\\n  const handleMove = () => showTemporarily();\\n\\n  function formatTime(sec) {\\n    const m = Math.floor(sec / 60).toString().padStart(2, '0');\\n    const s = Math.floor(sec % 60).toString().padStart(2, '0');\\n    return \`\${m}:\${s}\`;\\n  }\\n<\/script>\\n\\n<div\\n  class=\\"nav-bar\\"\\n  class:visible\\n  on:pointermove={handleMove}\\n  on:touchstart={handleMove}\\n>\\n  <!-- NEW Browse button -->\\n   {#if soundUrl}\\n  <button on:click={onPlay}> ▶️</button>\\n  <button on:click={onPause}>⏸️</button>\\n  <button on:click={onStop}>⏹️</button>\\n    {/if}\\n\\n  <span class=\\"timer\\">{formatTime(currentTime)} / {formatTime(duration)}</span>\\n  <input\\n    type=\\"range\\"\\n    min=\\"0\\"\\n    max={duration}\\n    step=\\"0.1\\"\\n    bind:value={currentTime}\\n    on:input={(e) => onSeek(+e.target.value)}\\n  />\\n</div>\\n\\n<style>\\n  .nav-bar {\\n    position: absolute;\\n    bottom: 0;\\n    left: 0;\\n    right: 0;\\n    background: rgba(0,0,0,0.6);\\n    color: white;\\n    display: flex;\\n    align-items: center;\\n    padding: 0.5rem 1rem;\\n    gap: 0.5rem;\\n    opacity: 0;\\n    transition: opacity 0.4s;\\n    z-index: 10;\\n  }\\n  .nav-bar.visible { opacity: 1; }\\n\\n  .nav-bar button {\\n    border: none;\\n    border-radius: 6px;\\n    padding: 0.4rem 0.75rem;\\n    font-size: 0.9rem;\\n    background: #333;\\n    color: #fff;\\n    cursor: pointer;\\n  }\\n  .nav-bar button:hover { background: #555; }\\n\\n  .nav-bar .timer { min-width: 90px; text-align: center; }\\n  .nav-bar input[type=\\"range\\"] { flex: 1; }\\n</style>\\n"],"names":[],"mappings":"AAwDE,sCAAS,CACP,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3B,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,GAAG,CAAE,MAAM,CACX,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,EACX,CACA,QAAQ,sCAAS,CAAE,OAAO,CAAE,CAAG,CAE/B,uBAAQ,CAAC,qBAAO,CACd,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,MAAM,CAAC,OAAO,CACvB,SAAS,CAAE,MAAM,CACjB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OACV,CACA,uBAAQ,CAAC,qBAAM,MAAO,CAAE,UAAU,CAAE,IAAM,CAE1C,uBAAQ,CAAC,qBAAO,CAAE,SAAS,CAAE,IAAI,CAAE,UAAU,CAAE,MAAQ,CACvD,uBAAQ,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,gBAAE,CAAE,IAAI,CAAE,CAAG"}`
};
function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { currentTime = 0 } = $$props;
  let { soundUrl = null } = $$props;
  let { duration = 100 } = $$props;
  let { onPlay = () => {
  } } = $$props;
  let { onPause = () => {
  } } = $$props;
  let { onStop = () => {
  } } = $$props;
  let { onSeek = (val) => {
  } } = $$props;
  if ($$props.currentTime === void 0 && $$bindings.currentTime && currentTime !== void 0) $$bindings.currentTime(currentTime);
  if ($$props.soundUrl === void 0 && $$bindings.soundUrl && soundUrl !== void 0) $$bindings.soundUrl(soundUrl);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.onPlay === void 0 && $$bindings.onPlay && onPlay !== void 0) $$bindings.onPlay(onPlay);
  if ($$props.onPause === void 0 && $$bindings.onPause && onPause !== void 0) $$bindings.onPause(onPause);
  if ($$props.onStop === void 0 && $$bindings.onStop && onStop !== void 0) $$bindings.onStop(onStop);
  if ($$props.onSeek === void 0 && $$bindings.onSeek && onSeek !== void 0) $$bindings.onSeek(onSeek);
  $$result.css.add(css$1);
  return `  <div class="${["nav-bar svelte-1kl1jgz", "visible"].join(" ").trim()}"> ${soundUrl ? `<button class="svelte-1kl1jgz" data-svelte-h="svelte-1q3xxgy">▶️</button> <button class="svelte-1kl1jgz" data-svelte-h="svelte-5l3erq">⏸️</button> <button class="svelte-1kl1jgz" data-svelte-h="svelte-so5a2d">⏹️</button>` : ``} <span class="timer svelte-1kl1jgz">${escape(formatTime(currentTime))} / ${escape(formatTime(duration))}</span> <input type="range" min="0"${add_attribute("max", duration, 0)} step="0.1" class="svelte-1kl1jgz"${add_attribute("value", currentTime, 0)}> </div>`;
});
function getDeckEnd(deck) {
  return deck?.length ? deck[deck.length - 1].end ?? 0 : 0;
}
function findSlideIndex(deck, t) {
  if (!Array.isArray(deck) || !deck.length) return 0;
  for (let i = 0; i < deck.length; i++) {
    const s = deck[i];
    if (t >= (s.start ?? 0) && t < (s.end ?? 0)) return i;
  }
  return deck.length - 1;
}
const css = {
  code: ".center.svelte-1ihtpwz{display:flex;align-items:center;justify-content:center;height:100vh;color:#666}.error.svelte-1ihtpwz{color:#b00020}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import '$lib/styles/tables.css';\\n\\n  // UI bits\\n  import Like from '../../lib/Like.svelte';\\n  import Comment from '../../lib/Comment.svelte';\\n\\n  // Taleem module\\n  import {\\n    TaleemSlides,\\n    NavBar,\\n    DeckDoctor,\\n    clampTime,\\n    findSlideIndex,\\n    getDeckEnd\\n  } from '$lib/taleem';\\n\\n  // audio utils\\n  import { createSoundPlayer, detectSoundUrl } from '$lib/services/soundServices.js';\\n\\n  // data from +page.server.js\\n  export let data;\\n  const { meta, deckRaw } = data;\\n\\n  // ---- build + validate deck (no client fetch) ----\\n  let errorMsg = null;\\n  let loading = false;                 // no deck fetch → not loading\\n  let filename = meta?.filename ?? '';\\n\\n  let deckObj = null;                  // canonical { version, background?, deck: [] }\\n  let deck = [];\\n  let background = null;\\n\\n  try {\\n    // Wrap legacy array shape if needed, then normalise + validate\\n    const candidate = Array.isArray(deckRaw) ? { version: 'deck-v1', deck: deckRaw } : deckRaw;\\n    const built = DeckDoctor.build(candidate);\\n    const res = DeckDoctor.validate(built);\\n\\n    if (!res.ok) {\\n      errorMsg = (res.errors?.[0]?.message) || 'Invalid deck';\\n    } else {\\n      deckObj    = res.value;\\n      deck       = deckObj.deck || [];\\n      background = deckObj.background ?? null;\\n    }\\n  } catch (e) {\\n    errorMsg = e?.message || 'Failed to prepare deck';\\n  }\\n\\n  // ---- playback state ----\\n  let soundUrl = null;\\n  let player = null;\\n\\n  let currentTime = 0;\\n  let currentSlideIndex = findSlideIndex(deck, 0);\\n  let deckEnd = getDeckEnd(deck);\\n\\n  // ---- controls ----\\n  function play()  { player?.play?.(); }\\n  function pause() { player?.pause?.(); }\\n  function seek(t) {\\n    if (!player) return;\\n    player.seek(t);\\n    currentTime = clampTime(deck, t);\\n    currentSlideIndex = findSlideIndex(deck, currentTime);\\n  }\\n  function stop() {\\n    if (!player) return;\\n    player.pause();\\n    player.seek(0);\\n    currentTime = 0;\\n    currentSlideIndex = findSlideIndex(deck, 0);\\n  }\\n\\n  // ---- audio init (client-only) ----\\n  onMount(async () => {\\n    try {\\n      soundUrl = await detectSoundUrl(filename, fetch);  // may return null (silent mode)\\n      player = createSoundPlayer(soundUrl);\\n      player.onTick((t) => {\\n        currentTime = clampTime(deck, t);\\n        currentSlideIndex = findSlideIndex(deck, currentTime);\\n        if (currentTime >= deckEnd) {\\n          currentTime = deckEnd;\\n          player.pause();\\n        }\\n      });\\n    } catch {\\n      // no audio is fine; slides still render\\n    }\\n  });\\n\\n  onDestroy(() => { player?.destroy?.(); });\\n<\/script>\\n\\n\\n{#if loading}\\n  <div class=\\"center\\">Loading…</div>\\n{:else if errorMsg}\\n  <div class=\\"center error\\">{errorMsg}</div>\\n{:else}\\n\\n    <TaleemSlides\\n    {deck}\\n    {currentTime}\\n  />\\n  <NavBar \\n  {currentTime}\\n  {currentSlideIndex}\\n  {deckEnd}\\n  {soundUrl}\\n  onPlay={play}\\n  onPause={pause}\\n  onStop={stop}\\n  onSeek={seek}\\n  />\\n{/if}\\n\\n\\n<div class=\\"bg-[#594112]\\">\\n<Like \\ncontentId ={filename}\\n/>\\n\\n<hr/>\\n\\n<Comment \\ncontentId ={filename}\\n/>\\n</div>\\n\\n<style>\\n  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }\\n  .error { color:#b00020; }\\n</style>"],"names":[],"mappings":"AAsIE,sBAAQ,CAAE,QAAQ,IAAI,CAAE,YAAY,MAAM,CAAE,gBAAgB,MAAM,CAAE,OAAO,KAAK,CAAE,MAAM,IAAM,CAC9F,qBAAO,CAAE,MAAM,OAAS"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { meta, deckRaw } = data;
  let errorMsg = null;
  let filename = meta?.filename ?? "";
  let deckObj = null;
  let deck = [];
  let background = null;
  try {
    const candidate = Array.isArray(deckRaw) ? { version: "deck-v1", deck: deckRaw } : deckRaw;
    const built = DeckDoctor.build(candidate);
    const res = DeckDoctor.validate(built);
    if (!res.ok) {
      errorMsg = res.errors?.[0]?.message || "Invalid deck";
    } else {
      deckObj = res.value;
      deck = deckObj.deck || [];
      background = deckObj.background ?? null;
    }
  } catch (e) {
    errorMsg = e?.message || "Failed to prepare deck";
  }
  let soundUrl = null;
  let currentTime = 0;
  let currentSlideIndex = findSlideIndex(deck, 0);
  let deckEnd = getDeckEnd(deck);
  function play() {
  }
  function pause() {
  }
  function seek(t) {
    return;
  }
  function stop() {
    return;
  }
  onDestroy(() => {
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  return `${`${errorMsg ? `<div class="center error svelte-1ihtpwz">${escape(errorMsg)}</div>` : `${validate_component(TaleemSlides, "TaleemSlides").$$render($$result, { deck, currentTime }, {}, {})} ${validate_component(NavBar, "NavBar").$$render(
    $$result,
    {
      currentTime,
      currentSlideIndex,
      deckEnd,
      soundUrl,
      onPlay: play,
      onPause: pause,
      onStop: stop,
      onSeek: seek
    },
    {},
    {}
  )}`}`} <div class="bg-[#594112]">${validate_component(Like, "Like").$$render($$result, { contentId: filename }, {}, {})} <hr> ${validate_component(Comment, "Comment").$$render($$result, { contentId: filename }, {}, {})} </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-C0S06Yz_.js.map
