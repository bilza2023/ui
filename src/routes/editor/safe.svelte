<script>
  //--here is am using pivot-player from library and not from npm
  import { SveltePlayer } from "../../lib/Player";
  import DeckBuilder from "../../lib/deckbuilder/Deckbuilder";
  import { zodDeckV1 } from "../../lib/deckbuilder/schema/ZodDeckV1";

  let deck = null;

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // read the deck file (which now exports question(deckbuilder))
    const code = await file.text();

    // hand off directly to your blob-import loader
    await loadFromBuilder(code);
  }

  async function loadFromBuilder(code) {
    try {
      const deckbuilder = new DeckBuilder();

      // Dynamically wrap the input code into a callable function
      const wrapped = `${code}\nreturn typeof question === 'function' ? question(deckbuilder) : null;`;
      const func = new Function("DeckBuilder", "deckbuilder", wrapped);

      const candidate = func(DeckBuilder, deckbuilder);

      if (!candidate) {
        alert("Deck function not found or failed to execute.");
        return;
      }

      // Zod validation
      const result = zodDeckV1.safeParse(candidate);
      if (!result.success) {
        const errorList = result.error.errors;
        console.error("❌ Zod validation failed:", errorList);
        alert(
          "Validation failed at: " +
            errorList[0]?.path?.join(".") +
            " — " +
            errorList[0]?.message
        );
        return;
      } else {
        console.log("✅ Zod Schema Checked V1", result);
      }

      // Use the valid deck
      deck = result.data.deck;
      console.log("✅ Loaded deck:", deck);
    } catch (e) {
      alert("DeckBuilder error:\n" + e.message);
    }
  }
</script>

<main class="player-container">
  {#if deck}
    <SveltePlayer {deck} />
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
  /* Player area styling */
  .player-container {
    padding: 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }

  .placeholder {
    color: #6c757d;
    font-size: 1.2rem;
  }

  /* Upload button container */
  .upload-container {
    text-align: center;
    margin: 1rem 0;
  }

  /* Big button style */
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
