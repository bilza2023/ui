<script>
    export let bgColor = "#FDF3E7";
    export let accentColor = "#C4A77F";
    export let themeClass = "theme-gold";
  
    const items = [
      {
        type: 'Lecture',
        name: 'Introduction to AI',
        description: 'Overview of AI concepts, history, and future applications.',
        tags: ['Beginner', 'Theory', 'AI Basics']
      },
      {
        type: 'Lab',
        name: 'Build a Chatbot',
        description: 'Hands-on session using simple chatbot tools.',
        tags: ['Hands-on', 'Beginner', 'Project-Based']
      },
      {
        type: 'Lecture',
        name: 'AI in Everyday Life',
        description: 'Exploring AI use-cases in health, education, and business.',
        tags: ['Use-Cases', 'Beginner']
      }
    ];
  </script>
  
  <div class="track-table" style="--bg-color: {bgColor}; --accent-color: {accentColor};">
    {#each items as item}
      <div class="track-row">
        <div class="row-main">
          <span class="icon">{item.type === 'Lecture' ? '📘' : '🧪'}</span>
          <div class="title-desc">
            <div class="title">{item.name}</div>
            <div class="desc">{item.description}</div>
          </div>
        </div>
        <div class="row-tags">
          {#each item.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  
  <style>
.track-table {
  margin: 2rem auto;
  padding: 0 2rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}


  
  .track-row {
    background: var(--bg-color);
    color: #1f2937;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    border-left: 5px solid var(--accent-color);
    transition: transform 0.2s ease;
  }
  
  .track-row:hover {
    transform: translateY(-2px);
  }
  
  .row-main {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .icon {
    font-size: 1.75rem;
  }
  
  .title-desc .title {
    font-weight: 600;
    font-size: 1.25rem;
  }
  
  .title-desc .desc {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.3rem;
  }
  
  .row-tags {
    margin-top: 0.75rem;
  }
  
  .tag {
    display: inline-block;
    background: var(--accent-color);
    color: white;
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    margin-right: 0.5rem;
  }
  </style>
  