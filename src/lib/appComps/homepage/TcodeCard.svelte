<script>
  export let tcodes = [];
  let folderName = "subject";
</script>


<div class="container">

  <div class="gallery">
    {#each tcodes as t}
      <a href={`/${folderName}?tcode=${t.tcodeName}`}>
        <div class="gallery-item">
          <img src={t.image} alt={t.tcodeName} />
          <div class="details">{t.tcodeName}</div>
        </div>
      </a>
    {/each}
  </div>
</div>


<style>

  .container {
    background-color: rgb(193, 178, 148);
    border-radius:2%;
    padding: 2rem;
  }
  :global(body) {
    background-color: #1e1e1e;
    color: #f0f0f0;
    font-family: Arial, sans-serif;
    margin: 0;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #ffffff;
  }

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .gallery-item {
    background-color: #C4A77F;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .gallery-item img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    border: 1px solid #555;
    display: block; /* Ensures image is centered within the container */
    margin-left: auto;
    margin-right: auto;
  }

  .details {
    font-size: 0.9rem;
    color: #291701;
    font-weight: bold;
  }
</style>
