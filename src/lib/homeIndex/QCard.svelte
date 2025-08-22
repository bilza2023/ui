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
      q.type === "note" ? `/notes/${q.filename}` : `/player?filename=${q.filename}`;
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
    .question-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      padding: 0.5rem; /* trimmed */
      width: 100%;
    }
  
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
      transform: translateY(2px);
      box-shadow: 0 10px 10px rgba(21, 42, 0, 0.9);
    }
  
    .thumb {
      display: block;
      width: 100%;
      height: 160px;
      object-fit: cover;
      background: var(--surfaceColor);
      /* no extra radius needed; parent overflow handles corners */
    }
  
    .title {
      margin-top: auto;
      color:  var(--accentColor);
      background: var(--surfaceColor);
      padding: 0.45rem 0.6rem; /* tighter */
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  
    .icon { font-size: 1.15rem; line-height: 1; }
    .name { font-size: 1rem; }
  
    .no-questions {
      font-size: 1rem;
      text-align: center;
    }
  </style>
  