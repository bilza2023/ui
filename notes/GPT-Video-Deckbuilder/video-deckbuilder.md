# Taleem Video DeckBuilder

**Composable, themeable slide builder for educational video presentations**

`taleem-video-deckbuilder` is a presentation-building engine that helps you create high-quality animated slides using simple commands. It's used inside Taleem.Help to power structured content for video lessons.

---

## 🚀 Features

* Define slides using `.full()` and `.half()` APIs
* Apply global themes and backgrounds
* Use pre-built components: bullets, quotes, images, charts, tables
* Output JSON-ready `presentationData` object for rendering

---

## 📦 Installation

```bash
npm install taleem-video-deckbuilder
```

---

## 🧪 Quickstart

```js
import { DeckBuilder, GlobalThemes } from "taleem-video-deckbuilder";
import { getDefaultBackground } from "taleem-video-deckbuilder/src/getDefaultBackground";

const deck = new DeckBuilder();
deck.setGlobalTheme(GlobalThemes.royalBlue);
deck.setGlobalBackground(getDefaultBackground(GlobalThemes.royalBlue));

deck.addHeader("header", [{ text: "Chapter 1", showAt: 0 }]);

deck.full(10, "quote", [
  { text: "Education is power", showAt: 1 },
  { text: "Share it wisely.", showAt: 3 }
], {
  author: { text: "— Taleem.Help", showAt: 7 }
});

const data = deck.build();
```

---

## 📚 Components

These components are available for use inside `.full()` or `.half()` slides:

* `quote`
* `bullets`
* `image`
* `table`
* `donutChart`
* `pieChart`
* `barchart`

Each component supports its own config structure. See `videoApi.md` for full usage.

---

## 📄 API Docs

See [`videoApi.md`](./videoApi.md) for the complete API reference of `DeckBuilder`.

---

## 🛠 License

MIT © Taleem.Help
