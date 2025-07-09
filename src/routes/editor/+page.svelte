<script>
  import { SveltePlayer } from '../../lib/Player';
  import DeckBuilder      from '../../lib/deckbuilder/Deckbuilder';
  import { zodDeckV1 }    from '../../lib/deckbuilder/schema/ZodDeckV1';

  let deck = null;

  // ───────────────────────── Helper ─────────────────────────
  function cleanDeckSource(src) {
    return src
      // remove any import line (with possible indent)
      .replace(/^\s*import\s.*$/gm, '')
      // remove “export …” or “export default …” (keep the rest of the line)
      .replace(/^\s*export\s+(default\s+)?/gm, '')
      .trim();
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const rawText  = await file.text();
    const cleaned  = cleanDeckSource(rawText);

    try {
      // build a Function that *returns* defineDeck
      const getDefineDeck = new Function(
        'deckbuilder',
        cleaned + '\nreturn defineDeck;'
      );

      // we call it once (without argument) just to obtain defineDeck itself
      const defineDeck = getDefineDeck(undefined);

      if (typeof defineDeck !== 'function') {
        throw new Error('defineDeck is not a function after parsing.');
      }

      // now build & validate
      const builder   = new DeckBuilder();
      defineDeck(builder);
      const candidate = builder.build();

      const check = zodDeckV1.safeParse(candidate);
      if (!check.success) {
        const err = check.error.errors[0];
        throw new Error(`Zod failed at ${err.path.join('.')}: ${err.message}`);
      }

      deck = check.data.deck;
    } catch (e) {
      // show alert, but also log cleaned code for inspection
      console.error('─── Cleaned deck source that failed ───\n', cleaned);
      console.error(e);
      alert('Deck load error:\n' + e.message);
    }
  }
</script>


<main class="player-container">
  {#if deck}
  {#key deck}
    <SveltePlayer {deck} />
  {/key}
  {:else}
    <p class="placeholder">Please upload a deck JS file to start.</p>
  {/if}
</main>

<div class="upload-container">
  <label class="upload-button">
    Upload Deck JS
    <input type="file" accept=".js" on:change={handleFileUpload} />
  </label>
</div>

<style>
  .player-container {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
  .placeholder {
    color: #6c757d;
    font-size: 1.2rem;
  }
  .upload-container {
    text-align: center;
    margin: 1rem 0;
  }
  .upload-button {
    position: relative;
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .upload-button input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
</style>
