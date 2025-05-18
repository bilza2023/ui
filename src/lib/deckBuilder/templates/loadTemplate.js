
import {TitleWithBullets} from "./templateRegistry/TitleWithBullets";
import {JumboTron} from "./templateRegistry/JumboTron";

const templateRegistry = {
  jumbotron: JumboTron,
  titleWithBullets: TitleWithBullets,
  // testVisuals: testVisuals,
  // add more templates as needed
};
export function loadTemplate(name, data = {}, theme = {}) {
  const factory = templateRegistry[name];
  if (!factory) throw new Error(`Template not found: ${name}`);

  const tmpl = factory();
  Object.assign(tmpl.data, data);
  Object.assign(tmpl.theme, theme);
  tmpl.getItems = tmpl.getItems.bind(tmpl);
  return tmpl;
}


