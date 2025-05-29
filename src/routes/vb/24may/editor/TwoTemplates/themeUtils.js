
// themeUtils.js

/**
 * Attaches the global theme reference to each slide item or
 * applies theme-driven defaults as needed.
 *
 * @param {Array<object>} items  The raw item array from a template
 * @param {object}        theme  The global theme object
 * @returns {Array<object>}      New array of themed items
 */
export function applyTheme(items, theme) {
    return items.map(item => ({
      ...item,
      // Example marker; templates can read item._theme when rendering
      _theme: theme
    }));
  }
  