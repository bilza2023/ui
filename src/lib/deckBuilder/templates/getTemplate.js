


let globalIdCounter = 0;

export function getTemplate(name="BaseTemplate") {
  return {
    id: `template_${globalIdCounter++}`,
    name: name,

    data: {},         // User sets
    theme: {},        // User sets
    globalTheme: {},   // Injected by DeckBuilder

    getItems(data, globalTheme) {
      return [];      // User defines how to generate items
    }
  };
}
