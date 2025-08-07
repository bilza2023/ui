import { j as json } from './index-BOFtHmOi.js';
import { z } from 'zod';
import { i as insertFullQuestionFromDeck } from './questionServices-DaKNuo2j.js';
import { Buffer } from 'buffer';
import '@prisma/client';

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
class DeckBuilder {
  constructor() {
    this.slidesArray = [];
    this.currentTime = 0;
    this.details = { name: "unnamed_deck" };
    this.background = {
      backgroundColor: "#F3E5AB",
      backgroundImage: "/images/taleem.webp",
      backgroundImageOpacity: 0.07
    };
    const types = [
      "eq",
      "titleSlide",
      "titleAndSubtitle",
      "bulletList",
      "twoColumnText",
      "imageSlide",
      "imageWithTitle",
      "imageWithCaption",
      "imageLeftBulletsRight",
      "imageRightBulletsLeft",
      "table",
      "statistic",
      "donutChart",
      "bigNumber",
      "barChart",
      "quoteSlide",
      "quoteWithImage",
      "cornerWordsSlide",
      "contactSlide",
      "fillImage",
      "svgPointer",
      "titleAndPara"
    ];
    this.s = Object.fromEntries(types.map((t) => [t, (end, data) => this.#add(t, end, data)]));
  }
  /* ────── simple metadata setters ────── */
  addDetails(meta) {
    this.details = { ...this.details, ...meta };
  }
  setBackgroundImage(url) {
    this.background.backgroundImage = url;
  }
  setBackgroundColor(color) {
    this.background.backgroundColor = color;
  }
  setBackgroundOpacity(val) {
    this.background.backgroundImageOpacity = val;
  }
  /* ────── push a slide (no EQ logic) ────── */
  #add(type, end, data) {
    const start = this.currentTime;
    if (end <= start) throw new Error(`Slide "${type}" ends (${end}) before it starts (${start}).`);
    this.currentTime = end;
    this.slidesArray.push({ type, start, end, data });
  }
  /* ────── final build: delegate heavy lifting to DeckDoctor ────── */
  build({ validate = true } = {}) {
    const raw = {
      ...this.details,
      version: "deck-v1",
      background: this.background,
      deck: this.slidesArray
    };
    const normalised = DeckDoctor.build(raw);
    if (validate) {
      const res = DeckDoctor.validate(normalised);
      if (!res.ok) throw new Error("Deck validation failed:\n" + JSON.stringify(res.errors, null, 2));
    }
    return normalised;
  }
}
async function POST({ request }) {
  const form = await request.formData();
  const files = form.getAll("files");
  if (!files.length) {
    return json({ error: "No files uploaded" }, { status: 400 });
  }
  const failed = [];
  for (
    const file of
    /** @type {File[]} */
    files
  ) {
    const name = file.name;
    const filename = name.replace(/\.(json|js)$/i, "");
    try {
      let deckRaw;
      if (/\.js$/i.test(name)) {
        const rawCode = await file.text();
        const base64 = Buffer.from(rawCode, "utf8").toString("base64");
        const mod = await import(`data:application/javascript;base64,${base64}`);
        const define = mod.defineDeck ?? mod.default;
        if (typeof define !== "function") {
          throw new Error("No defineDeck() export found");
        }
        const builder = new DeckBuilder();
        define(builder);
        deckRaw = builder.build();
      } else {
        const rawJson = await file.text();
        deckRaw = JSON.parse(rawJson);
      }
      const deckNorm = DeckDoctor.isDeckV1(deckRaw) ? deckRaw : DeckDoctor.build(deckRaw);
      const validation = DeckDoctor.validate(deckNorm);
      if (!validation.ok) {
        const msgs = validation.errors.map((e) => e.message).join("; ");
        throw new Error(`Validation failed: ${msgs}`);
      }
      const deck = validation.value;
      const { name: qName, description, tags, status } = deck;
      const timed = DeckDoctor.getTotalDuration(deck) > 0;
      await insertFullQuestionFromDeck({
        filename,
        name: qName,
        description,
        tags,
        status,
        timed,
        deck
      });
    } catch (err) {
      console.error(`Upload error for ${name}:`, err);
      if (err.code === "P2002") {
        failed.push(`${name} (question already exists)`);
      } else {
        failed.push(`${name} (${err.message})`);
      }
    }
  }
  if (failed.length) {
    return json({ error: `Failed uploads: ${failed.join(", ")}` }, { status: 400 });
  }
  return json({ success: true });
}

export { POST };
//# sourceMappingURL=_server-OIpLSU7r.js.map
