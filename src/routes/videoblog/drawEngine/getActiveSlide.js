

// src/lib/player/SlideUtils.js

export function getActiveSlide(slides, currentTime) {
    return slides.find(
      (s) => currentTime >= s.startTime && currentTime < s.endTime
    );
  }
  