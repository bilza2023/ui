
// /src/lib/constants/homeIndex.js

// Canonical categories for Home Index entries
export const CATEGORIES = [
    'videos',
    'blog',
    'courses'
  ];
  
  // Canonical types for Home Index entries
  export const TYPES = [
    'note',
    'deck',
    'course'
  ];
  
  /**
   * Compute the frontend href for a HomeIndexEntry.
   * @param {string} type - One of TYPES
   * @param {string} slug - Slug string
   * @returns {string} href URL to open in UI
   */
  export function computeHref(type, slug) {
    if (!type || !slug) return '/';
  
    switch (type) {
      case 'note':
        return `/note?filename=${slug}`;
      case 'deck':
        // current pattern uses query param; switch to pretty URL if later updated
        return `/player?filename=${slug}`;
      case 'course':
        return `/syllabus?tcode=${slug}`;
      default:
        // fallback: go to root with slug
        return `/${slug}`;
    }
  }
  