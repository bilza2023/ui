// centeredHeading.js – template with fade-in animation
// Displays a centered heading that fades in over 1s at data.showAt

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function centeredHeading(globalTheme, data = {}) {
  const showAt = data.showAt ?? 0;
  const duration = data.duration ?? 1;

  // build heading item
  const titleData = T.applyPreset(T.stylePresets.text.heading, {
    text: data.text || "Section Title",
    x: 100,
    y: 220,
    width: 820,
    textAlign: "center",
    fontSize: 64
  });
  const titleItem = T.ItemBuilders.text(globalTheme, titleData);

  // fade in using provided showAt timing
  T.AniHelpers.fadeIn(titleItem, showAt, duration);

  return [titleItem];
}

// Example usage in DeckBuilder:
// deck.add(templates.centeredHeading, t += 6, {
//   text: "Chapter 1: Introduction",
//   showAt: 6,          // absolute timeline time
//   duration: 1         // fade duration in seconds
// });