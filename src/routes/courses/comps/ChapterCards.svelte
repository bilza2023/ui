<script>
    export let title = "";
    export let description = "";
    export let image = "";
    export let stats = { lectures: 0, notes: 0, quizzes: 0 };
    export let link = "#";
  </script>
<div class="master">  

  <a href={link} class="chapter-card">
    <div class="card-container">
      <!-- Thumbnail -->
      <div class="thumbnail">
        <img src={image} alt={title} />
      </div>
  
      <!-- Content -->
      <div class="content">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
  
        <!-- Stats bar -->
        <div class="stats">
          <span>🎥 Lectures: {stats.lectures}</span>
          <span>📝 Notes: {stats.notes}</span>
          <span>🧪 Quizzes: {stats.quizzes}</span>
        </div>
      </div>
    </div>
  </a>
</div>  
  <style>
    .master {
        margin: 1rem 10rem;
      
    }
    .chapter-card {
      display: block;
      width: 100%;
      background-color: var(--color-bg-light);
      border-radius: 1rem;
      border: 1px solid var(--color-border-light);
      box-shadow: var(--shadow-md);
      transition: box-shadow 0.2s ease;
      overflow: hidden;
    }
  
    .chapter-card:hover {
      box-shadow: var(--shadow-lg);
    }
  
    .card-container {
      display: flex;
      flex-direction: column;
      padding: 1rem 10rem;
      background-color: #dfc9b5;
    }
  
    @media (min-width: 640px) {
      .card-container {
        flex-direction: row;
      }
    }
  
    .thumbnail {
      flex-shrink: 0;
      padding: 0.5rem;
    }
  
    .thumbnail img {
  width: 12rem;
  height: 9rem;
  border-radius: 0.75rem;
  object-fit: cover;
  border: 1px solid var(--color-border-light);
}

@media (min-width: 640px) {
  .thumbnail img {
    width: 16rem;
    height: 10rem;
  }
}

  
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.5rem;
     
      flex-grow: 1;
    }
  
    .content h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: var(--color-text-dark);
    }
  
    .content p {
      font-size: 1.75 rem;
      color: var(--color-text-light);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
  
    .stats {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      border-top: 1px solid var(--color-border-light);
      padding-top: 0.5rem;
      display: flex;
      gap: 1.5rem;
    }
  </style>
  