

export class TemplateBuilder {
    constructor() {
      this.items = [];
    }
  
    addItem(type, baseProps = {}) {
      const entry = {
        type,
        baseProps,
        links: {},
      };
      this.items.push(entry);
      return new Linker(entry);
    }
  
    getItems(data = {}, config = {}, theme = {}) {
      return this.items.map(({ type, baseProps, links }) => {
        const resolved = { type, ...baseProps };
    
        for (const field in links) {
          const link = links[field];
          let value = link.default;
    
          if (link.unlessData && data[link.unlessData] !== undefined) {
            value = data[link.unlessData];
          } else if (link.unlessConfig && config[link.unlessConfig] !== undefined) {
            value = config[link.unlessConfig];
          } else if (link.defaultType === "theme" && theme[link.default] !== undefined) {
            value = theme[link.default];
          }
    
          resolved[field] = value;
        }
    
        return { data: resolved }; // ✅ wrap each item inside { data: ... }
      });
    }
    
  }
  


  class Linker {
    constructor(itemEntry) {
      this.itemEntry = itemEntry;
    }
  
    link(field) {
      this.itemEntry.links[field] = {};
      return new FieldLink(this.itemEntry.links[field]);
    }
  }
  
  class FieldLink {
    constructor(linkObj) {
      this.link = linkObj;
    }
  
    default(value) {
      this.link.default = value;
      this.link.defaultType = "literal";
      return this;
    }
  
    defaultTheme(role) {
      this.link.default = role;
      this.link.defaultType = "theme";
      return this;
    }
  
    unlessData(key) {
      this.link.unlessData = key;
      return this;
    }
  
    unlessConfig(key) {
      this.link.unlessConfig = key;
      return this;
    }
  }
  