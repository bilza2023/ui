// Central registry for all synopsis modules.
// Update this file whenever you add a new tcode synopsis file.
//
// Exports:
//   - default: `tcodes` → [{ tcodeName, description, image }]
//   - named:  `tcodes`, `synopsisByTcode`
//
// NOTE: `synopsisServeces.js` already uses import.meta.glob() and
// does not depend on this registry. This file is for places where
// you want an explicit, static list (e.g., build scripts, menus).

import fbise9mathold from './fbise9mathold.js';
import fbise9physics from './fbise9physics.js';

// Keep a simple registry for lookups if needed
export const synopsisByTcode = {
  [fbise9mathold.tcodeName]: fbise9mathold,
  [fbise9physics.tcodeName]: fbise9physics
};

// Shallow meta list for UI pickers / menus
export const tcodes = Object.values(synopsisByTcode).map(s => ({
  tcodeName: s.tcodeName,
  description: s.description ?? '',
  image: s.image ?? ''
}));

export default tcodes;
