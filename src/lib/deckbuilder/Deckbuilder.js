// DeckBuilder.js
import DeckDoctor from "../deckdoctor/DeckDoctor";

export default class DeckBuilder {
  constructor() {
    this.slidesArray = [];
    this.currentTime = 0;
    this.details = { name: "unnamed_deck" };

    // minimal background holder
    this.background = {
      backgroundColor      : "#F3E5AB",
      backgroundImage      : "/images/taleem.webp",
      backgroundImageOpacity: 0.07
    };

    /* registry: every slide type simply pushes raw data */
    const types = [
      "eq","titleSlide","titleAndSubtitle","bulletList","twoColumnText",
      "imageSlide","imageWithTitle","imageWithCaption","imageLeftBulletsRight",
      "imageRightBulletsLeft","table","statistic","donutChart","bigNumber","barChart",
      "quoteSlide","quoteWithImage","cornerWordsSlide","contactSlide","fillImage","svgPointer","titleAndPara"
    ];
    this.s = Object.fromEntries(types.map(t => [t, (end, data) => this.#add(t, end, data)]));
  }

  /* ────── simple metadata setters ────── */
  addDetails(meta)           { this.details = { ...this.details, ...meta }; }
  setBackgroundImage(url)    { this.background.backgroundImage = url; }
  setBackgroundColor(color)  { this.background.backgroundColor = color; }
  setBackgroundOpacity(val)  { this.background.backgroundImageOpacity = val; }

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
      version  : "deck-v1",
      background: this.background,
      deck     : this.slidesArray
    };
    const normalised = DeckDoctor.build(raw);
    if (validate) {
      const res = DeckDoctor.validate(normalised);
      if (!res.ok) throw new Error("Deck validation failed:\n" + JSON.stringify(res.errors, null, 2));
    }
    return normalised;
  }
}
