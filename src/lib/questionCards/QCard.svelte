<script>
    export let questions = [];
  
    const FALLBACKS = {
      slide: "/images/slide.webp",
      note:  "/images/beakers2.webp",
      deck:  "/images/slide.webp"
    };
  
    function getThumb(q) {
      return q.thumbnail ?? FALLBACKS[q.type] ?? "/images/slide.webp";
    }
  
    function getMeta(q) {
      if (q.type === "slide") return { color: "#492d08", icon: "📷" };
      if (q.type === "note")  return { color: "#6c430b", icon: "📚" };
      if (q.type === "deck")  return { color: "#0c0535", icon: "📽️" };
      return { color: "#2E1C02", icon: "" };
    }
  
    const hrefFor = (q) =>
      q.type === "note" ? `/notes?filename=${q.filename}` : `/player?filename=${q.filename}`;
  </script>
  
  <div class="question-grid">
    {#if questions.length > 0}
      {#each questions as q (q.filename)}
        {@const meta = getMeta(q)}
        <a class="card" href={hrefFor(q)} style={"--c:" + meta.color}>
          <img class="thumb" src={getThumb(q)} alt={q.name} loading="lazy" />
          <div class="title">
            <span class="icon">{meta.icon}</span>
            <span class="name">{q.name}</span>
          </div>
        </a>
      {/each}
    {:else}
      <p class="no-questions">No questions available for this selection.</p>
    {/if}
  </div>




  <style>
    /* Fill the full width, start from the left */
    .question-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;   /* was center */
      align-content: flex-start;
      gap: 1.25rem;
      padding: 0.5rem 0;             /* less side padding */
      width: 100%;
      --card-w: 320px;               /* ↑ bigger default card width */
    }
  
    .card {
      --card-accent: var(--c, var(--accentColor, #6c430b));
      width: var(--card-w);
      flex: 0 0 var(--card-w);       /* fixed same width per card */
      display: flex;
      flex-direction: column;
  
      border-radius: 0.75rem;
      overflow: hidden;
      border: 2px solid var(--card-accent);
      box-shadow: 0 8px 8px rgba(45, 44, 44, 0.8);
      text-decoration: none;
      background: var(--surfaceColor, #0e0e0e);
      transition: transform 120ms ease, box-shadow 120ms ease;
    }
  
    .card:hover {
      transform: translateY(2px);
      box-shadow: 0 10px 10px rgba(21, 42, 0, 0.9);
    }
  
    /* Taller thumb so overall card looks larger */
    .thumb {
      display: block;
      width: 100%;
      height: 200px;                 /* was 160px */
      object-fit: cover;
      background: var(--surfaceColor, #0e0e0e);
    }
  
    .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 0.75rem;
      background: var(--surfaceColor, #0e0e0e);
      color: var(--accentColor);
      line-height: 1.2;
      min-height: 48px;              /* uniform title bar height */
    }
  
    .icon { font-size: 1.1rem; line-height: 1; flex: 0 0 auto; }
  
    /* Truncate long names */
    .name {
      flex: 1 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1rem;
    }
  
    .no-questions {
      font-size: 1rem;
      text-align: center;
      opacity: 0.9;
    }
  
    /* Optional: auto-scale card width on small screens */
    @media (max-width: 480px) {
      .question-grid { --card-w: 260px; }
      .thumb { height: 170px; }
    }
  </style>
  