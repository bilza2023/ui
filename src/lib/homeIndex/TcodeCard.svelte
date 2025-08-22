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
  /* Flex grid */
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: stretch;
  }

  /* Card */
  .card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;

    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    border-radius: 12px;

    /* Responsive width: 3 in a row on wide, 2 on mid, 1 on narrow */
    flex: 1 1 clamp(260px, 30%, 360px);
    max-width: 360px;
    min-width: 260px;

    transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
  }

  .card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in oklab, var(--primaryColor) 40%, var(--borderColor));
    box-shadow: 0 8px 22px rgba(0,0,0,.18);
  }

  /* Thumb */
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

  /* Meta */
  .meta {
    padding: 12px 14px 14px;
  }
  .title {
    font-weight: 600;
    line-height: 1.25;
    color: var(--primaryText);
    margin: 0 0 6px 0;
  }
  .desc {
    color: var(--secondaryText);
    font-size: 0.95rem;
    line-height: 1.45;
    margin: 0;
  }

  /* Small badge/tag on image (optional if you have it) */
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
