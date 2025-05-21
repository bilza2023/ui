
// $lib/deckBuilder/templates/backgroundApi.js

/**
 * Creates a valid background object.
 * Ensures that only one of pattern or backgroundImage is active.
 * If both are passed, pattern takes priority.
 */
export function createBackground({ pattern = null, backgroundImage = null } = {}) {
    return {
      backgroundImage: pattern ? null : backgroundImage,
      pattern: pattern || null
    };
  }
  
  /**
   * Shortcut for setting a pattern-based background
   */
  export function backgroundWithPattern(patternObj) {
    return createBackground({ pattern: patternObj });
  }
  
  /**
   * Shortcut for setting a background image by name
   */
  export function backgroundWithImage(imageName) {
    return createBackground({ backgroundImage: imageName });
  }
  