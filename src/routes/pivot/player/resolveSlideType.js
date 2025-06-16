// resolveSlideType.js
import Quote from "../slides/Quote.svelte";

export function resolveSlideType(type) {
  switch (type) {
    case "quoteSlide":
      return Quote;
    default:
      return null; // or fallback component
  }
}
