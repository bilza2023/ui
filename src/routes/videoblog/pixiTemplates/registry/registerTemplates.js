// pixiTemplates/registry/index.js

// Internal registry map
const templatesMap = {};

// Register function
function registerTemplates(name, data = {}, config = {}, getItemsFn) {
  if (!name || typeof getItemsFn !== "function") {
    throw new Error(`Invalid template: name and getItemsFn are required`);
  }

  templatesMap[name] = {
    name,
    data,
    config,
    getItems: getItemsFn,
  };
}

// Optional: export available names for UI/editor use
export const availableTemplateNames = Object.keys(templatesMap);

// Export final templatesMap (used in DeckBuilder)
export { templatesMap,registerTemplates };
