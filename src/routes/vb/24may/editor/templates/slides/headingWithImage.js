// headingWithImage.js
// Displays a heading and an image side by side (or stacked).
// data = {
//   title:       string,
//   titleShowAt?: number,      // when to fade in heading (absolute seconds)
//   imageSrc:    string,
//   imageShowAt?: number,      // when to fade in image (absolute seconds)
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function headingWithImage(globalTheme, data = {}) {
  const items = [];

  // 1️⃣ Heading
  const titleShowAt = data.titleShowAt ?? 0;
  const titleItem = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.heading, { text: data.title || "Visual Concept" })
  );
  T.layout(titleItem, "center", 0.05);
  T.AniHelpers.fadeIn(titleItem, titleShowAt, 1);
  items.push(titleItem);

  // 2️⃣ Image
  const imageShowAt = data.imageShowAt ?? titleShowAt;
  const imageItem = T.ItemBuilders.image(
    globalTheme,
    T.applyPreset(T.stylePresets.image.withTopAndSideMargin, { src: data.src || data.imageSrc || "book" })
  );
  T.AniHelpers.fadeIn(imageItem, imageShowAt, 1);
  items.push(imageItem);

  return items;
}

// Example usage in DeckBuilder:
//
// // Slide duration = 6s
// t += 6;
// deck.add(templates.headingWithImage, t, {
//   title:       "Our Story",
//   titleShowAt: t,            // heading appears immediately
//   imageSrc:    "book",
//   imageShowAt: t + 1         // image fades in 1s after slide start
// });
