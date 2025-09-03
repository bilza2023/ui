<script>
  export let data;

  import TcodeCard from   "./tcode/+page.svelte";
  import ChapterCard from "./ChapterCard.svelte";
  import ExerciseCard from "./ExerciseCard.svelte";

  // Safe derive
  $: tcodes = Array.isArray(data?.tcodes) ? data.tcodes : [];
</script>

<div class="page admin-synopsis">
  <header class="top">
    <h1>Synopsis</h1>
    <p class="sub">Manage subjects (tcodes), chapters, and exercises — slug-based schema.</p>
  </header>

  <!-- Top row: three compact cards in one line -->
  <section class="cards-row">
    <TcodeCard />
    <ChapterCard {tcodes} />
    <ExerciseCard {tcodes} />
  </section>
</div>

<style>
  :global(.page.admin-synopsis) {
    --bg:        #0b0f15;
    --surface-2: #151b2a;
    --border:    #24304a;
    --edge:      #2e3b58;
    --text:      #e9eef6;
    --muted:     #a4b0c4;
    --brand:     #7aa9ff;

    --radius-lg: 14px;
    --radius-sm: 9px;
    --pad:       16px;
    --gap:       18px;
    --shadow:    0 10px 28px rgba(0,0,0,0.35);

    color: var(--text);
    background: var(--bg);
    min-height: 100%;
  }

  .top { margin: 6px 0 18px 0; }
  .top h1 { margin: 0 0 4px 0; font-size: 1.7rem; font-weight: 700; }
  .top .sub { margin: 0; color: var(--muted); font-size: 0.95rem; }

  .cards-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap);
    margin-bottom: var(--gap);
  }
  @media (max-width: 1100px) { .cards-row { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 720px)  { .cards-row { grid-template-columns: 1fr; } }
</style>
