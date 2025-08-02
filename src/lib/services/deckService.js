// src/lib/services/deckService.js
//------------------------------------------------------------
// Light-weight client-side service for loading static decks
//------------------------------------------------------------

/**
 * Internal in-memory cache. Key = filename, Value = deck JSON.
 * Keeps repeat lookups instant and avoids network churn.
 */
const cache = new Map();

/**
 * Fetch a single deck JSON by filename.
 *
 * @param {string} filename   e.g. "congruent_triangles"
 * @param {object} [opts]
 * @param {Function} [opts.fetch]   Inject SvelteKit’s fetch in load() ➔ { fetch }
 * @returns {Promise<object>}       The parsed deck-v1 JSON
 * @throws {Error}                  On 404, network failure, JSON parse failure
 */
export async function getDeck(
  filename,
  { fetch: fetchFn = globalThis.fetch } = {}
) {
  if (!filename) throw new Error("deckService.getDeck: filename required");

  // ✅ 1. Check cache first
  if (cache.has(filename)) return cache.get(filename);

  // ✅ 2. Attempt fetch
  const url = `/decks/${filename}.json`;
  let res;
  try {
    res = await fetchFn(url);
  } catch (err) {
    throw new Error(`Network error while fetching ${url}: ${err.message}`);
  }

  if (!res.ok) {
    // 404 or other HTTP error
    const reason = res.status === 404 ? "not found" : `status ${res.status}`;
    throw new Error(`Deck "${filename}" ${reason}`);
  }

  // ✅ 3. Parse JSON safely
  let deck;
  try {
    deck = await res.json();
  } catch (err) {
    throw new Error(`Invalid JSON for deck "${filename}": ${err.message}`);
  }

  // ✅ 4. Minimal shape check (version + deck array)
  if (deck.version !== "deck-v1" || !Array.isArray(deck.deck)) {
    throw new Error(`Deck "${filename}" failed basic schema check`);
  }

  // ✅ 5. Cache & return
  cache.set(filename, deck);
  return deck;
}

/**
 * Optional helper: clear the local cache (handy in dev / hot-reload)
 */
export function _clearDeckCache() {
  cache.clear();
}
