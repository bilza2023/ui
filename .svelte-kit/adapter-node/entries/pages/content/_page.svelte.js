import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "howler";
/* empty css                                                        */
import "katex";
import { DeckBuilder } from "taleem-pivot-deckbuilder";
const deckbuilder = new DeckBuilder();
deckbuilder.s.titleSlide(8, [
  { name: "title", content: "404: Content Not Found", showAt: 0 }
]);
deckbuilder.s.imageWithCaption(18, [
  { name: "image", content: "/pivot/box.webp", showAt: 0 },
  { name: "caption", content: "Oops! This page is empty.", showAt: 1 }
]);
deckbuilder.s.quoteSlide(28, [
  { name: "quoteLine", content: "Not all those who wander are lost... but this page might be.", showAt: 0 },
  { name: "author", content: "— Taleem.Help Bot", showAt: 2 }
]);
deckbuilder.s.contactSlide(38, [
  { name: "heading", content: "Need Assistance?", showAt: 0 },
  { name: "subheading", content: "Visit our Help Center or Contact Support", showAt: 1 },
  { name: "email", content: "support@taleem.help", showAt: 2 }
]);
console.log("deckbuilder.build()", deckbuilder.build());
deckbuilder.build();
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  data.deck ?? null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${``}`;
});
export {
  Page as default
};
