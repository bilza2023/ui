
import { SlideBuilder } from '../SlideBuilder.js';

// templates/titleSlide.js
export function titleSlideTemplate(contentData) {
  return new SlideBuilder({
    id: "title",
    startTime: 0,
    endTime: 5,
    backgroundColor: contentData.bg || "#1a1a1a"
  })
    .addItem("title", contentData.title, { x: 100, y: 100, width: 800 })
    .build();
}
