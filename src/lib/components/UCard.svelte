
<!-- src/lib/components/UCard.svelte -->
<script>
    export let title = "";
    export let href = undefined;          // optional → full-card link if provided
    export let thumbnail = undefined;     // optional
    export let thumbnailAlt = "";         // optional alt override
    export let target = undefined;        // e.g., "_blank"
    export let rel = undefined;           // auto-fills for _blank
  
    const pick = (v) => (typeof v === "string" && v.trim() ? v.trim() : "");
  
    // Normalize thumbnail (absolute / http / fallback)
    $: imgSrc = (() => {
      const t = pick(thumbnail);
      if (!t) return "/media/images/taleem.webp";
      return t.startsWith("/") || t.startsWith("http") ? t : `/media/images/${t}`;
    })();
  
    $: safeRel = target === "_blank" ? (rel || "noopener noreferrer") : rel;
  </script>
  
  {#if href}
    <a class="ucard" href={href} target={target} rel={safeRel} aria-label={title}>
      <div class="thumb">
        <img src={imgSrc} alt={thumbnailAlt || title} loading="lazy" decoding="async" />
      </div>
      <div class="content">
        <h3 class="title">{title}</h3>
        <div class="body">
          <slot />
        </div>
      </div>
    </a>
  {:else}
    <article class="ucard" role="group" aria-label={title}>
      <div class="thumb">
        <img src={imgSrc} alt={thumbnailAlt || title} loading="lazy" decoding="async" />
      </div>
      <div class="content">
        <h3 class="title">{title}</h3>
        <div class="body">
          <slot />
        </div>
      </div>
    </article>
  {/if}
  
  <style>
    .ucard {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      max-width: 320px;         /* clamp card width */
      flex: 0 1 320px;          /* ideal width in flex rows */
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: 12px;
      padding: 0.75rem;
      text-decoration: none;
      color: var(--primaryText);
      transition: transform 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
    }
    .ucard:hover {
      transform: translateY(-2px);
      border-color: var(--primaryColor);
      box-shadow: 0 6px 20px rgba(0,0,0,.2);
    }
  
    .thumb {
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      border-radius: 10px;
      background: var(--backgroundColor);
    }
    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  
    .content { display: flex; flex-direction: column; gap: 0.4rem; }
    .title { margin: 0; font-size: 1rem; line-height: 1.25; color: var(--primaryText); }
    .body  { color: var(--secondaryText); font-size: 0.9rem; }
  
    /* ensure links don’t override theme text color */
    a.ucard { color: inherit; }
  </style>
  