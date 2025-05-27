
// toolkit/stylePresets.js

export function createStylePresets(theme) {
    return {
      heading: {
        fontSize: 72,
        fontFamily: theme.fontFamilyHeading,
        color: theme.headingColor,
        padding: 10
      },
      bullet: {
        fontSize: 32,
        fontFamily: theme.fontFamilyBase,
        color: theme.baseTextColor,
        padding: 5
      },
      label: {
        fontSize: 24,
        fontFamily: theme.fontFamilyBase,
        color: theme.secondaryColor,
        padding: 4
      }
      // ✅ Add new ones here; never mutate existing
    };
  }
  