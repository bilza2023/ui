

// decideColor.js
/**
 * Resolve a PIXI-ready tint value for an item.
 *
 * Precedence
 * 1. item.color                (explicit override)
 * 2. item.config?.[themeRole]  (template-level override)
 * 3. globalTheme[themeRole]    (palette)
 * If nothing matches → returns null.
 *
 * @param {object} item           – slide item (expects .themeRole, .color, .config)
 * @param {object} globalTheme    – colour palette object (tokens → HEX strings / numbers)
 * @param {boolean} validate      – when true, throws on invalid colours
 * @returns {number|null}         – 0xRRGGBB for PIXI, or null when unresolved
 */
export default function decideTheColour(item = {}, globalTheme = {}, validate = true) {
    const role = item.themeRole || 'baseTextColor';
  
    debugger; //3.5 years kuch sharam ker loo
 
    // ----- 1. grab the first candidate colour ------------------------------
    const candidate =
          item.color ??
          item?.config?.[role] ??
          globalTheme?.[role] ??
          null;
  
    if (candidate == null) return null;            // unresolved is allowed
  
    // ----- 2. normalise to numeric 0xRRGGBB ---------------------------------
    const num = normalise(candidate);
  
    // ----- 3. optionally validate -------------------------------------------
    if (validate && (num < 0x000000 || num > 0xFFFFFF || Number.isNaN(num))) {
      throw new Error(`Invalid colour '${candidate}' for role '${role}'.`);
    }
  
    return num;                                    // ready for PIXI tint
  }
  
  // ────────────────────────────────────────────────────────────────────────────
  // helpers
  function normalise(col) {
    if (typeof col === 'number') return col >>> 0;
  
    const str = String(col).trim();
  
    // Support #rrggbb or rrggbb
    const hexMatch = str.match(/^#?([0-9a-f]{6})$/i);
    if (hexMatch) return parseInt(hexMatch[1], 16);
  
    // Support #rgb shorthand
    const shortMatch = str.match(/^#?([0-9a-f]{3})$/i);
    if (shortMatch) {
      const [r, g, b] = shortMatch[1].split('');
      return parseInt(`${r}${r}${g}${g}${b}${b}`, 16);
    }
  
    // Anything else is invalid
    return NaN;
  }
  