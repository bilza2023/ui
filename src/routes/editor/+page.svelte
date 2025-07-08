
<script>
  //--here is am using pivot-player from library and not from npm
  import { SveltePlayer } from '../../lib/Player';
  import DeckBuilder      from '../../lib/deckbuilder/Deckbuilder';
  import { zodSchemaV1}   from '../../lib/Player/schema/zodSchemaV1';

  let deck = null;

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const text = await file.text();
    const clean = text
      .replace(/^import\s.*$/gm, '')
      .replace(/^export\s.*$/gm, '')
      .replace(/^const\s+deckbuilder\s*=.*$/gm, '');
    loadFromBuilder(clean);
  }


function loadFromBuilder(code) {
  try {
    const deckbuilder = new DeckBuilder();
    const wrapped = `${code}\ndeck = deckbuilder.build();`;
    const func = new Function('deckbuilder', 'deck', wrapped);
    let candidate = null;
    func(deckbuilder, candidate);
    debugger;
    candidate = deckbuilder.build(); // force it
    console.log("✅ candidate):", candidate);
    const result = zodSchemaV1.safeParse(candidate);
    if (!result.success) {
      const errorList = result.error.errors;
      console.error("❌ Zod validation failed:", errorList);
      alert("Validation failed at: " + errorList[0]?.path?.join('.') + " — " + errorList[0]?.message);
      return;
    }else {
      console.log("✅==>Zod Schema Checked V1",result);
    }

    // deck = candidate;
    deck = result.data.slides;
   
  } catch (e) {
    alert('DeckBuilder error:\n' + e.message);
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
