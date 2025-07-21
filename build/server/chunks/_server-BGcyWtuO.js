import { j as json } from './index-BOFtHmOi.js';
import { c as createDeck } from './deckService-D4ctYXnz.js';
import { z } from 'zod';
import { Buffer } from 'buffer';
import '@prisma/client';

class DeckBuilder {
  constructor() {
    this.slidesArray = [];
    this.currentTime = 0;
    this.background = {
      backgroundColor: "#F3E5AB",
      backgroundImage: "/images/taleem.webp",
      backgroundImageOpacity: 0.07
    };
    this.s = Object.fromEntries(
      [
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
        "fillImage"
      ].map((type) => [
        type,
        (end, data) => this._add(type, end, data)
      ])
    );
  }
  // deckbuilder.setBackgroundImage("/images/taleem.webp");
  // deckbuilder.setBackgroundColor("#F3E5AB");
  setTheme(themeName) {
    this.theme = themeName;
  }
  setBackgroundImage(url) {
    this.background.backgroundImage = url;
  }
  setBackgroundColor(color) {
    this.background.backgroundColor = color;
  }
  setBackgroundOpacity(value) {
    this.background.backgroundImageOpacity = value;
  }
  addDetails({
    name = "unnamed_deck",
    description = "",
    tags = [],
    status = "draft",
    createdAt = (/* @__PURE__ */ new Date()).toISOString(),
    editedAt = (/* @__PURE__ */ new Date()).toISOString()
  } = {}) {
    this.details = {
      name,
      description,
      tags,
      status,
      createdAt,
      editedAt
    };
  }
  buildEq(data) {
    const lines = [];
    let currentLine = null;
    for (const item of data) {
      if (!item.type.startsWith("sp")) {
        currentLine = {
          name: "line",
          type: item.type,
          content: item.content,
          showAt: item.showAt,
          spItems: []
        };
        lines.push(currentLine);
      } else if (currentLine) {
        currentLine.spItems.push({
          type: item.type,
          content: item.content
        });
      }
    }
    return lines;
  }
  _add(type, end, data) {
    const start = this.currentTime;
    if (end <= start) {
      throw new Error(`Invalid slide timing: end (${end}) must be greater than start (${start})`);
    }
    this.currentTime = end;
    if (type === "eq") {
      const nested = this.buildEq(data);
      this.slidesArray.push({ type, start, end, data: nested });
      return;
    }
    const patchedData = data.map(
      (item) => item.showAt === void 0 ? { ...item, showAt: 0 } : item
    );
    this.slidesArray.push({ type, start, end, data: patchedData });
  }
  build() {
    if (!this.details) {
      this.addDetails({ name: "unnamed_deck" });
    }
    return {
      ...this.details,
      version: "deck-v1",
      background: this.background ?? null,
      deck: this.slidesArray
    };
  }
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
const zodDeckV1 = z.object({
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
    const isJs = /\.js$/i.test(name);
    const filename = name.replace(/\.(json|js)$/i, "");
    try {
      if (isJs) {
        const raw = await file.text();
        const base64 = Buffer.from(raw, "utf8").toString("base64");
        const mod = await import(`data:application/javascript;base64,${base64}`);
        const defineDeck = mod.defineDeck ?? mod.default;
        if (typeof defineDeck !== "function") {
          throw new Error("No defineDeck() export found");
        }
        const builder = new DeckBuilder();
        defineDeck(builder);
        const deckJson = builder.build();
        zodDeckV1.parse(deckJson);
        await createDeck({ filename, content: deckJson });
      } else {
        const raw = await file.text();
        const data = JSON.parse(raw);
        await createDeck({ filename, content: data });
      }
    } catch (err) {
      console.error(`Upload error for ${name}:`, err);
      if (err.code === "P2002") {
        failed.push(`${name} (deck already exists)`);
      } else {
        failed.push(`${name} (${isJs ? err.message : "failed to process"})`);
      }
    }
  }
  if (failed.length) {
    return json(
      { error: `Failed uploads: ${failed.join(", ")}` },
      { status: 400 }
    );
  }
  return json({ success: true });
}

export { POST };
//# sourceMappingURL=_server-BGcyWtuO.js.map
