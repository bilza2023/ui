// player-utility.js
// Stateless helpers for time/slide math. No side effects, no stored state.

/** Last deck time (seconds). */
export function getDeckEnd(deck) {
    return deck?.length ? (deck[deck.length - 1].end ?? 0) : 0;
  }
  
  /** Clamp time into [0, deckEnd]. */
  export function clampTime(deck, t) {
    const end = getDeckEnd(deck);
    if (!Number.isFinite(t)) return 0;
    return Math.min(Math.max(t, 0), end);
  }
  
  /** Is t at/after deck end? */
  export function isDeckEnded(deck, t) {
    return clampTime(deck, t) >= getDeckEnd(deck);
  }
  
  /** Find slide index where start ≤ t < end. Returns 0 if not found. */
  export function findSlideIndex(deck, t) {
    if (!Array.isArray(deck) || !deck.length) return 0;
    for (let i = 0; i < deck.length; i++) {
      const s = deck[i];
      if (t >= (s.start ?? 0) && t < (s.end ?? 0)) return i;
    }
    // If t == end, stick to last slide
    return deck.length - 1;
  }
  
  /** Safe accessor. */
  export function slideAt(deck, i) {
    return (Array.isArray(deck) && i >= 0 && i < deck.length) ? deck[i] : null;
  }
  
  /** Next slide start or null. */
  export function nextSlideStart(deck, i) {
    return deck?.[i + 1]?.start ?? null;
  }
  
  /** Prev slide start or 0. */
  export function prevSlideStart(deck, i) {
    return deck?.[i - 1]?.start ?? 0;
  }
  
  /** Any timed items present? (showAt > 0 anywhere) */
  export function isTimed(deck) {
    if (!Array.isArray(deck)) return false;
    return deck.some(s => Array.isArray(s.data) && s.data.some(it => (it.showAt ?? 0) > 0));
  }
  