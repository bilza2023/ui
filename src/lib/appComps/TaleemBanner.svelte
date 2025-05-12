
<div class="banner-container">

  <!-- Left: Image -->
  <div class="banner-image">
    <img
      src="/brand/taleem-banner2.webp"
      alt="Taleem Banner"
      class="banner-img"
    />
  </div>

  <!-- Right: Text -->
  <div class="banner-text">
    <h2 class="banner-title">taleem.help</h2>
    <p class="banner-description">
      Education for Every Pakistani — we offer AI, IT, and Board classes built to empower the next generation.
      Learn at your own pace, with modern tools, and practical outcomes. For curious learners from schools to startups.
    </p>
    <div class="banner-note">
      🌍 Part of the <strong>Taleem.Help</strong> national learning initiative.
    </div>
  </div>

</div>

<style>
  .banner-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(61, 46, 30, 0.9);
    padding: 3rem 3rem;
    gap: 8rem;
  }

  @media (min-width: 768px) {
    .banner-container {
      flex-direction: row;
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
  border: none;
  }

  .banner-text {
    flex: 1;
    color:  rgba(248, 237, 224, 0.9);;
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
    font-size: 1.75rem;     /* increased from 1.125rem */
  font-weight: 600;       /* increased from 500 */
  line-height: 1.7;       /* slightly looser line height */
  }

  .banner-note {
    font-size: 1rem;
    font-style: italic;
    opacity: 0.9;
  }
</style>
