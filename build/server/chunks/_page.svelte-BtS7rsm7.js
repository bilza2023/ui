import { c as create_ssr_component, o as onDestroy } from './ssr-CO7PFcwR.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import 'katex';
import { z } from 'zod';

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
z.object({
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
const css = {
  code: ".center.svelte-196v2n9{display:flex;align-items:center;justify-content:center;height:100vh;color:#666}.error.svelte-196v2n9{color:#b00020}.flex.svelte-196v2n9{display:flex}.items-center.svelte-196v2n9{align-items:center}.justify-center.svelte-196v2n9{justify-content:center}.h-full.svelte-196v2n9{height:100%}.doctor-wrap.svelte-196v2n9{margin-top:1.5rem;padding-top:1rem;border-top:1px solid #333}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { onDestroy } from 'svelte';\\n  import { NavBar, TaleemSlides } from '$lib/taleemPlayer';\\n  import { clampTime, findSlideIndex, getDeckEnd } from '$lib/taleemPlayer/player-utility.js';\\n  import TaleemDoctorComp from '$lib/components/TaleemDoctorComp.svelte';\\n\\n  // ── state ─────────────────────────────────────────────\\n  let question = null;           // full object; slides live at question.deck\\n  let errorMsg = null;\\n  let mounted = false;\\n\\n  let currentTime = 0;\\n  let currentSlideIndex = 0;\\n  let deckEnd = 0;\\n\\n  let timer = null;\\n  const TICK_MS = 200;\\n\\n  // derived slides\\n  $: slides = question?.deck ?? [];\\n\\n  // keep derived timings in sync when slides/time change\\n  $: deckEnd = Array.isArray(slides) && slides.length ? getDeckEnd(slides) : 0;\\n  $: currentSlideIndex = Array.isArray(slides) && slides.length\\n      ? findSlideIndex(slides, currentTime)\\n      : 0;\\n\\n  // ── helpers ───────────────────────────────────────────\\n  function normalizeToQuestion(obj) {\\n    // Accept old formats and normalize to { version?, deck: [] }\\n    if (Array.isArray(obj)) {\\n      return { version: 'deck-v1', deck: obj };\\n    }\\n    if (obj && Array.isArray(obj.deck)) {\\n      return obj; // already a question\\n    }\\n    if (obj && Array.isArray(obj.slides)) {\\n      const { slides, ...rest } = obj;\\n      return { ...rest, deck: slides };\\n    }\\n    return null;\\n  }\\n\\n  // ── file load ─────────────────────────────────────────\\n  function handleFile(e) {\\n    const file = e.target.files?.[0];\\n    if (!file) return;\\n\\n    const reader = new FileReader();\\n    reader.onload = (ev) => {\\n      try {\\n        const raw = JSON.parse(ev.target.result);\\n        const q = normalizeToQuestion(raw);\\n        if (!q || !Array.isArray(q.deck) || q.deck.length === 0) {\\n          throw new Error('Empty or invalid deck');\\n        }\\n\\n        question = q;\\n        currentTime = 0;\\n        mounted = true;\\n        stop(); // ensure clean state\\n        errorMsg = null;\\n      } catch {\\n        errorMsg = 'Invalid deck JSON';\\n        question = null;\\n        mounted = false;\\n      }\\n    };\\n    reader.readAsText(file);\\n  }\\n\\n  // ── timer controls (no audio) ─────────────────────────\\n  function startTimer() {\\n    if (timer || !slides.length) return;\\n    timer = setInterval(() => {\\n      currentTime = clampTime(slides, currentTime + TICK_MS / 1000);\\n      if (currentTime >= deckEnd) {\\n        currentTime = deckEnd;\\n        pause();\\n      }\\n    }, TICK_MS);\\n  }\\n  function clearTimer() { if (timer) { clearInterval(timer); timer = null; } }\\n  function play()  { startTimer(); }\\n  function pause() { clearTimer(); }\\n  function stop()  { clearTimer(); currentTime = 0; }\\n\\n  function onSeek(t) { currentTime = clampTime(slides, t); }\\n\\n  onDestroy(() => clearTimer());\\n<\/script>\\n\\n{#if errorMsg}\\n  <div class=\\"center error\\">{errorMsg}</div>\\n{/if}\\n\\n{#if mounted && slides.length}\\n  <TaleemSlides deck={slides} {currentTime} />\\n\\n  <NavBar\\n    {currentTime}\\n    {currentSlideIndex}\\n    deckEnd={deckEnd}\\n    soundUrl={null}\\n    onPlay={play}\\n    onPause={pause}\\n    onStop={stop}\\n    onSeek={onSeek}\\n  />\\n\\n  <!-- Doctor panel (read-only diagnostics) -->\\n  <div class=\\"doctor-wrap\\">\\n    <TaleemDoctorComp {question} />\\n  </div>\\n{:else}\\n  <div class=\\"flex items-center justify-center h-full\\">Load a deck (JSON) to start</div>\\n{/if}\\n\\n<input type=\\"file\\" accept=\\".json,application/json\\" on:change={handleFile} />\\n\\n<style>\\n  .center { display:flex; align-items:center; justify-content:center; height:100vh; color:#666; }\\n  .error { color:#b00020; }\\n  .flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.h-full{height:100%}\\n  .doctor-wrap { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #333; }\\n</style>\\n"],"names":[],"mappings":"AAyHE,sBAAQ,CAAE,QAAQ,IAAI,CAAE,YAAY,MAAM,CAAE,gBAAgB,MAAM,CAAE,OAAO,KAAK,CAAE,MAAM,IAAM,CAC9F,qBAAO,CAAE,MAAM,OAAS,CACxB,oBAAK,CAAC,QAAQ,IAAI,CAAC,4BAAa,CAAC,YAAY,MAAM,CAAC,8BAAe,CAAC,gBAAgB,MAAM,CAAC,sBAAO,CAAC,OAAO,IAAI,CAC9G,2BAAa,CAAE,UAAU,CAAE,MAAM,CAAE,WAAW,CAAE,IAAI,CAAE,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAM"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slides;
  let currentTime = 0;
  function clearTimer() {
  }
  onDestroy(() => clearTimer());
  $$result.css.add(css);
  slides = [];
  Array.isArray(slides) && slides.length ? getDeckEnd(slides) : 0;
  Array.isArray(slides) && slides.length ? findSlideIndex(slides, currentTime) : 0;
  return `${``} ${`<div class="flex items-center justify-center h-full svelte-196v2n9" data-svelte-h="svelte-1bzuzh0">Load a deck (JSON) to start</div>`} <input type="file" accept=".json,application/json">`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BtS7rsm7.js.map
