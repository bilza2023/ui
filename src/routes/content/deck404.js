import { DeckBuilder } from "taleem-pivot-deckbuilder";
const deckbuilder = new DeckBuilder();

// Slide 1 - Title Slide
deckbuilder.s.titleSlide(8, [
  { name: "title", content: "404: Content Not Found", showAt: 0 }
]);

// Slide 2 - Image with Caption
deckbuilder.s.imageWithCaption(18, [
  { name: "image", content: "/pivot/box.webp", showAt: 0 },
  { name: "caption", content: "Oops! This page is empty.", showAt: 1 }
]);

// Slide 3 - Quote Slide
deckbuilder.s.quoteSlide(28, [
  { name: "quoteLine", content: "Not all those who wander are lost... but this page might be.", showAt: 0 },
  { name: "author", content: "— Taleem.Help Bot", showAt: 2 }
]);

// Slide 4 - Contact Slide
deckbuilder.s.contactSlide(38, [
  { name: "heading", content: "Need Assistance?", showAt: 0 },
  { name: "subheading", content: "Visit our Help Center or Contact Support", showAt: 1 },
  { name: "email", content: "support@taleem.help", showAt: 2 }
]);
// console.log("deckbuilder.build()",deckbuilder.build());
export const deck404 = deckbuilder.build();
