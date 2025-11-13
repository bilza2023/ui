<script>
    export let ayahNumber = 1;         // 1-based index
    export let totalAyahs = 1;         // total in surah
    export let arabic = '';            // Arabic text
    export let translation = '';       // Urdu/English translation
  </script>
  
  <div class="readerRow">
    <div class="ayahBox">
      <div class="ayahHeader">
        <span>آية {ayahNumber} / {totalAyahs}</span>
      </div>
  
      <p class="ayahText">
        {#if arabic && arabic.length}
          {arabic}
        {:else}
          —
        {/if}
      </p>
  
      <p class="trText">
        {#if translation && translation.length}
          {translation}
        {:else}
          "Translation not found"
        {/if}
      </p>
    </div>
  </div>
  
  <style>
    .readerRow {
      display: grid;
      width: 100%;
    }
  
    .ayahBox {
      width: 100%;
      min-height: 8rem;
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: 0.75rem;
      padding: 0.9rem 1rem;
    }
  
    .ayahHeader {
      font-size: 0.9rem;
      color: var(--secondaryText);
      margin-bottom: 0.5rem;
    }
  
    .ayahText {
      font-size: 1.35rem;
      line-height: 2.1;
      margin: 0;
      word-break: break-word;
      color: var(--primaryText);
    }
  
    .trText {
      margin-top: 0.5rem;
      font-size: 1.05rem;
      line-height: 1.9;
      color: var(--secondaryText);
    }
  </style>
  