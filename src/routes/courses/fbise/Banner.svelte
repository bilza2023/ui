<div class="banner-container">
  <!-- AI Banner -->
  <div class="banner">
    <div class="banner-image">
      <img
        src="/brand/fbise-banner.webp"
        alt="AI Banner"
        class="banner-img"
      />
    </div>
    <div class="banner-text">
      <h2 class="banner-title">📘 Physics Class 9  (FBISE)</h2>
      <p class="banner-description">
        Taleem.Help’s Physics course for Class 9 follows the Federal Board syllabus in a smart, structured way. Each chapter is broken down into easy-to-understand slides, teacher-narrated video lectures, and exam-focused notes. We cover all key concepts — from motion and force to energy and heat — with solved numericals, quizzes, and practical examples. It’s designed to help students master Physics at their own pace, using modern tools.
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
