
export function toPixiColor(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.startsWith("#")) {
      return parseInt(value.slice(1), 16);
    }
    throw new Error(`Invalid color format: ${value}`);
  }
  