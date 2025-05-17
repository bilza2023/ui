

import { JumboTron, TitleWithBullets } from './index';

const templateRegistry = {
  jumbotron: JumboTron,
  titleWithBullets: TitleWithBullets,
  // add more templates as needed
};
export function loadTemplate(name, endTime, data = {}, theme = {}) {
  const factory = templateRegistry[name];
  if (!factory) throw new Error(`Template not found: ${name}`);

  const tmpl = factory();

  // 🧠 Merge instead of replace
  Object.assign(tmpl.data, data);
  Object.assign(tmpl.theme, theme);

  tmpl.__endTime = endTime;
  tmpl.getItems = tmpl.getItems.bind(tmpl); // ensure proper `this`

  return tmpl;
}

