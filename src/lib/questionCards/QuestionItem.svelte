<!-- /src/lib/syllabusComp/QuestionItem.svelte -->
<script>
  // Pure CARD — no layout responsibility
  export let item = {}; // { title?, name?, heading?, question?, slug?, type?, exercise?, chapter?, status?, editedAt?, description? }

  // console.log("item" , item);

  const pick = (v) => (typeof v === 'string' && v.trim() ? v.trim() : '');
$: rawThumb =
  pick(item?.thumbnail) ||
  pick(item?.image) ||
  pick(item?.thumb) ||
  pick(item?.cover) || '';
$: thumbSrc = rawThumb
  ? (rawThumb.startsWith('http') || rawThumb.startsWith('/') ? rawThumb : `/media/images/${rawThumb}`)
  : '/media/images/taleem.webp';

  const norm = (v) => (v == null ? "" : String(v).trim());
  const humanize = (s) =>
    norm(s).replace(/[-_]+/g, " ").replace(/\s+/g, " ").replace(/(^\w)|(\s\w)/g, (m) => m.toUpperCase());

  // Robust title fallback
  $: displayTitle = (() => {
    const keys = ["title", "name", "heading", "label", "question", "text", "prompt", "deckTitle", "noteTitle"];
    for (const k of keys) {
      const v = norm(item?.[k]);
      if (v) return v;
    }
    const slug = norm(item?.slug);
    if (slug) return humanize(slug);
    const id = item?.id ?? item?._id;
    if (id != null && id !== "") return `#${id}`;
    return "Untitled";
  })();

  $: thumbAlt = `${displayTitle} thumbnail`;
  
  const href =
    item?.type === 'note'
      ? `/note?filename=${item.slug}`
      : `/player?filename=${item.slug}`;
</script>


<a class="card-link" href={href} aria-label={item?.title || item?.slug}>
  
<article class="q-card" title={displayTitle} role="article">
  <!-- YouTube-style thumbnail -->
  <figure class="thumb">
        <img
          src={thumbSrc}
          alt={thumbAlt}
          loading="lazy"
          decoding="async"
          on:error={(e) => (e.currentTarget.src = '/media/images/taleem.webp')}
        />
  </figure>

  <!-- Body -->
  <div class="q-body">
    <h3 class="q-title">{displayTitle}</h3>

    <div class="q-row">
      {#if item.exercise}<span class="chip">{item.exercise}</span>{/if}
      {#if item.chapter}<span class="chip">{item.chapter}</span>{/if}
      {#if item.type}<span class="chip">{item.type}</span>{/if}
      {#if item.status}<span class="chip chip-accent">{item.status}</span>{/if}
    </div>

  </div>
</article>
</a>

<style>
  /* CARD (token-only) */
  .q-card{
    box-sizing: border-box;
    display: block;
    width: var(--q-card-w, 360px);
    max-width: 100%;
    border: 1px solid var(--borderColor);
    border-radius: 12px;
    background: var(--surfaceColor);
    color: var(--primaryText);
    overflow: hidden; /* so the image corners clip */
    transition: transform .12s ease, box-shadow .15s ease, border-color .15s ease;
  }
  .q-card:hover{
    transform: translateY(-1px);
    border-color: var(--primaryColor);
    box-shadow: 0 4px 16px var(--shadowColor, rgba(0,0,0,.15));
  }

  /* THUMB (16:9 like YouTube) */
  .thumb{
    margin: 0;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--surfaceElevated, var(--surfaceColor));
    overflow: hidden;
  }
  .thumb img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* BODY (slim) */
  .q-body{
    padding: 10px 12px 12px;
  }
  .q-title{
    margin: 0 0 6px 0;
    font-size: 15.5px;     /* slimmer than before */
    line-height: 1.35;
    font-weight: 700;

    /* 2-line clamp like YouTube */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .q-row{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 6px;
  }

  .chip{
    font-size: 12px;
    line-height: 1;
    padding: 3px 8px;
    border-radius: 999px;
    background: var(--chipBg, var(--surfaceColor));
    color: var(--primaryText);
    border: 1px solid var(--borderColor);
  }
  .chip-accent{
    background: var(--accentColor);
    color: var(--onAccentColor, var(--backgroundColor));
    border-color: var(--accentColor);
  }

  .q-meta{
    font-size: 12px;
    margin-bottom: 6px;
  }
  .muted{ opacity: .7; }

  .q-desc{ margin: 6px 0 0 0; }

  @media (max-width: 640px){
    .q-card { width: 100%; }
  }
</style>
