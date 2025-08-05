const cache = /* @__PURE__ */ new Map();
async function getDeck(filename, { fetch: fetchFn = globalThis.fetch } = {}) {
  if (!filename) throw new Error("deckService.getDeck: filename required");
  if (cache.has(filename)) return cache.get(filename);
  const url = `/decks/${filename}.json`;
  let res;
  try {
    res = await fetchFn(url);
  } catch (err) {
    throw new Error(`Network error while fetching ${url}: ${err.message}`);
  }
  if (!res.ok) {
    const reason = res.status === 404 ? "not found" : `status ${res.status}`;
    throw new Error(`Deck "${filename}" ${reason}`);
  }
  let deck;
  try {
    deck = await res.json();
  } catch (err) {
    throw new Error(`Invalid JSON for deck "${filename}": ${err.message}`);
  }
  if (deck.version !== "deck-v1" || !Array.isArray(deck.deck)) {
    throw new Error(`Deck "${filename}" failed basic schema check`);
  }
  cache.set(filename, deck);
  return deck;
}
async function load({ url, fetch }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return {
      deck: null,
      background: null,
      timed: false,
      error: "Filename parameter is required."
    };
  }
  try {
    const fullDeck = await getDeck(filename, { fetch });
    const timed = fullDeck.deck.some(
      (slide) => slide.data.some((item) => item.showAt && item.showAt > 0)
    );
    return {
      deck: fullDeck.deck,
      background: fullDeck.background ?? null,
      timed,
      error: null
    };
  } catch (err) {
    return {
      deck: null,
      background: null,
      timed: false,
      error: err.message
    };
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D_92f669.js')).default;
const universal_id = "src/routes/player/+page.js";
const imports = ["_app/immutable/nodes/12.C2lbuUNZ.js","_app/immutable/chunks/CpLwJuMr.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/B5TTx4t_.js","_app/immutable/chunks/DDQTwwza.js","_app/immutable/chunks/wFfGPoZZ.js","_app/immutable/chunks/CbY67HMy.js","_app/immutable/chunks/DFdC71yn.js","_app/immutable/chunks/Bwyb_Tvk.js"];
const stylesheets = ["_app/immutable/assets/SveltePlayer.oYk53pF7.css","_app/immutable/assets/12.BzNg_0ch.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=12-DNja6A8u.js.map
