// imageWithCaption.js
// Displays an image with a caption, each fading in at their own absolute ‘showAt’ times.
// data = {
//   src:           string,      // image source key
//   showAt?:       number,      // when to fade in image
//   caption:       string,      // caption text
//   captionShowAt?:number       // when to fade in caption
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function imageWithCaption(globalTheme, data = {}) {
  const items = [];

  // --- Image ---
  const imageShowAt = data.showAt ?? 0;
  const imageItem = T.ItemBuilders.image(globalTheme, {
    src: data.src || "book",
    x: 160,
    y: 80,
    width: 700,
    height: 400
  });
  T.AniHelpers.fadeIn(imageItem, imageShowAt, 1);
  items.push(imageItem);

  // --- Caption ---
  const captionShowAt = data.captionShowAt ?? imageShowAt;
  const captionItem = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.caption, {
      text: data.caption || "This is a caption for the image above.",
      x: 160,
      y: 500,
      width: 700,
      textAlign: "center",
      fontSize: 28
    })
  );
  T.AniHelpers.fadeIn(captionItem, captionShowAt, 1);
  items.push(captionItem);

  return items;
}

// Example usage in DeckBuilder:
//
// t += 8;
// deck.add(templates.imageWithCaption, t, {
//   src:             "book",
//   showAt:          t,       // image fades in immediately
//   caption:         "An insightful caption.",
//   captionShowAt:   t + 1    // caption fades in 1s after image
// });
