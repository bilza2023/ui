<script>
    export let title = "";
    export let description = "";
    export let timePeriod = "";     // e.g., "12 min"
    export let releaseDate = "";    // e.g., "May 2025"
    export let dim = false;
    export let link = "#";
  </script>



  <div class="presentation-card w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] flex flex-col gap-3" class:dim={dim} class:active={!dim}>
  
  <a href={link}>  
    <div class="thumbnail-container">
        <img src="/images/fbise9physicsChapter1Lessons.webp" alt={title} class="thumbnail" />
        <div class="hover-icon">▶</div>
      </div>
  </a>
      
    <h3 class="title">{title}</h3>
    <p class="description flex-grow">{description}</p>
  
    <div class="meta mt-auto">
      <div><strong>⏱️ Duration:</strong> {timePeriod}</div>
      <div><strong>📅 Released:</strong> {releaseDate}</div>
    </div>

</div>

  <style>
    .presentation-card {
      padding: 1.25rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: opacity 0.2s ease, background-color 0.2s ease;
    }
  
    .presentation-card.dim {
      opacity: 0.6;
      pointer-events: none;
      background-color: #f5f5f5;
    }
  
    .presentation-card.active {
      background-color: #f3eade; 
      /* d8cdbe */
    }
  
    .thumbnail {
      width: 100%;
      height: 10rem;
      object-fit: cover;
      opacity: 0.6;
      border-radius: 0.5rem;
    }
  
    .title {
      font-size: 1.125rem;
      font-weight: bold;
      color: #3d2e1e;
    }
  
    .description {
      font-size: 0.875rem;
      color: #4b5563;
    }
  
    .meta {
      font-size: 0.875rem;
      color: #6b7280;
    }
  
    .meta strong {
      font-weight: 600;
    }

    .thumbnail-container {
  position: relative;
  width: 100%;
  height: 10rem;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
}

.thumbnail-container:hover .thumbnail {
  opacity: 1;
  transform: scale(1.02);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.hover-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.thumbnail-container:hover .hover-icon {
  opacity: 1;
}

  </style>
  