<div class="banner-container">
  <!-- AI Banner -->
  <div class="banner">
    <div class="banner-image">
      <img
        src="/brand/it.webp"
        alt="AI Banner"
        class="banner-img"
      />
    </div>
    <div class="banner-text">
      <h2 class="banner-title">IT Courses</h2>
      <p class="banner-description">
        Taleem.Help’s IT Tracks teach you practical digital skills for today’s world. Whether you’re learning the basics, setting up systems, or preparing for work and freelancing — our guided tracks help you gain real confidence with modern tools, from file handling to websites and beyond.
      </p>
      <div class="banner-note">
        🌍 Part of the <strong>Taleem.Help</strong> national learning initiative.
      </div>
    </div>

  </div>
</div>

<style>
  .banner-container {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .banner-container {
      flex-direction: column;
    }

    .banner {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: rgba(61, 46, 30, 0.9);
      padding: 3rem;
      /* border-radius: 12px; */
      gap: 8rem;
    }
  }

  .banner-image {
    overflow: hidden;
    border-radius: 12px;
  }

  .banner-img {
    max-height: 300px;
    width: 100%;
    object-fit: contain;
    border-radius: 12px;
  }

  .banner-text {
    flex: 1;
    color: rgba(248, 237, 224, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
  }

  .banner-title {
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: 2px solid #c4a77f;
    padding-bottom: 0.5rem;
    margin: 0;
  }

  .banner-description {
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 1.7;
  }

  .banner-note {
    font-size: 1rem;
    font-style: italic;
    opacity: 0.9;
  }
</style>
