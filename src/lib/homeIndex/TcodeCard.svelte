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
  /* FLEXBOX container: centers, wraps, and avoids full-height rows */
  .tcode-grid {
    display: flex;
    padding-top: 20px;
    flex-wrap: wrap;
    gap: var(--space-5);
    justify-content: center;      /* center the row of cards */
    align-items: flex-start;       /* let each card size to its own content */
  }

  /* Card: consistent, not-too-narrow width with nice wrapping */
  .tcode-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    flex: 0 1 320px;               /* preferred width */
    min-width: 260px;              /* prevents super-narrow cards */
    max-width: 360px;              /* keeps a tidy max size */
  }
  .tcode-card:hover { box-shadow: var(--shadow-2); }

  /* 16:9 cover thumbnail */
  .thumb {
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-2);
    overflow: hidden;
    background: var(--surface-2);
    margin-bottom: var(--space-3);
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Text */
  .meta { display: flex; flex-direction: column; gap: var(--space-2); }
  .title { margin: 0; font-size: var(--font-5); color: var(--text); }
  .desc  { margin: 0; color: var(--muted); }
</style>
