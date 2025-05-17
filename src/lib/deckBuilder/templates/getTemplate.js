


let globalIdCounter = 0;

export function getTemplate(name="BaseTemplate") {
  return {
    id: `template_${globalIdCounter++}`,
    name: name,

    data: {},         // User sets
    theme: {},        // User sets

    mapTheme(globalTheme) {
      return {};      // User overrides or edits this
    },

    getItems(data, theme) {
      return [];      // User defines how to generate items
    }
  };
}
