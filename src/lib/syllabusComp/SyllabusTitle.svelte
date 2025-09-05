<script>
    export let tcode = "";
    export let name = "";
    export let description = "";
    export let image = "";
  </script>
  
  <div class="syllabus-title">
    {#if image}
      <img src={image} alt={name} class="syllabus-title-image" />
    {/if}
    <div class="syllabus-title-text">
      <h1 class="syllabus-name">{name}</h1>
      {#if description}
        <p class="syllabus-description">{description}</p>
      {/if}
      <span class="syllabus-tcode">{tcode}</span>
    </div>
  </div>
  
  <style>
    .syllabus-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .syllabus-title-image {
      width: 64px;
      height: 64px;
      object-fit: contain;
      border-radius: 0.5rem;
    }
    .syllabus-title-text {
      display: flex;
      flex-direction: column;
    }
    .syllabus-name {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .syllabus-description {
      color: var(--text-muted, #666);
      font-size: 0.9rem;
    }
    .syllabus-tcode {
      font-size: 0.8rem;
      color: var(--text-accent, #888);
    }
  </style>
  