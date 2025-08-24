


// index.js
export { default as DeckDoctor } from './core/DeckDoctor.js';
export { default as Deckbuilder } from './deckbuilder/Deckbuilder.js';
export { default as TaleemSlides } from './taleemSlides/TaleemSlides.svelte';
export { default as NavBar } from './components/NavBar.svelte';
export { default as Player } from './core/Player.js';
export { default as Timer } from './core/Timer.js';

// Utilities
export * as player_utility from './core/player_utility.js';
export { clampTime, findSlideIndex, getDeckEnd } from './core/player_utility.js';
