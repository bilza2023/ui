<script>
  export let tcodes = []; // [{ tcodeName, description, image }]
  const FALLBACK_IMG = "/images/taleem.webp";
  const hrefFor = (t) => `/syllabus?tcode=${encodeURIComponent(t.tcodeName)}`;
</script>

<div class="tcode-grid">
  {#each tcodes as t}
    <a class="card tcode-card" href={hrefFor(t)}>
      <div class="thumb">
        <img src={t.image || FALLBACK_IMG} alt={t.tcodeName} loading="lazy" />
      </div>

      <div class="meta">
        <h3 class="title">{t.tcodeName}</h3>
        {#if t.description}<p class="desc">{t.description}</p>{/if}
      </div>
    </a>
  {/each}
</div>

<style>
  /* PANEL: match HomeIndex .main-content */
  .tcode-grid {
    /* acts as both the panel and the flex container */
    border: 4px solid var(--backgroundColor);
    align-items: flex-start;   /* items keep natural height */
    align-content: flex-start; /* rows don't stretch to fill 100dvh */
    border-radius: 16px;
    min-height: 100vh;   /* fallback */
    min-height: 100dvh;  
    padding: clamp(12px, 2vw, 24px);
    box-shadow:
      0 1px 1px rgba(0,0,0,.04),
      0 4px 14px rgba(0,0,0,.08);

    /* flex layout for cards */
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }

  /* CARD */
  .card {
    display: flex;
      flex-direction: column;
      border-radius: 0.75rem;
      overflow: hidden;
      border: 2px solid var(--accentColor); /* slimmer border */
      box-shadow: 0 8px 8px rgba(45, 44, 44, 0.8);
      transition: transform 120ms ease, box-shadow 120ms ease;
      text-decoration: none;
  }

  .card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
    box-shadow: 0 8px 22px rgba(0,0,0,.18);
  }

  /* THUMB */
  .thumb {
    aspect-ratio: 16 / 9;
    background: color-mix(in oklab, var(--primaryColor) 8%, var(--surfaceColor));
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* META */
  .meta {
    padding: 12px 14px 14px;
  }
  .title {
    font-weight: 600;
    line-height: 1.25;
    color: var(--primaryText);
    margin: 0 0 6px 0;
    color:  var(--accentColor);
    background: var(--surfaceColor);
  }
  .desc {
    color: var(--secondaryText);
    font-size: 0.95rem;
    line-height: 1.45;
    margin: 0;
  }

  /* OPTIONAL badge */
  .tag {
    position: absolute;
    top: 8px;
    left: 8px;
    background: color-mix(in oklab, var(--accentColor) 85%, var(--surfaceColor));
    color: var(--primaryText);
    border: 1px solid var(--borderColor);
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
  
  }
</style>
